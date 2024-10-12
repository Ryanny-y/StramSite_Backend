const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  watchlist: {
    type: mongoose.Schema.Types.ObjectId,
  },
  favorites: {
    type: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('User', UserSchema);