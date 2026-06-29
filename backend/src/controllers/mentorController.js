const MentorProfile = require('../models/MentorProfile');
const Session = require('../models/Session');

// @desc    Get all mentors
// @route   GET /api/mentors
// @access  Private
const getMentors = async (req, res) => {
  try {
    const mentors = await MentorProfile.find().populate('userId', 'name profilePicture');
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Book a session
// @route   POST /api/mentors/book
// @access  Private
const bookSession = async (req, res) => {
  try {
    const { mentorId, date } = req.body;
    
    const session = await Session.create({
      studentId: req.user._id,
      mentorId,
      date
    });
    
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMentors,
  bookSession
};
