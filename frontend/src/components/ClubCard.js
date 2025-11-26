import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ClubCard({ index, clubData }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleNavigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure we have valid club data
    if (!clubData || !clubData.name) {
      console.error('Invalid club data:', clubData);
      return;
    }
    
    // Use safeName from API response, fallback to creating URL-safe name if not available
    const urlSafeName = clubData.safeName || clubData.name.replace(/\s+/g, "-").toLowerCase();
    console.log('Navigating to club:', urlSafeName, 'from club data:', clubData);
    
    try {
      navigate(`/club/${urlSafeName}`); 
    } catch (error) {
      console.error('Navigation error:', error);
    }
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
      className={`w-full max-w-sm mx-auto cursor-pointer group transform transition-all duration-500 ease-out relative focus:outline-none focus-visible:ring-4 focus-visible:ring-[#7BB9C4]/25 ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-8 scale-95"
      }`}
      // onClick={handleNavigate}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleNavigate(e);
        }
      }}
    >
      {/* Card visual */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-50 border border-transparent hover:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Image */}
        <div className="relative w-full h-64 md:h-72 overflow-hidden">
          <img
            src={clubData?.img}
            alt={clubData?.name ? `${clubData.name} Club` : 'Club image'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Soft gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>
        </div>

        {/* Bottom info panel overlapping the image */}
        <div className="absolute left-4 right-4 bottom-4">
          <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex-1 text-left">
              <p className="text-white text-lg md:text-xl font-semibold leading-tight">{clubData?.name}</p>
              {clubData?.description && (
                <p className="text-white/90 text-sm mt-1 line-clamp-2 max-w-md">
                  {clubData.description.length > 120 ? `${clubData.description.slice(0, 120)}...` : clubData.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubCard;
