const express = require('express');
const router = express.Router();
const { onboardUser } = require('../controllers/aiController');
const { protect } = require('../middlewares/auth');

router.post('/onboarding', protect, onboardUser);

module.exports = router;
