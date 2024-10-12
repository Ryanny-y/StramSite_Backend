const mongoose = require('mongoose');
const { Schema } = mongoose;

const WatchlistSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  watchlists: [{
    show_id: {
      type: String,
      required: true
    },
    _id: false
  }]
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);
