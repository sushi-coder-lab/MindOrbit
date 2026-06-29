import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, PlusCircle, User, Filter, Search } from 'lucide-react';

const dummyPosts = [
  { _id: '1', title: 'How to prepare for Google STEP internship?', author: 'Ravi Kumar', category: 'career', upvotes: 45, comments: 12, time: '2 hours ago' },
  { _id: '2', title: 'Need help understanding React useEffect dependencies', author: 'Priya S.', category: 'qa', upvotes: 23, comments: 8, time: '5 hours ago' },
  { _id: '3', title: 'My first open source contribution!', author: 'Amit Patel', category: 'projects', upvotes: 112, comments: 24, time: '1 day ago' },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = ['all', 'qa', 'career', 'projects', 'general'];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community Forum</h1>
          <p className="text-text-muted">Discuss, ask questions, and share projects with peers.</p>
        </div>
        
        <button className="flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-lg hover:shadow-primary/30 transition-all duration-300">
          <PlusCircle size={20} className="mr-2" /> New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 glass p-4 rounded-2xl border border-white/5">
            <div className="flex overflow-x-auto custom-scrollbar gap-2 w-full md:w-auto">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab ? 'bg-primary/20 text-primary' : 'text-text-muted hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {tab === 'qa' ? 'Q&A' : tab}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search discussions..." 
                className="w-full pl-9 pr-4 py-2 bg-surface border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {dummyPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col items-center space-y-1">
                    <button className="text-text-muted hover:text-primary transition-colors"><ThumbsUp size={18} /></button>
                    <span className="text-sm font-bold text-white">{post.upvotes}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface border border-white/10 text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-text-muted flex items-center">
                        <User size={12} className="mr-1" /> {post.author} • {post.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-2">{post.title}</h3>
                    <div className="flex items-center text-sm text-text-muted gap-4">
                      <span className="flex items-center hover:text-white transition-colors">
                        <MessageSquare size={16} className="mr-1.5" /> {post.comments} comments
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['react', 'internships', 'resume', 'machine-learning', 'python', 'open-source'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-surface/80 border border-white/10 text-xs text-text-muted hover:text-primary cursor-pointer transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="text-lg font-bold text-white mb-2">Community Guidelines</h3>
            <p className="text-sm text-text-muted mb-4">Be respectful, help others learn, and share your knowledge freely.</p>
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white font-medium transition-colors">Read Guidelines</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
