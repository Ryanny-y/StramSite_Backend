const express = require('express');
const router = express.Router();
const { getFavorites, addToFavorites, removeFromFavorites } = require('../../controllers/api/favoritesController');
const verifyJWT = require('../../middlewares/verifyJWT');

router.route('/')
  .post(verifyJWT, addToFavorites)
  .delete(verifyJWT, removeFromFavorites);

router.get('/:user_id', verifyJWT, getFavorites);

module.exports = router;