// src/services/apiService.js
import axios from 'axios';

const BASE_URL = 'https://free-ap-south-1.cosmocloud.io/development/api/herbs';

const apiService = {
    // Method to get all herbs
    getHerbs: async () => {
        try {
            const response = await axios.get(BASE_URL, {
                headers: {
                    'projectId': '670a3f9b59c9b368f802b29d',
                    'environmentId': '670a3f9b59c9b368f802b29e',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching herbs:', error);
            throw error;
        }
    },

    // Method to create a new herb
    createHerb: async (herbData) => {
        try {
            const response = await axios.post(BASE_URL, herbData, {
                headers: {
                    'projectId': '670a3f9b59c9b368f802b29d',
                    'environmentId': '670a3f9b59c9b368f802b29e',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating herb:', error);
            throw error;
        }
    },

    // Additional methods (update, delete) can be added here
};

export default apiService;
