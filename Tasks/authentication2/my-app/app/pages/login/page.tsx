'use client';
import React, { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("https://akil-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
      } else {
        console.error("Login error:", data.message);
        alert(data.message || "Login failed");
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
      <div className="text-2xl font-extrabold mb-4">Welcome back,</div>
      <div className="mt-2 flex items-center w-full">
        <div className="flex-grow border-t border-gray-300 ml-107 mr-40"></div>
        <div className="text-gray-400"></div>
        <div className="flex-grow border-t border-gray-300 mr-107 ml-2"></div>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mt-5">
          <div style={{ color: "rgb(81, 91, 111)" }}>Email Address</div>
          <input
            type="email"
            className="border border-gray-200 rounded-[6px] pl-3 pr-3 pt-3 pb-3 w-full"
            style={{ color: "rgb(37, 50, 75)", textAlign: "left" }}
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
          <div style={{ color: "rgb(81, 91, 111)" }}>Password</div>
          <input
            type="password"
            className="border border-gray-200 rounded-[6px] pl-3 pr-3 pt-3 pb-3 w-full"
            style={{ color: "rgb(37, 50, 75)", textAlign: "left" }}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="pl-47 pr-47 pt-3 pb-3 mt-5 rounded-[30px] text-white font-bold"
          style={{ background: "rgb(45, 41, 142)" }}
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <span className="text-gray-500">Don't have an account? </span>
        <Link
          href="/api/auth/signin"
          className="font-bold"
          style={{ color: "rgb(45, 41, 142)" }}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
