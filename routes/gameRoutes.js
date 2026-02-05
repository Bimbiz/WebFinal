const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    createGame,
    getGames,
    getGameById,
    updateGame,
    deleteGame
} = require('../controllers/gameController');
const { route } = require('./developerRoutes');


router.post('/', protect, createGame);
router.put('/:id', protect, updateGame);
router.delete('/:id', protect, deleteGame);

router.get('/', getGames);
router.get('/:id', getGameById);

module.exports = router;