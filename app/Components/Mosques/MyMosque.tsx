import React, { useState } from 'react';

// Define TypeScript interfaces
interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface MosqueData {
  name: string;
  description: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  contactNumber: string;
  prayerTimes: PrayerTimes;
}

export default function CreateMosquePage() {
  const [mosqueData, setMosqueData] = useState<MosqueData>({
    name: '',
    description: '',
    location: {
      type: 'Point',
      coordinates: [0, 0]
    },
    contactNumber: '',
    prayerTimes: {
      fajr: '',
      dhuhr: '',
      asr: '',
      maghrib: '',
      isha: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested object updates
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setMosqueData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setMosqueData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMosqueData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: name === 'longitude' 
          ? [Number(value), prev.location.coordinates[1]]
          : [prev.location.coordinates[0], Number(value)]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    if (!mosqueData.name || !mosqueData.contactNumber) {
      alert('Please fill in required fields');
      return;
    }

    // TODO: Add actual submission logic
    console.log('Mosque Data:', mosqueData);
    alert('Mosque Creation Submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
        Create New Mosque
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mosque Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Mosque Name *
          </label>
          <input
            type="text"
            name="name"
            value={mosqueData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter mosque name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={mosqueData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the mosque"
            rows={3}
          />
        </div>

        {/* Location Coordinates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Longitude
            </label>
            <input
              type="number"
              name="longitude"
              value={mosqueData.location.coordinates[0]}
              onChange={handleCoordinatesChange}
              step="0.0000001"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Longitude"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Latitude
            </label>
            <input
              type="number"
              name="latitude"
              value={mosqueData.location.coordinates[1]}
              onChange={handleCoordinatesChange}
              step="0.0000001"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Latitude"
            />
          </div>
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Contact Number *
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={mosqueData.contactNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter contact number"
            pattern="[0-9]{10}"
            required
          />
        </div>

        {/* Prayer Times */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Prayer Times
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(Object.keys(mosqueData.prayerTimes) as Array<keyof PrayerTimes>).map((prayerTime) => (
              <div key={prayerTime}>
                <label className="block text-gray-700 mb-2 capitalize">
                  {prayerTime} Time
                </label>
                <input
                  type="time"
                  name={`prayerTimes.${prayerTime}`}
                  value={mosqueData.prayerTimes[prayerTime]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create Mosque
          </button>
        </div>
      </form>
    </div>
  );
}