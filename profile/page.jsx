"use client";
import Navbar from "../../components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ProfilePage() {
  const router = useRouter();
  const [decoded, setDecoded] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    memo: ""
  });

  useEffect(() => {
    axios.get(`${API}/api/auth/me`, { withCredentials: true })
      .then((res) => {
        setDecoded(res.data);
        setFormData({
          firstName: res.data.firstName || "",
          middleName: res.data.middleName || "",
          lastName: res.data.lastName || "",
          memo: res.data.memo || ""
        });
      })
      .catch(() => {
        alert("You must be logged in to view this page.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/auth/profile`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      alert("Profile updated successfully!");
      router.push("/home");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 pt-24 px-4">
        {/* Smaller Profile Form Box */}
        <div className="relative z-10 max-w-md w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 border border-gray-700 shadow-2xl shadow-black/70">
          <h1 className="text-xl font-bold text-white mb-6 text-center drop-shadow-lg">
            Manage Profile
          </h1>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-300">Email</label>
              <input
                type="email"
                className="w-full bg-gray-800 border border-gray-600 text-white p-2.5 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
                value={decoded?.email || ""}
                disabled
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 text-white p-2.5 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-300">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 text-white p-2.5 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 text-white p-2.5 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-300">Memo</label>
              <input
                type="text"
                name="memo"
                value={formData.memo}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 text-white p-2.5 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold px-4 py-2.5 rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
