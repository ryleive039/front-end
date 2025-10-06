"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.status && res.data.isOnboarded) {
        router.push("/home");
      } else {
        router.push("/user-onboarding");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Subtle gradient + soft noise effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent)]" />

      {/* Login container */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-2xl p-12 shadow-[8px_8px_20px_rgba(0,0,0,0.8),-8px_-8px_20px_rgba(255,255,255,0.05)]">
        <h1 className="text-3xl font-extrabold text-center text-white drop-shadow-lg mb-8 tracking-wider">
          LOGIN
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none shadow-[inset_2px_2px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]"
            name="email"
            onChange={handleChange}
            value={formData?.email}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none shadow-[inset_2px_2px_6px_rgba(0,0,0,0.7),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div></div>
            <a href="/forgot-password" className="hover:text-white transition">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black rounded-lg py-4 font-semibold hover:bg-gray-200 active:scale-[0.98] transition shadow-[6px_6px_15px_rgba(0,0,0,0.7),-4px_-4px_12px_rgba(255,255,255,0.08)]"
          >
            Log In
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-white hover:underline">
            Register
          </a>
        </p>

        {/* Google Sign-in */}
        <div className="mt-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="w-full bg-red-600 text-white rounded-lg py-4 font-semibold hover:bg-red-500 active:scale-[0.98] transition shadow-[6px_6px_15px_rgba(0,0,0,0.7),-4px_-4px_12px_rgba(255,255,255,0.08)]"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
