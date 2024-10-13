import axios from 'axios';

export const fetchPlants = async () => {
  try {
    const response = await axios.get('https://free-ap-south-1.cosmocloud.io/development/api/herbinfo', {
      headers: {
        'EnvironmentID': '670b8f9459c9b368f802b507',
        'ProjectID': '670b8f9459c9b368f802b506',
      },
      params: {
        limit: 13,
        offset: 0,
      },
    });
    return response.data; // Adjust this based on the structure of your API response
  } catch (error) {
    console.error('Error fetching plant data:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};
