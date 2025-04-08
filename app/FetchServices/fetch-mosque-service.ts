
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const MOSQUE_URI = '/mosque/api';
const DELETE_MOSQUE = "/api/users/mosques"
const GET_MOSQUE = "/mosque/api/getById"



export const getCreatedByMosque = async ()=>{
const token = localStorage.getItem("token")

    try {
          const response = await axios.get(`${API_BASE_URL}${MOSQUE_URI}/getCreatedBy`, {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          return response.data
        } catch (error) {
          console.error("Error fetching mosque:", error);
        }
}

export const fetchMosques = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${MOSQUE_URI}/nearest?latitude=${latitude}&longitude=${longitude}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching mosques:", error);
      return [];
    }
  };

export const createMosque = async (mosqueData:any) => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(`${API_BASE_URL}${MOSQUE_URI}/create`, mosqueData, {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
      });
      
      return {
          success: true,
          data: response.data
      };
  } catch (error) {
      console.error("Error creating mosque:", error);
      return {
          success: false,
          // error: error.response?.data || error.message/
      };
  }
}

export const updateMosque = async (mosque: any) =>{
const token = localStorage.getItem("token")

      try {
          const response = await axios.post(
            `${API_BASE_URL}${MOSQUE_URI}/update/${mosque.id}`,
            mosque,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return response.data
    
        } catch (error) {
          console.error("Error updating mosque:", error)
        }
}

export const removeMosque = async (id:any) => {
const token = localStorage.getItem("token")

    try{
        const response = await axios.delete(`${API_BASE_URL}${DELETE_MOSQUE}/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        })
        
        return response.data
 
    } catch (error){
        return error
    }
}

export const getFavMosque = async (id: any) => {
const token = localStorage.getItem("token")

    try{
        const response = await axios.get(`${API_BASE_URL}${GET_MOSQUE}/${id}`, {
            
            headers: {
              'Authorization': `Bearer ${token}`
            }    
          });
        return response.data;
    } catch(error){
        return error
    }
 
}