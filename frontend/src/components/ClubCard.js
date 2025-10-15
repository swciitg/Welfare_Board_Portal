import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({ index, clubData }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleNavigate = () => {
    const urlSafeName = clubData.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/club/${urlSafeName}`); 
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div
      ref={cardRef}
      className={`club-card w-full max-w-sm mx-auto cursor-pointer group transform transition-all duration-500 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-8 scale-95"
      }`}
      onClick={handleNavigate}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Image container */}
      <div className="club-card-hover relative overflow-hidden rounded-xl shadow-lg group-hover:scale-105 group-hover:shadow-2xl">
        <img
          src={clubData.img}
          alt={`${clubData.name} Club`}
          className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      </div>
      
      {/* Club name positioned at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 group-hover:bg-white/95">
          <p className="font-semibold text-lg md:text-xl text-gray-800 leading-tight text-center">
            {clubData.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClubCard;
