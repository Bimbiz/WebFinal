const express = require('express');
const router = express.Router();

const { getGamingNews } = require('../controllers/externalController');

router.get('/', getGamingNews);

module.exports = router;