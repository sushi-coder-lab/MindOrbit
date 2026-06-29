import { useSelector } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Award, BookOpen, Clock } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-text-muted">Manage your personal information and preferences.</p>
        </div>
        <button className="px-6 py-2 rounded-xl bg-surface border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="md:col-span-1 glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-secondary p-1 mb-6">
            <div className="w-full h-full bg-surface rounded-full flex items-center justify-center overflow-hidden">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-text-muted" />
              )}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{user?.name || 'Student'}</h2>
          <p className="text-sm text-primary font-medium mb-4">{user?.goals?.careerGoal || 'Learner'}</p>
          
          <div className="w-full mt-4 space-y-3">
            <div className="flex items-center text-sm text-text-muted">
              <Mail size={16} className="mr-3" />
              {user?.email}
            </div>
            <div className="flex items-center text-sm text-text-muted">
              <Award size={16} className="mr-3" />
              Level {user?.stats?.level || 1} • {user?.stats?.xp || 0} XP
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 glass p-8 rounded-3xl border border-white/5 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-6">Background Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-text-muted mb-1 uppercase tracking-wider">Education Level</p>
                <p className="text-sm text-white font-medium">{user?.background?.educationLevel || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1 uppercase tracking-wider">Language</p>
                <p className="text-sm text-white font-medium">{user?.background?.language || 'English'}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1 uppercase tracking-wider">English Proficiency</p>
                <p className="text-sm text-white font-medium">{user?.background?.englishProficiency || 'Beginner'}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1 uppercase tracking-wider">Learning Speed</p>
                <p className="text-sm text-white font-medium">{user?.goals?.learningSpeed || 'Medium'}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-surface/50 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Completed Lesson</p>
                  <p className="text-xs text-text-muted">JavaScript Closures Explained</p>
                </div>
                <div className="ml-auto text-xs text-text-muted flex items-center">
                  <Clock size={12} className="mr-1" /> 2h ago
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-surface/50 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
                  <Award size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Earned Badge</p>
                  <p className="text-xs text-text-muted">7-Day Streak Maintained</p>
                </div>
                <div className="ml-auto text-xs text-text-muted flex items-center">
                  <Clock size={12} className="mr-1" /> 1d ago
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
