const Opportunity = require('../models/Opportunity');

// @desc    Get all opportunities (filtered by type optional)
// @route   GET /api/opportunities
// @access  Private
const getOpportunities = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type && type !== 'all' ? { type } : {};
    
    const opportunities = await Opportunity.find(filter).sort({ deadline: 1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOpportunities,
};
