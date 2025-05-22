'use client'

import { useState } from "react";

export default function FightHistoryMini() {
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
        <div className="space-y-2 flex-1 h-[73vh] rounded-lg animate-history inline-block z-0">
            <span
                className="bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-xl shadow p-4 flex flex-col items-center justify-center gap-x-8"
            >
                <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold tracking-widest drop-shadow">🏁 END OF FIGHTS 🏁</span>
                </div>
                
            </span>

            {fights.map((fight) => (
                <span
                    key={fight.id}
                    className="bg-gradient-to-b from-white to-gray-300 rounded-xl shadow p-4 flex flex-col items-center justify-center gap-x-8"
                >
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold tracking-widest mb-2 drop-shadow">FIGHT #{fight.id}</span>
                    </div>
                    <div className="flex-1 flex flex-row items-between justify-around w-full gap-x-4">
                        <div className="flex-[2] flex items-center justify-start">
                            <button className={`p-2 rounded-xl w-full text-white font-semibold shadow-lg ${fight.color} flex flex-col items-center justify-center`}>{fight.outcome}</button>
                        </div>

                        <div className="flex-[3] flex flex-col items-start justify-center">
                            <span className="text-lg font-semibold tracking-widest mb-1">ODDS: {fight.odds.toFixed(2)}</span>
                            <span className="text-lg font-semibold tracking-widest mb-1">PAYOUT: {fight.payout.toFixed(2)}</span>
                        </div>
                    </div>
                </span>
            ))}

            <span
                className="bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-xl shadow p-4 flex flex-col items-center justify-center gap-x-8"
            >
                <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold tracking-widest drop-shadow">⬆️ START OF FIGHTS ⬆️</span>
                </div>
                
            </span>
        </div>
    );
}