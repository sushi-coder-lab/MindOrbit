import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Onboarding = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    educationLevel: '',
    language: 'English',
    englishProficiency: 'Beginner',
    financialStatus: '',
    careerGoal: '',
    learningSpeed: 'Medium'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submitOnboarding = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const response = await axios.post('http://localhost:5000/api/ai/onboarding', formData, config);
      
      // Update local storage user
      const updatedUser = { ...user, isOnboarded: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Can store roadmap in a separate state/slice
      localStorage.setItem('roadmap', JSON.stringify(response.data.roadmap));
      
      setIsLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error during onboarding. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background to-surface opacity-80" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass p-8 md:p-12 rounded-3xl w-full max-w-2xl shadow-2xl border border-white/10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
            Let's Personalize Your Journey
          </h1>
          <p className="text-text-muted">Step {step} of 3</p>
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-semibold text-white mb-6">Tell us about your background</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Highest Education Level</label>
                <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-surface/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Level</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Financial Status (Optional)</label>
                <select name="financialStatus" value={formData.financialStatus} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-surface/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Status</option>
                  <option value="Low Income">Low Income</option>
                  <option value="Middle Income">Middle Income</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button onClick={nextStep} className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300">Next</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-semibold text-white mb-6">Language & Communication</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Preferred Learning Language</label>
                <select name="language" value={formData.language} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-surface/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">English Proficiency</label>
                <select name="englishProficiency" value={formData.englishProficiency} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-surface/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="Beginner">Beginner (Learning basic words)</option>
                  <option value="Intermediate">Intermediate (Can read & understand)</option>
                  <option value="Advanced">Advanced (Fluent)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button onClick={prevStep} className="px-8 py-3 rounded-xl bg-surface text-white font-semibold hover:bg-surface/80 transition-colors">Back</button>
              <button onClick={nextStep} className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300">Next</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-semibold text-white mb-6">Goals & Ambitions</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">What is your primary career goal?</label>
                <input 
                  type="text"
                  name="careerGoal"
                  value={formData.careerGoal}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Developer, Data Scientist"
                  className="w-full px-4 py-3 rounded-xl bg-surface/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">Learning Speed</label>
                <select name="learningSpeed" value={formData.learningSpeed} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-surface/80 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="Slow">Slow (1-2 hours/day)</option>
                  <option value="Medium">Medium (3-4 hours/day)</option>
                  <option value="Fast">Fast (5+ hours/day)</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button onClick={prevStep} disabled={isLoading} className="px-8 py-3 rounded-xl bg-surface text-white font-semibold hover:bg-surface/80 transition-colors">Back</button>
              <button onClick={submitOnboarding} disabled={isLoading} className="px-8 py-3 rounded-xl bg-gradient-to-r from-secondary to-green-600 text-white font-semibold shadow-lg hover:shadow-secondary/30 transition-all duration-300">
                {isLoading ? 'Generating Roadmap...' : 'Finish & Generate Roadmap'}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Onboarding;
