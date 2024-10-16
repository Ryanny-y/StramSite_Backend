const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoritesSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  favorites: [{
    type: String,
    required: true
  }]
});

module.exports = mongoose.model('Favorite', FavoritesSchema);