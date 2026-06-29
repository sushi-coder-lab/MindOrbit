import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { name, email, password, confirmPassword } = formData;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      if(user && !user.isOnboarded) {
         navigate('/onboarding');
      } else {
         navigate('/dashboard');
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-background to-surface opacity-80" />
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-8 md:p-10 rounded-3xl w-full max-w-md shadow-2xl border border-white/10 relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">Join Saarthi</h1>
          <p className="text-text-muted">Start your personalized learning journey today.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              id="password"
              name="password"
              value={password}
              placeholder="Create a password"
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={onChange}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-text-muted text-sm">
          Already have an account? <Link to="/login" className="text-primary hover:text-blue-400 font-medium transition-colors">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
