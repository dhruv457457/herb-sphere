// src/components/HerbList.js
import React, { useEffect, useState } from 'react';
import apiService from '../../services/apiService';

const HerbList = () => {
    const [herbs, setHerbs] = useState([]);

    useEffect(() => {
        const fetchHerbs = async () => {
            try {
                const data = await apiService.getHerbs();
                setHerbs(data);
            } catch (error) {
                console.error('Failed to fetch herbs:', error);
            }
        };

        fetchHerbs();
    }, []);

    return (
        <div>
            <h1>Herb List</h1>
            <ul>
                {herbs.map((herb) => (
                    <li key={herb._id}>
                        <h2>{herb.name}</h2>
                        <p>{herb.description}</p>
                        <img src={herb.image_url} alt={herb.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HerbList;
