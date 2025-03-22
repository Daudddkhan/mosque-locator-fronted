"use client";

import { Key, useEffect, useState } from "react";
import { fetchMosques } from "@/app/FetchServices/auth-fetch-service";
import MosqueCard from "./Mosques/Mosque-card";

interface Mosque {
  id: Key | null | undefined;
  name: string;
  description: string;
  contactNumber: string;
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  key: number;
  distance: number; 
//   location: {
//     coordinates: [];
//     x?: number;
//     y?: number;
//     type?: string;
//   };
}

export default function Home() {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] =
    useState<PermissionState | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      if ("permissions" in navigator) {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "geolocation" as PermissionName,
          });
          setLocationPermission(permissionStatus.state);

          if (permissionStatus.state === "granted") {
            getUserLocation();
          } else if (permissionStatus.state === "prompt") {
            getUserLocation();
          } else {
            setError(
              "Location permission denied. Enable it from browser settings."
            );
            setLoading(false);
          }
        } catch (err) {
          setError("Unable to check location permission.");
          setLoading(false);
        }
      } else {
        getUserLocation(); // For older browsers
      }
    };

    checkPermission();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const latitude: number = position.coords.latitude;
          const longitude: number = position.coords.longitude;
          console.log("User Location:", latitude, longitude);

          try {
            const data = await fetchMosques(latitude, longitude);
            setMosques(data);
          } catch (err) {
            setError("Failed to fetch mosques.");
          }
          setLoading(false);
        },
        (error: GeolocationPositionError) => {
          setError("Location access denied. Please enable location services.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-center text-3xl font-bold mb-4">Nearby Mosques</h2>

      {loading ? (
        <p className="text-center text-lg">Detecting location...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : mosques.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-content-center">
          {mosques.map((mosque) => (
            <MosqueCard
                  key={mosque.id}
                  name={mosque.name}
                  description={mosque.description}
                  contactNumber={mosque.contactNumber}
                  distance={mosque.distance}
                  //   location={mosque.location}
                  prayerTimes={mosque.prayerTimes} // If available in your data
                //   location={{
                //       coordinates:[],
                //       x: mosque.location.x,
                //       y: mosque.location.y,
                //       type: mosque.location.type
                //   }}                  
                />
          ))}
        </div>
      ) : (
        <p className="text-center">No mosques found near your location.</p>
      )}
    </div>
  );
}
