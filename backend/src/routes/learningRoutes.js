const express = require('express');
const router = express.Router();
const { getCourses, getCourseById } = require('../controllers/learningController');
const { protect } = require('../middlewares/auth');

router.get('/courses', protect, getCourses);
router.get('/courses/:id', protect, getCourseById);

module.exports = router;
