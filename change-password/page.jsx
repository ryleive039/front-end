"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ChangePasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePass = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New password and confirmation must match.");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/auth/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      if (res.data.status) {
        alert("Password updated successfully!");
        router.push("/home");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        alert(res.data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to update password.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-24 px-4">
        {/* Password Form Box */}
        <div className="relative z-10 max-w-md w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-8 border border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
          <h1 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
            Change Password
          </h1>

          <form onSubmit={handleChangePass} className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-300 font-medium">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300 font-medium">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-300 font-medium">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold px-5 py-3 rounded-xl shadow-xl hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] transition-transform duration-200"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
