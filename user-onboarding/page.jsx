"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    memo: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await axios.put(`${API}/api/auth/onboarding`, formData, {
        withCredentials: true,
      });
      router.push("/home");
    } catch (err) {
      console.error("Onboarding error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden px-6">
      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-xl w-full p-10 rounded-3xl bg-gradient-to-b from-gray-950 to-gray-900 
        border border-gray-700 shadow-[8px_8px_20px_#0a0a0a,-8px_-8px_20px_#1a1a1a] 
        transition-all duration-300"
      >
        <h1 className="text-3xl font-extrabold text-center text-white mb-10 drop-shadow-md">
          Complete Your Profile
        </h1>

        <div className="space-y-6">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-xl bg-gray-950 text-white placeholder-gray-400 
            border border-gray-700 shadow-inner 
            focus:outline-none focus:ring-2 focus:ring-white transition-all"
          />

          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Middle Name (optional)"
            className="w-full px-4 py-3 rounded-xl bg-gray-950 text-white placeholder-gray-400 
            border border-gray-700 shadow-inner 
            focus:outline-none focus:ring-2 focus:ring-white transition-all"
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-xl bg-gray-950 text-white placeholder-gray-400 
            border border-gray-700 shadow-inner 
            focus:outline-none focus:ring-2 focus:ring-white transition-all"
          />

          <input
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            placeholder="Memo"
            className="w-full px-4 py-3 rounded-xl bg-gray-950 text-white placeholder-gray-400 
            border border-gray-700 shadow-inner 
            focus:outline-none focus:ring-2 focus:ring-white transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`mt-10 w-full py-3 rounded-xl font-semibold text-lg 
          shadow-[6px_6px_12px_#0a0a0a,-6px_-6px_12px_#1a1a1a] 
          transition-all duration-200 
          ${
            submitting
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-200 to-white text-black hover:from-white hover:to-gray-200"
          }`}
        >
          {submitting ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
}
