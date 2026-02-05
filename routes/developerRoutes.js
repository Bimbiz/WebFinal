const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    createDeveloper,
    getDevelopers,
    getDeveloperById,
    deleteDeveloper
} = require('../controllers/developerController');

router.post('/', protect, createDeveloper);
router.delete('/:id', protect, deleteDeveloper);

router.get('/', getDevelopers);
router.get('/:id', getDeveloperById);

module.exports = router;