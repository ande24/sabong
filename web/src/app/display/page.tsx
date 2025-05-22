'use client'

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot, doc } from "firebase/firestore";
import Image from "next/image";
import ActiveFight from "../components/activeFight";
import AdminControls from "../components/adminControls";
import Message from "../components/message";
import FightHistoryMini from "../components/fightHistoryMini";

export default function Display() {
    const [showDisplay, setShowDisplay] = useState(false);
    const [showMenu, setShowMenu] = useState(false);



    useEffect(() => {
        const adminRef = collection(db, "admin");
        const unsubscribe = onSnapshot(doc(adminRef, 'config'), (snapshot) => {
            snapshot.exists() && setShowDisplay(snapshot.data().showDisplay);
        }, (error) => {
            console.error("Error fetching admin data: ", error);
            setShowDisplay(false);
        });

        return () => unsubscribe();
    }, []);



    function formatNumber(value: number | string): string {
        const str = typeof value === "number" ? value.toString() : value;
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    return (
        <div className="w-full h-screen flex items-center justify-center">
            {showDisplay ? (
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
                        width={1000}
                        height={1000}
                        className="absolute left-[-400] top-1/2 -translate-y-1/2 z-10 opacity-40"
                        priority
                      />
                      <Image
                        src="/dashboard/chicken-right.png"
                        alt="Rooster Right"
                        width={1300}
                        height={1300}
                        className="absolute right-[-500] top-1/2 -translate-y-1/2 z-10 opacity-40 -scale-x-100"
                        priority
                      />
                
                      
                        <div className="w-full z-20 flex flex-col min-h-screen items-center justify-center overflow-hidden">
                            <div className="w-full flex flex-1 items-center justify-center bg-gradient-to-b py-2 from-red-950 via-red-900 to-red-800 z-10 shadow-black shadow-md">
                                <Message message={`Fights with odds below 1.3 will be cancelled 🐓`} />
                            </div>
                            <div className="max-w-5/7 min-w-5/7 flex flex-[9] h-full">
                                <div className="flex flex-col flex-[3] items-center justify-center bg-green-500 ">
                                    <div className="flex flex-[1.5] items-center justify-center p-2 bg-gradient-to-t from-yellow-300 via-yellow-400 to-yellow-500 w-full">
                                        <span className="text-7xl font-bold tracking-widest text-gray-900">⚔️ FIGHT #5 ⚔️</span>
                                    </div>

                                    <div className="flex flex-[7] items-center justify-center bg-white w-full">
                                        animation
                                    </div>

                                    <div className="flex flex-[2] py-4 items-center justify-center bg-gradient-to-r from-red-600 via-purple-500 from-22% to-78%  to-blue-700 w-full">
                                        <div className="flex-1 flex flex-col items-center justify-center">
                                            <div className="flex w-full flex-row items-center justify-between gap-4 px-6">
                                                <span className="text-3xl font-semibold tracking-widest mb-2 text-white">MERON</span>
                                                <span className="text-4xl font-semibold tracking-widest mb-2 text-white">PAYOUT</span>
                                                <span className="text-3xl font-semibold tracking-widest mb-2 text-white">WALA</span>
                                            </div>
                                            
                                            <div className="flex w-full flex-row items-center justify-center gap-4 px-2">
                                                <div className="font-bold text-4xl flex-1 flex items-center justify-center text-white">
                                                    <span className="font-mono font-light text-5xl mr-1">₱</span>{formatNumber(1000)}
                                                </div>

                                                <div className="flex flex-[2] w-[340px] h-18 rounded-full overflow-hidden shadow-lg">
                                                    <div
                                                        style={{ flex: 1.5 }}
                                                        className={`transition-all bg-gradient-to-t from-red-700 to-red-500 flex items-center justify-center`}
                                                    >
                                                        <span className="text-white text-3xl font-bold">1.5</span>
                                                    </div>

                                                    <div
                                                        style={{ flex: 4 }}
                                                        className={`transition-all bg-gradient-to-t from-blue-700 to-blue-500 flex items-center justify-center`}
                                                    >
                                                        <span className="text-white text-3xl font-bold">4</span>
                                                    </div>
                                                </div>

                                                <div className="font-bold text-4xl flex-1 flex items-center justify-center text-white">
                                                    <span className="font-mono text-5xl font-light mr-1">₱</span>{formatNumber(4000)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-[2] items-center gap-4 justify-center w-full bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 px-6 py-2 shadow-lg border-t border-gray-300">
                                        <div className="flex items-center">
                                            <span className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 text-white text-3xl font-bold mr-2">4</span>
                                            <span className="text-black text-2xl font-bold mr-4">MERON</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-700 text-white text-3xl font-bold mr-2">3</span>
                                            <span className="text-black text-2xl font-bold mr-4">WALA</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-400 text-black text-3xl font-bold mr-2">1</span>
                                            <span className="text-black text-2xl font-bold mr-4">DRAW</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 text-white text-3xl font-bold mr-2">1</span>
                                            <span className="text-black text-2xl font-bold">CANCELLED</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-[2] items-center justify-center ml-2">
                                    <FightHistoryMini />
                                </div>
                            </div>
                        </div>
                    </div>
            ) : (
                <div className="flex-1 h-full flex justify-center items-center bg-black overflow-hidden">
                    <div className="text-9xl scale-400 animate-spin [animation-duration:5s]">🥚</div>
                </div>
            )}
        </div>
    );
}