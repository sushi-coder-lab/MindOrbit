const { GoogleGenAI } = require('@google/genai');
const User = require('../models/User');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Onboard user with AI generated roadmap
// @route   POST /api/ai/onboarding
// @access  Private
const onboardUser = async (req, res) => {
  try {
    const { 
      educationLevel, 
      language, 
      englishProficiency, 
      financialStatus, 
      careerGoal, 
      learningSpeed 
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user profile with onboarding info
    user.background = { educationLevel, language, englishProficiency, financialStatus };
    user.goals = { careerGoal, learningSpeed };
    user.isOnboarded = true;
    await user.save();

    // Generate personalized roadmap via Gemini
    const prompt = `Act as an expert career counselor and educational mentor.
I am a first-generation learner with the following background:
- Education Level: ${educationLevel}
- Preferred Language: ${language}
- English Proficiency: ${englishProficiency}
- Financial Status: ${financialStatus}

My primary career goal is: ${careerGoal}
My learning speed is: ${learningSpeed}

Please generate a personalized learning roadmap with daily, weekly, and monthly milestones. 
Format your response as a JSON array of objects representing learning modules, with each object having: title, description, estimatedDays, and type (video, practice, reading). Only return JSON.`;

    let roadmap;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.log("Using mock roadmap data because Gemini API Key is missing or invalid.");
      // Fallback to mock data
      roadmap = JSON.stringify([
        { title: "Introduction to your Career", description: "Understand the basics of " + careerGoal, estimatedDays: 2, type: "video" },
        { title: "Foundational Skills", description: "Learn the core concepts required for " + careerGoal, estimatedDays: 5, type: "reading" },
        { title: "Practical Application", description: "Build your first project related to your goals.", estimatedDays: 7, type: "practice" }
      ]);
    } else {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
      roadmap = response.text;
    }

    res.status(200).json({ 
      message: 'Onboarding complete', 
      user, 
      roadmap: JSON.parse(roadmap) 
    });

  } catch (error) {
    console.error('AI Onboarding Error:', error);
    // Even on error, fallback to mock data so user isn't blocked
    const fallbackRoadmap = [
      { title: "Introduction to your Career", description: "Understand the basics of " + req.body.careerGoal, estimatedDays: 2, type: "video" },
      { title: "Foundational Skills", description: "Learn the core concepts", estimatedDays: 5, type: "reading" },
      { title: "Practical Application", description: "Build your first project", estimatedDays: 7, type: "practice" }
    ];
    res.status(200).json({ 
      message: 'Onboarding complete (Fallback Mode)', 
      user: await User.findById(req.user._id), 
      roadmap: fallbackRoadmap
    });
  }
};

module.exports = { onboardUser };
