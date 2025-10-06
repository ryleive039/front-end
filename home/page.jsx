"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";

export default function HomePage() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    
    axios.get("/api/getCookies", { withCredentials: true })
      .then(res => {
        if (res.data && res.data.firstName) {
          setUserName(res.data.firstName);
        } else {
         
          setUserName(res.data.email);
        }
      })
      .catch(err => {
        console.error("Failed to fetch user:", err);
      });
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 relative overflow-hidden px-6 text-center">
      <Navbar />

      {/* Dark subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black" />

      {/* Soft accent glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[200px] top-20 left-20" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[180px] right-10 bottom-20" />

      {/* Main content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6">
          Welcome User
        </h1>
        <p className="text-gray-300 leading-relaxed text-lg">
          Welcome to the edge of tomorrow—explore, discover, and experience the future. 
          Step into a world where every moment pulses with innovation, 
          and every discovery sparks new possibilities.
        </p>
      </div>
    </div>
  );
}
