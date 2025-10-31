import React from "react";
import HeroSection from "../components/HeroSection";
import CounselorCTA from "../components/CounselorCTA";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <div className="py-8">
        <CounselorCTA />
      </div>
    </div>
  );
}

export default HomePage;
