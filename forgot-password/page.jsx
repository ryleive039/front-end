"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    memo: "",
    newPass: "",
    confirmNewPass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPass !== formData.confirmNewPass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/auth/forgot-password`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.status) {
        alert("Password reset successfully!");
        router.push("/home");
      } else {
        alert(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to reset password. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-24 px-4">
      {/* Form Box */}
      <div className="relative z-10 max-w-md w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 border border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
        <h1 className="text-2xl font-bold text-white mb-2 text-center drop-shadow-lg">
          Forgot Your Password
        </h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          Please enter your account details to reset your password.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300 font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Memo</label>
            <input
              type="text"
              name="memo"
              placeholder="Enter your memo"
              value={formData.memo}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPass"
              placeholder="Enter new password"
              value={formData.newPass}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPass"
              placeholder="Confirm new password"
              value={formData.confirmNewPass}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold py-3 rounded-xl shadow-xl hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] transition-transform duration-200"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-gray-300 text-sm font-medium hover:underline"
          >
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}
