
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const AUTH_URI = "/api/auth"
const MOSQUE_URI = '/mosque/api';

export const token = localStorage.getItem("token")
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${AUTH_URI}/register`, { name, email, password });
    return { success: true, data: response.data }; // Return success response
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data }; // Return backend error message
    } else {
      return { success: false, error: "An unexpected error occurred. Please try again." };
    }
  }
};

export const loginUser = async (email: string, password: string) =>{
  try {
    const response = await axios.post(`${API_BASE_URL}${AUTH_URI}/login`, { email,password });
    console.log("login successful:", response.data);
    return { success: true, data: response.data }; // Return success response
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data }; // Return backend error message
    } else {
      return { success: false, error: "An unexpected error occurred. Please try again." };
    }
  }
  
}

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found, user might already be logged out.");
      return { success: false, error: "User already logged out." };
    }
    // Sending request with Authorization header
    const response = await axios.post(
      `${API_BASE_URL}${AUTH_URI}/logout`, 
      {},  // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Remove token after successful logout
    localStorage.removeItem("token");
    return { success: true, data: response.data };

  } catch (error: any) {
    console.error("Logout error:", error.response?.data || error.message);

    // Ensure token is removed even if logout request fails
    localStorage.removeItem("token");

    return {
      success: false,
      error: error.response?.data?.error || "Failed to log out. Please try again.",
    };
  }
};


export const verifyOtp = async (email: string, otp: string) => {
  return axios.post(`${API_BASE_URL}${AUTH_URI}/verify-otp`, { email, otp });
};

export const resendOtp = async (email: string) => {
  return axios.post(`${API_BASE_URL}${AUTH_URI}/sendOtp`, { email });
};

