const express = require('express');
const router = express.Router();
const { getOpportunities } = require('../controllers/opportunityController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getOpportunities);

module.exports = router;
