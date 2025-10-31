import React from 'react';
import { Link } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';

const CounselorCTA = () => {
  return (
    <Link to="/counsellors" className="block max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-[#F0FBFA] to-white border border-[#E2F4F2] shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <div className="flex-shrink-0 bg-[#7BB9C4] text-white w-14 h-14 rounded-lg flex items-center justify-center text-2xl">
          <FaComments />
        </div>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Need Help? Contact Counselors</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Confidential support for academic, personal, and career concerns. Reach out to a counselor today.</p>
        </div>
        <div className="text-sm text-[#7BB9C4] font-semibold hidden sm:block">Talk to a Counselor →</div>
      </div>
    </Link>
  );
};

export default CounselorCTA;
