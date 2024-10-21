import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ARPage from './pages/ARPage';  // Import the AR page
import AboutPage from './pages/About';
import HealthWellness from './components/HealthWellness';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';  // Component for protected routes
import './styles/global.css';
import GardeningTips from './components/GardeningTips'; // Import the Gardening Tips component
import Home from './pages/Home';
import CommunityForum from './components/Community';

const App = () => {
  return (
    <Router>
      <div>
        {/* Define your routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AboutPage />} /> {/* About Page */}
          <Route path="/ar" element={<ARPage />} /> {/* AR Page */}
          <Route path="/home" element={<Home />} /> 
          <Route path="/health-wellness" element={<HealthWellness />} />
          <Route path="/gardening-tips" element={<GardeningTips />} /> 
          <Route path="/community" element={<CommunityForum />} /> 

          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />   {/* Login Page */}
          <Route path="/register" element={<Register />} />   {/* Register Page */}

          {/* Protected route */}
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>  {/* Only accessible if logged in */}
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
