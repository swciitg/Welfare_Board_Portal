import React, { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaPhone, FaMotorcycle, FaStar, FaUtensils } from 'react-icons/fa';
import { MdDeliveryDining, MdRestaurant } from 'react-icons/md';
import { useFoodOutletsData } from '../hooks/useFoodOutletsData';

const FoodCourt = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: foodOutlets, loading, error } = useFoodOutletsData();


  const categories = [
    { id: 'all', name: 'All', icon: FaUtensils },
    { id: 'pizza', name: 'Pizza', icon: MdRestaurant },
    { id: 'indian', name: 'Indian', icon: FaUtensils },
    { id: 'cafe', name: 'Café', icon: FaUtensils },
    { id: 'dessert', name: 'Desserts', icon: FaUtensils },
    { id: 'healthy', name: 'Healthy', icon: FaUtensils }
  ];

  const filteredOutlets = selectedCategory === 'all' 
    ? foodOutlets 
    : foodOutlets.filter(outlet => outlet.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-poppins">
      
      {/* Hero Section */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              IITG Food Outlets
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              IITG food court is a bustling hub of culinary delights and social interaction for students, faculty, and staff on campus. One of the key highlights of the IITG food court is its diverse food options. From regional Indian cuisine to international dishes, the food court offers something for everyone.
            </p>
            <div className="flex items-center justify-center gap-2 text-[#7BB9C4] font-medium">
              <FaMapMarkerAlt />
              <span>FoodCourt Located behind New SAC (Student Activity Centre)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-[#7BB9C4] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <category.icon className="text-sm" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Food Outlets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading && (
            <div className="col-span-full text-center py-10 text-gray-600">
              <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-[#7BB9C4] rounded-full mb-4">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="text-lg">Loading food outlets...</p>
            </div>
          )}
          {error && (
            <div className="col-span-full text-center py-10 text-red-500">
              <p className="text-lg">Failed to load food outlets. Please try again later.</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          )}
          {!loading && !error && filteredOutlets.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-600">
              <p className="text-lg">No outlets found in this category.</p>
            </div>
          )}
          {!loading && !error && filteredOutlets.map((outlet) => (
            <div 
              key={outlet.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img 
                  src={outlet.image} 
                  alt={outlet.name}
                  className="w-full h-48 object-cover"
                />
                
                {outlet.delivery && (
                  <div className="absolute top-4 left-4 bg-[#7BB9C4] text-white rounded-full px-3 py-1 flex items-center gap-1">
                    <MdDeliveryDining className="text-sm" />
                    <span className="text-xs font-medium">Delivery</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{outlet.name}</h3>
                  <span className="text-[#7BB9C4] font-bold">{outlet.priceRange}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {outlet.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {outlet.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {outlet.delivery && (
                      <div className="flex items-center gap-1">
                        <FaMotorcycle />
                        <span>Delivery</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Mentions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Special Mentions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Khokha Market */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Khokha Market</h3>
              <p className="text-orange-700 mb-4">
                Situated right outside the campus, Khokha is the go-to hangout spot. This is the soul of campus life, with creamy chai, delicious chaat, relishing Maggi, delicious chicken pakoras at extremely affordable rates.
              </p>
              <div className="flex items-center gap-2 text-orange-600">
                <FaMapMarkerAlt />
                <span className="text-sm">Outside Campus</span>
              </div>
            </div>

            {/* Other Options */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">More Options</h3>
              <p className="text-blue-700 mb-4">
                Apart from these popular outlets on campus, there are plenty of other spots to satisfy your hunger – including the Lohit Canteen, and the ever-loved Food Truck.
              </p>
              <p className="text-blue-600 font-medium">
                No matter where you are, good food is always within reach at IITG!
              </p>
            </div>
          </div>
        </div>

        
      </div>

    </div>
  );
};

export default FoodCourt;
