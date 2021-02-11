const Sauce = require('../models/sauceModel');

// Get all sauces in database
exports.getAll = (req, res, next) => {
  Sauce.find()
    .then(sauces => {
      res.status(200).json(sauces)
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

// Get one sauce matching req.params.id
exports.getOne = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  })
    .then(sauce => {
      res.status(200).json(sauce)
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

// Create a new sauce
exports.create = (req, res, next) => {
  const sauceDetails = JSON.parse(req.body.sauce);
  delete sauceDetails._id;
  const sauce = new Sauce({
    ...sauceDetails,
    imageUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  })

  sauce.save()
    .then(() => {
      res.status(201).json({
        message: 'Sauce has been created successfully.'
      })
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

// Update sauce matching req.params.id
exports.update = (req, res, next) => {
  Sauce.updateOne(
    {
      _id: req.params.id
    },
    {
      ...req.body,
      _id: req.params.id
    }
  )
    .then(() => {
      res.status(200).json({
        message: `Sauce with id:${req.params.id} has been updated successfully.`
      })
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}

// Delete sauce matching req.params.id
exports.delete = (req, res, next) => {
  Sauce.deleteOne({
    _id: req.params.id
  })
    .then(() => {
      res.status(200).json({
        message: `Sauce with id:${req.params.id} has been deleted successfully.`
      })
    })
    .catch(error => {
      res.status(400).json({
        error: error
      })
    })
}