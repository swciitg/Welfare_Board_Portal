import React, { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaPhone, FaMotorcycle, FaStar, FaUtensils } from 'react-icons/fa';
import { MdDeliveryDining, MdRestaurant } from 'react-icons/md';

const FoodCourt = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const foodOutlets = [
  {
    id: 1,
    name: "La Pino'z Pizza",
    category: "pizza",
    image: "https://swc.iitg.ac.in/welfare-board/api/la_pinoz.jpg",
    description: "Say hello to La Pino'z, the newest addition to the IITG food Court! Big pizzas, bigger cravings – whether you're chilling with friends or pulling an all-nighter, this spot has your back with cheesy, delicious comfort.",
    specialties: ["Big Pizzas", "Cheese Lovers", "Late Night Snacks"],
    delivery: false
  },
  {
    id: 2,
    name: "SUBHUB",
    category: "healthy",
    image: "https://swc.iitg.ac.in/welfare-board/api/subhub.jpg",
    description: "Fuel up the smart way at SubHub! With fresh subs, crisp veggies, and flavorful fillings, it's your go-to spot on campus. Perfect for when you want something quick, tasty, and just a little bit healthy.",
    specialties: ["Fresh Subs", "Crisp Veggies", "Quick Bites"],
    delivery: true
  },
  {
    id: 3,
    name: "Urban Tadka",
    category: "indian",
    image: "https://swc.iitg.ac.in/welfare-board/api/urban_tadka.jpg",
    description: "Craving bold desi flavours with a modern twist? Urban Tadka serves up your favourite North Indian dishes with a punch of spice and soul. From buttery naans to spicy curries – it's comfort food, campus-style!",
    specialties: ["North Indian", "Buttery Naans", "Spicy Curries"],
    delivery: true
  },
  {
    id: 4,
    name: "Baskin Robbins",
    category: "dessert",
    image: "https://swc.iitg.ac.in/welfare-board/api/baskin_robbins_.JPG",
    description: "Baskin Robbins is more than just ice cream - it's a place of celebration where moments of joy are celebrated with a scoop or two. Get ready to satisfy your sweet tooth and awaken your sense of wonder. They offer the standard 31 flavours and the standard discount on the 31st of a month.",
    specialties: ["31 Flavours", "Ice Cream", "Monthly Discounts"],
    delivery: false
  },
  {
    id: 5,
    name: "Fat Belly",
    category: "momos",
    image: "https://swc.iitg.ac.in/welfare-board/api/fat_belly_.JPG",
    description: "Fat Belly, famous all over Guwahati, now brings its legendary flavours to IITG. From classic steamed and crispy fried to rich Afghani and smoky tandoori – there's a momo for every mood. Fat Belly is where your momo cravings meet their match!",
    specialties: ["Steamed Momos", "Afghani", "Tandoori"],
    delivery: true
  },
  {
    id: 6,
    name: "Dairy Delight",
    category: "dairy",
    image: "https://swc.iitg.ac.in/welfare-board/api/dairy_delight.JPG",
    description: "Your daily dose of dairy delight! Dairy Delight brings farm fresh milk, creamy curd, lassis, ice creams, and more– right to the heart of the campus. Whether it's a chilled treat on a sunny day or a wholesome glass of milk to recharge, Dairy Delight keeps it pure and tasty.",
    specialties: ["Fresh Milk", "Lassis", "Dairy Products"],
    delivery: false
  },
  {
    id: 7,
    name: "Big Byte Bakery",
    category: "bakery",
    image: "https://swc.iitg.ac.in/welfare-board/api/big_byte_bakery_.JPG",
    description: "Where sweetness meets satisfaction! Big Byte Bakery is your campus stop for freshly baked cakes, cookies, pastries, and more. Perfect for birthdays, late night cravings, or just a sweet pick-me-up between lectures. Freshly baked, every byte counts!",
    specialties: ["Fresh Cakes", "Cookies", "Pastries"],
    delivery: true
  },
  {
    id: 8,
    name: "Nescafé",
    category: "cafe",
    image: "https://swc.iitg.ac.in/welfare-board/api/nescafe.jpg",
    description: "The campus classic you'll keep coming back to! Nescafé serves up hot coffees, cold choco shakes, and it's not just coffee – enjoy hot Maggi, Pazzta, all in one stop. Whether it's a pre-class booster, a study break snack, or just a cozy food fix Nescafé is your everyday comfort corner.",
    specialties: ["Hot Coffee", "Maggi", "Choco Shakes"],
    delivery: false
  },
  {
    id: 9,
    name: "Domino's",
    category: "pizza",
    image: "https://swc.iitg.ac.in/welfare-board/api/dominoes.JPG",
    description: "Hot, cheesy, and straight from the oven – Domino's is now just a short walk away! Whether it's a solo slice or a full pizza party, their irresistible crusts and endless toppings are perfect for every mood. Directly order pizza from Domino's app",
    specialties: ["Hot Pizza", "Endless Toppings", "App Ordering"],
    delivery: true
  },
  {
    id: 10,
    name: "Cafe Coffee Day",
    category: "cafe",
    image: "https://swc.iitg.ac.in/welfare-board/api/ccd.jpg",
    description: "Need a caffeine kick or just a chill spot to hang out? CCD has you covered with its rich brews, creamy frappes, and classic snacks. Perfect for casual chats, assignment marathons, or quiet me-time because a lot can happen over coffee!",
    specialties: ["Rich Brews", "Creamy Frappes", "Classic Snacks"],
    delivery: false
  },
  {
    id: 11,
    name: "Lauriat",
    category: "chicken",
    image: "https://swc.iitg.ac.in/welfare-board/api/lauriat.jpg",
    description: "Craving a fabulous chicken feast? Lauriat is your go-to destination for juicy, flavorful chicken dishes that hit the spot every time. From crispy bites to spicy curries head over without a second thought and let your taste buds celebrate!",
    specialties: ["Juicy Chicken", "Crispy Bites", "Spicy Curries"],
    delivery: false
  },
  {
    id: 12,
    name: "Hashtag Canteen",
    category: "budget",
    image: "https://swc.iitg.ac.in/welfare-board/api/hashtag_.jpg",
    description: "Hungry and on a budget? Hashtag Canteen has you covered with a wide range of food options at prices that won't hurt your wallet. From filling meals to quick snacks it's the perfect everyday stop for tasty, affordable bites.",
    specialties: ["Budget Friendly", "Filling Meals", "Quick Snacks"],
    delivery: false
  }
];


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
          {filteredOutlets.map((outlet) => (
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
