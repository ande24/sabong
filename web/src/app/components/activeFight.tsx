"use client";

import { useState } from "react";

export default function ActiveFight( {currentFight } : { currentFight: number }) {
  const [meronOdds, setMeronOdds] = useState(1.5)
  const [walaOdds, setWalaOdds] = useState(4);
  const [drawOdds, setDrawOdds] = useState(8);

  const [meronTotal, setMeronTotal] = useState(2000);
  const [walaTotal, setWalaTotal] = useState(3500); 
  const [drawTotal, setDrawTotal] = useState(7000);

  const [fightStatus, setFightStatus] = useState("STANDBY");
  const [selectedOutcome, setSelectedOutcome] = useState("PENDING");
  const [pendingOutcome, setPendingOutcome] = useState("");

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  


  const confirmOutcome = (outcome: string) => {
    setPendingOutcome(outcome);
    setShowConfirmationModal(true);
  };



  const handleConfirm = () => {
    console.log(`Outcome set to: ${pendingOutcome}`);
    setSelectedOutcome(pendingOutcome);
    setShowConfirmationModal(false);

    if (pendingOutcome === "RESET") {
      setFightStatus("STANDBY");
      setSelectedOutcome("PENDING");
    } else {
      setFightStatus("CLOSED");
    }
  };



  const handleCancel = () => {
    setShowConfirmationModal(false);
  };



  const changeFightStatus = () => {
    if (fightStatus === "OPEN") {
      setFightStatus("CLOSED");
    }
    else if (fightStatus === "CLOSED") {
      setFightStatus("STANDBY");
    }
    else {
      setFightStatus("OPEN");
    }
  }



  function formatNumber(value: number | string): string {
    const str = typeof value === "number" ? value.toString() : value;
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }



  return (
    <div className={`w-full flex flex-col gap-6`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <span className="text-2xl font-bold tracking-widest">FIGHT #{currentFight}</span>
        </div>

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

        <div className="flex-1 flex flex-col items-end justify-center gap-y-2">
          <div className="flex w-full flex-row items-center justify-end gap-4">
            <div className="text-lg font-bold tracking-widest mb-1">
              STATUS:
            </div>
            <button
              className={`font-bold w-1/3 px-6 py-2 rounded-lg shadow transition flex items-center justify-center ${
                fightStatus === "OPEN"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : fightStatus === "CLOSED"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-yellow-400 text-white hover:bg-yellow-500"
              } ${selectedOutcome !== "PENDING" ? "opacity-50" : ""}`}
              onClick={changeFightStatus}
              disabled={selectedOutcome !== "PENDING"}
            >
              {fightStatus === "OPEN" ? " OPEN " : fightStatus === "CLOSED" ? "CLOSED" : "STANDBY"}
            </button>
          </div>
          <div className="flex w-full flex-row items-center justify-end gap-4">
            <div className="text-lg font-bold tracking-widest mb-1">
              OUTCOME:
            </div>
            <button
              className={`font-bold w-1/3 px-6 py-2 rounded-lg shadow transition flex items-center justify-center ${
                selectedOutcome === "MERON"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : selectedOutcome === "WALA"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : selectedOutcome === "DRAW"
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              {selectedOutcome}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-2">
        <button
          className={`flex-1 bg-gradient-to-t from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${selectedOutcome !== "PENDING" ? "opacity-50" : ""}`}
          onClick={() => confirmOutcome("MERON")}
          disabled={selectedOutcome !== "PENDING"}
        >
          MERON WIN
        </button>
        <button
          className={`flex-1 bg-gradient-to-t from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${selectedOutcome !== "PENDING" ? "opacity-50" : ""}`}
          onClick={() => confirmOutcome("WALA")}
          disabled={selectedOutcome !== "PENDING"}
        >
          WALA WIN
        </button>
        <button
          className={`flex-1 bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${selectedOutcome !== "PENDING" ? "opacity-50" : ""}`}
          onClick={() => confirmOutcome("DRAW")}
          disabled={selectedOutcome !== "PENDING"}
        >
          DRAW
        </button>
        <button
          className={`flex-1 bg-gradient-to-b from-neutral-600 to-neutral-800 hover:from-neutral-700 hover:to-neutral-900 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${selectedOutcome !== "PENDING" ? "opacity-50" : ""}`}
          onClick={() => confirmOutcome("CANCELLED")}
          disabled={selectedOutcome !== "PENDING"}
        >
          CANCEL
        </button>
        <button
          disabled={selectedOutcome === "PENDING"}
          className={`flex-1 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${selectedOutcome === "PENDING" ? "opacity-50" : ""}`}
          onClick={() => { confirmOutcome("RESET") }}
        >
          RESET
        </button>
      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-4"><strong>{pendingOutcome}</strong></h2>
            {pendingOutcome === "RESET" ? (
              <p className="mb-4">
                Are you sure you want to reset the outcome?
            </p>
            ) : (
              <p className="mb-4">
                Are you sure you want to set this outcome? 
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}