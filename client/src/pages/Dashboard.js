import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/common/MapComponent';
import RideBookingForm from '../components/rider/RideBookingForm';
import RideRequestsList from '../components/driver/RideRequestsList';
import PathPalMatcher from '../components/driver/PathPalMatcher';
import Suggestions from '../components/common/Suggestions'; // Import the new component

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }
  
  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      <MapComponent />
      
      {/* Dynamic content panel based on user role and state */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-2xl p-6 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {user.role === 'rider' ? 'Book Your Ride' : 'Driver Panel'}
        </h2>
        {user.role === 'rider' ? (
          <>
            {/* New Suggestions component */}
            <Suggestions />
            
            {/* Show booking form on demand */}
            <button
              onClick={() => setShowBookingForm(!showBookingForm)}
              className="w-full py-4 px-4 mt-4 text-base font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              {showBookingForm ? 'Hide Booking' : 'Plan a Trip'}
            </button>

            {showBookingForm && <RideBookingForm />}
          </>
        ) : (
          <div className="flex flex-col space-y-4">
            <RideRequestsList />
            <PathPalMatcher />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;