import React, { useState } from 'react';
import { auth } from '../services/firebase'; // Ensure this is correct
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Realtime Database
      const db = getDatabase();
      await set(ref(db, 'users/' + user.uid), {
        name: name,
        email: email,
      });

      navigate('/dashboard'); // Redirect to dashboard after successful registration
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-green-600">Register</h2>
        <form onSubmit={handleRegister} className="mt-4">
          <input
            type="text"
            placeholder="Name" // New name input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-green-300 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
