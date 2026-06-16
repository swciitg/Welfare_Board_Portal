import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/welfare-board/api';

export const useFoodOutletsData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodOutlets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/foodoutlets`);
        
        const mappedOutlets = response.data.map(outlet => ({
          id: outlet._id,
          name: outlet.name,
          category: outlet.category,
          image: outlet.image,
          description: outlet.description,
          specialties: outlet.specialties || [],
          delivery: outlet.delivery,
        }));

        setData(mappedOutlets);
        setError(null);
      } catch (err) {
        console.error('Error fetching food outlets:', err);
        setError(err.message || 'Failed to fetch food outlets');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodOutlets();
  }, []);

  return { data, loading, error };
};
