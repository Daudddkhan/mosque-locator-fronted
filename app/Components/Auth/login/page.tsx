// "use client";
// import { useState } from "react";
// import { loginUser } from "@/app/fetchService";
// import { useRouter } from "next/navigation";
// import { Button } from "primereact/button";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       const response = await loginUser(form.email, form.password);
//       localStorage.setItem("token", response.data.token);
//       setMessage("Login successful! Redirecting...");
//       setTimeout(() => router.push("/dashboard"), 2000);
//     } catch (error) {
//       setMessage( "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
//   <div className="surface-card p-5 border-round shadow-3 w-25rem">
//     <h2 className="text-2xl font-bold text-center mb-3">Login</h2>
//     <div className="flex flex-column gap-2 mb-3">
//       <input name="email" type="email" placeholder="Email" onChange={handleChange} 
//         className="w-full p-2 border-round border-1 surface-border text-lg" />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} 
//         className="w-full p-2 border-round border-1 surface-border text-lg" />
//     </div>
//     <Button
//     label="login"
//     className="w-full p-1 border-round text-m font-bold "
//     onClick={handleLogin}
//     />
//     <p className="text-sm mt-2 text-center">
//           Don't have an account? <a href="/Components/Auth/register" className="text-blue-500">register</a>
//         </p>
//     {message && <p className="text-center text-red-500 mt-3">{message}</p>}
//   </div>
// </div>

    
//   );
// }


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
      setMessage("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="overflow-hidden relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/mosque3.webp')" }} // Ensure correct path
    >
      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Login Form */}
      <div className="flex align-items-center justify-content-center w-screen">
      <div className="p-5  bg-opacity-10 w-3 text-center border-round shadow-4" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
  <h2 className="text-3xl font-bold" style={{ color: "#FFD700" }}>Welcome</h2>
  <p className="mb-4" style={{ color: "#AEEEEE" }}>Sign in to explore mosques</p>

  <div className="flex flex-column gap-3 mb-4">
    <input
      name="email"
      type="email"
      placeholder="Email"
      onChange={handleChange}
      className="w-11 p-3 border-1 border-round text-lg"
      style={{ background: "rgba(255, 255, 255, 0.1)", color: "#FFFFFF", borderColor: "#FFD700" }}
    />
    <input
      name="password"
      type="password"
      placeholder="Password"
      onChange={handleChange}
      className="w-11 p-3 border-1 border-round text-lg"
      style={{ background: "rgba(255, 255, 255, 0.1)", color: "#FFFFFF", borderColor: "#FFD700" }}
    />
  </div>

  <Button
    label={loading ? "Logging in..." : "Login"}
    className="w-12 p-3 text-lg font-bold border-round"
    style={{ background: "#FFD700", color: "#000", border: "none" }}
    onClick={handleLogin}
    disabled={loading}
  />

  <p className="text-sm mt-3" style={{ color: "#AEEEEE" }}>
    Don't have an account?{" "}
    <a href="/Components/Auth/register" style={{ color: "#FFD700", fontWeight: "bold" }}>
      Register
    </a>
  </p>

  {message && <p className="mt-3" style={{ color: "#FF4C4C" }}>{message}</p>}
</div>

      </div>
    </div>
  );
}
