import { useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 3 },
  { name: 'Wed', hours: 1 },
  { name: 'Thu', hours: 4 },
  { name: 'Fri', hours: 2 },
  { name: 'Sat', hours: 5 },
  { name: 'Sun', hours: 3 },
];

const Progress = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Progress Analytics</h1>
          <p className="text-text-muted">Track your learning journey and achievements.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-3xl border border-white/5 text-center">
          <Trophy size={28} className="mx-auto text-primary mb-2" />
          <p className="text-2xl font-bold text-white">{user?.stats?.level || 1}</p>
          <p className="text-sm text-text-muted">Current Level</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-3xl border border-white/5 text-center">
          <Zap size={28} className="mx-auto text-secondary mb-2" />
          <p className="text-2xl font-bold text-white">{user?.stats?.streak || 0}</p>
          <p className="text-sm text-text-muted">Day Streak</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-3xl border border-white/5 text-center">
          <Target size={28} className="mx-auto text-orange-500 mb-2" />
          <p className="text-2xl font-bold text-white">{user?.stats?.xp || 0}</p>
          <p className="text-sm text-text-muted">Total XP</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-6 rounded-3xl border border-white/5 text-center">
          <Clock size={28} className="mx-auto text-purple-500 mb-2" />
          <p className="text-2xl font-bold text-white">20h</p>
          <p className="text-sm text-text-muted">Time Learned</p>
        </motion.div>
      </div>

      <div className="glass p-6 md:p-8 rounded-3xl border border-white/5">
        <h3 className="text-xl font-bold text-white mb-6">Learning Hours This Week</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Progress;
