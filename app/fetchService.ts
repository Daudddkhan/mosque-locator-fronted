
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/auth"; // Update this

export const registerUser = (name: string, email: string, password: string) =>
  axios.post(`${API_BASE_URL}/register`, { name, email, password });

export const loginUser = (email: string, password: string) =>
  axios.post(`${API_BASE_URL}/login`, { email, password });

export const verifyOtp = async (email: string, otp: string) => {
  return axios.post(`${API_BASE_URL}/verify-otp`, { email, otp });
};

export const resendOtp = async (email: string) => {
  return axios.post(`${API_BASE_URL}/sendOtp`, { email });
};