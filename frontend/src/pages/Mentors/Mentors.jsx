import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Clock, Video, MessageSquare, Calendar } from 'lucide-react';

const dummyMentors = [
  { _id: '1', name: 'Sarah Jenkins', role: 'Senior Software Engineer', company: 'Google', expertise: ['React', 'System Design'], rating: 4.9, sessions: 120, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
  { _id: '2', name: 'David Chen', role: 'AI Researcher', company: 'OpenAI', expertise: ['Machine Learning', 'Python'], rating: 5.0, sessions: 85, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
  { _id: '3', name: 'Priya Patel', role: 'Product Manager', company: 'Microsoft', expertise: ['Product Strategy', 'Agile'], rating: 4.8, sessions: 210, image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop' },
  { _id: '4', name: 'James Wilson', role: 'Lead UI/UX Designer', company: 'Figma', expertise: ['Figma', 'User Research'], rating: 4.9, sessions: 150, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
];

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentors = dummyMentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Mentor Network</h1>
          <p className="text-text-muted">Connect with industry professionals for 1-on-1 guidance.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search by name or skill..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMentors.map((mentor, index) => (
          <motion.div
            key={mentor._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-3xl p-6 border border-white/5 hover:border-primary/50 transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Background decorative blob */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />

            <div className="relative mb-4">
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-xl"
              />
              <div className="absolute -bottom-2 right-0 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-lg">
                <Star size={12} className="mr-1 fill-current" /> {mentor.rating}
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{mentor.name}</h3>
            <p className="text-sm font-medium text-text-muted mb-1">{mentor.role}</p>
            <p className="text-xs text-text-muted mb-4">@ {mentor.company}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {mentor.expertise.map(skill => (
                <span key={skill} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-text-muted">{skill}</span>
              ))}
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-auto">
              <button className="flex items-center justify-center py-2.5 rounded-xl bg-surface hover:bg-surface/80 border border-white/10 text-white text-sm font-medium transition-colors">
                <MessageSquare size={16} className="mr-2" /> Chat
              </button>
              <button className="flex items-center justify-center py-2.5 rounded-xl bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-primary/20 text-white text-sm font-bold hover:opacity-90 transition-opacity">
                <Calendar size={16} className="mr-2" /> Book
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
