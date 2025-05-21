"use client";

import { CircleUser, Menu } from "lucide-react";

export default function Navbar({ onOpen}: { onOpen: () => void }) {
  return (
    <nav className="w-full h-24 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-red-950 via-red-900 to-red-800 shadow z-30">
      <div className="flex flex-col items-start justify-center">
        <span className="text-white text-4xl font-semibold select-none">Cockpit System</span>
        <span className="text-white mt-1 text-[10px] select-none">by Apexel Development</span>
      </div>
      
      <div className="flex items-center justify-center" onMouseEnter={() => onOpen()}>
        <Menu color="white" size={50} strokeWidth={2} className="z-10 hover:scale-110 transition cursor-pointer"/>
      </div>
    </nav>
  );
}
