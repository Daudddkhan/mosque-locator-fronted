import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { Mosque, Location, PrayerTimes } from "./Mosque-Data";
import { createMosque } from "@/app/FetchServices/fetch-mosque-service";
import { Toast } from "primereact/toast";

interface props {
  mosqueData: props;
}

export default function CreateMosquePage() {
    const toast = useRef<Toast>(null);
  const [mosqueData, setMosqueData] = useState<Mosque>({
    name: "",
    description: "",
    location: {
      type: "Point",
      coordinates: [77.437184, 23.254743],
    },
    contactNumber: "",
    prayerTimes: {
      fajr: "00:00",
      dhuhr: "00:00",
      asr: "00:00",
      maghrib: "00:00",
      isha: "00:00",
    }
  });

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMosqueData((prev: any) => ({
            ...prev,
            location: {
              type: "Point",
              coordinates: [
                position.coords.longitude,
                position.coords.latitude,
              ],
            },
            updatedAt: new Date().toISOString(),
          }));
        },
        (error) => {
          console.error("Location error:", error);
        }
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setMosqueData((prev: any) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value,
        },
        updatedAt: new Date().toISOString(),
      }));
    } else {
      setMosqueData((prev: any) => ({
        ...prev,
        [name]: value,
        updatedAt: new Date().toISOString(),
      }));
    }
  };

  const handleCoordinatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMosqueData((prev: { location: { coordinates: any[] } }) => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates:
          name === "longitude"
            ? [Number(value), prev.location.coordinates[1]]
            : [prev.location.coordinates[0], Number(value)],
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!mosqueData.name || !mosqueData.contactNumber) {
      alert("Please fill in required fields");
      return;
    }

    try {
      const response = await createMosque(mosqueData);
      if(response){
      setMosqueExists(true);
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Mosque updated successfully'
        });
      }
    } catch (error) {
      console.log("error ", error)
      toast.current?.show({
        severity: 'error',
        summary: 'error',
        detail: 'Failed to update Mosque'
    });
    }
  };

  return (
    <div className="surface-card p-4 shadow-2 border-round">
      <Toast ref={toast} />
      <div className="text-center mb-5">
        <h1 className="text-900 text-3xl font-medium mb-3">
          Create New Mosque
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="formgrid grid">
          <div className="field col-12 md:col-6">
            <label htmlFor="name">Mosque Name</label>
            <InputText
              id="name"
              name="name"
              value={mosqueData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="field col-12 md:col-6">
            <label htmlFor="contactNumber">Contact Number</label>
            <InputMask
              id="contactNumber"
              name="contactNumber"
              mask="9999999999"
              value={mosqueData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="field col-12">
            <label htmlFor="description">Description</label>
            <InputText
              id="description"
              name="description"
              value={mosqueData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="field col-12 md:col-6">
            <label>Longitude</label>
            <InputText
              name="longitude"
              type="number"
              value={mosqueData.location.coordinates[0]}
              onChange={handleCoordinatesChange}
              step="0.000001"
            />
          </div>

          <div className="field col-12 md:col-6">
            <label>Latitude</label>
            <InputText
              name="latitude"
              type="number"
              value={mosqueData.location.coordinates[1]}
              onChange={handleCoordinatesChange}
              step="0.000001"
            />
          </div>

          <div className="field col-12">
            <Button
              type="button"
              label="Get Current Location"
              icon="pi pi-map-marker"
              onClick={handleGetLocation}
              className="p-button-secondary"
            />
          </div>

          <div className="col-12">
            <h3>Prayer Times</h3>
            <div className="formgrid grid">
              {(
                Object.keys(mosqueData.prayerTimes) as Array<keyof PrayerTimes>
              ).map((prayer) => (
                <div key={prayer} className="field col-12 md:col-4">
                  <label>
                    {prayer.charAt(0).toUpperCase() + prayer.slice(1)} Time
                  </label>
                  <InputMask
                    mask="99:99"
                    name={`prayerTimes.${prayer}`}
                    value={mosqueData.prayerTimes[prayer]}
                    onChange={handleInputChange}
                    placeholder="HH:MM"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* <div className="field col-12 md:col-6">
                <label>Created By</label>
                <InputText 
                  name="createdBy"
                  value={mosqueData.createdBy}
                  onChange={handleInputChange}
                />
              </div>
    
              <div className="field col-12 md:col-6">
                <label>Updated By</label>
                <InputText 
                  name="updatedBy"
                  value={mosqueData.updatedBy}
                  onChange={handleInputChange}
                />
              </div> */}

          <div className="col-12">
            <Button type="submit" label="Create Mosque" icon="pi pi-save" />
          </div>
        </div>
      </form>
    </div>
  );
}

function setMosqueExists(arg0: boolean) {
  
}
