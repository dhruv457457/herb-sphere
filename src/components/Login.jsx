// src/components/Login.jsx
import React, { useState } from 'react';
import { auth } from '../services/firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-green-600">Login</h2>
        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-green-300 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button type="submit" className="w-full mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
