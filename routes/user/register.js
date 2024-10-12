const express = require('express');
const router = express.Router();
const handleRegister = require('../../controllers/user/registerController');

router.post('/', handleRegister);

module.exports = router;