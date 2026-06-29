const mongoose = require('mongoose');

const MentorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expertise: [String],
  bio: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  role: {
    type: String,
  },
  availability: [
    {
      day: String,
      timeSlots: [String]
    }
  ],
  rating: {
    type: Number,
    default: 5.0
  },
  totalSessions: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('MentorProfile', MentorProfileSchema);
