require('dotenv').config();
const mongoose = require('mongoose');

const connDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connDB;