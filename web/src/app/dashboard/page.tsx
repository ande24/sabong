"use client";

import Image from "next/image";
import ActiveFight from "../components/activeFight";
import AdminControls from "../components/adminControls";
import Navbar from "../components/navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
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
              <ul className="w-full mt-4 mb-6 space-y-6 px-4">
                <li className="text-white text-2xl text-center cursor-pointer hover:text-yellow-300 transition">DASHBOARD</li>
                <li className="text-white text-2xl text-center cursor-pointer hover:text-yellow-300 transition">HISTORY</li>
                <li className="text-white text-2xl text-center cursor-pointer hover:text-yellow-300 transition">ACCOUNTS</li>
                <li onClick={() => router.push('/')} className="text-white text-2xl text-center cursor-pointer hover:text-yellow-300 transition">LOG OUT</li>
              </ul>
            </div>
            <div className="z-20 w-full px-8 py-8 flex-1 flex flex-col items-center justify-start bg-gradient-to-b from-blue-900 to-blue-950">
                <div className="w-full">
                    <span className="block text-4xl font-semibold text-white tracking-widest mb-6 text-center">
                        ACTIVE FIGHT
                    </span>
                    <div className="w-full flex items-center justify-center bg-gradient-to-b from-white via-white to-gray-400 rounded-xl shadow-lg p-6 mb-8">
                        <ActiveFight />
                    </div>
                </div>

                {/* Admin Controls */}
                <div className=" w-full">
                    <span className="block text-4xl font-semibold text-white tracking-widest mb-6 text-center">
                        ADMIN CONTROLS
                    </span>
                    <div className="w-full flex items-center justify-center">
                        <AdminControls />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}