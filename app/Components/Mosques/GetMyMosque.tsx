"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import {
  getCreatedByMosque,
  updateMosque,
} from "@/app/FetchServices/fetch-mosque-service";
import { Mosque } from "./Mosque-Data";
import { Toast } from "primereact/toast";
import MyMosque from "./MyMosque";

export default function MosquePage() {
  const [mosque, setMosque] = useState<Mosque | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toast = useRef<Toast>(null);

  const fetchMosque = async () => {
    try {
      const response = await getCreatedByMosque();
      setMosque(response);
      setLoading(false);
    
    } catch (error) {
    //   toast.current?.show({
    //     severity: 'error',
    //     summary: 'error',
    //     detail: 'Failed to fetch Mosque'
    // });
    alert(error)
    } 
  };

  const handleEditMosque = async () => {
    if (!mosque) return;
    try {
      const response = await updateMosque(mosque);
      setMosque(response);
      setIsEditing(false);

      if(response){
        toast.current?.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Mosque updated successfully'
        });
      }

    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'error',
        detail: 'Failed to update Mosque'
    });
    }
  };

  useEffect(() => {
    fetchMosque();
  }, []);

  return (
    <div className="surface-card p-4 shadow-2 border-round">
      <Toast ref={toast} />
      {loading ? (
        <p>Loading...</p>
      ) : mosque ? (
        <Card title="Your Mosque" className="p-4">
          {!isEditing ? (
            
            <div className="grid">
              <div className="col-12 md:col-6">
                <p>
                  <strong>Name:</strong> {mosque.name}
                </p>
                <p>
                  <strong>Contact:</strong> {mosque.contactNumber}
                </p>
                <p>
                  <strong>Description:</strong> {mosque.description}
                </p>
                <h2>Prayer Time</h2>
                <p>
                  <strong>Fajr Time: </strong>
                  {mosque.prayerTimes.fajr}
                </p>
                <p>
                  <strong>Dhuhr Time: </strong>
                  {mosque.prayerTimes.dhuhr}
                </p>
                <p>
                  <strong>Asar Time: </strong>
                  {mosque.prayerTimes.asr}
                </p>
                <p>
                  <strong>Maghrib Time: </strong>
                  {mosque.prayerTimes.maghrib}
                </p>
                <p>
                  <strong>Isha Time: </strong>
                  {mosque.prayerTimes.isha}
                </p>
                <Button
                  label="Edit Mosque"
                  icon="pi pi-pencil"
                  onClick={() => setIsEditing(true)}
                  className="p-button-primary"
                />
              </div>
            </div>
          ) : (
            <div className="grid">
              <div className="col-12 md:col-6">
                <label>Mosque Name</label>
                <InputText
                  value={mosque.name}
                  onChange={(e) =>
                    setMosque({ ...mosque, name: e.target.value })
                  }
                  className="w-full"
                />

                <label>Contact Number</label>
                <InputText
                  value={mosque.contactNumber}
                  onChange={(e) =>
                    setMosque({ ...mosque, contactNumber: e.target.value })
                  }
                  className="w-full"
                />

                <label>Description</label>
                <InputText
                  value={mosque.description}
                  onChange={(e) =>
                    setMosque({ ...mosque, description: e.target.value })
                  }
                  className="w-full"
                />

                <label>Fajr Time</label>
                <InputText
                  value={mosque.prayerTimes.fajr}
                  onChange={(e) =>
                    setMosque({
                      ...mosque,
                      prayerTimes: {
                        ...mosque.prayerTimes,
                        fajr: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />

                <label>Dhuhr Time</label>
                <InputText
                  value={mosque.prayerTimes.dhuhr}
                  onChange={(e) =>
                    setMosque({
                      ...mosque,
                      prayerTimes: {
                        ...mosque.prayerTimes,
                        dhuhr: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />

                <label>Asr Time</label>
                <InputText
                  value={mosque.prayerTimes.asr}
                  onChange={(e) =>
                    setMosque({
                      ...mosque,
                      prayerTimes: {
                        ...mosque.prayerTimes,
                        asr: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />

                <label>Maghrib Time</label>
                <InputText
                  value={mosque.prayerTimes.maghrib}
                  onChange={(e) =>
                    setMosque({
                      ...mosque,
                      prayerTimes: {
                        ...mosque.prayerTimes,
                        maghrib: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />

                <label>Isha Time</label>
                <InputText
                  value={mosque.prayerTimes.isha}
                  onChange={(e) =>
                    setMosque({
                      ...mosque,
                      prayerTimes: {
                        ...mosque.prayerTimes,
                        isha: e.target.value,
                      },
                    })
                  }
                  className="w-full"
                />

                <div className="flex gap-2 mt-3">
                  <Button
                    label="Save Changes"
                    icon="pi pi-save"
                    onClick={handleEditMosque}
                    className="p-button-success"
                  />
                  <Button
                    label="Cancel"
                    className="p-button-secondary"
                    onClick={() => setIsEditing(false)}
                  />
                </div>
              </div>
              

            </div>
          )}
        </Card>
      ) : (
        
        <div className="text-center">
          <h2>You don't have any Mosque</h2>
          <MyMosque />
          {/* <Button label="Create Mosque" icon="pi pi-plus" onClick={handleCreateMosque} className="p-button-primary" /> */}
        </div>
      )
    }
    
    </div>
  );
}
