// src/components/MyHerbs.js
import React from "react";

const MyHerbs = ({ bookmarkedPlants, onRemoveBookmark }) => {
  return (
    <div className="my-herbs">
    
      <h2 className="text-2xl font-bold mb-4">My Bookmarked Herbs</h2>
      {bookmarkedPlants.length === 0 ? (
        <p>No herbs bookmarked yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bookmarkedPlants.map((plant) => (
            <div key={plant._id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={plant.imageSrc}
                alt={plant.name}
                className="mb-2 rounded"
              />
              <h3 className="font-semibold">{plant.name}</h3>
              <button
                onClick={() => onRemoveBookmark(plant._id)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHerbs;
