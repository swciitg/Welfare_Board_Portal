import { useEffect, useState } from 'react';
import axios from 'axios';

export const useHomePageData = () => {
  // console.log("homepage data hook");
  const [data, setData] = useState({
    aboutData: [],
    facilities: [],
    teamMember: [],
    homepage: [],
  });
  const [error, setError] = useState(null);

  useEffect( () => {
    // Fetch the data from the backend
    const fetchData = async () => {
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}/home`)
      .then((response) => {
        setData(response.data); // Set the combined response data
      })
      .catch((err) => {
        setError(err);
      });
    };

    // Call the fetchData function to initiate the API request
    fetchData();
  }, []);

  return { data, error };
};