import React, { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  FaLeaf,
  FaSearch,
  FaSeedling,
  FaComments,
  FaBell,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("User");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const email = currentUser.email.split('@')[0]; // Extract the part before '@'
      setUserEmail(email);
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("You have successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate("/login");
  };

  const handleCardClick = (action) => {
    switch (action) {
      case "View My Herbs":
        navigate("/my-herbs");
        break;
      case "Explore New Herbs":
        navigate("/");
        break;
      case "Gardening Tips":
        navigate("/gardening-tips");
        break;
      case "Community Forum":
        navigate("/community");
        break;
      default:
        break;
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleExpandedPost = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
    toast.info(
      `You ${expandedPost === postId ? "collapsed" : "expanded"} a post.`
    );
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-700 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-b from-green-50 to-green-100"
      }`}
    >
      <div
        className={`fixed inset-y-0 left-0 ${sidebarCollapsed ? "w-20" : "w-64"
          } bg-gradient-to-t from-green-900 to-green-900 text-white transition-all duration-500 p-4 shadow-lg flex flex-col justify-between backdrop-blur-md bg-opacity-30`}
      >
        <div>
          <div className="flex items-center justify-between">
            <h2
              className={`text-3xl font-bold ${
                sidebarCollapsed ? "hidden" : "block"
              } transition-all duration-500`}
            >
              Ayurherb
            </h2>
          </div>
          <nav className="mt-8 flex flex-col space-y-4">
            {[
              { label: "Home", icon: <FaHome />, action: "Home" },
              { label: "My Herbs", icon: <FaLeaf />, action: "View My Herbs" },
              {
                label: "Explore Herbs",
                icon: <FaSearch />,
                action: "Explore New Herbs",
              },
              {
                label: "Gardening Tips",
                icon: <FaSeedling />,
                action: "Gardening Tips",
              },
              {
                label: "Community Forum",
                icon: <FaComments />,
                action: "Community Forum",
              },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleCardClick(item.action)}
                className="flex items-center space-x-3 hover:bg-sub-color hover:bg-opacity-60 p-2 rounded-lg transition-all duration-300"
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`text-lg ${sidebarCollapsed ? "hidden" : "block"}`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 w-full py-2 rounded shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      <main className="flex-1 p-6 ml-20 sm:ml-64 bg-sec-color">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-main-color">
            Welcome, {userEmail}!
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "View My Herbs",
              icon: <FaLeaf />,
              desc: "Check out your saved herbs and their details.",
            },
            {
              title: "Explore New Herbs",
              icon: <FaSearch />,
              desc: "Discover new herbs and their benefits.",
            },
            {
              title: "Gardening Tips",
              icon: <FaSeedling />,
              desc: "Learn tips and tricks for herb gardening.",
            },
            {
              title: "Community Forum",
              icon: <FaComments />,
              desc: "Join discussions with fellow herb enthusiasts.",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(card.title)}
              className="bg-green-200 bg-opacity-80 backdrop-blur-lg p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105 hover:bg-opacity-100"
            >
              <div className="text-5xl mb-4 text-green-900">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-main-color">
                {card.title}
              </h3>
              <p className="text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>

        <section className="mt-12 bg-green-200 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-main-color">
            Community Forum
          </h2>
          <div className="flex flex-col space-y-4">
            {[
              {
                id: 1,
                title: "How to grow basil indoors?",
                user: "JohnDoe",
                replies: 5,
                details: "Basil is an herb that loves warmth and sunlight...",
              },
              {
                id: 2,
                title: "Best soil for herb gardens?",
                user: "GreenThumb",
                replies: 3,
                details: "For herb gardening, well-drained soil is crucial...",
              },
            ].map((post) => (
              <div
                key={post.id}
                className="p-4 bg-white rounded-lg shadow-inner cursor-pointer"
                onClick={() => toggleExpandedPost(post.id)}
              >
                <h3 className="text-lg font-semibold text-gray-600">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Started by {post.user} - {post.replies} replies
                </p>
                {expandedPost === post.id && (
                  <p className="text-gray-600 dark:text-gray-800 mt-2">
                    {post.details}
                  </p>
                )}
              </div>
            ))}
            <button
              className="self-end text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600"
              onClick={() => navigate("/community")}
            >
              View All Discussions
            </button>
          </div>
        </section>

        <ToastContainer />
      </main>
    </div>
  );
};

export default Dashboard;
