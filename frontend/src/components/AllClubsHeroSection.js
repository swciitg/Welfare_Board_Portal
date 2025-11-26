import React, { useEffect, useState } from "react";
import axios from "axios";
import ClubCard from "./ClubCard";
import RoundedDiv from "./RoundedDiv";
import clubImg from "../assets/images/clubs/wide.png";
function AllClubsHeroSection() {
  const BACKEND_BASE_URL=process.env.BACKEND_BASE_URL;
  const [clubsData, setClubsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroimg , setheroimg] = useState(null)
  useEffect(() => {
    console.log(process.env.REACT_APP_API_BASE_URL)
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/allclubs`) // Replace with your actual API route
      .then((response) => {
        setClubsData(response.data.club);
        setheroimg(response.data.homepage[0].clubheroimg) // Ensure API response structure matches expected format
        setLoading(false);
        console.log('Clubs data received:', response.data.club);
        console.log('Sample club data:', response.data.club[0]);
      })
      .catch((error) => {
        console.error("Error fetching clubs data:", error);
        setError("Failed to load clubs.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="overflow-x-hidden font-poppins flex flex-col text-gray-200 bg-[#F5F5F5]">
      <div
        className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200 z-1"
        style={{ backgroundImage:`url(${heroimg})`}}
      >
        <p className="text-black text-4xl md:text-7xl font-semibold tracking-tight text-center">
          Clubs
        </p>
        <p className="text-black text-sm sm:text-base md:text-lg tracking-tight text-center">
          Together for Wellbeing, Together for Change.
        </p>
      </div>

      {loading ? (
        <p className="text-center py-10 text-xl">Loading clubs...</p>
      ) : error ? (
        <p className="text-center py-10 text-red-500">{error}</p>
      ) : (
        <RoundedDiv
          Element={() => (
            <div className="relative">
              {/* Clubs Grid Container */}
              <div className="clubs-grid px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
                {clubsData.map((clubData, index) => (
                  <ClubCard 
                    key={clubData._id || index} 
                    index={index} 
                    clubData={clubData} 
                  />
                ))}
              </div>
            </div>
          )}
          top="-100px"
          bg="#F5F5F5"
        />
      )}
    </div>
  );
}

export default AllClubsHeroSection;
