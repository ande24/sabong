"use client";

import Image from "next/image";
import ActiveFight from "../components/activeFight";
import AdminControls from "../components/adminControls";
import Navbar from "../components/navbar";
import { useState } from "react";

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
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
        <div className="w-full flex items-center justify-center bg-white">
            <Navbar onPress={() => setShowModal(true)}/>
        </div>
        <div className="w-full flex flex-1 px-50">
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