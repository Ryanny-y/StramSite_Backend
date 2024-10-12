const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoritesSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  favorites: [{
    show_id: {
      type: String,
      required: true
    },
    _id: false
  }]
});

module.exports = mongoose.model('Favorite', FavoritesSchema);