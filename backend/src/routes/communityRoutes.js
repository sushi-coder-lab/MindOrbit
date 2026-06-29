const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/communityController');
const { protect } = require('../middlewares/auth');

router.get('/', protect, getPosts);
router.post('/', protect, createPost);

module.exports = router;
