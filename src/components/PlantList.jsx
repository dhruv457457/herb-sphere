// import React, { useEffect, useState } from 'react';
// import PlantCard from './PlantCard'; // Adjust the import path as necessary

// const PlantList = () => {
//   const [plants, setPlants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/herbinfo?limit=2&offset=0', {
//           method: 'GET', // Method can be omitted as GET is the default
//           headers: {
//             'Content-Type': 'application/json', // Optional: Specify the content type
//             'environment-id': '670b8f9459c9b368f802b507', // Add your environment ID here
//             'project-id': '670b8f9459c9b368f802b506'      // Add your project ID here
//           }
//         });

//         // Check if the response is ok (status in the range 200-299)
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setPlants(data.data);  // Use data.data to set plants from the API response
//       } catch (error) {
//         console.error('Error fetching plants:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlants();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//       {plants.map((plant) => (
//         <PlantCard
//           key={plant._id} // Use a unique identifier from the plant object
//           imageSrc={plant.imageSrc || 'default-image-url.jpg'} // Provide a default image if not available
//           name={plant.name}
//           type={plant.type}
//           onBookmarkToggle={() => console.log(`${plant.name} bookmarked`)} // Replace with actual bookmarking logic
//           isBookmarked={false} // Replace with actual bookmark state
//           onLearnMore={() => console.log(`Learn more about ${plant.name}`)} // Replace with actual learn more logic
//         />
//       ))}
//     </div>
//   );
// };

// export default PlantList;
