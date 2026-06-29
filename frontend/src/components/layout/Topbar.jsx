import { Bell, Search, User as UserIcon, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-20 glass border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <button className="md:hidden mr-4 text-text-muted hover:text-white">
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search courses, mentors..." 
            className="pl-10 pr-4 py-2 bg-surface/50 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary w-64 transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-white/5 rounded-full px-3 py-1 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <span className="text-xs font-medium text-white">Streak: {user?.stats?.streak || 0}</span>
          <span className="text-xs font-medium text-primary ml-2">Lvl: {user?.stats?.level || 1}</span>
        </div>
        
        <button className="relative text-text-muted hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate('/profile')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
            <div className="w-full h-full bg-surface rounded-full flex items-center justify-center border border-surface group-hover:bg-transparent transition-all duration-300">
               {user?.profilePicture ? (
                 <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
               ) : (
                 <UserIcon size={20} className="text-white" />
               )}
            </div>
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-medium text-white">{user?.name || 'Student'}</p>
            <p className="text-xs text-text-muted hover:text-primary transition-colors" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>Log out</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
