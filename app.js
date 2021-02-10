const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
  next();
})

app.use((req, res) => {
  res.json({
    message: "All is working!"
  })
})


module.exports = app;