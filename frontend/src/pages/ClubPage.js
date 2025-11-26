import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EachClubPage() {
  const { name } = useParams();
  const [heroImg, setHeroImg] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/allclubs`)
      .then((res) => {
        const hero = res?.data?.homepage?.[0]?.clubheroimg;
        if (mounted && hero) setHeroImg(hero);
      })
      .catch(() => {
        // silent fallback — heroImg remains null
      });

    return () => {
      mounted = false;
    };
  }, []);

  const title = name ? name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Club";

  return (
    <div className="overflow-hidden font-poppins flex flex-col">
      <div
        className="w-full h-[865px] bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center gap-5 text-gray-200 relative"
        style={{ backgroundImage: `url(${heroImg || ""})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center">
          <p className="text-4xl md:text-7xl font-bold tracking-tight text-center drop-shadow-2xl">
            {title}
          </p>
          <div className="w-32 h-1 bg-[#7BB9C4] mx-auto mt-6 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default EachClubPage;