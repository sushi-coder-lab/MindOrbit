import { motion } from 'framer-motion';
import { Briefcase, Code, Database, Layout, Shield, Cpu, TrendingUp } from 'lucide-react';

const roadmaps = [
  { id: 1, title: 'Software Engineer', icon: Code, color: 'from-blue-500 to-blue-700', description: 'Build systems and applications.' },
  { id: 2, title: 'Frontend Developer', icon: Layout, color: 'from-pink-500 to-rose-600', description: 'Create beautiful user interfaces.' },
  { id: 3, title: 'Backend Developer', icon: Database, color: 'from-green-500 to-emerald-700', description: 'Architect robust APIs and databases.' },
  { id: 4, title: 'AI Engineer', icon: Cpu, color: 'from-purple-500 to-indigo-700', description: 'Develop intelligent AI models.' },
  { id: 5, title: 'Cyber Security', icon: Shield, color: 'from-red-500 to-red-700', description: 'Protect systems from threats.' },
  { id: 6, title: 'Data Scientist', icon: TrendingUp, color: 'from-orange-500 to-amber-600', description: 'Analyze data and build models.' },
];

const CareerRoadmaps = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-white mb-2">Career Roadmaps</h1>
        <p className="text-text-muted">Explore AI-generated paths to your dream career.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {roadmaps.map((roadmap, index) => {
          const Icon = roadmap.icon;
          return (
            <motion.div
              key={roadmap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${roadmap.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{roadmap.title}</h3>
              <p className="text-sm text-text-muted mb-6">{roadmap.description}</p>
              
              <div className="flex items-center text-sm font-semibold text-primary group-hover:text-blue-400 transition-colors">
                View Roadmap
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-center"
      >
        <Briefcase size={40} className="mx-auto text-primary mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Don't see your path?</h2>
        <p className="text-text-muted max-w-xl mx-auto mb-6">Let Saarthi AI generate a custom roadmap based on your unique interests and goals.</p>
        <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-bold shadow-lg hover:shadow-primary/30 transition-all duration-300">
          Generate Custom Roadmap
        </button>
      </motion.div>
    </div>
  );
};

export default CareerRoadmaps;
