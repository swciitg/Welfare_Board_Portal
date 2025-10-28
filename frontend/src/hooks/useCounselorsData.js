import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/welfare-board/api';

export const useCounselorsData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/counselors`);
        
        // Map the data to match frontend expectations
        const mappedCounselors = response.data.counselors.map(counselor => ({
          id: counselor._id,
          name: counselor.name,
          photo: counselor.photo,
          mobile: counselor.mobile,
          email: counselor.email,
          specialization: counselor.specialization,
          experience: counselor.landline || '', // Using landline as experience field
          schedule: counselor.schedule,
          location: counselor.location || 'New SAC Building, Ground Floor',
        }));

        setData(mappedCounselors);
        setError(null);
      } catch (err) {
        console.error('Error fetching counselors:', err);
        setError(err.message || 'Failed to fetch counselors');
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  return { data, loading, error };
};
