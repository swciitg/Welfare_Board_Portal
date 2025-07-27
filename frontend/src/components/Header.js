import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useHomePageData } from "../hooks/useHomePageData";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = useHomePageData();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Clubs", path: "/clubs" },
    { name: "Events", path: "/events" },
    { name: "Resources", path: "/resources" },
    { name: "Contacts", path: "/contacts" },
    { name: "Counsellors", path: "/counsellors" },
    { name: "Food Court", path: "/foodcourt" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 font-poppins transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={data?.homepage[0]?.logoimgurl}
                  alt="Students' Welfare Board"
                  className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-lg shadow-md transition-shadow duration-200 group-hover:shadow-lg"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#7BB9C4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm md:text-base font-bold text-gray-800 leading-tight">
                  STUDENTS' WELFARE BOARD
                </div>
                <div className="text-xs md:text-sm text-[#7BB9C4] font-medium">
                  IIT Guwahati
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 group ${
                    location.pathname === item.path
                      ? "text-[#7BB9C4]"
                      : "text-gray-700 hover:text-[#7BB9C4]"
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#7BB9C4] transform transition-transform duration-200 ${
                    location.pathname === item.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7BB9C4]/50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6">
                <IoMenu 
                  className={`absolute inset-0 w-6 h-6 text-gray-700 transition-all duration-200 ${
                    isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <RxCross2 
                  className={`absolute inset-0 w-6 h-6 text-gray-700 transition-all duration-200 ${
                    isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Mobile Menu Panel */}
        <div 
          className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            {/* Mobile Logo */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
              <img
                src={data?.homepage[0]?.logoimgurl}
                alt="Students' Welfare Board"
                className="w-12 h-12 object-contain rounded-lg shadow-md"
              />
              <div>
                <div className="text-sm font-bold text-gray-800 leading-tight">
                  STUDENTS' WELFARE BOARD
                </div>
                <div className="text-xs text-[#7BB9C4] font-medium">
                  IIT Guwahati
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-[#7BB9C4]/10 text-[#7BB9C4] border-l-4 border-[#7BB9C4]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#7BB9C4]"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}

export default Header;
