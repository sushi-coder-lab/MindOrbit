const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'admin', 'parent'],
    default: 'student'
  },
  profilePicture: {
    type: String,
    default: ''
  },
  background: {
    educationLevel: { type: String, default: '' },
    language: { type: String, default: 'English' },
    englishProficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    financialStatus: { type: String, default: '' }
  },
  goals: {
    careerGoal: { type: String, default: '' },
    learningSpeed: { type: String, enum: ['Slow', 'Medium', 'Fast'], default: 'Medium' }
  },
  stats: {
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 }
  },
  isOnboarded: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
