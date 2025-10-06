"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API}/api/auth/logout`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-screen p-4 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.7)] text-gray-200 flex justify-between items-center z-50">
      {/* Logo / User */}
      <div className="text-3xl font-bold italic tracking-wider text-white drop-shadow-md">
        User
      </div>

      <div className="flex justify-between items-center gap-6">
        {/* Main Links */}
        <div className="flex gap-4">
          <Link
            href="/home"
            className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.05)] hover:bg-gray-700/90 hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] transition"
          >
            Home
          </Link>
        </div>

        {/* Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-1 rounded bg-gray-800/80 border border-gray-700 shadow-[0_0_8px_rgba(255,255,255,0.05)] hover:bg-gray-700/90 hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] transition"
          >
            ☰ Menu
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-black/95 text-gray-200 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <div className="flex flex-col">
                <Link
                  href="/profile"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Manage Profile
                </Link>
                <Link
                  href="/change-password"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Change Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
