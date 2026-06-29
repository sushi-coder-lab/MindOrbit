import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

const dummyCourse = {
  _id: '1',
  title: 'JavaScript Closures Explained',
  description: 'Master the concept of closures in JavaScript with practical examples.',
  instructor: 'Saarthi AI',
  lessons: [
    { _id: 'l1', title: 'What is a Closure?', type: 'video', duration: 15 },
    { _id: 'l2', title: 'Scope Chain and Lexical Environment', type: 'article', duration: 10 },
    { _id: 'l3', title: 'Practical Examples', type: 'practice', duration: 20 },
  ]
};

const CourseDetails = () => {
  const { id } = useParams();
  const [activeLesson, setActiveLesson] = useState(dummyCourse.lessons[0]);

  // In a real app, fetch course by ID from backend

  return (
    <div className="space-y-6 pb-10">
      <Link to="/learning" className="flex items-center text-text-muted hover:text-white transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Learning Hub
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl overflow-hidden border border-white/10">
            {activeLesson.type === 'video' ? (
              <div className="w-full aspect-video bg-black flex items-center justify-center">
                <PlayCircle size={64} className="text-white/50" />
              </div>
            ) : (
              <div className="w-full aspect-video bg-surface flex items-center justify-center p-10 text-center">
                <FileText size={64} className="text-white/20 mb-4" />
                <h3 className="text-xl font-bold text-white">{activeLesson.title}</h3>
                <p className="text-text-muted mt-2">Read the article to complete this lesson.</p>
              </div>
            )}
            
            <div className="p-6 md:p-8">
              <div className="flex items-center space-x-2 text-primary font-semibold mb-2">
                {activeLesson.type === 'video' ? <PlayCircle size={18} /> : <FileText size={18} />}
                <span className="capitalize">{activeLesson.type}</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">{activeLesson.title}</h1>
              <p className="text-text-muted">{dummyCourse.description}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Curriculum */}
        <div className="glass rounded-3xl p-6 border border-white/10 h-fit">
          <h2 className="text-lg font-bold text-white mb-6">Course Curriculum</h2>
          
          <div className="space-y-3">
            {dummyCourse.lessons.map((lesson, index) => (
              <div 
                key={lesson._id}
                onClick={() => setActiveLesson(lesson)}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeLesson._id === lesson._id 
                    ? 'bg-gradient-to-r from-primary/20 to-transparent border-l-4 border-primary' 
                    : 'bg-surface/50 hover:bg-surface border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeLesson._id === lesson._id ? 'bg-primary text-white' : 'bg-white/10 text-text-muted'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium ${activeLesson._id === lesson._id ? 'text-white' : 'text-text-muted'}`}>
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-text-muted mt-1">{lesson.duration} mins</p>
                  </div>
                </div>
                {/* Simulated completion checkmark */}
                {index === 0 && <CheckCircle size={16} className="text-secondary" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
