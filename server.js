require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const app = require('./routes'); // This pulls in all your API logic

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGODB_URI; 

mongoose.connect(DB_URI)
  .then(() => {
    console.log('MongoDB Atlas connected successfully!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
