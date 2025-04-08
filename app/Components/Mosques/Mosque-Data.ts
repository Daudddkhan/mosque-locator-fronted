export interface Location {
    type: string;
    coordinates: [number, number];
  }
  
  export interface PrayerTimes {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  }
  
  export interface Mosque {
    distance: undefined;
    name: string;
    description: string;
    location: Location;
    contactNumber: string;
    prayerTimes: PrayerTimes;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
  }