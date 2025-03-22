interface MosqueProps {
  name: string;
  description: string;
  contactNumber: string;
  distance: number;
//   location: {
//     coordinates: [];
//     x?: number;
//     y?: number;
//     type?: string;
//   };
  prayerTimes?: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

export default function MosqueCard({ name, description, contactNumber, distance, prayerTimes }: MosqueProps) {
  return (
    <div className="border-1 surface-card border-round shadow-2 p-4 w-20rem">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="font-medium mt-2">📞 Contact: {contactNumber}</p>
      <p className="font-medium mt-2">📍 Distance: {distance.toFixed(2)} km</p>
      {/* Removed the coordinates display as requested */}
      
      {prayerTimes ? (
        <div className="mt-3">
          <h4 className="font-bold">🕌 Prayer Times</h4>
          <ul className="text-sm">
            <li>Fajr: {prayerTimes.fajr}</li>
            <li>Dhuhr: {prayerTimes.dhuhr}</li>
            <li>Asr: {prayerTimes.asr}</li>
            <li>Maghrib: {prayerTimes.maghrib}</li>
            <li>Isha: {prayerTimes.isha}</li>
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-2">Prayer times not available.</p>
      )}
    </div>
  );
}