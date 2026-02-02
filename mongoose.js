// mongoose.js
require('dotenv').config(); 
const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;