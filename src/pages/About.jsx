import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import { fetchPlants } from "../services/api";
import Slider from "react-slick"; // Ensure you have the Slider imported

const Home = () => {
  const [plants, setPlants] = useState([]); // State to hold plant data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to hold any errors
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup open state
  const [selectedPlant, setSelectedPlant] = useState(null); // Selected plant for popup

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

  // Render the list of PlantCards and the popup if open
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Plant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
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
                        {media.includes("youtube.com") || media.includes("youtu.be") ? (
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedPlant.name}</h2>
                <p className="text-lg leading-6 text-gray-600 mb-4">{selectedPlant.description}</p>
                <div className="mb-4 text-gray-700">
                  <p><strong>Region:</strong> {selectedPlant.region}</p>
                  <p><strong>Type:</strong> {selectedPlant.type}</p>
                  <p><strong>Habitat:</strong> {selectedPlant.habitat}</p>
                  <p><strong>Botanical Name:</strong> {selectedPlant.botname}</p>
                  <p><strong>Common Names:</strong> {selectedPlant.comnames}</p>
                  <p><strong>Medicinal Uses:</strong> {selectedPlant.meduses}</p>
                  <p><strong>Methods of Cultivation:</strong> {selectedPlant.methofcul}</p>
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
  );
};

export default Home;
