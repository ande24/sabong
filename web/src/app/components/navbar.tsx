"use client";

import { CircleUser } from "lucide-react";

export default function Navbar({ onPress }: { onPress: () => void }) {
  return (
    <nav className="w-full h-24 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-red-950 via-red-900 to-red-800 shadow z-30">
      <span className="text-white text-4xl font-semibold select-none">cockfight</span>
      <div className="flex items-center justify-center group" onClick={() => onPress()}>
        <div className="flex items-center justify-center relative opacity-100 transition-all group-hover:hidden group-hover:opacity-0">
            <div className="rounded-full bg-white w-[56px] z-0 h-[56px] absolute"/>
            <CircleUser color="maroon" size={64} strokeWidth={1.5} className="z-10"/>
        </div>
        <div className="hidden items-center justify-center relative opacity-0 group-hover:flex group-hover:opacity-100 transition-all">
            <div className="rounded-full bg-red-900 w-[56px] z-0 h-[56px] absolute"/>
            <CircleUser color="white" size={64} strokeWidth={1.5} className="z-10"/>
        </div> 
      </div>
    </nav>
  );
}
