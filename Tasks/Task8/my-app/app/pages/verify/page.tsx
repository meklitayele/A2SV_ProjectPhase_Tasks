'use client';
import React, { useState } from "react";

const VerifyPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const email = "john@example.com"; 
    const otpString = otp.join(""); 

    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, OTP: otpString }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("OTP verification successful:", data);
      } else {
        console.error("Verification error:", data.message);
        alert(data.message || "Verification failed");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error, please try again later");
    }
  };

  return (
    <div
      className="flex flex-col items-center bg-white min-h-screen justify-center"
      style={{ color: "rgb(37, 50, 75)" }}
    >
      <div className="text-2xl font-extrabold mb-4">Verify Email</div>
      <div className="mt-4 text-[15px] text-gray-400 ml-105 mr-105">
        We've sent a verification code to the email address you provided. To
        complete your registration, please enter the code below.
      </div>
      <div className="mt-25">
        <div>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              className="border rounded-[6px] w-[65px] h-[45px] mr-[30px] text-3xl"
              style={{
                color: "rgb(214, 221, 235)",
                textAlign: "center",
                borderColor: "rgb(177, 175, 241)",
              }}
              placeholder="0"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
            />
          ))}
        </div>
      </div>
      <button
        className="pl-47 pr-47 pt-3 pb-3 mt-8 rounded-[30px] text-white font-bold"
        style={{ background: "rgb(177, 175, 241)" }}
        onClick={handleSubmit} 
      >
        Continue
      </button>
    </div>
  );
};

export default VerifyPage;
