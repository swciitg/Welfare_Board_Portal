import React from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({ index, clubData }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    const urlSafeName = clubData.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/club/${urlSafeName}`); 
  };

  return (
    <div
      className={`relative my-[2vw] md:-my-[3vw] w-fit cursor-pointer group ${
        index % 2 === 0
          ? "right-[15vw] md:right-[25vw]"
          : "left-[15vw] md:left-[25vw]"
      }`}
      onClick={handleNavigate}
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
        <img
          src={clubData.img}
          alt="Club Image"
          className="h-[40vw] md:h-[20vw] w-full object-cover"
        />
        
        {/* Subtle gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Club name positioned at bottom with minimal overlay */}
      <div className="absolute bottom-2 left-2 right-2">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-semibold text-[2vw] md:text-[1.2vw] text-white leading-tight">
            {clubData.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClubCard;
