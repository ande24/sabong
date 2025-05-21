"use client";

import { useState } from "react";

export default function ActiveFight() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <span className="text-2xl font-bold tracking-widest">FIGHT NO. 5</span>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <span className="text-xl font-bold tracking-widest mb-1">ODDS</span>
          <div className="flex w-[340px] h-12 rounded-full overflow-hidden shadow-lg">
            <div className="flex-[1.75] bg-gradient-to-t from-red-700 to-red-500 flex items-center justify-center">
              <span className="text-white text-lg font-bold">1.75</span>
            </div>
            <div className="flex-[2.7] bg-gradient-to-t from-blue-700 to-blue-500 flex items-center justify-center">
              <span className="text-white text-lg font-bold">2.7</span>
            </div>
          </div>
          <div className="flex gap-12 mt-1 text-base text-black font-bold">
            <span>
              PAYOUT: <span className="font-bold">1,000</span>
            </span>
            <span>
              PAYOUT: <span className="font-bold">2,500</span>
            </span>
          </div>
        </div>
       
        <div className="flex flex-1 flex-col items-end">
          <span className="text-lg font-bold mr-2 tracking-widest mb-1">STATUS:</span>
          <button
            className={`font-bold w-1/4 px-6 py-2 rounded-lg shadow transition ${
              isOpen
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? " OPEN " : "CLOSED"}
          </button>
        </div>
      </div>

      <div className="flex gap-6 mt-2">
        <button className="flex-1 bg-gradient-to-t from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white font-semibold text-xl py-3 rounded-lg shadow transition">
          MERON WIN
        </button>
        <button className="flex-1 bg-gradient-to-t from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-semibold text-xl py-3 rounded-lg shadow transition">
          WALA WIN
        </button>
        <button className="flex-1 bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold text-xl py-3 rounded-lg shadow transition">
          DRAW
        </button>
        <button className="flex-1 bg-gradient-to-b from-neutral-600 to-neutral-800 hover:from-neutral-700 hover:to-neutral-900 text-white font-semibold text-xl py-3 rounded-lg shadow transition">
          CANCEL
        </button>
      </div>
    </div>
  );
}