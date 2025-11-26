import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaCalendarAlt, FaUser, FaLaptop } from 'react-icons/fa';
import { MdLocationOn, MdChat, MdVideoCall, MdSecurity } from 'react-icons/md';
 import YourDostLogo from '../assets/YourDost.jpeg';
import { useCounselorsData } from '../hooks/useCounselorsData';

const Counsellors = () => {
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);

  const FALLBACK_COUNSELLORS = [
    {
      id: 'fallback-1',
      name: "Ms. Pallabita Barooah Chowdhary",
      photo: "https://swc.iitg.ac.in/welfare-board/api/pallabita.jpg",
      mobile: "+91 9864154855",
      email: "pallabita.b.c@iitg.ac.in",
      specialization: "Academic Stress & Anxiety",
      experience: "03612583989",
      schedule: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      },
      location: "New SAC Building, Ground Floor"
    },
    {
      id: 'fallback-2',
      name: "Dr. Nesmita Das",
      photo: "https://swc.iitg.ac.in/welfare-board/api/nesmita.jpg",
      mobile: "+91 8011631110",
      email: "nesmita.d@iitg.ac.in",
      specialization: "Career Guidance & Life Skills",
      experience: "03612583984",
      schedule: {
        monday: "12:00 PM - 8:00 PM",
        tuesday: "12:00 PM - 8:00 PM",
        wednesday: "12:00 PM - 8:00 PM",
        thursday: "12:00 PM - 8:00 PM",
        friday: "12:00 PM - 8:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      },
      location: "New SAC Building, Ground Floor"
    },
    {
      id: 'fallback-3',
      name: "Mr. Rakesh Kakati",
      photo: "https://swc.iitg.ac.in/welfare-board/api/rakesh.jpg",
      mobile: "+91 9707222941",
      email: "rkakati@iitg.ac.in",
      specialization: "Mental Health & Wellness",
      experience: "03612583988",
      schedule: {
        monday: "9:30 AM - 5:30 PM",
        tuesday: "9:30 AM - 5:30 PM",
        wednesday: "9:30 AM - 5:30 PM",
        thursday: "9:30 AM - 5:30 PM",
        friday: "9:30 AM - 5:30 PM",
        saturday: "Closed",
        sunday: "Closed"
      },
      location: "New SAC Building, Ground Floor"
    }
  ];

  const { data: fetchedCounsellors, loading, error } = useCounselorsData();
  const counsellors = fetchedCounsellors && fetchedCounsellors.length ? fetchedCounsellors : FALLBACK_COUNSELLORS;

  const openModal = (counsellor) => {
    setSelectedCounsellor(counsellor);
  };

  const closeModal = () => {
    setSelectedCounsellor(null);
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-poppins">
        {/* Header Section */}
        <div className="bg-[#7BB9C4] backdrop-blur-md shadow-lg border-b border-gray-200/50 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Counselling Services
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Professional support for your academic, personal, and career development needs. 
                Our experienced counsellors are here to help you navigate through challenges and achieve your goals.
              </p>
            </div>
          </div>
        </div>

        {/* Services Overview - MOVED TO TOP */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Academic Counselling",
                  description: "Support for academic stress, study strategies, and performance improvement",
                  icon: "📚"
                },
                {
                  title: "Career Guidance",
                  description: "Professional guidance for career planning and skill development",
                  icon: "🎯"
                },
                {
                  title: "Mental Health Support",
                  description: "Confidential support for mental health and wellness concerns",
                  icon: "🧠"
                }
              ].map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

                {/* Counsellors Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Meet Our Counsellors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading && (
                <div className="col-span-full text-center text-gray-600">Loading counsellors...</div>
              )}
              {error && (
                <div className="col-span-full text-center text-red-600">Error loading counsellors — showing fallback data.</div>
              )}
              {!loading && counsellors.map((counsellor) => (
                <div 
                  key={counsellor.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative">
                    <img 
                      src={counsellor.photo} 
                      alt={counsellor.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{counsellor.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaPhone className="text-[#7BB9C4]" />
                        <span className="text-sm">{counsellor.mobile}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaEnvelope className="text-[#7BB9C4]" />
                        <span className="text-sm">{counsellor.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaUser className="text-[#7BB9C4]" />
                        <span className="text-sm">landline no. {counsellor.experience}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => openModal(counsellor)}
                      className="w-full bg-[#7BB9C4] hover:bg-[#6ba8b3] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <FaCalendarAlt />
                      View Schedule & Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Counsellor Details */}
        {selectedCounsellor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedCounsellor.photo} 
                      alt={selectedCounsellor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedCounsellor.name}</h3>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-[#7BB9C4]" />
                        <span>{selectedCounsellor.mobile}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#7BB9C4]" />
                        <span>{selectedCounsellor.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MdLocationOn className="text-[#7BB9C4]" />
                        <span>{selectedCounsellor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FaClock className="text-[#7BB9C4]" />
                      Weekly Schedule
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(selectedCounsellor.schedule).map(([day, time]) => (
                        <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium capitalize">{day}</span>
                          <span className={`text-sm ${time === 'Closed' ? 'text-red-500' : 'text-green-600'}`}>
                            {time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <a
                      href={`tel:${selectedCounsellor.mobile}`}
                      className="flex-1 bg-[#7BB9C4] hover:bg-[#6ba8b3] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <FaPhone />
                      Call Now
                    </a>
                    <a
                      href={`mailto:${selectedCounsellor.email}`}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <FaEnvelope />
                      Send Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* YourDOST Section */}
        <div className="bg-[#7BB9C4] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left Content */}
              <div className="flex-1">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    YourDOST-24x7 Online Counselling Services
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    YourDOST is an online counseling and emotional support platform that fosters mental wellness. It is completely free for IIT Guwahati students.<br/>Reach out. Seek help. Feel better.
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7BB9C4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MdChat className="text-[#7BB9C4] text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Anonymous Chat</h3>
                      <p className="text-sm text-gray-600">Connect with counselors anonymously through secure chat</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7BB9C4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MdVideoCall className="text-[#7BB9C4] text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Video Sessions</h3>
                      <p className="text-sm text-gray-600">Face-to-face counseling sessions with licensed professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7BB9C4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-[#7BB9C4] text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">24/7 Availability</h3>
                      <p className="text-sm text-gray-600">Round-the-clock support whenever you need it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7BB9C4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MdSecurity className="text-[#7BB9C4] text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Confidential</h3>
                      <p className="text-sm text-gray-600">Complete privacy and confidentiality guaranteed</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a href="https://yourdost.com" target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#154699] hover:bg-[#6ba8b3] text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2">
                      <FaLaptop />
                      Access YourDOST
                    </button>
                  </a>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="bg-black rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-black rounded-full overflow-hidden relative">
                          <img
                            src={YourDostLogo}
                            alt="YourDOST Logo"
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/YourDost.jpeg';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg inline-block mb-4">
                        YourDOST
                      </div>
                      <div className="text-white text-lg font-medium">
                        Mental Health Companion
                      </div>
                    </div>
                    <div className="mt-6 space-y-3">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white text-sm">Expert Counselors Available</span>
                        </div>
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-white text-sm">Anonymous & Secure</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Counsellors;