"use client";
import Navbar from "../../components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-cyan-400 flex flex-col items-center justify-start pt-24 px-4">
        <div className="max-w-2xl w-full bg-[#0d0d0d] border border-cyan-500/40 rounded-xl shadow-[0_0_20px_cyan] p-8 backdrop-blur-sm">
          <h1 className="text-3xl font-extrabold text-cyan-300 drop-shadow-[0_0_10px_cyan]">
            About
          </h1>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            This project demonstrates a <span className="text-pink-500 font-semibold">A simple</span> authentication System.
            <br />
          </p>
          
        </div>
      </div>
    </>
  );
}
