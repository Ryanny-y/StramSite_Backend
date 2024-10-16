const express = require('express');
const router = express.Router();
const { getWatchlists, addToWatchlist, removeToWatchlist } = require('../../controllers/api/watchlistController');
const verifyJWT = require('../../middlewares/verifyJWT');

router.route('/')
  .post(verifyJWT, addToWatchlist)
  .delete(verifyJWT, removeToWatchlist);

router.get('/:user_id', verifyJWT, getWatchlists);

module.exports = router;