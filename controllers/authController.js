const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const maskData = require('maskdata');
const pwdSchema = new passwordValidator();

pwdSchema
  .is().min(8)
  .has().lowercase()
  .has().uppercase()
  .has().digits();

// User registration management
exports.signup = (req, res, next) => {
  if (!pwdSchema.validate(req.body.password)) {
    return res.status(400).json({
      message: 'Password is too weak.'
    })
  }

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const maskedEmail = maskData.maskEmail2(req.body.email);
      const user = new User({
        email: maskedEmail,
        password: hash
      });
      user.save()
        .then(
          () => res.status(201).json({
            message: 'User has been successfully created.'
          })
        )
        .catch(
          error => res.status(400).json({ error })
        )
    })
    .catch(error => res.status(500).json({ error }))
}

// User authentication management
exports.login = (req, res, next) => {
  const maskedEmail = maskData.maskEmail2(req.body.email)
  User.findOne({
    email: maskedEmail
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Email and/or password is incorrect'
        })
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Email and/or password is incorrect'
            })
          }

          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.SALT,
              { expiresIn: '24h' }
            )
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}