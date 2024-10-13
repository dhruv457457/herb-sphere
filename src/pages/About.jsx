import React, { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import { fetchPlants } from "../services/api"; // Import the fetchPlants function

const Home = () => {
  const [plants, setPlants] = useState([]); // State to hold plant data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to hold any errors

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

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }
  
  console.log("Rendered plants:", plants); // Check the state before rendering

  // Render the list of PlantCards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
  {plants.map((plant) => (
    <PlantCard
      key={plant._id} // Use a unique key from the plant object
      imageSrc={plant.imageSrc || "default-image-url"} // Ensure imageSrc is handled correctly
      name={plant.name || "Unknown Plant"}
      type={plant.type || "Unknown Type"}
      onBookmarkToggle={() => {
        /* Bookmark toggle logic here */
      }}
      isBookmarked={false} // Adjust based on your bookmarking logic
      onLearnMore={() => {
        /* Logic to learn more about the plant */
      }}
      // Add custom Tailwind CSS classes for the PlantCard component
      className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
    />
  ))}
</div>

  );
};

export default Home;
