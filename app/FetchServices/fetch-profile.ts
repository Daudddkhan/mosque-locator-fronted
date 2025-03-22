import axios from "axios";
import { error } from "console";

export const API_BASE_URL = "http://localhost:8080";
export const GET_PROFILE =  "/api/users/profile";
export const GET_MOSQUE = "/mosque/api/getById"
const token = localStorage.getItem("token");

export const getProfile = async() => {
    const response = await axios(`${API_BASE_URL}${GET_PROFILE}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }    
      }
    );
        return response;
}

export const getFavMosque = async (id: any) => {
    try{
        const response = await axios.get(`${API_BASE_URL}${GET_MOSQUE}/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }    
          });
        return response;
    } catch(error){
        return error
    }
 
}
