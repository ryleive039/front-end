"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios
        .post(`${API}/api/auth/register`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.status) {
            alert("Registration successful!");
            router.push("/login");
          } else {
            alert("Registration failed!");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden">
      {/* Background subtle glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,0.95),black)]" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-white/5 blur-[250px]" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-gray-500/10 blur-[200px] right-10 bottom-10" />

      {/* Register Card */}
      <div className="relative z-10 max-w-lg w-full bg-black/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-10 shadow-[0_8px_30px_rgba(255,255,255,0.2)]">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)] mb-8">
          Register
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <label className="text-gray-300 text-sm font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none shadow-[inset_0_2px_6px_rgba(255,255,255,0.1)]"
            name="email"
            onChange={handleChange}
            value={formData?.email}
            required
          />

          <label className="text-gray-300 text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none shadow-[inset_0_2px_6px_rgba(255,255,255,0.1)]"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />

          <label className="text-gray-300 text-sm font-semibold">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none shadow-[inset_0_2px_6px_rgba(255,255,255,0.1)]"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg py-3 font-semibold hover:from-gray-700 hover:to-gray-600 transition-all shadow-[0_4px_15px_rgba(255,255,255,0.15)] active:scale-95"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-white font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
