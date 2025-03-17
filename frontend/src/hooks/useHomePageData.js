import { useEffect, useState } from 'react';
import axios from 'axios';

export const useHomePageData = () => {
  const [data, setData] = useState({
    aboutData: [],
    facilities: [],
    teamMember: [],
  });
  const [error, setError] = useState(null);

  useEffect( () => {
    // Fetch the data from the backend
  const fetchData = async () => {
    await axios.get(`${process.env.API_BASE_URL}/home`)
    .then((response) => {
      setData(response.data); // Set the combined response data

    })
    .catch((err) => {
      setError(err);
    });

    fetchData();
  }
  }, []);

  return { data, error };
};
