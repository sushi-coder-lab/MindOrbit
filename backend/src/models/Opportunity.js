const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['scholarship', 'hackathon', 'job', 'internship', 'bootcamp'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  benefits: [String],
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', OpportunitySchema);
