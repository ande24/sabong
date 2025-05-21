"use client";

export default function AdminControls() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-6 w-full">
      <div className="bg-gradient-to-b col-span-3 justify-center from-white via-white to-gray-400 rounded-xl shadow p-10 flex flex-col items-center">
        <div className="flex-col justify-center items-center w-full">
          <p className="text-6xl w-full text-start font-semibold mb-1">10,000</p>
          <p className="text-2xl w-full text-start tracking-widest">LIVE COMMISSION</p>
        </div>
      </div>

      <div className="bg-gradient-to-b col-span-3 from-white via-white to-gray-400 rounded-xl shadow p-10 flex flex-col items-center justify-center">
        <div className="flex-col justify-center items-center w-full">
          <p className="text-6xl w-full text-start font-semibold mb-1">FIGHT #</p>
          <p className="text-2xl w-full text-start tracking-widest">FIGHT NUMBER</p>
        </div>
      </div>

      <div className="bg-gradient-to-b col-span-4 from-white justify-center via-white to-gray-400 rounded-xl shadow p-6 flex flex-col items-center gap-4 row-span-2">
        <div className="w-full grid grid-cols-2 gap-2">
          <button className="p-4 col-span-2 w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-2xl py-3 rounded-xl mb-2 shadow transition">
            START NEW FIGHT
          </button>
          <button className="p-4 col-span-1 w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-xl py-3 rounded-xl mb-2 shadow transition">
            START TV SCREEN
          </button>
          <button className="p-4 col-span-1 w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-xl py-3 rounded-xl mb-2 shadow transition">
            SEARCH RECEIPT
          </button>
          <button className="p-4 col-span-1 w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-xl py-3 rounded-xl mb-2 shadow transition">
            MERON: ENABLED
          </button>
          <button className="p-4 col-span-1 w-full bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-xl py-3 rounded-xl mb-2 shadow transition">
            WALA: ENABLED
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-b col-span-3 from-white via-white to-gray-400 rounded-xl shadow p-6 flex flex-col items-center">
        <div className="flex-col justify-center items-center w-full">
          <p className="text-5xl w-full text-start font-semibold mb-1">10,000</p>
          <p className="text-xl w-full text-start tracking-widest">PETTY CASH</p>
          <button className="w-full bg-gradient-to-b my-2 from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-xl py-2 rounded-xl shadow transition">
            ADD PETTY CASH
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-b col-span-3 from-white via-white to-gray-400 rounded-xl shadow p-6 flex flex-col items-center">
        <p className="text-5xl w-full text-start font-semibold mb-1">10%</p>
        <p className="text-xl w-full text-start tracking-widest">COMMISSION PERCENTAGE</p>
        <button className="w-full bg-gradient-to-b my-2 from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-xl py-2 rounded-xl shadow transition">
          CHANGE %
        </button>
      </div>
    </div>
  );
}