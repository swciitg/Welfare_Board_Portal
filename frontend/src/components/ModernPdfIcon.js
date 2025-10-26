import React from "react";
import { FaFilePdf } from "react-icons/fa6";

/**
 * ModernPdfIcon - A modern, stylish PDF icon component
 * Features:
 * - Gradient background with PDF brand colors
 * - Smooth hover animations
 * - Responsive sizing
 * - Shadow effects for depth
 */
const ModernPdfIcon = ({ size = "large", className = "" }) => {
  // Size configurations
  const sizeClasses = {
    small: "w-16 h-20 sm:w-20 sm:h-24",
    medium: "w-24 h-32 sm:w-32 sm:h-40",
    large: "w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56",
    xlarge: "w-40 h-48 sm:w-48 sm:h-56 md:w-56 md:h-64",
  };

  const iconSizes = {
    small: "text-4xl sm:text-5xl",
    medium: "text-5xl sm:text-6xl md:text-7xl",
    large: "text-6xl sm:text-7xl md:text-8xl",
    xlarge: "text-7xl sm:text-8xl md:text-9xl",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${className}
        relative
        rounded-2xl
        bg-gradient-to-br from-red-50 via-white to-red-50
        border-2 border-red-200
        shadow-lg
        hover:shadow-2xl
        hover:scale-105
        hover:border-red-300
        transition-all duration-300 ease-in-out
        flex flex-col items-center justify-center
        cursor-pointer
        group
        overflow-hidden
      `}
    >
      {/* Animated background overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/5 group-hover:to-red-600/5 transition-all duration-300 rounded-2xl" />
      
      {/* PDF Icon */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <FaFilePdf 
          className={`
            ${iconSizes[size]}
            text-red-600
            group-hover:text-red-700
            transition-colors duration-300
            drop-shadow-md
          `}
        />
        
        {/* PDF Label */}
        <span className="mt-2 text-xs sm:text-sm font-semibold text-red-700 tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          PDF
        </span>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 bg-red-500 opacity-10 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-10 sm:h-10 bg-red-500 opacity-10 rounded-tr-full" />
    </div>
  );
};

export default ModernPdfIcon;
