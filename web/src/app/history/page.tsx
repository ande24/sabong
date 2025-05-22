"use client";

import Image from "next/image";
import Navbar from "../components/navbar";
import { useState } from "react";
import Menu from "../components/menu";
import FightHistory from "../components/fightHistory";

export default function History() {
    const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden font-orbitron tracking-widest">
      <Image
        src="/auth/bg.png"
        alt="Background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />
      <Image
        src="/dashboard/chicken-left.png"
        alt="Rooster Left"
        width={1300}
        height={1300}
        className="absolute left-[-450] top-1/2 -translate-y-1/2 z-10 opacity-40"
        priority
      />
      <Image
        src="/dashboard/chicken-right.png"
        alt="Rooster Right"
        width={1300}
        height={1300}
        className="absolute right-[-450] top-1/2 -translate-y-1/2 z-10 opacity-40 -scale-x-100"
        priority
      />

      
      <div className="w-full z-20 flex flex-col min-h-screen items-center justify-center overflow-hidden">
        <div className="w-full flex items-center justify-center">
            <Navbar onOpen={() => setShowMenu(true)}/>
        </div>
        <div className="w-full flex flex-1 px-50 relative">
            <div onMouseLeave={() => {setShowMenu(false)}} className={`flex flex-col items-center justify-start bg-gradient-to-b rounded-bl-xl from-gray-600 to-gray-800 absolute top-0 right-0 z-40 w-64 shadow-xl  border-t-4 border-red-900 ${showMenu ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}> 
              <Menu currPage="history"/>
            </div>
            <div className="z-20 w-full px-8 py-8 flex-1 flex flex-col items-center justify-start bg-gradient-to-b from-blue-900 to-blue-950">
                <div className="w-full">
                    <span className="block text-5xl font-semibold text-white tracking-widest mb-6 text-center">
                        FIGHT HISTORY
                    </span>
                    <div className="w-full flex items-center justify-center">
                        <FightHistory />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}