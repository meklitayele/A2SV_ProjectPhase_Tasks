"use client";

import React, { useState } from "react";
import { auth, signIn } from "../../auth";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { PassThrough } from "stream";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const role = "user";
    try {
      const respose = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          role,
        }),
      });
      const data = await respose.json();
      if (data.success) {
        alert("Sign up successful");
        window.location.href = "/verify";
      } else {
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("An error occurred during sign up");
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center bg-white min-h-screen justify-center"
        style={{ color: "rgb(37, 50, 75)" }}
      >
        <div className="text-2xl font-extrabold mb-4">Sign Up Today!</div>
        <div
          className=" flex flex-row border rounded-[6px] pl-30 pr-30 pt-3 pb-3"
          style={{ color: "rgb(204, 204, 245)" }}
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          <button>
            <Link
              href="/api/auth/signin"
              className="font-bold"
              style={{ color: "rgb(45, 41, 142)" }}
            >
              Sign Up with Google
            </Link>
          </button>
        </div>
        <div className="mt-4 flex items-center w-full">
          <div className="flex-grow border-t border-gray-300 ml-107 mr-2"></div>
          <div className="text-gray-400">Or Sign Up with Email</div>
          <div className="flex-grow border-t border-gray-300 mr-107 ml-2"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <div className="" style={{ color: "rgb(81, 91, 111)" }}>
              Full Name
            </div>
            <div>
              <input
                className="border border-gray-200 rounded-[6px] pl-30 pr-30 pt-3 pb-3"
                style={{ color: "rgb(214, 221, 235)", textAlign: "left" }}
                placeholder="Enter your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="" style={{ color: "rgb(81, 91, 111)" }}>
              Email Address
            </div>
            <div>
              <input
                className="border border-gray-200 rounded-[6px] pl-30 pr-30 pt-3 pb-3"
                style={{ color: "rgb(214, 221, 235)", textAlign: "left" }}
                placeholder="Enter  email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="" style={{ color: "rgb(81, 91, 111)" }}>
              Password
            </div>
            <div>
              <input
                className="border border-gray-200 rounded-[6px] pl-30 pr-30 pt-3 pb-3"
                style={{ color: "rgb(214, 221, 235)", textAlign: "left" }}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-5">
            <div className="" style={{ color: "rgb(81, 91, 111)" }}>
              Confirm Password
            </div>
            <div>
              <input
                className="border border-gray-200 rounded-[6px] pl-30 pr-30 pt-3 pb-3"
                style={{ color: "rgb(214, 221, 235)", textAlign: "left" }}
                placeholder="Enter password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              className="pl-47 pr-47 pt-3 pb-3 rounded-[30px] text-white font-bold"
              style={{ background: "rgb(45, 41, 142)" }}
            >
              Continue
            </button>
            <div className="mt-4">
              <span className="text-gray-500">Already have an account? </span>
              <span>
                <Link
                  href="/api/auth/signin"
                  className="font-bold"
                  style={{ color: "rgb(45, 41, 142)" }}
                >
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
        <div className="mt-4 text-[14px] text-gray-400 ml-103 mr-103">
          By clicking 'Continue', you acknowledge that you have read and
          accepted to our{" "}
          <span style={{ color: "rgb(45, 41, 142)" }}>Terms of Service</span>{" "}
          and <span style={{ color: "rgb(45, 41, 142)" }}>Privacy Policy</span>.
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
