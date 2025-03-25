// // app/profile/page.tsx
// 'use client'

// import { useState, useEffect } from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { Dialog } from 'primereact/dialog';
// import { Toast } from 'primereact/toast';
// import { useRef } from 'react';
// import { Divider } from 'primereact/divider';
// import { Avatar } from 'primereact/avatar';
// import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
// import { DataView } from 'primereact/dataview';
// import { getFavMosque, getProfile, removeMosque, updateLocation, updateRole } from '@/app/FetchServices/fetch-profile';


// // Define types
// interface Profile {
//   id: string;
//   name: string;
//   email: string;
//   roles: string; 
//   phone?: string;
//   favouriteMosque?: FavoriteMosque[];
//   location?: {
//     coordinates: [number, number] | null;
//     address?: string;
//   };
//   profileImage?: string;
//   verified: boolean;
// }


// interface FavoriteMosque {
//   contactNumber: string;
//   createdAt: string;
//   createdBy: string;
//   description: string;
//   distance: number;
//   id: string;
//   location: {
//     x: number;
//     y: number;
//     type: string;
//     coordinates: number[];
//   };
//   name: string;
//   prayerTimes: {
//     fajr: string;
//     dhuhr: string;
//     asr: string;
//     maghrib: string;
//     isha: string;
//   };
//   updatedAt: string;
//   updatedBy: string | null;
// }


// interface RoleOption {
//   label: string;
//   value: string;
// }
// export default function ProfilePage() {
//   // State management
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [locationDialog, setLocationDialog] = useState(false);
//   const [favoriteMosques, setFavoriteMosques] = useState<FavoriteMosque[]>([]);
//   const [address, setAddress] = useState('');
//   const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);  const toast = useRef<Toast>(null);

//   // Role options
//   const roleOptions = [
//     { label: 'USER', value: 'USER' },
//     { label: 'Mosque Admin', value: 'MOSQUE_ADMIN' },
//     { label: 'ADMIN', value: 'ADMIN' }
//   ];


//   // Format role for display
//   const formatRoleLabel = (roles?: string): string => {
//     if (!roles) return "  Unknown Role"; // ✅ Handle undefined case
  
//     return roles
//       .replace('_', ' ')
//       .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
//   };

//   // Format mosque data helper function
// const formatMosqueData = (data: any): FavoriteMosque => {

//   if (!data) {
//     console.log("No mosque data provided to formatMosqueData");
//     // Return a default/empty mosque object
//     return {
//       contactNumber: "",
//       createdAt: "",
//       createdBy: "",
//       description: "",
//       distance: 0,
//       id: "",
//       location: {
//         x: 0,
//         y: 0,
//         type: "Point",
//         coordinates: [0, 0]
//       },
//       name: "",
//       prayerTimes: {
//         fajr: "",
//         dhuhr: "",
//         asr: "",
//         maghrib: "",
//         isha: ""
//       },
//       updatedAt: "",
//       updatedBy: null
//     };
//   }

//   return {
//     contactNumber: data.contactNumber || "",
//     createdAt: data.createdAt || "",
//     createdBy: data.createdBy || "",
//     description: data.description || "",
//     distance: data.distance || 0,
//     id: data.id || "",
//     location: {
//       x: data.location?.x || 0,
//       y: data.location?.y || 0,
//       type: data.location?.type || "Point",
//       coordinates: data.location?.coordinates || [0, 0],
//     },
//     name: data.name || "",
//     prayerTimes: {
//       fajr: data.prayerTimes?.fajr || "",
//       dhuhr: data.prayerTimes?.dhuhr || "",
//       asr: data.prayerTimes?.asr || "",
//       maghrib: data.prayerTimes?.maghrib || "",
//       isha: data.prayerTimes?.isha || "",
//     },
//     updatedAt: data.updatedAt || "",
//     updatedBy: data.updatedBy || null,
//   };
// };
  

//   // Handle update profile
//   const handleUpdateProfile = async () => {
//     try {
//       if (!profile) return;
      
//       const response = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: profile.name,
//           phone: profile.phone,
//           email: profile.email
//         })
//       });
      
//       if (!response.ok) throw new Error('Failed to update profile');
      
//       toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
//       setEditMode(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update profile' });
//     }
//   };

//   // Handle update location
//   const handleUpdateLocation = async () => {
    
//     try {
//       // const response = await updateLocation()

      
      
//       // Update profile with new location
//       if (profile) {
//         const updatedProfile = { 
//           ...profile, 
//           location: { 
//             ...profile.location,
//             address 
//           } 
//         };
//         // setProfile(updatedProfile);
//       }
      
//       toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Location updated successfully' });
//       setLocationDialog(false);
//     } catch (error) {
//       console.error('Error updating location:', error);
//       toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update location' });
//     }
//   };

//   // Handle update role
//   const handleUpdateRole = async () => {
    
//     try {
//       if (!selectedRole || !profile) return;
      
//       const response = await updateRole(selectedRole);
//       console.log("Server response:", response);
      
//       // Then update local state
//       setSelectedRole(selectedRole);
      
//       // Update profile with new role using callback form to ensure we get the latest state
//       setProfile((prev) => {
//         if (!prev) return prev;
//         return { ...prev, roles: selectedRole.value };
//       });
// setTimeout(() => {
//         console.log("Updated profile (after delay):", profile);
//       }, 100);      
//     // setSelectedRole({ label: formatRoleLabel(selectedRole.label), value: selectedRole.value });

      
//       toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Role updated successfully' });
//     } catch (error) {
//       console.error('Error updating role:', error);
//       toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update role' });
//     }
//   };

//   // Handle remove favorite mosque
//   const handleRemoveFavorite = async (mosqueId: string) => {
//     confirmDialog({
//       message: 'Are you sure you want to remove this mosque from favorites?',
//       header: 'Confirm',
//       icon: 'pi pi-exclamation-triangle',
//       accept: async () => {
//         try {
//           console.log(mosqueId)
//           const response = await removeMosque(mosqueId)
          
//           if (!response.ok) throw new Error('Failed to remove favorite');
          
//           // Update the favorites list
//           setFavoriteMosques(favoriteMosques.filter(mosque => mosque.id !== mosqueId));
          
//           toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Mosque removed from favorites' });
//         } catch (error) {
//           console.error('Error removing favorite:', error);
//           toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to remove from favorites' });
//         }
//       }
//     });
//   };

//  const fetchProfile = async () => {
//   try {
//     const response = await getProfile();
//     const data = response.data;
    
//     const formattedProfile: Profile = {
//       id: data.id || "",
//       name: data.name || "Unknown",
//       email: data.email || "",
//       roles: data.roles || "USER",
//       phone: data.phone || "",
//       favouriteMosque: data.favoriteMosques || [],
//       location: data.location
//         ? {
//             coordinates: data.location.coordinates || [0, 0],
//             address: data.location.address || "Unknown"
//           }
//         : undefined,
//       profileImage: data.profileImage || "",
//       verified: data.verified ?? false
//     };
    
//     setProfile(formattedProfile);
//     setSelectedRole({ label: formatRoleLabel(data.roles), value: data.roles });
//     setAddress(data.location?.address || '');
    
//     // Fetch favorite mosque data if available
//     const mosqueId = data.favoriteMosques?.[0];
    
//     if (mosqueId) {
//       try {
//         const mosqueResponse = await getFavMosque(mosqueId);
//         console.log("Favorite mosques response:", mosqueResponse);
        
//         const mosqueData = mosqueResponse.data || mosqueResponse;
        
//         if (mosqueData) {
//           // Safely format mosque data
//           let formattedMosque: FavoriteMosque | null = null;
          
//           if (Array.isArray(mosqueData)) {
//             // Handle array case
//             if (mosqueData.length > 0) {
//               formattedMosque = formatMosqueData(mosqueData[0]);
//             }
//           } else {
//             // Handle single object case
//             formattedMosque = formatMosqueData(mosqueData);
//           }
          
//           if (formattedMosque) {
//             setFavoriteMosques([formattedMosque]);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching favorite mosque:', error);
//         toast.current?.show({ 
//           severity: 'error', 
//           summary: 'Error', 
//           detail: 'Failed to load favorite mosque data' 
//         });
//       }
//     }
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     toast.current?.show({ 
//       severity: 'error', 
//       summary: 'Error', 
//       detail: 'Failed to load profile data' 
//     });
//   } finally {
//     setLoading(false);
//   }
// };
//   useEffect(() => {
//     fetchProfile();
//   }, []);


//   // Render favorite mosque card
//   const renderFavoriteMosque = (mosque: FavoriteMosque) => {
//     return (
//       <div className="col-12 md:col-6 lg:col-4 p-2">
//         <Card className="h-full shadow-2 hover:shadow-4 transition-duration-300">
//           <div className="flex flex-column h-full">
//             <div className="relative">
//               <img
//                 src="/api/placeholder/400/200" // Placeholder image
//                 alt={mosque.name}
//                 className="w-full h-12rem object-cover border-round-top"
//               />
//               <div className="absolute top-0 right-0 m-2">
//                 <Button
//                   icon="pi pi-trash"
//                   className="p-button-rounded p-button-danger p-button-text"
//                   onClick={() => handleRemoveFavorite(mosque.id)}
//                   tooltip="Remove from favorites"
//                 />
//               </div>
//             </div>
//             <div className="flex-1 flex flex-column p-4">
//               <h3 className="text-xl font-semibold mb-2 text-primary">{mosque.name}</h3>
//               <p className="text-color-secondary mb-3 flex-1 line-clamp-2">{mosque.description || "No description available"}</p>
              
//               <div className="border-top-1 border-300 pt-3 mt-auto">
//                 <div className="flex align-items-center mb-2">
//                   <i className="pi pi-phone mr-2 text-primary"></i>
//                   <span>{mosque.contactNumber || "No phone number"}</span>
//                 </div>
//                 <div className="flex align-items-center mb-2">
//                   <i className="pi pi-map-marker mr-2 text-primary"></i>
//                   <span>{mosque.distance?.toFixed(2) || "0"} km away</span>
//                 </div>
//                 <div className="flex align-items-center">
//                   <i className="pi pi-clock mr-2 text-primary"></i>
//                   <span>Fajr: {mosque.prayerTimes?.fajr || "N/A"}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     );
//   };
//   if (loading) {
//     return (
//       <div className="flex justify-content-center align-items-center min-h-screen">
//         <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="flex justify-content-center align-items-center min-h-screen">
//         <Card title="Error" className="w-full md:w-6">
//           <p>Unable to load profile. Please try again later.</p>
//           <Button label="Retry" icon="pi pi-refresh" onClick={() => window.location.reload()} />
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 mt-4">
//       <Toast ref={toast} />
//       <ConfirmDialog />
      
//       <div className="grid">
//         {/* Profile Card */}
//         <div className="col-12 md:col-4 lg:col-3">
//           <Card className="mb-4">
//             <div className="flex flex-column align-items-center text-center mb-4">
//               <Avatar 
//                 image={profile.profileImage || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} 
//                 size="xlarge" 
//                 shape="circle" 
//                 className="mb-3"
//                 style={{ width: '150px', height: '150px' }}
//               />
//               <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
//               <p className="text-color-secondary mb-2">{formatRoleLabel(profile.roles)}</p>
              
//               <div className="flex justify-content-center gap-2 mt-2">
//                 <Button 
//                   icon="pi pi-pencil" 
//                   className={`p-button-rounded ${editMode ? 'p-button-success' : 'p-button-outlined'}`}
//                   onClick={() => setEditMode(!editMode)}
//                   tooltip={editMode ? "Save" : "Edit Profile"}
//                 />
//                 <Button 
//                   icon="pi pi-map-marker" 
//                   className="p-button-rounded p-button-outlined"
//                   onClick={() => setLocationDialog(true)}
//                   tooltip="Update Location"
//                 />
//               </div>
//             </div>
            
//             <Divider />
            
//             {/* Profile Details */}
//             <div className="p-fluid">
//               <div className="field mb-3">
//                 <label htmlFor="name" className="block font-medium mb-2">Name</label>
//                 {editMode ? (
//                   <InputText 
//                     id="name" 
//                     value={profile.name} 
//                     onChange={(e) => setProfile({...profile, name: e.target.value})}
//                   />
//                 ) : (
//                   <p className="mb-0">{profile.name}</p>
//                 )}
//               </div>
              
//               <div className="field mb-3">
//                 <label htmlFor="email" className="block font-medium mb-2">Email</label>
//                 {editMode ? (
//                   <InputText 
//                     id="email" 
//                     value={profile.email}
//                     onChange={(e) => setProfile({...profile, email: e.target.value})}
//                     disabled
//                   />
//                 ) : (
//                   <p className="mb-0">{profile.email}</p>
//                 )}
//               </div>
              
//               <div className="field mb-3">
//                 <label htmlFor="phone" className="block font-medium mb-2">Phone</label>
//                 {editMode ? (
//                   <InputText 
//                     id="phone" 
//                     value={profile.phone} 
//                     onChange={(e) => setProfile({...profile, phone: e.target.value})}
//                   />
//                 ) : (
//                   <p className="mb-0">{profile.phone || "Not provided"}</p>
//                 )}
//               </div>
              
//               <div className="field mb-3">
//                 <label htmlFor="address" className="block font-medium mb-2">Address</label>
//                 <p className="mb-0 flex align-items-center">
//                   <i className="pi pi-map-marker mr-2"></i>
//                   {profile.location?.address || "Not provided"}
//                 </p>
//               </div>
              
//               <div className="field mb-3">
//                 <label htmlFor="role" className="block font-medium mb-2">Role</label>
//                 <div className="flex align-items-center gap-2">
//                   <Dropdown 
//                     id="role"
//                     value={selectedRole}
//                     options={roleOptions}
//                     onChange={(e) => setSelectedRole(e.value)}
//                     optionLabel="label"
//                     className="w-full"
//                   />
//                   <Button 
//                     icon="pi pi-check" 
//                     className="p-button-success p-button-rounded" 
//                     onClick={handleUpdateRole}
//                     disabled={!selectedRole || selectedRole.value === profile.roles}
//                   />
//                 </div>
//               </div>
              
//               {editMode && (
//                 <Button 
//                   label="Save Changes" 
//                   icon="pi pi-save" 
//                   className="w-full mt-3" 
//                   onClick={handleUpdateProfile}
//                 />
//               )}
//             </div>
//           </Card>
//         </div>
        
//         {/* Favorite Mosques */}
//         <div className="col-12 md:col-8 lg:col-9">
//           <Card title="Favorite Mosques" className="h-full">
//             {favoriteMosques.length > 0 ? (
//               <DataView 
//                 value={favoriteMosques} 
//                 layout="grid" 
//                 itemTemplate={renderFavoriteMosque} 
//                 rows={6}
//               />
//             ) : (
//               <div className="flex flex-column align-items-center justify-content-center p-5">
//                 <img 
//                   src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-7416.jpg" 
//                   alt="No favorites" 
//                   style={{ width: '200px' }}
//                   className="mb-3"
//                 />
//                 <h3>No Favorite Mosques</h3>
//                 <p className="text-center text-color-secondary">
//                   You haven't added any mosques to your favorites yet. Explore mosques near you and add them to your favorites.
//                 </p>
//                 <Button label="Explore Mosques" icon="pi pi-search" className="mt-3" />
//               </div>
//             )}
//           </Card>
//         </div>
//       </div>
      
//       {/* Location Update Dialog */}
//       <Dialog 
//         header="Update Location" 
//         visible={locationDialog} 
//         style={{ width: '450px' }} 
//         onHide={() => setLocationDialog(false)}
//         footer={
//           <div className="flex justify-content-end gap-2">
//             <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setLocationDialog(false)} />
//             <Button label="Update" icon="pi pi-check" onClick={handleUpdateLocation} />
//           </div>
//         }
//       >
//         <div className="p-fluid">
//           <div className="field">
//             <label htmlFor="address" className="font-medium mb-2 block">Address</label>
//             <InputText 
//               id="address" 
//               value={address} 
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Enter your address"
//             />
//           </div>
//           <div className="mt-4">
//             <p className="text-sm text-color-secondary">
//               <i className="pi pi-info-circle mr-2"></i>
//               Updating your location will help us find mosques nearest to you.
//             </p>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// }




// app/profile/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataView } from 'primereact/dataview';
import { getFavMosque, getProfile, removeMosque, updateLocation, updateRole } from '@/app/FetchServices/fetch-profile';
import MyMosque from '../Mosques/MyMosque';


// Define types
interface Profile {
  id: string;
  name: string;
  email: string;
  roles: string; 
  phone?: string;
  favouriteMosque?: FavoriteMosque[];
  location?: {
    coordinates: [number, number] | null;
    address?: string;
  };
  profileImage?: string;
  verified: boolean;
}


interface FavoriteMosque {
  contactNumber: string;
  createdAt: string;
  createdBy: string;
  description: string;
  distance: number;
  id: string;
  location: {
    x: number;
    y: number;
    type: string;
    coordinates: number[];
  };
  name: string;
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  updatedAt: string;
  updatedBy: string | null;
}


interface RoleOption {
  label: string;
  value: string;
}

export default function ProfilePage() {
  // State management
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [locationDialog, setLocationDialog] = useState(false);
  const [favoriteMosques, setFavoriteMosques] = useState<FavoriteMosque[]>([]);
  const [address, setAddress] = useState('');
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const toast = useRef<Toast>(null);

  // Role options
  const roleOptions = [
    { label: 'USER', value: 'USER' },
    { label: 'Mosque Admin', value: 'MOSQUE_ADMIN' },
    { label: 'ADMIN', value: 'ADMIN' }
  ];


  // Format role for display
  // Improved formatRoleLabel function
const formatRoleLabel = (roles?: string): string => {
  if (!roles) return "Unknown Role";

  // Handle multiple underscores and properly capitalize each word
  return roles
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

  // Format mosque data helper function
  const formatMosqueData = (data: any): FavoriteMosque => {
    if (!data) {
      console.log("No mosque data provided to formatMosqueData");
      // Return a default/empty mosque object
      return {
        contactNumber: "",
        createdAt: "",
        createdBy: "",
        description: "",
        distance: 0,
        id: "",
        location: {
          x: 0,
          y: 0,
          type: "Point",
          coordinates: [0, 0]
        },
        name: "",
        prayerTimes: {
          fajr: "",
          dhuhr: "",
          asr: "",
          maghrib: "",
          isha: ""
        },
        updatedAt: "",
        updatedBy: null
      };
    }

    return {
      contactNumber: data.contactNumber || "",
      createdAt: data.createdAt || "",
      createdBy: data.createdBy || "",
      description: data.description || "",
      distance: data.distance || 0,
      id: data.id || "",
      location: {
        x: data.location?.x || 0,
        y: data.location?.y || 0,
        type: data.location?.type || "Point",
        coordinates: data.location?.coordinates || [0, 0],
      },
      name: data.name || "",
      prayerTimes: {
        fajr: data.prayerTimes?.fajr || "",
        dhuhr: data.prayerTimes?.dhuhr || "",
        asr: data.prayerTimes?.asr || "",
        maghrib: data.prayerTimes?.maghrib || "",
        isha: data.prayerTimes?.isha || "",
      },
      updatedAt: data.updatedAt || "",
      updatedBy: data.updatedBy || null,
    };
  };
  

  // Handle update profile
  const handleUpdateProfile = async () => {
    try {
      if (!profile) return;
      
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          phone: profile.phone,
          email: profile.email
        })
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update profile' });
    }
  };

  // Handle update location
  const handleUpdateLocation = async () => {
    try {
      const response = await updateLocation(address);
      
      if (!response.ok) throw new Error('Failed to update location');
      
      // Update profile with new location immediately after the API call succeeds
      // setProfile((prevProfile) => {
      //   if (!prevProfile) return null;
      //   return {
      //     ...prevProfile,
      //     location: {
      //       ...prevProfile.location,
      //       address
      //     }
      //   };
      // });
      
      toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Location updated successfully' });
      setLocationDialog(false);
    } catch (error) {
      console.error('Error updating location:', error);
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update location' });
    }
  };

  // const formattedProfile: Profile = {
  //   id: data.id || "",
  //   name: data.name || "Unknown",
  //   email: data.email || "",
  //   roles: data.roles || "USER",
  //   phone: data.phone || "",
  //   favouriteMosque: data.favoriteMosques || [],
  //   location: data.location
  //     ? {
  //         coordinates: data.location.coordinates || [0, 0],
  //         address: data.location.address || "Unknown"
  //       }
  //     : undefined,
  //   profileImage: data.profileImage || "",
  //   verified: data.verified ?? false
  // };

  // Handle update role
  // For the handleUpdateRole function:
const handleUpdateRole = async () => {
  try {
    if (!selectedRole || !profile) return;
    
    const roleToUpdate = selectedRole; // Create a copy
    
    // Call API
    await updateRole(roleToUpdate);
    
    // Update local state AFTER the API call completes
    setProfile(prevProfile => {
      if (!prevProfile) return null;
      return { ...prevProfile, roles: roleToUpdate.value };
    });
    
    const matchingRoleOption = roleOptions.find(option => option.value === roleToUpdate.value);
    
    // Only update selectedRole if we found a matching option
    if (matchingRoleOption) {
      setSelectedRole(matchingRoleOption);
    }

    
    toast.current?.show({ 
      severity: 'success', 
      summary: 'Success', 
      detail: 'Role updated successfully' 
    });
  } catch (error) {
    console.error('Error updating role:', error);
    toast.current?.show({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Failed to update role' 
    });
  }
};

  //   const handleUpdateRole = async () => {
    
//     try {
//       if (!selectedRole || !profile) return;
      
//       const response = await updateRole(selectedRole);
//       console.log("Server response:", response);
      
//       // Then update local state
//       setSelectedRole(selectedRole);
      
//       // Update profile with new role using callback form to ensure we get the latest state
//       setProfile((prev) => {
//         if (!prev) return prev;
//         return { ...prev, roles: selectedRole.value };
//       });
// setTimeout(() => {
//         console.log("Updated profile (after delay):", profile);
//       }, 100);      
//     // setSelectedRole({ label: formatRoleLabel(selectedRole.label), value: selectedRole.value });

      
//       toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Role updated successfully' });
//     } catch (error) {
//       console.error('Error updating role:', error);
//       toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to update role' });
//     }
//   };

  // Handle remove favorite mosque
  const handleRemoveFavorite = async (mosqueId: string) => {
    confirmDialog({
      message: 'Are you sure you want to remove this mosque from favorites?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          const response = await removeMosque(mosqueId);
          
          if (!response.ok) throw new Error('Failed to remove favorite');
          
          // Update the favorites list immediately after successful API call
          setFavoriteMosques((prevMosques) => 
            prevMosques.filter(mosque => mosque.id !== mosqueId)
          );
          
          toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Mosque removed from favorites' });
        } catch (error) {
          console.error('Error removing favorite:', error);
          toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to remove from favorites' });
        }
      }
    });
  };

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      const data = response.data;
      
      const formattedProfile: Profile = {
        id: data.id || "",
        name: data.name || "Unknown",
        email: data.email || "",
        roles: data.roles || "USER",
        phone: data.phone || "",
        favouriteMosque: data.favoriteMosques || [],
        location: data.location
          ? {
              coordinates: data.location.coordinates || [0, 0],
              address: data.location.address || "Unknown"
            }
          : undefined,
        profileImage: data.profileImage || "",
        verified: data.verified ?? false
      };
      
      setProfile(formattedProfile);
      setSelectedRole({ label: formatRoleLabel(data.roles), value: data.roles });
      setAddress(data.location?.address || '');
      
      // Fetch favorite mosque data if available
      await fetchFavoriteMosques(data.favoriteMosques);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.current?.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Failed to load profile data' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Separate function to fetch favorite mosques
  const fetchFavoriteMosques = async (mosqueIds: string[] = []) => {
    if (!mosqueIds || mosqueIds.length === 0) {
      setFavoriteMosques([]);
      return;
    }

    try {
      // Assuming we want to fetch just the first one for simplicity
      const mosqueId = mosqueIds[0];
      const mosqueResponse = await getFavMosque(mosqueId);
      console.log("Favorite mosques response:", mosqueResponse);
      
      const mosqueData = mosqueResponse.data || mosqueResponse;
      
      if (mosqueData) {
        // Safely format mosque data
        let formattedMosque: FavoriteMosque | null = null;
        
        if (Array.isArray(mosqueData)) {
          // Handle array case
          if (mosqueData.length > 0) {
            formattedMosque = formatMosqueData(mosqueData[0]);
          }
        } else {
          // Handle single object case
          formattedMosque = formatMosqueData(mosqueData);
        }
        
        if (formattedMosque) {
          setFavoriteMosques([formattedMosque]);
        }
      }
    } catch (error) {
      console.error('Error fetching favorite mosque:', error);
      toast.current?.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Failed to load favorite mosque data' 
      });
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Update address when profile location changes
  useEffect(() => {
    if (profile?.location?.address) {
      setAddress(profile.location.address);
    }
  }, [profile?.location?.address]);

  // Render favorite mosque card
  const renderFavoriteMosque = (mosque: FavoriteMosque) => {
    return (
      <div className="col-12 md:col-6 lg:col-4 p-2">
        <Card className="h-full shadow-2 hover:shadow-4 transition-duration-300">
          <div className="flex flex-column h-full">
            <div className="relative">
              <img
                src="/api/placeholder/400/200" // Placeholder image
                alt={mosque.name}
                className="w-full h-12rem object-cover border-round-top"
              />
              <div className="absolute top-0 right-0 m-2">
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger p-button-text"
                  onClick={() => handleRemoveFavorite(mosque.id)}
                  tooltip="Remove from favorites"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-column p-4">
              <h3 className="text-xl font-semibold mb-2 text-primary">{mosque.name}</h3>
              <p className="text-color-secondary mb-3 flex-1 line-clamp-2">{mosque.description || "No description available"}</p>
              
              <div className="border-top-1 border-300 pt-3 mt-auto">
                <div className="flex align-items-center mb-2">
                  <i className="pi pi-phone mr-2 text-primary"></i>
                  <span>{mosque.contactNumber || "No phone number"}</span>
                </div>
                <div className="flex align-items-center mb-2">
                  <i className="pi pi-map-marker mr-2 text-primary"></i>
                  <span>{mosque.distance?.toFixed(2) || "0"} km away</span>
                </div>
                <div className="flex align-items-center">
                  <i className="pi pi-clock mr-2 text-primary"></i>
                  <span>Fajr: {mosque.prayerTimes?.fajr || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-content-center align-items-center min-h-screen">
        <Card title="Error" className="w-full md:w-6">
          <p>Unable to load profile. Please try again later.</p>
          <Button label="Retry" icon="pi pi-refresh" onClick={() => window.location.reload()} />
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 mt-4">
      <Toast ref={toast} />
      <ConfirmDialog />
      
      <div className="grid">
        {/* Profile Card */}
        <div className="col-12 md:col-4 lg:col-3">
          <Card className="mb-4">
            <div className="flex flex-column align-items-center text-center mb-4">
              <Avatar 
                image={profile.profileImage || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} 
                size="xlarge" 
                shape="circle" 
                className="mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
              <p className="text-color-secondary mb-2">{formatRoleLabel(profile.roles)}</p>
              
              <div className="flex justify-content-center gap-2 mt-2">
                <Button 
                  icon="pi pi-pencil" 
                  className={`p-button-rounded ${editMode ? 'p-button-success' : 'p-button-outlined'}`}
                  onClick={() => setEditMode(!editMode)}
                  tooltip={editMode ? "Save" : "Edit Profile"}
                />
                <Button 
                  icon="pi pi-map-marker" 
                  className="p-button-rounded p-button-outlined"
                  onClick={() => setLocationDialog(true)}
                  tooltip="Update Location"
                />
              </div>
            </div>
            
            <Divider />
            
            {/* Profile Details */}
            <div className="p-fluid">
              <div className="field mb-3">
                <label htmlFor="name" className="block font-medium mb-2">Name</label>
                {editMode ? (
                  <InputText 
                    id="name" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <p className="mb-0">{profile.name}</p>
                )}
              </div>
              
              <div className="field mb-3">
                <label htmlFor="email" className="block font-medium mb-2">Email</label>
                {editMode ? (
                  <InputText 
                    id="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled
                  />
                ) : (
                  <p className="mb-0">{profile.email}</p>
                )}
              </div>
              
              <div className="field mb-3">
                <label htmlFor="phone" className="block font-medium mb-2">Phone</label>
                {editMode ? (
                  <InputText 
                    id="phone" 
                    value={profile.phone || ""} 
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                ) : (
                  <p className="mb-0">{profile.phone || "Not provided"}</p>
                )}
              </div>
              
              <div className="field mb-3">
                <label htmlFor="address" className="block font-medium mb-2">Address</label>
                <p className="mb-0 flex align-items-center">
                  <i className="pi pi-map-marker mr-2"></i>
                  {profile.location?.address || "Not provided"}
                </p>
              </div>
              
              <div className="field mb-3">
                <label htmlFor="role" className="block font-medium mb-2">Role</label>
                <div className="flex align-items-center gap-2">
                  <Dropdown 
                    id="role"
                    value={selectedRole}
                    options={roleOptions}
                    onChange={(e) => setSelectedRole(e.value)}
                    optionLabel="label"
                    className="w-full"
                  />
                  <Button 
                    icon="pi pi-check" 
                    className="p-button-success p-button-rounded" 
                    onClick={handleUpdateRole}
                    disabled={!selectedRole || selectedRole.value === profile.roles}
                  />
                </div>
              </div>
              
              {editMode && (
                <Button 
                  label="Save Changes" 
                  icon="pi pi-save" 
                  className="w-full mt-3" 
                  onClick={handleUpdateProfile}
                />
              )}
            </div>
          </Card>
        </div>
        
        {/* Favorite Mosques */}
        <div className="col-12 md:col-8 lg:col-9">
          <Card title="Favorite Mosques" className="h-full">
            {/* {favoriteMosques.length > 0 ? (
              <DataView 
                value={favoriteMosques} 
                layout="grid" 
                itemTemplate={renderFavoriteMosque} 
                rows={6}
              />
            ) : (
              <div className="flex flex-column align-items-center justify-content-center p-5">
                <img 
                  src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-7416.jpg" 
                  alt="No favorites" 
                  style={{ width: '200px' }}
                  className="mb-3"
                />
                <h3>No Favorite Mosques</h3>
                <p className="text-center text-color-secondary">
                  You haven't added any mosques to your favorites yet. Explore mosques near you and add them to your favorites.
                </p>
                <Button label="Explore Mosques" icon="pi pi-search" className="mt-3" />
              </div>
            )} */}

            <MyMosque/>
          </Card>
        </div>
      </div>
      
      {/* Location Update Dialog */}
      <Dialog 
        header="Update Location" 
        visible={locationDialog} 
        style={{ width: '450px' }} 
        onHide={() => setLocationDialog(false)}
        footer={
          <div className="flex justify-content-end gap-2">
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setLocationDialog(false)} />
            <Button label="Update" icon="pi pi-check" onClick={handleUpdateLocation} />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="address" className="font-medium mb-2 block">Address</label>
            <InputText 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm text-color-secondary">
              <i className="pi pi-info-circle mr-2"></i>
              Updating your location will help us find mosques nearest to you.
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  );
}