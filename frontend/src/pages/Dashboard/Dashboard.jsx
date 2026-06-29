import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CheckCircle, Play, BookOpen, Clock } from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [roadmap, setRoadmap] = useState([]);
  
  useEffect(() => {
    // Load roadmap from local storage
    const storedRoadmap = localStorage.getItem('roadmap');
    if (storedRoadmap) {
      try {
        setRoadmap(JSON.parse(storedRoadmap));
      } catch (e) {
        console.error("Failed to parse roadmap");
      }
    }
  }, []);

  // Get Today's Next Best Action (assuming first item in roadmap for now)
  const nextAction = roadmap.length > 0 ? roadmap[0] : null;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between"
      >
        <div className="z-10 text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{user?.name}</span>!
          </h1>
          <p className="text-text-muted">You're making great progress towards becoming a {user?.goals?.careerGoal || 'professional'}.</p>
        </div>
        <div className="z-10 flex space-x-4">
          <div className="bg-surface/50 p-4 rounded-2xl border border-white/5 text-center min-w-[100px]">
            <p className="text-sm text-text-muted mb-1">XP Earned</p>
            <p className="text-2xl font-bold text-primary">{user?.stats?.xp || 0}</p>
          </div>
          <div className="bg-surface/50 p-4 rounded-2xl border border-white/5 text-center min-w-[100px]">
            <p className="text-sm text-text-muted mb-1">Modules</p>
            <p className="text-2xl font-bold text-secondary">0 / {roadmap.length}</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Best Action (2/3 width) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 border-t-4 border-t-secondary"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center">
              <span className="w-2 h-2 rounded-full bg-secondary mr-3 animate-pulse"></span>
              Today's Next Best Action
            </h2>
          </div>
          
          {nextAction ? (
            <div className="bg-surface/50 rounded-2xl p-6 border border-white/5 flex flex-col md:flex-row items-center justify-between group hover:bg-surface/80 transition-colors">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2 text-sm text-secondary font-medium mb-2">
                  <Play size={16} />
                  <span>{nextAction.type ? nextAction.type.toUpperCase() : 'MODULE'}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{nextAction.title}</h3>
                <p className="text-text-muted max-w-xl">{nextAction.description}</p>
                <div className="flex items-center space-x-4 mt-4 text-xs text-text-muted">
                  <span className="flex items-center"><Clock size={14} className="mr-1" /> Est: {nextAction.estimatedDays || 1} Days</span>
                </div>
              </div>
              <button className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300">
                Start Now
              </button>
            </div>
          ) : (
            <div className="text-center py-10 bg-surface/50 rounded-2xl border border-white/5 text-text-muted">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>No immediate actions pending. Explore the Learning Hub!</p>
            </div>
          )}
        </motion.div>

        {/* Mini Roadmap / Up Next (1/3 width) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-6 border border-white/10"
        >
          <h2 className="text-lg font-bold text-white mb-6">Your Roadmap</h2>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {roadmap.slice(1, 5).map((item, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center text-text-muted group-hover:border-primary group-hover:text-primary transition-colors">
                    {index + 2}
                  </div>
                  {index !== roadmap.slice(1, 5).length - 1 && <div className="w-px h-full bg-white/10 my-1 group-hover:bg-primary/30 transition-colors"></div>}
                </div>
                <div className="pb-4">
                  <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2">{item.description}</p>
                </div>
              </div>
            ))}
            {roadmap.length === 0 && (
              <p className="text-sm text-text-muted text-center py-4">Complete onboarding to see your roadmap.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
