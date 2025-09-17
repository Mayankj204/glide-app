import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const LocationSearchInput = ({ address, setAddress, onSelect, placeholder }) => {
  const handleSelect = async (selectedAddress) => {
<<<<<<< HEAD
    const results = await geocodeByAddress(selectedAddress);
    const latLng = await getLatLng(results[0]);
    onSelect(selectedAddress, latLng);
=======
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      onSelect(selectedAddress, latLng);
    } catch (error) {
      console.error('Error selecting location:', error);
    }
>>>>>>> b08aa6e (Correct activity frontend and backend)
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <input
            {...getInputProps({
              placeholder: placeholder,
              className: 'w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base',
            })}
          />
          <div className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1">
            {loading && <div className="p-2 text-gray-500">Loading...</div>}
<<<<<<< HEAD
            {suggestions.map((suggestion) => {
=======
            {suggestions.map((suggestion, index) => {
>>>>>>> b08aa6e (Correct activity frontend and backend)
              const className = suggestion.active
                ? 'bg-indigo-50'
                : 'bg-white';
              return (
                <div
<<<<<<< HEAD
=======
                  key={suggestion.placeId}
>>>>>>> b08aa6e (Correct activity frontend and backend)
                  {...getSuggestionItemProps(suggestion, {
                    className: `${className} cursor-pointer p-3 text-sm text-gray-700 hover:bg-gray-100`,
                  })}
                >
                  <i className="fas fa-map-marker-alt mr-2 text-indigo-400"></i>
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;