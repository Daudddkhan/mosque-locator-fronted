import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";
export const GET_PROFILE =  "/api/users/profile";
       const UPDATE_ROLE = "/api/users/updateRole"
       const UPDATE_LOCATION = "/api/users/profile/location"
    


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
 
export const updateRole = async (role:any) => {
    try{
        const response = await axios.post(
            `${API_BASE_URL}${UPDATE_ROLE}`, 
            { roles: role }, 
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
        return response.data
    } catch(error){
      
        return error
    }

}

export const updateLocation = async (data : string) => {
    const response = await axios.put(`${API_BASE_URL}${UPDATE_LOCATION}`,
        { data: data} ,
        {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    })

    if(response.status != 200 ){ 
        return response.status
    }
    return response.data
}
