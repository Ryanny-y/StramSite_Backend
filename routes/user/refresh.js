const express = require('express');
const router = express.Router();
const handleRefresh = require('../../controllers/user/refreshController');

router.get('/', handleRefresh);

module.exports = router;