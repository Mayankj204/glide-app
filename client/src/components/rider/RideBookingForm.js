import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import * as axios from 'axios';
=======
import axios from 'axios';
>>>>>>> b08aa6e (Correct activity frontend and backend)
import { useAuth } from '../../context/AuthContext';
import VehicleSelector from './VehicleSelector';
import LocationSearchInput from '../common/LocationSearchInput';

const RideBookingForm = ({ onBooking }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicleType, setVehicleType] = useState('Mini Car');
  const [availableFares, setAvailableFares] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLocationsSet, setIsLocationsSet] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFares = async () => {
<<<<<<< HEAD
      if (pickup.length > 0 && dropoff.length > 0) {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const { data } = await axios.post(
            'http://localhost:5000/api/rides/fares',
            { pickup, dropoff },
            config
          );
          setAvailableFares(data.fares);
          setIsLocationsSet(true);
        } catch (error) {
          console.error('Failed to get fare estimates:', error);
=======
      if (pickup.trim() && dropoff.trim()) {
        try {
          const config = { headers: { 'Content-Type': 'application/json' } };
          const { data } = await axios.post('http://localhost:5000/api/rides/fares', { pickup, dropoff }, config);
          setAvailableFares(data.fares);
          setIsLocationsSet(true);
        } catch (error) {
          console.error('Failed to get fare estimates:', error.response?.data || error.message);
>>>>>>> b08aa6e (Correct activity frontend and backend)
          setAvailableFares(null);
          setIsLocationsSet(false);
        }
      } else {
        setAvailableFares(null);
        setIsLocationsSet(false);
      }
    };

<<<<<<< HEAD
    const debounceFetch = setTimeout(() => {
      fetchFares();
    }, 500);

=======
    const debounceFetch = setTimeout(fetchFares, 500);
>>>>>>> b08aa6e (Correct activity frontend and backend)
    return () => clearTimeout(debounceFetch);
  }, [pickup, dropoff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleType) {
      alert('Please select a vehicle type.');
      return;
    }
<<<<<<< HEAD
=======
    if (!pickup.trim() || !dropoff.trim()) {
      alert('Please fill in both pickup and dropoff locations.');
      return;
    }
>>>>>>> b08aa6e (Correct activity frontend and backend)
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
<<<<<<< HEAD
          'Authorization': `Bearer ${user.token}`,
        },
      };

=======
          Authorization: `Bearer ${user.token}`,
        },
      };
>>>>>>> b08aa6e (Correct activity frontend and backend)
      const { data } = await axios.post(
        'http://localhost:5000/api/rides/request',
        { pickupLocation: pickup, dropoffLocation: dropoff, vehicleType },
        config
      );
<<<<<<< HEAD

=======
>>>>>>> b08aa6e (Correct activity frontend and backend)
      onBooking(data);
      alert('Ride requested successfully!');
      setPickup('');
      setDropoff('');
      setVehicleType('Mini Car');
      setAvailableFares(null);
    } catch (error) {
      alert('Failed to request ride.');
<<<<<<< HEAD
      console.error(error);
=======
      console.error('Request error:', error.response?.data || error.message);
>>>>>>> b08aa6e (Correct activity frontend and backend)
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-6">
<<<<<<< HEAD
      <form onSubmit={handleSubmit} className="space-y-6 text-base  text-black">
        <div className="space-y-4">
          <LocationSearchInput
            address={pickup}
            setAddress={setPickup}
            onSelect={(address, latLng) => { setPickup(address); }}
            placeholder="Pickup Location"
          />
          <LocationSearchInput
            address={dropoff}
            setAddress={setDropoff}
            onSelect={(address, latLng) => { setDropoff(address); }}
            placeholder="Drop-off Location"
          />
        </div>
        
        {isLocationsSet && (
          <div className="pt-4">
            <h4 className="block text-sm font-medium text-gray-700 mb-2">Select Vehicle Type</h4>
            <VehicleSelector
              selectedVehicleType={vehicleType}
              onSelectVehicleType={setVehicleType}
              availableFares={availableFares}
            />
          </div>
        )}

=======
      <form onSubmit={handleSubmit} className="space-y-6 text-base text-black">
        <div className="space-y-4">
          <LocationSearchInput address={pickup} setAddress={setPickup} onSelect={setPickup} placeholder="Pickup Location" />
          <LocationSearchInput address={dropoff} setAddress={setDropoff} onSelect={setDropoff} placeholder="Drop-off Location" />
        </div>
        {isLocationsSet && (
          <div className="pt-4">
            <h4 className="block text-sm font-medium text-gray-700 mb-2">Select Vehicle Type</h4>
            <VehicleSelector selectedVehicleType={vehicleType} onSelectVehicleType={setVehicleType} availableFares={availableFares} />
          </div>
        )}
>>>>>>> b08aa6e (Correct activity frontend and backend)
        <button
          type="submit"
          disabled={loading || !vehicleType}
          className="w-full py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
<<<<<<< HEAD
          {loading ? 'Requesting...' : 'Request Ride'}
=======
          {loading ? 'Requesting...' : 'Ride Request'}
>>>>>>> b08aa6e (Correct activity frontend and backend)
        </button>
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default RideBookingForm;
=======
export default RideBookingForm;
>>>>>>> b08aa6e (Correct activity frontend and backend)
