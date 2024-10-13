import React, { useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaLeaf, FaSearch, FaSeedling, FaComments } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User'); // Default user name

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName || 'User');
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('You have successfully logged out!', {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate('/login');
  };

  const handleCardClick = (action) => {
    switch (action) {
      case 'View My Herbs':
        navigate('/my-herbs'); // Add your route here
        break;
      case 'Explore New Herbs':
        navigate('/'); // Add your route here
        break;
      case 'Gardening Tips':
        navigate('/health-wellness'); // Add your route here
        break;
      case 'Community Forum':
        navigate('/community-forum'); // Add your route here
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Herbal Garden Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mt-2"
        >
          Logout
        </button>
      </header>

      <main className="flex flex-1 p-4 flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Hello, {userName}!</h2>
        <p className="mb-6">Here are some quick actions you can take:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Card for View My Herbs */}
          <div
            onClick={() => handleCardClick('View My Herbs')}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            <FaLeaf className="text-green-600 text-4xl mb-2" />
            <h3 className="text-lg font-semibold">View My Herbs</h3>
            <p className="mt-2">Check out your saved herbs and their details.</p>
          </div>

          {/* Card for Explore New Herbs */}
          <div
            onClick={() => handleCardClick('Explore New Herbs')}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            <FaSearch className="text-green-600 text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Explore New Herbs</h3>
            <p className="mt-2">Discover new herbs and their benefits.</p>
          </div>

          {/* Card for Gardening Tips */}
          <div
            onClick={() => handleCardClick('Gardening Tips')}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            <FaSeedling className="text-green-600 text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Gardening Tips</h3>
            <p className="mt-2">Learn tips and tricks for herb gardening.</p>
          </div>

          {/* Card for Community Forum */}
          <div
            onClick={() => handleCardClick('Community Forum')}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          >
            <FaComments className="text-green-600 text-4xl mb-2" />
            <h3 className="text-lg font-semibold">Community Forum</h3>
            <p className="mt-2">Join discussions with fellow herb enthusiasts.</p>
          </div>
        </div>

        <section className="mt-8 w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Your Progress</h2>
          <p>You have saved 5 herbs to your collection!</p>
          <p>Next goal: Learn about 3 new herbs this week!</p>
        </section>

        <section className="mt-8 w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Interactive Statistics</h2>
          <div className="flex justify-center">
            {/* Placeholder for an actual chart component */}
            <div className="w-2/3 h-48 bg-green-300 rounded shadow flex items-center justify-center">
              <span className="text-center font-bold text-lg">Your Growth Chart (Placeholder)</span>
            </div>
          </div>
        </section>

        <ToastContainer />
      </main>
    </div>
  );
};

export default Dashboard;
