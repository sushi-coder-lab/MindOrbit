import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Map, Award, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Learning Hub', icon: BookOpen, path: '/learning' },
    { name: 'Career Navigator', icon: Map, path: '/career' },
    { name: 'Opportunities', icon: Award, path: '/opportunities' },
    { name: 'Mentors', icon: Users, path: '/mentors' },
    { name: 'Community', icon: Users, path: '/community' },
    { name: 'Progress', icon: Award, path: '/progress' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 glass border-r border-white/10 hidden md:flex flex-col z-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Saarthi</h1>
        <p className="text-xs text-text-muted mt-1">AI Mentor & Guide</p>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-4 border-primary' 
                  : 'text-text-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary' : 'text-text-muted'} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10">
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 rounded-xl border border-white/5">
          <h4 className="text-sm font-semibold text-white">Need Help?</h4>
          <p className="text-xs text-text-muted mt-1 mb-3">Talk to your AI Mentor</p>
          <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors">
            Ask Saarthi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
