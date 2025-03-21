// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { registerUser } from "@/app/fetchService";
// import { AxiosError } from "axios";
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Value } from "sass";
        
                

// export default function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     try {
//       setLoading(true);
//       await registerUser(form.name, form.email, form.password);
//       setMessage("Registration successful! Check your email for OTP verification.");
//       setTimeout(() => router.push(`/Components/Auth/OtpVerify?email=${form.email}`), 2000);

//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       setMessage(axiosError.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
//       <div className="surface-card p-5 border-round shadow-3 w-25rem">
//         <h2 className="text-2xl font-bold text-center mb-3">Register</h2>
//         <InputText name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border-round border-1 mb-2" />
//         <InputText name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border-round border-1 mb-2" />
//         <InputText name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border-round border-1 mb-3" />
//         {
//           <Button label="register"
//           disabled={loading}
//           onClick={handleRegister}
//           className={`w-full p-1 border-round text-xl font-bold `}
//           loading={loading}
//           />
                
//         }
    
//         <p className="text-sm mt-2 text-center">
//           Already have an account? <a href="/Components/Auth/login" className="text-blue-500">Login</a>
//         </p>
//         {message && <p className="text-center text-red-500 mt-2">{message}</p>}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/fetchService";
import { AxiosError } from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

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
    <div
    className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/mosque3.webp')" }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Registration Form */}
      <div className="flex align-items-center justify-content-center w-screen">
      <div className="p-5  bg-opacity-10 w-3 text-center border-round shadow-4" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
        <h2 className="text-3xl font-bold" style={{ color: "#FFD700" }}>Register</h2>
        <p className="mb-4" style={{ color: "#AEEEEE" }}>Join us to explore mosques</p>

        <InputText
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border-1 border-round text-lg"
          style={{ background: "rgba(255, 255, 255, 0.1)", color: "#FFFFFF", borderColor: "#FFD700" }}
        />
        <InputText
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border-1 border-round text-lg mt-3"
          style={{ background: "rgba(255, 255, 255, 0.1)", color: "#FFFFFF", borderColor: "#FFD700" }}
        />
        <InputText
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border-1 border-round text-lg mt-3"
          style={{ background: "rgba(255, 255, 255, 0.1)", color: "#FFFFFF", borderColor: "#FFD700" }}
        />

        <Button
          label={loading ? "Registering..." : "Register"}
          className="w-full p-3 text-lg font-bold border-round mt-4"
          style={{ background: "#FFD700", color: "#000", border: "none" }}
          onClick={handleRegister}
          disabled={loading}
        />

        <p className="text-sm mt-3" style={{ color: "#AEEEEE" }}>
          Already have an account?{" "}
          <a href="/Components/Auth/login" style={{ color: "#FFD700", fontWeight: "bold" }}>
            Login
          </a>
        </p>

        {message && <p className="mt-3" style={{ color: "#FF4C4C" }}>{message}</p>}
      </div>
      </div>
    </div>
  );
}

