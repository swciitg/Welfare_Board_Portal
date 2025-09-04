import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaRegFilePdf, FaArrowDown } from "react-icons/fa6";

import Header from "../components/Header";
import Footer from "../components/Footer";

import groupImg from "../assets/group.jpeg";
import { useEventPageData } from "../hooks/useEventPageData";

const clubData = {
  name: "Welfare Board",
  topSection: {
    img: groupImg,
  },
};

function EachEventPage() {
  const { data, error } = useEventPageData();
  console.log("AllEventsPage data", data);
  const events = data?.events || []; 
  const imgdata = data?.homepage[0]?.eventimgurl || []; 
  const clubName = data?.homepage[0]?.boardname || [];
  
  return (
    <div>
      <Header />
      <div className="overflow-hidden font-poppins flex flex-col">
        {/* Enhanced Hero Section */}
        <div
          className="relative w-full h-screen bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center gap-8 text-white"
          style={{ backgroundImage: `url(${imgdata})` }}
        >
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 drop-shadow-2xl animate-fade-in">
              {clubName}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed opacity-90">
              Discover our journey through memorable events and achievements
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <FaArrowDown className="text-white/80 text-2xl" />
          </div>
        </div>

        {/* Events Section */}
        <div className="relative">
          {events.map((event, index) => (
            <EnhancedRoundedDiv
              key={index}
              index={index}
              bg={index % 2 === 0 ? "#F8FAFC" : "#7BB9C4"}
              isFirst={index === 0}
            >
              <EventSection data={event} index={index} />
            </EnhancedRoundedDiv>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function EnhancedRoundedDiv({ children, index = 0, bg = "#F8FAFC", isFirst = false }) {
  const marginTop = isFirst ? "-150px" : "-100px";
  
  return (
    <div
      style={{
        borderRadius: "60px 60px 0 0",
        marginTop: marginTop,
        backgroundColor: bg,
      }}
      className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32"
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}

const EventSection = ({ data, index }) => {
  console.log("EventSection data", data);
  const images = data?.galleryImages || [];
  const isEven = index % 2 === 0;

  return (
    <div className={`w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-center`}>
      
      {/* Text Content */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="space-y-6">
          {/* Event Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-semibold text-gray-700">Event {index + 1}</span>
          </div>

          {/* Event Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight font-[Fira Sans Extra Condensed]">
            {data?.eventName}
          </h2>

          {/* Decorative line */}
          <div className="w-20 h-1 bg-[#7BB9C4] rounded-full"></div>
        </div>

        {/* Event Description */}
        <div className="space-y-6">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 font-[Familjen Grotesk]">
            {data?.eventActivityDesc}
          </p>

          {/* PDF Download Button */}
          {data?.eventPdf && (
            <div className="flex items-center gap-4">
              <a
                href={data.eventPdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#7BB9C4] text-white font-semibold rounded-xl hover:bg-[#6BA8B3] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaRegFilePdf size={20} />
                <span>Download PDF</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="w-full lg:w-1/2">
        {images && images.length > 0 && (
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#7BB9C4]/20 to-blue-500/20 rounded-3xl transform rotate-3"></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <Carousel
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={true}
                emulateTouch={true}
                stopOnHover={true}
                transitionTime={800}
                showArrows={true}
                showStatus={false}
                className="event-carousel"
              >
                {images.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative">
                    <img 
                      src={image} 
                      alt={`${data?.eventName} ${imgIndex + 1}`} 
                      className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EachEventPage;
