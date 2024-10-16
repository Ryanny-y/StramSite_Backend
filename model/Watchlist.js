const mongoose = require('mongoose');
const { Schema } = mongoose;

const WatchlistSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  watchlists: [{
    type: String,
    required: true
  }]
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);
