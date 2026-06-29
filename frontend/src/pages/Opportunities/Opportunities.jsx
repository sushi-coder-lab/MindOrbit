import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, GraduationCap, Calendar, ExternalLink, Filter } from 'lucide-react';

const dummyOpportunities = [
  { _id: '1', title: 'Google Anita Borg Scholarship', type: 'scholarship', deadline: '2027-04-15', provider: 'Google', tags: ['Women in Tech', 'CS'] },
  { _id: '2', title: 'Smart India Hackathon', type: 'hackathon', deadline: '2026-08-01', provider: 'Gov of India', tags: ['Web', 'Mobile'] },
  { _id: '3', title: 'Frontend Developer Intern', type: 'internship', deadline: '2026-07-20', provider: 'Stripe', tags: ['React', 'Remote'] },
  { _id: '4', title: 'AWS Cloud Bootcamp', type: 'bootcamp', deadline: '2026-09-10', provider: 'AWS', tags: ['Cloud', 'Free'] },
];

const Opportunities = () => {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'scholarship', 'hackathon', 'internship', 'bootcamp'];

  const filteredData = dummyOpportunities.filter(opp => filter === 'all' || opp.type === filter);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Opportunity Matching Engine</h1>
          <p className="text-text-muted">AI-curated scholarships, internships, and hackathons.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
          </div>
          <button className="px-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-text-muted hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 custom-scrollbar gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all duration-300 capitalize ${
              filter === f 
                ? 'bg-gradient-to-r from-secondary to-emerald-600 text-white shadow-lg shadow-secondary/20' 
                : 'glass text-text-muted hover:text-white hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredData.map((opp, index) => (
          <motion.div
            key={opp._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-3xl border border-white/5 hover:border-secondary/50 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  opp.type === 'scholarship' ? 'bg-purple-500/20 text-purple-400' :
                  opp.type === 'hackathon' ? 'bg-orange-500/20 text-orange-400' :
                  opp.type === 'internship' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {opp.type === 'scholarship' && <GraduationCap size={24} />}
                  {opp.type === 'hackathon' && <Calendar size={24} />}
                  {opp.type === 'internship' && <Briefcase size={24} />}
                  {opp.type === 'bootcamp' && <GraduationCap size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">{opp.title}</h3>
                  <p className="text-sm text-text-muted">{opp.provider}</p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-text-muted capitalize">
                {opp.type}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {opp.tags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded bg-surface/80 text-xs text-text-muted">{tag}</span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center text-sm text-text-muted">
                <Calendar size={14} className="mr-2" />
                Deadline: {new Date(opp.deadline).toLocaleDateString()}
              </div>
              <button className="flex items-center space-x-1 text-sm font-semibold text-secondary hover:text-emerald-400 transition-colors">
                <span>Apply Now</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
