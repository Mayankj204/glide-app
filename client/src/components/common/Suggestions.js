import React from 'react';
import { Link } from 'react-router-dom';
import bikeImg from '../../assets/images/bike.png';
import autoImg from '../../assets/images/auto.png';
import reserveImg from '../../assets/images/reserve.png';
import rentalsImg from '../../assets/images/rentals.png';

const services = [
  { name: 'Bike', icon: bikeImg, link: '/dashboard', description: 'Quick rides' },
  { name: 'Auto', icon: autoImg, link: '/dashboard', description: 'Quick rides' },
  { name: 'Reserve', icon: reserveImg, link: '/reserve', description: 'Book in advance' },
  { name: 'Rentals', icon: rentalsImg, link: '/rentals', description: 'Hourly packages' },
  // Add other services here
];
const Suggestions = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mt-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Suggestions</h3>
      <div className="flex overflow-x-auto space-x-4 pb-2 -mx-4 px-4">
        {services.map((service) => (
          <Link to={service.link} key={service.name} className="flex-shrink-0 w-24">
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <img src={service.icon} alt={service.name} className="w-12 h-12 object-contain mb-2" />
              <p className="text-sm font-medium text-gray-700">{service.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;  