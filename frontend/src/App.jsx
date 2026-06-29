import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Onboarding from './pages/Onboarding/Onboarding';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import LearningHub from './pages/LearningHub/LearningHub';
import CourseDetails from './pages/LearningHub/CourseDetails';
import CareerRoadmaps from './pages/Career/CareerRoadmaps';
import Opportunities from './pages/Opportunities/Opportunities';
import Mentors from './pages/Mentors/Mentors';
import Community from './pages/Community/Community';
import Progress from './pages/Progress/Progress';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="learning" element={<LearningHub />} />
          <Route path="learning/:id" element={<CourseDetails />} />
          <Route path="career" element={<CareerRoadmaps />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="mentors" element={<Mentors />} />
          <Route path="community" element={<Community />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
          {/* Add other protected routes here */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
