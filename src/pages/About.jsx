import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import { fetchPlants } from "../services/api";
import { Link } from "react-router-dom";
import FirstPage from "../components/FirstPage";
import AyushCards from "../components/AyushCards";
import Footer from "../components/Footer";
import QuizPopup from "../components/QuizPopup";

// import Slider from "react-slick";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRegion, setFilterRegion] = useState("All Regions");
  const [filterType, setFilterType] = useState("All Types");
  const [plants, setPlants] = useState([]); // State to hold plant data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to hold any errors
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup open state
  const [selectedPlant, setSelectedPlant] = useState(null); // Selected plant for popup
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for filter panel
  const [isQuizOpen, setIsQuizOpen] = useState(false); // State for quiz popup

  // Fetch plants data on component mount
  useEffect(() => {
    const getPlants = async () => {
      try {
        const response = await fetchPlants(); // Fetch data from the API
        console.log(response); // Log the response data to the console
        setPlants(response.data); // Correctly set plant data to state
      } catch (err) {
        console.error("Error fetching plants:", err); // Log the error for debugging
        setError("Failed to fetch plants"); // Set error if the fetch fails
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    getPlants(); // Call the async function
  }, []);

  // Function to open popup
  const openPopup = (plant) => {
    // Extract multimedia fields and store them in an array
    const multimedia = [
      plant.multimedia1,
      plant.multimedia2,
      plant.multimedia3,
      plant.multimedia4,
    ].filter(Boolean); // Filter out any undefined or null values

    // Set the selected plant with multimedia array
    setSelectedPlant({ ...plant, multimedia });
    setIsPopupOpen(true);
  };

  // Function to close popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPlant(null);
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  // Function to handle filter changes
  const handleRegionChange = (e) => setFilterRegion(e.target.value);
  const handleTypeChange = (e) => setFilterType(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Function to toggle filter panel
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Function to toggle quiz popup
  const toggleQuiz = () => {
    setIsQuizOpen(!isQuizOpen);
  };

  // Filtered plants based on selected filters
  const filteredPlants = plants.filter(
    (plant) =>
      (filterRegion === "All Regions" || plant.region === filterRegion) &&
      (filterType === "All Types" || plant.type === filterType) &&
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to scroll to the PlantCards section
  const scrollToPlantCards = () => {
    if (plantCardsRef.current) {
      plantCardsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Render the list of PlantCards and the popup if open
  return (
    <div className="font-poppins scrollbar-thin">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-30">
        <div className="container mx-auto flex items-center py-4 px-8">
          {/* Logo */}
          <div className="flex-shrink-0 text-black text-2xl font-semibold">
            <img
              src="/images/AYURB.png"
              alt="AYURB Logo"
              className="h-10 ml-5"
            />
          </div>

          {/* Middle: Links */}
          <div className="flex-grow flex justify-center space-x-8">
            <Link
              to="/"
              className="pb-1 text-navbar-text border-b-2 border-transparent hover:border-sub-color hover:text-sub-color transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="pb-1 text-navbar-text border-b-2 border-transparent hover:border-sub-color hover:text-sub-color transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/health-wellness"
              className="pb-1 text-navbar-text border-b-2 border-transparent hover:border-sub-color hover:text-sub-color transition-colors duration-200"
            >
              Health
            </Link>
          </div>

          {/* Right Side: Search Bar, Filter, Quiz, AR */}
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="flex items-center w-80">
              <span className="material-icons text-main-color ml-2 mr-3">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-grow p-2 border rounded-xl border-main-color bg-sec-color placeholder:text-gray-400"
                placeholder="Search for plants..."
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={toggleFilter}
              className="flex items-center px-4 py-2 border border-main-color text-main-color rounded-xl bg-sec-color hover:bg-main-color hover:text-white transition-colors duration-200"
            >
              <i className="fa-solid fa-filter mr-2"></i>Filter
            </button>

            {/* Quiz Button */}
            <button
              onClick={toggleQuiz} // Toggle quiz popup on button click
              className="px-4 py-2 border border-main-color text-main-color rounded-xl bg-sec-color hover:bg-main-color hover:text-white transition-colors duration-200"
            >
              <i className="fa-solid fa-question-circle mr-2"></i>Quiz
            </button>
          </div>
        </div>
      </nav>
      
      {/* Render the Quiz Popup */}
      {isQuizOpen && <QuizPopup isOpen={isQuizOpen} onClose={toggleQuiz} />}

      {/* Filter Slider (Fixed with Transparency and Blur Effect) */}
      <div
        className={`fixed top-16 z-20 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-wrap px-8 py-4">
          {/* Filter by Region */}
          <div className="flex-1 mb-2 mr-5 mt-3">
            <label className="block text-gray-700">Filter by Region:</label>
            <select
              value={filterRegion}
              onChange={handleRegionChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option>All Regions</option>
              <option>Tropical</option>
              <option>Arid</option>
              <option>Mediterranean</option>
              <option>Temperate</option>
              <option>North America</option>
            </select>
          </div>

          {/* Filter by Type */}
          <div className="flex-1 mb-2 mr-5 mt-3">
            <label className="block text-gray-700">Filter by Type:</label>
            <select
              value={filterType}
              onChange={handleTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option>All Types</option>
              <option>Herb</option>
              <option>Succulent</option>
              <option>Shrub</option>
              <option>Flowering Plant</option>
            </select>
          </div>

          {/* Filter by Medicinal Uses */}
          <div className="flex-1 mb-2 mt-3">
            <label className="block text-gray-700">
              Filter by Medicinal Uses:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search by Ayush, Naturopathy, etc."
            />
          </div>
        </div>
      </div>

      <FirstPage onGetStartedClick={scrollToPlantCards} />

      <div className="min-h-screen px-8 py-10 shadow-lg">
        {/* Plant Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-4">
          {plants.map((plant) => (
            <PlantCard
              key={plant._id} // Use a unique key from the plant object
              imageSrc={plant.imageSrc || "default-image-url"} // Ensure imageSrc is handled correctly
              name={plant.name || "Unknown Plant"}
              type={plant.type || "Unknown Type"}
              onLearnMore={() => openPopup(plant)} // Trigger popup with selected plant data
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            />
          ))}
        </div>

        {/* Popup for plant details */}
        {isPopupOpen && selectedPlant && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="bg-white rounded-lg p-8 w-11/12 md:w-4/5 max-w-5xl overflow-y-auto relative shadow-lg transform transition-all duration-300">
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-red-600 transition"
              >
                &times;
              </button>

              {/* Popup Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side: 3D Model and Multimedia */}
                <div className="flex flex-col">
                  {/* 3D Model */}
                  <iframe
                    title={selectedPlant.name}
                    src={selectedPlant.sketchfabModelUrl}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-72 rounded-lg mb-4 shadow-sm"
                  ></iframe>

                  {/* Multimedia Carousel */}
                  <div className="overflow-x-auto whitespace-nowrap">
                    {selectedPlant.multimedia.length > 0 ? (
                      selectedPlant.multimedia.map((media, index) => (
                        <div key={index} className="inline-block mr-4">
                          {media.includes("youtube.com") ||
                          media.includes("youtu.be") ? (
                            <iframe
                              className="h-64 w-64 rounded-lg shadow-md"
                              src={media}
                              frameBorder="0"
                              allowFullScreen
                              title={`Video ${index + 1}`}
                            ></iframe>
                          ) : media.endsWith(".mp4") ? (
                            <video
                              controls
                              className="h-64 w-64 rounded-lg shadow-md"
                              src={media}
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={media}
                              alt={`Multimedia ${index + 1}`}
                              className="h-64 w-64 object-cover rounded-lg shadow-md"
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No multimedia content available</p>
                    )}
                  </div>
                </div>

                {/* Right side: Plant Info and Details */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {selectedPlant.name}
                  </h2>
                  <p className="text-lg leading-6 text-gray-600 mb-4">
                    {selectedPlant.description}
                  </p>
                  <div className="mb-4 text-gray-700">
                    <p>
                      <strong>Region:</strong> {selectedPlant.region}
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedPlant.type}
                    </p>
                    <p>
                      <strong>Habitat:</strong> {selectedPlant.habitat}
                    </p>
                    <p>
                      <strong>Botanical Name:</strong> {selectedPlant.botname}
                    </p>
                    <p>
                      <strong>Common Names:</strong> {selectedPlant.comnames}
                    </p>
                    <p>
                      <strong>Medicinal Uses:</strong> {selectedPlant.meduses}
                    </p>
                    <p>
                      <strong>Methods of Cultivation:</strong>{" "}
                      {selectedPlant.methofcul}
                    </p>
                  </div>

                  {/* Audio Player */}
                  <audio
                    src={selectedPlant.audioSrc}
                    controls
                    className="w-full mt-2 bg-gray-100 rounded-full"
                  >
                    Your browser does not support the audio element.
                  </audio>

                  {/* Notes Section */}
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Notes:</h3>
                    <textarea
                      id="notes-textarea"
                      rows="5"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                      placeholder="Write your notes here..."
                    ></textarea>
                  </div>

                  {/* Buttons for actions */}
                  <div className="flex items-center mt-4">
                    <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors duration-200 mr-2">
                      <i className="fa-solid fa-download mr-2"></i>
                      Download
                    </button>
                    <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors duration-200 mr-2">
                      <i className="fa-solid fa-share mr-2"></i>
                      Share
                    </button>
                    <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors duration-200">
                      <i className="fa-regular fa-comment mr-2"></i>
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AyushCards />

      <Footer />
    </div>
  );
};

export default Home;
