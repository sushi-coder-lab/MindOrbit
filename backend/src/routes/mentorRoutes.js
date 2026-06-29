const express = require('express');
const router = express.Router();
const { getMentors, bookSession } = require('../controllers/mentorController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getMentors);
router.post('/book', protect, bookSession);

module.exports = router;
