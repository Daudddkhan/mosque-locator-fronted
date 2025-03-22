
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const AUTH_URI = "/api/auth"
const MOSQUE_URI = '/mosque/api';

export const registerUser = (name: string, email: string, password: string) =>
  axios.post(`${API_BASE_URL}${AUTH_URI}/register`, { name, email, password });

export const loginUser = (email: string, password: string) =>
  // console.log(email,password)
  axios.post(`${API_BASE_URL}${AUTH_URI}/login`, { email,password });

export const verifyOtp = async (email: string, otp: string) => {
  return axios.post(`${API_BASE_URL}${AUTH_URI}/verify-otp`, { email, otp });
};

export const resendOtp = async (email: string) => {
  return axios.post(`${API_BASE_URL}${AUTH_URI}/sendOtp`, { email });
};

export const fetchMosques = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${MOSQUE_URI}/nearest?latitude=${latitude}&longitude=${longitude}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mosques:", error);
    return [];
  }
};