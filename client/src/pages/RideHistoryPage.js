import React from 'react';

const RideHistoryPage = () => {
  // Placeholder data for demonstration
  const rides = [
    { id: 1, date: '2025-09-01', from: 'Noida Sector 18', to: 'India Gate', fare: 250, status: 'completed' },
    { id: 2, date: '2025-08-28', from: 'Connaught Place', to: 'Hauz Khas', fare: 180, status: 'completed' },
  ];

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Ride History</h2>
        
        {rides.length > 0 ? (
          <ul className="space-y-4">
            {rides.map(ride => (
              <li key={ride.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{ride.from} to {ride.to}</p>
                    <p className="text-sm text-gray-500">Date: {ride.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₹{ride.fare}</p>
                    <p className="text-sm capitalize text-gray-500">{ride.status}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have no ride history yet.</p>
        )}
      </div>
    </div>
  );
};

export default RideHistoryPage;