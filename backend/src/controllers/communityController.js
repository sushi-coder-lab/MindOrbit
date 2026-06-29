const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/community
// @access  Private
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'name profilePicture').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new post
// @route   POST /api/community
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const post = await Post.create({
      userId: req.user._id,
      title,
      content,
      category,
      tags
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost
};
