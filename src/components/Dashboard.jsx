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
        navigate('/my-herbs');
        break;
      case 'Explore New Herbs':
        navigate('/');
        break;
      case 'Gardening Tips':
        navigate('/health-wellness');
        break;
      case 'Community Forum':
        navigate('/community-forum');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sec-color to-sub-color">
      <header className="bg-green-700 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="ml-5 text-3xl font-bold tracking-wide">Herbal Garden Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow-md transition duration-200"
        >
          Logout
        </button>
      </header>

      <main className="flex flex-1 p-4 flex-col items-center text-gray-900">
        <h2 className="text-3xl font-semibold mb-6 mt-6 text-main-color">Welcome, {userName}!</h2>
        <p className="mb-8 text-lg">Here are some quick actions you can take:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          <div
            onClick={() => handleCardClick('View My Herbs')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center transform hover:scale-105"
          >
            <FaLeaf className="text-green-700 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">View My Herbs</h3>
            <p className="mt-2 text-center text-gray-600">Check out your saved herbs and their details.</p>
          </div>

          <div
            onClick={() => handleCardClick('Explore New Herbs')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center transform hover:scale-105"
          >
            <FaSearch className="text-green-700 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Explore New Herbs</h3>
            <p className="mt-2 text-center text-gray-600">Discover new herbs and their benefits.</p>
          </div>

          <div
            onClick={() => handleCardClick('Gardening Tips')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center transform hover:scale-105"
          >
            <FaSeedling className="text-green-700 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Gardening Tips</h3>
            <p className="mt-2 text-center text-gray-600">Learn tips and tricks for herb gardening.</p>
          </div>

          <div
            onClick={() => handleCardClick('Community Forum')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center transform hover:scale-105"
          >
            <FaComments className="text-green-700 text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Community Forum</h3>
            <p className="mt-2 text-center text-gray-600">Join discussions with fellow herb enthusiasts.</p>
          </div>
        </div>

        <section className="mt-12 w-full max-w-7xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <p className="text-lg text-gray-700">You have saved 5 herbs to your collection!</p>
          <p className="text-lg text-gray-700">Next goal: Learn about 3 new herbs this week!</p>
        </section>

        <section className="mt-12 w-full max-w-7xl h-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Interactive Statistics</h2>
          <div className="flex justify-center items-center h-full">
            <div className="w-full h-auto rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/growthchart.jpeg"
                alt="Growth Chart"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <ToastContainer />
      </main>
    </div>
  );
};

export default Dashboard;