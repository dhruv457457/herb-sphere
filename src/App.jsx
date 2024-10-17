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

const App = () => {
  return (
    <Router>
      <div>
        {/* Define your routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/ar" element={<ARPage />} /> {/* AR Page */}
          <Route path="/" element={<AboutPage />} /> {/* About Page */}
          <Route path="/health-wellness" element={<HealthWellness />} />

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
