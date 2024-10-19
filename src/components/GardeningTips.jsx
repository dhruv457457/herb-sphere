import React, { useState } from 'react';

const gardeningTips = [
  {
    id: 1,
    title: 'Watering Tips',
    description: 'Water early in the morning or late in the evening to reduce evaporation.',
    details: 'Avoid watering the leaves to prevent fungal growth and always use deep watering to encourage strong roots.',
    image: '/images/watering.jpg',
  },
  {
    id: 2,
    title: 'Soil Preparation',
    description: 'Healthy soil is the foundation of a thriving garden.',
    details: 'Add organic compost to enrich the soil and maintain a balanced pH level. Consider mulching to retain moisture.',
    image: '/images/soil.jpg',
  },
  // ...additional tips
];

const recommendedTools = [
  {
    name: 'Pruning Shears',
    description: 'Ideal for trimming plants and small branches.',
    image: '/images/tool1.jpg',
  },
  {
    name: 'Watering Can',
    description: 'Perfect for controlled watering in delicate areas.',
    image: '/images/tool2.jpg',
  },
  // ...additional tools
];

const GardeningTips = () => {
  const [activeTip, setActiveTip] = useState(null);

  const toggleTipDetails = (index) => {
    setActiveTip(activeTip === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center mb-12 p-8 bg-green-100 rounded-lg">
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-bold text-green-700">Gardening Tips</h1>
          <p className="mt-3 text-lg text-gray-700">Master your gardening skills with essential tips and tricks to make your garden thrive.</p>
        </div>
        <div className="md:w-1/2 p-4">
          <img src="/images/gardening-header.jpg" alt="Gardening" className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Main Gardening Tips Content */}
        <div className="md:w-2/3 pr-6">
          {/* Gardening Tips Section */}
          <section className="mb-12">
            {gardeningTips.map((tip, index) => (
              <div key={tip.id} className="mb-8 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex">
                  <div className="w-1/3">
                    <img src={tip.image} alt={tip.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="w-2/3 pl-4">
                    <h2 className="text-2xl font-semibold text-green-700">{tip.title}</h2>
                    <p className="mt-2 text-gray-600">{tip.description}</p>
                    <button
                      className="mt-4 text-green-600 font-bold"
                      onClick={() => toggleTipDetails(index)}
                    >
                      {activeTip === index ? 'Hide Details' : 'Show Details'}
                    </button>
                    {activeTip === index && (
                      <p className="mt-2 text-gray-700">{tip.details}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
          
          {/* Recommended Tools Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-green-700 mb-6">Recommended Tools & Resources</h2>
            <div className="grid grid-cols-2 gap-8">
              {recommendedTools.map((tool, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                  <img src={tool.image} alt={tool.name} className="w-24 h-24 object-cover mr-4 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-600">{tool.name}</h3>
                    <p className="text-gray-700">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar for YouTube Video */}
        <div className="md:w-1/3">
          <div className="mb-12 bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-green-700 mb-4">Gardening Videos</h2>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardeningTips;
