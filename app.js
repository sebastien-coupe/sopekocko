const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const sanitizer = require('sanitize-middleware');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauces');

const app = express();
app.use(sanitizer());

// Create connexion to MongoDB
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('Failed to connect to MongoDB'))

// Prevent Cors Errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

app.use(bodyParser.json());
app.use(helmet());
app.use(mongoSanitize());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;