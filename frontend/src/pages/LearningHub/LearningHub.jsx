import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, PlayCircle, FileText, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const dummyCourses = [
  { _id: '1', title: 'JavaScript Closures Explained', category: 'Programming', tags: ['js', 'basics'], instructor: 'Saarthi AI', totalEnrolled: 1205, thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=400&auto=format&fit=crop' },
  { _id: '2', title: 'Mastering React Hooks', category: 'Web Development', tags: ['react', 'frontend'], instructor: 'Saarthi AI', totalEnrolled: 890, thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop' },
  { _id: '3', title: 'Speak English Confidently', category: 'Communication', tags: ['soft skills', 'english'], instructor: 'Saarthi AI', totalEnrolled: 3400, thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400&auto=format&fit=crop' },
];

const LearningHub = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Programming', 'Web Development', 'Communication', 'AI', 'Soft Skills'];

  // In a real app, we would fetch courses from Redux/API here.
  const courses = dummyCourses.filter(c => activeCategory === 'All' || c.category === activeCategory);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Learning Hub</h1>
          <p className="text-text-muted">Master new skills tailored to your career goals.</p>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full md:w-64 pl-10 pr-4 py-3 bg-surface/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 custom-scrollbar gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
              activeCategory === cat 
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/20' 
                : 'glass text-text-muted hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-white/5 hover:border-primary/50"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {course.category}
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
              <p className="text-sm text-text-muted mb-4">{course.instructor}</p>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center text-xs text-text-muted">
                  <Book size={14} className="mr-1" />
                  <span>{course.totalEnrolled} Enrolled</span>
                </div>
                <Link to={`/learning/${course._id}`} className="text-primary text-sm font-semibold hover:text-blue-400 transition-colors">
                  Start Learning
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-20">
          <Book size={48} className="mx-auto text-text-muted mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white mb-2">No courses found</h3>
          <p className="text-text-muted">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default LearningHub;
