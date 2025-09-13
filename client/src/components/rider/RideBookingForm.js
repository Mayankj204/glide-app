import React, { useState, useEffect } from 'react';
import * as axios from 'axios';
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
          setAvailableFares(null);
          setIsLocationsSet(false);
        }
      } else {
        setAvailableFares(null);
        setIsLocationsSet(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchFares();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [pickup, dropoff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleType) {
      alert('Please select a vehicle type.');
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/rides/request',
        { pickupLocation: pickup, dropoffLocation: dropoff, vehicleType },
        config
      );

      onBooking(data);
      alert('Ride requested successfully!');
      setPickup('');
      setDropoff('');
      setVehicleType('Mini Car');
      setAvailableFares(null);
    } catch (error) {
      alert('Failed to request ride.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-6">
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

        <button
          type="submit"
          disabled={loading || !vehicleType}
          className="w-full py-4 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? 'Requesting...' : 'Request Ride'}
        </button>
      </form>
    </div>
  );
};

export default RideBookingForm;