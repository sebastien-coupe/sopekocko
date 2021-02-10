const express = require('express');

const app = express();

app.use((req, res) => {
  res.json({
    message: "All is working!"
  })
})


module.exports = app;