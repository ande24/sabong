'use client'

import { useState } from "react";

export default function FightHistory() {
    const [meronOdds, setMeronOdds] = useState(1.5)
    const [walaOdds, setWalaOdds] = useState(4);
    const [drawOdds, setDrawOdds] = useState(8);

    const [meronTotal, setMeronTotal] = useState(2000);
    const [walaTotal, setWalaTotal] = useState(3500); 
    const [drawTotal, setDrawTotal] = useState(7000);

    const fights = [
        { id: 9, outcome: "MERON WON", odds: 1.50, payout: 1500.00, commission: 150.00, color: "bg-red-500" },
        { id: 8, outcome: "CANCELLED", odds: 0.00, payout: 0.00, commission: 0.00, color: "bg-gray-700" },
        { id: 7, outcome: "WALA WON", odds: 2.00, payout: 2000.00, commission: 200.00, color: "bg-blue-500" },
        { id: 6, outcome: "WALA WON", odds: 1.80, payout: 1800.00, commission: 180.00, color: "bg-blue-500" },
        { id: 5, outcome: "MERON WON", odds: 1.60, payout: 1600.00, commission: 160.00, color: "bg-red-500" },
        { id: 4, outcome: "WALA WON", odds: 2.20, payout: 2200.00, commission: 220.00, color: "bg-blue-500" },
        { id: 3, outcome: "MERON WON", odds: 1.70, payout: 1700.00, commission: 170.00, color: "bg-red-500" },
        { id: 2, outcome: "CANCELLED", odds: 0.00, payout: 0.00, commission: 0.00, color: "bg-gray-700" },
        { id: 1, outcome: "WALA WON", odds: 2.50, payout: 2500.00, commission: 250.00, color: "bg-blue-500" },
    ];

    function formatNumber(value: number | string): string {
        const str = typeof value === "number" ? value.toString() : value;
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="space-y-4 flex-1 h-[73vh] overflow-y-auto rounded-lg scrollbar-thin">
            {fights.map((fight) => (
                <div
                    key={fight.id}
                    className="bg-gradient-to-b from-white to-gray-300 rounded-lg shadow p-4 px-6 flex flex-row justify-between font-semibold items-center gap-x-8"
                >
                    <div className="flex-1 flex flex-col items-start justify-between gap-2">
                        <span className="text-2xl font-extrabold flex-1">FIGHT #{fight.id}</span>
                        <span
                            className={`px-2 py-1 text-white text-center font-semibold rounded-lg  ${fight.color}`}
                        >
                            {fight.outcome}
                        </span>
                        <span className="flex text-lg items-center justify-end">
                            COMMISSION:&nbsp;<span className="font-light text-2xl font-mono">₱</span>{fight.commission.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex-2 flex items-center justify-center">
                        <div className="flex-1 flex flex-col items-center">
                            <span className="text-xl font-bold tracking-widest mb-1">PAYOUT</span>
                        <div className="flex w-[340px] h-12 rounded-full overflow-hidden shadow-lg">

                        <div
                            style={{ flex: meronOdds }}
                            className={`transition-all bg-gradient-to-t from-red-700 to-red-500 flex items-center justify-center`}
                        >
                            <span className="text-white font-bold">{meronOdds}</span>
                        </div>
                            {/* <div
                            style={{ flex: drawOdds }}
                            className={`transition-all bg-gradient-to-t from-yellow-500 to-yellow-300 flex items-center justify-center`}
                            >
                            <span className="text-white text-xs font-bold">{drawOdds}</span>
                            </div> */}
                        <div
                            style={{ flex: walaOdds }}
                            className={`transition-all bg-gradient-to-t from-blue-700 to-blue-500 flex items-center justify-center`}
                        >
                            <span className="text-white font-bold">{walaOdds}</span>
                        </div>

                        </div>
                            <div className="flex w-full mt-1 text-base text-black font-bold justify-around items-center">
                                <span className="font-bold text-red-500"><span className="font-mono text-lg">₱</span>{formatNumber(meronTotal)}</span>
                                {/* <span className="font-bold text-yellow-400"><span className="font-mono text-lg">₱</span>{formatNumber(drawTotal)}</span> */}
                                <span className="font-bold text-blue-500"><span className="font-mono text-lg">₱</span>{formatNumber(walaTotal)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-end justify-center gap-y-2">
                        
                        
                        <button className={`px-4 py-2 text-white text-center text-lg font-semibold rounded-lg bg-gray-500`}>
                            RETURN TO FIGHT
                        </button>
                    </div>
                    
                    
                    
                    
                </div>
            ))}
        </div>
    );
}