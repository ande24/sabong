"use client";

import { db } from "@/firebase/config";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AdminControls( { currentFight }: { currentFight: number }) {
    const [pettyCashTotal, setPettyCashTotal] = useState(10000);
    const [pettyCashAmount, setPettyCashAmount] = useState("");
    const [showPettyAddModal, setShowPettyAddModal] = useState(false);
    const [showPettyResetModal, setShowPettyResetModal] = useState(false);

    const [commissionPercentage, setCommissionPercentage] = useState(10);
    const [showCommissionModal, setShowCommissionModal] = useState(false);
    const [newCommission, setNewCommission] = useState("");
    
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [receiptId, setReceiptId] = useState("");
    const [receiptData, setReceiptData] = useState<any | null>(null);
    const [searchRange, setSearchRange] = useState("today");
    const [customDate, setCustomDate] = useState("");
    
    const [isMeronEnabled, setIsMeronEnabled] = useState(true);
    const [isWalaEnabled, setIsWalaEnabled] = useState(true);

    const [adminConfig, setAdminConfig] = useState<any | null>(null);

    

    useEffect(() => {
        const adminRef = collection(db, "admin");
        const unsubscribe = onSnapshot(doc(adminRef, 'config'), (snapshot) => {
            snapshot.exists() && setAdminConfig(snapshot.data());
        }, (error) => {
            console.error("Error fetching admin data: ", error);
        });

        return () => unsubscribe();
    }, []);



    const addPettyCash = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(pettyCashAmount);
        if (!isNaN(amount)) {
            setPettyCashTotal((prevTotal) => prevTotal + amount);
            setPettyCashAmount("");
            setShowPettyAddModal(false);
        }
    };

    const updateCommission = (e: React.FormEvent) => {
        e.preventDefault();
        const percentage = parseFloat(newCommission);
        if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
            setCommissionPercentage(percentage);
            setNewCommission("");
            setShowCommissionModal(false);
        }
    };

    const handleSearchReceipt = () => {
        if (receiptId === "yxVC6ZhoTrEDLOURSGLy") {
            setReceiptData({
                id: "yxVC6ZhoTrEDLOURSGLy",
                fightNumber: 4,
                side: "MERON",
                amount: 5000,
                outcome: "PENDING",
                odds: 1.57,
                date: "April 27, 2025",
                time: "9:42 PM",
                teller: "example@gmail.com",
            });
        } else if (receiptId === "xrnLeBKH0oeAC92pQj0Y") {
            setReceiptData({
                id: "xrnLeBKH0oeAC92pQj0Y",
                fightNumber: 12,
                side: "WALA",
                amount: 3000,
                outcome: "PENDING",
                odds: 2.1,
                date: "May 22, 2025",
                time: "3:15 PM",
                teller: "example@gmail.com",
            });
        } else {
            setReceiptData(null);
        }
    };



    const toggleTVScreen = async () => {
        setAdminConfig((prevConfig: any) => ({
            ...prevConfig,
            showDisplay: !prevConfig.showDisplay,
        }));
        
        const docRef = doc(collection(db, "admin"), "config");
        await updateDoc(docRef, {
            showDisplay: !adminConfig.showDisplay,
        });
    }



    function formatNumber(value: number | string): string {
        const str = typeof value === "number" ? value.toString() : value;
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    if (!adminConfig) {
        return null;
    } else {
        return (
            <div className="grid grid-cols-1 md:grid-cols-10 gap-6 w-full">
                <div className="bg-gradient-to-b col-span-3 justify-center from-white via-white to-gray-400 rounded-xl shadow p-10 flex flex-col items-center">
                    <div className="flex-col justify-center items-center w-full">
                        <p className="text-5xl w-full text-start font-semibold mb-1"><span className="font-light text-11xl font-mono">₱</span> 10,000</p>
                        <p className="text-xl w-full text-start tracking-widest">LIVE COMMISSION</p>
                    </div>
                </div>

                <div className="bg-gradient-to-b col-span-3 from-white via-white to-gray-400 rounded-xl shadow p-10 flex flex-col items-center justify-center">
                    <div className="flex-col justify-center items-center w-full">
                        <p className="text-5xl w-full text-start font-semibold mb-1">FIGHT #{currentFight}</p>
                        <p className="text-xl w-full text-start tracking-widest">FIGHT NUMBER</p>
                    </div>
                </div>

                <div className="bg-gradient-to-b col-span-4 from-white justify-center via-white to-gray-400 rounded-xl shadow p-6 flex flex-col items-center gap-4 row-span-2">
                    <div className="w-full grid grid-cols-2 gap-2">
                        <button className="p-4 col-span-2 w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-2xl py-3 rounded-xl mb-2 shadow transition">
                            START NEW GAME
                        </button>
                        <button className="p-4 col-span-2 w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-2xl py-3 rounded-xl mb-2 shadow transition">
                            START NEW FIGHT
                        </button>
                        <button
                            className={`p-4 col-span-1 w-full bg-gradient-to-b ${adminConfig.showDisplay ? "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700" : "from-gray-400 to-gray-600 cursor-not-allowed"} text-white font-semibold text-xl py-3 rounded-xl mb-2 shadow transition`}
                            onClick={toggleTVScreen}
                        >
                            TV SCREEN: {adminConfig.showDisplay ? "ENABLED" : "DISABLED"}
                        </button>
                        <button className="p-4 col-span-1 w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-xl py-3 rounded-xl mb-2 shadow transition"
                            onClick={() => setShowReceiptModal(true)}
                        >
                            SEARCH RECEIPT
                        </button>
                        <button
                            className={`p-4 col-span-1 w-full bg-gradient-to-b ${isMeronEnabled ? "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700" : "from-gray-400 to-gray-600 cursor-not-allowed"} text-white font-semibold text-xl py-3 rounded-xl mb-2 shadow transition`}
                            onClick={() => setIsMeronEnabled((prev) => !prev)}
                        >
                            <p>MERON:</p>
                            <p>{isMeronEnabled ? "ENABLED" : "DISABLED"}</p>
                        </button>
                        <button
                            className={`p-4 col-span-1 w-full bg-gradient-to-b ${isWalaEnabled ? "from-green-400 to-green-600 hover:from-green-500 hover:to-green-700" : "from-gray-400 to-gray-600 cursor-not-allowed"} text-white font-semibold text-xl py-3 rounded-xl mb-2 shadow transition`}
                            onClick={() => setIsWalaEnabled((prev) => !prev)}
                        >
                            <p>WALA:</p>
                            <p>{isWalaEnabled ? "ENABLED" : "DISABLED"}</p>
                        </button>
                    </div>
                </div>

                <div className="bg-gradient-to-b col-span-3 from-white via-white to-gray-400 rounded-xl shadow p-6 flex flex-col items-center">
                    <div className="flex-col justify-center items-center w-full">
                        <p className="text-5xl w-full text-start font-semibold mb-1"><span className="font-light font-mono text-10xl">₱</span> {formatNumber(pettyCashTotal)}</p>
                        <p className="text-xl w-full text-start tracking-widest">PETTY CASH</p>
                        <div className="flex items-center justify-center w-full gap-2">
                            <button
                                className="w-full font-semibold bg-gradient-to-b my-2 from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-xl py-2 rounded-xl shadow transition"
                                onClick={() => setShowPettyAddModal(true)}
                            >
                                ADD 
                            </button>
                            <button
                                className="w-full font-semibold bg-gradient-to-b my-2 from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-xl py-2 rounded-xl shadow transition"
                                onClick={() => setShowPettyResetModal(true)}
                            >
                                RESET
                            </button>
                        </div>
                    </div>
                    {showPettyAddModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                                <h2 className="text-2xl font-semibold mb-4">Add Petty Cash</h2>
                                <form
                                    onSubmit={addPettyCash}
                                >
                                    <input
                                        type="number"
                                        className="w-full border rounded-lg px-3 py-2 mb-4"
                                        placeholder="Enter amount"
                                        autoFocus
                                        value={pettyCashAmount} 
                                        onChange={(e) => setPettyCashAmount(e.target.value)}
                                        min="0"
                                        required
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                            onClick={() => setShowPettyAddModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {showPettyResetModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                                <h2 className="text-2xl font-semibold mb-4">Reset Petty Cash</h2>
                                <form
                                    onSubmit={() => {setPettyCashTotal(0); setShowPettyResetModal(false);}}
                                >
                                    <p className="mb-4">
                                        Are you sure you want to reset the petty cash amount to 0?
                                    </p>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                            onClick={() => setShowPettyResetModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gradient-to-b col-span-3 from-white via-white to-gray-400 rounded-xl shadow p-6 flex flex-col items-center">
                    <p className="text-5xl w-full text-start font-semibold mb-1">{commissionPercentage}%</p>
                    <p className="text-xl w-full text-start tracking-widest">COMMISSION PERCENTAGE</p>
                    <button
                        className="w-full font-semibold bg-gradient-to-b my-2 from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-xl py-2 rounded-xl shadow transition"
                        onClick={() => setShowCommissionModal(true)}
                    >
                        CHANGE %
                    </button>
                </div>

                {showCommissionModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                            <h2 className="text-2xl font-semibold mb-4">Change Commission Percentage</h2>
                            <form onSubmit={updateCommission}>
                                <input
                                    type="number"
                                    className="w-full border rounded-lg px-3 py-2 mb-4"
                                    placeholder="Enter new percentage"
                                    value={newCommission}
                                    onChange={(e) => setNewCommission(e.target.value)}
                                    min="0"
                                    max="100"
                                    required
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                        onClick={() => setShowCommissionModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showReceiptModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                            <h2 className="text-2xl font-semibold mb-4">Search Receipt</h2>
                            <input
                                type="text"
                                className="w-full border rounded-lg px-3 py-2 mb-4"
                                placeholder="Enter receipt ID"
                                value={receiptId}
                                onChange={(e) => setReceiptId(e.target.value)}
                            />
                            <div className="flex items-center justify-center mb-4 gap-4">
                                <select
                                    className="w-full flex-1 border rounded-lg px-3 py-2 mb-4"
                                    value={searchRange}
                                    onChange={e => setSearchRange(e.target.value)}
                                >
                                    <option value="today">Today</option>
                                    <option value="all">All Time</option>
                                    <option value="custom">Custom</option>
                                </select>
                                {searchRange === "custom" && (
                                    <input
                                        type="date"
                                        className="w-full flex-1 border rounded-lg px-3 py-2 mb-4"
                                        value={customDate}
                                        onChange={e => setCustomDate(e.target.value)}
                                    />
                                )}
                            </div>
                            
                            
                            {receiptData && (
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <p className="text-lg font-semibold">{receiptData.date}</p>
                                        <p className="text-lg font-semibold">{receiptData.time}</p>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <p className="text-left flex-1 font-semibold">Teller:</p>
                                        <p className="text-right flex-1">{receiptData.teller}</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-center mt-2">
                                        
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-left flex-1 font-semibold">Fight Number</p>
                                            <p className="flex-none">:</p>
                                            <p className="text-right flex-1">{receiptData.fightNumber}</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-left flex-1 font-semibold">Side</p>
                                            <p className="flex-none">:</p>
                                            <p className="text-right flex-1 text-red-500">{receiptData.side}</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-left flex-1 font-semibold">Amount</p>
                                            <p className="flex-none">:</p>
                                            <p className="text-right flex-1">₱{receiptData.amount}</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-left flex-1 font-semibold">Outcome</p>
                                            <p className="flex-none">:</p>
                                            <p className="text-right flex-1 text-yellow-500">{receiptData.outcome}</p>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-left flex-1 font-semibold">Odds</p>
                                            <p className="flex-none">:</p>
                                            <p className="text-right flex-1">{receiptData.odds}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                    onClick={() => {
                                        setReceiptId("");
                                        setReceiptData(null); 
                                        setSearchRange("today");
                                        setCustomDate("");
                                        setShowReceiptModal(false)
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
                                    onClick={handleSearchReceipt}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}