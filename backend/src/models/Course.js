const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    enum: ['video', 'pdf', 'article', 'practice'],
    required: true,
  },
  contentUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // in minutes
  },
  order: {
    type: Number,
    required: true,
  }
});

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true, // e.g., 'Programming', 'Communication', 'AI'
  },
  tags: [String],
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Course+Thumbnail'
  },
  instructor: {
    type: String,
    default: 'Saarthi AI Mentor'
  },
  lessons: [LessonSchema],
  totalEnrolled: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
