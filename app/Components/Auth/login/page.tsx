"use client";
import { useState } from "react";
import { loginUser } from "@/app/fetchService";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await loginUser(form.email, form.password);
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error) {
      setMessage( "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
  <div className="surface-card p-5 border-round shadow-3 w-25rem">
    <h2 className="text-2xl font-bold text-center mb-3">Login</h2>
    <div className="flex flex-column gap-2 mb-3">
      <input name="email" type="email" placeholder="Email" onChange={handleChange} 
        className="w-full p-2 border-round border-1 surface-border text-lg" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} 
        className="w-full p-2 border-round border-1 surface-border text-lg" />
    </div>
    <Button
    label="login"
    className="w-full p-1 border-round text-m font-bold "
    onClick={handleLogin}
    />
    <p className="text-sm mt-2 text-center">
          Don't have an account? <a href="/Components/Auth/register" className="text-blue-500">register</a>
        </p>
    {message && <p className="text-center text-red-500 mt-3">{message}</p>}
  </div>
</div>

    
  );
}
