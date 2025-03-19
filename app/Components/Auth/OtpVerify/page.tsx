"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyOtp, resendOtp } from "@/app/fetchService";
import { AxiosError } from "axios";
import { Button } from "primereact/button";

export default function VerifyOtp() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    try {
      setLoading(true);
      await verifyOtp(email, otp);
      setMessage("OTP verified successfully! Redirecting to login...");
      setTimeout(() => router.push("/Components/Auth/login"), 2000);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      setMessage(axiosError.response?.data?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp(email);
      setMessage("New OTP sent to your email.");
    } catch (error) {
      setMessage("Failed to resend OTP. Try again.");
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <div className="surface-card p-5 border-round shadow-3 w-25rem">
        <h2 className="text-2xl font-bold text-center mb-3">Verify OTP</h2>
        <p className="text-center mb-2">Enter the OTP sent to <strong>{email}</strong></p>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border-round border-1 text-lg text-center mb-3" />
         {
                  <Button label="Verify OTP"
                  disabled={loading}
                  onClick={handleVerify}
                  className={`w-full p-3 border-round text-xl font-bold `} />                 
        }
        {<Button
        label="Resend OTP"
        onClick={handleResendOtp}
        className="w-full p-1 border-round text-m font-bold "/>
    
        }
        {message && <p className="text-center text-red-500 mt-3">{message}</p>}
      </div>
    </div>
  );
}
