import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/common/MapComponent';
import RideBookingForm from '../components/rider/RideBookingForm';
import RideRequestsList from '../components/driver/RideRequestsList';
import PathPalMatcher from '../components/driver/PathPalMatcher';
import SavedPlaces from '../components/common/SavedPlaces';
import ServiceSuggestions from '../components/common/ServiceSuggestions';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
  
  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      <MapComponent />

      {/* Floating UI Panel on the left side */}
      <div className="absolute top-6 left-6 w-96 p-8 bg-gray-800 bg-opacity-90 text-white rounded-2xl shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <span className="text-3xl font-bold text-indigo-400">Glide</span>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">{user.username}</span>
            <button
              onClick={logout}
              className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>

        <div className="flex-grow space-y-8">
          {user.role === 'rider' ? (
            <>
              <RideBookingForm />

              <div className="p-4 bg-gray-700 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-200 mb-4">
                  Recent Searches & Saved Places
                </h3>
                <SavedPlaces onSelect={(address) => { /* handle location selection */ }} />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-200 text-center">
                Driver Panel
              </h2>
              <RideRequestsList />
              <PathPalMatcher />
            </>
          )}
        </div>
      </div>

      {/* Floating Service Suggestions at bottom-right */}
      <div className="absolute bottom-6 right-6">
        <ServiceSuggestions />
      </div>
    </div>
  );
};

export default Dashboard;