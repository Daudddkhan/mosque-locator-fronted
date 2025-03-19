"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/fetchService";
import { AxiosError } from "axios";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Value } from "sass";
        
                

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await registerUser(form.name, form.email, form.password);
      setMessage("Registration successful! Check your email for OTP verification.");
      setTimeout(() => router.push(`/Components/Auth/OtpVerify?email=${form.email}`), 2000);

    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setMessage(axiosError.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <div className="surface-card p-5 border-round shadow-3 w-25rem">
        <h2 className="text-2xl font-bold text-center mb-3">Register</h2>
        <InputText name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border-round border-1 mb-2" />
        <InputText name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border-round border-1 mb-2" />
        <InputText name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border-round border-1 mb-3" />
        {
          <Button label="register"
          disabled={loading}
          onClick={handleRegister}
          className={`w-full p-1 border-round text-xl font-bold `}
          loading={loading}
          />
                
        }
    
        <p className="text-sm mt-2 text-center">
          Already have an account? <a href="/Components/Auth/login" className="text-blue-500">Login</a>
        </p>
        {message && <p className="text-center text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
}
