"use client";

import { db } from "@/firebase/config";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ActiveFight() {
  const [pendingOutcome, setPendingOutcome] = useState("");

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [adminConfig, setAdminConfig] = useState<any | null>(null);
  const [fightData, setFightData] = useState<any | null>(null);


  
  useEffect(() => {
    const configRef = doc(db, "admin", "config");
    const unsubscribe = onSnapshot(configRef, (snapshot) => {
      if (snapshot.exists()) {
        setAdminConfig(snapshot.data());
      }
    });

    return () => unsubscribe();
  }, []);



  useEffect(() => {
    if (!adminConfig) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const collectionName = `fights_${year}_${month}`;

    const fightsRef = collection(db, collectionName);
    const q = query(
      fightsRef,
      where("fight_number", "==", adminConfig.current_fight),
      where("game_number", "==", adminConfig.current_game)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const fight = querySnapshot.docs[0].data();
        setFightData({
          ...fight,
          id: querySnapshot.docs[0].id,
        });
      }
    });

    return () => unsubscribe();
  }, [adminConfig]);



  async function updateFightData(updates: Array<[string, any]>): Promise<void> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const collectionName = `fights_${year}_${month}`;

    const fightsRef = collection(db, collectionName);

    const docRef = doc(fightsRef, fightData.id);
    const updateObj: Record<string, any> = {};
    updates.forEach(([field, value]) => {
        updateObj[field] = value;
    });
    await updateDoc(docRef, updateObj);
  }



  const confirmOutcome = (outcome: string) => {
    setPendingOutcome(outcome);
    setShowConfirmationModal(true);
  };



  const handleConfirm = () => {
    updateFightData([["outcome", pendingOutcome]]);
    setShowConfirmationModal(false);

    if (pendingOutcome === "RESET") {
      updateFightData([
        ["outcome", "PENDING"],
        ["status", "STANDBY"],
      ]);
    } else {
      updateFightData([["status", "CLOSED"]]);  
    }
  };



  const handleCancel = () => {
    setShowConfirmationModal(false);
  };



  const changeFightStatus = () => {
    if (fightData.status === "OPEN") {
      updateFightData([["status", "CLOSED"]]);
    }
    else if (fightData.status === "CLOSED") {
      updateFightData([["status", "STANDBY"]]);
    }
    else {
      updateFightData([["status", "OPEN"]]);
    }
  }



  function formatNumber(value: number | string): string {
    const str = typeof value === "number" ? value.toString() : value;
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  

  if (!adminConfig || !fightData) {
    return null;
  }

  return (
    <div className={`w-full flex flex-col gap-6`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex-col items-start justify-center gap-y-2">
          <div className="text-2xl font-bold tracking-widest">FIGHT #{adminConfig.current_fight}</div>
          <div className="text-sm tracking-widest">GAME #{adminConfig.current_game}</div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <span className="text-xl font-bold tracking-widest mb-1">PAYOUT</span>
          <div className="flex w-[340px] h-12 rounded-full overflow-hidden shadow-lg">
            <div
              style={{ flex: fightData.meron_odds }}
              className={`transition-all bg-gradient-to-t from-red-700 to-red-500 flex items-center justify-center`}
            >
              <span className="text-white font-bold">{fightData.meron_odds}</span>
            </div>
            <div
              style={{ flex: fightData.wala_odds }}
              className={`transition-all bg-gradient-to-t from-blue-700 to-blue-500 flex items-center justify-center`}
            >
              <span className="text-white font-bold">{fightData.wala_odds}</span>
            </div>
          </div>
          <div className="flex w-full mt-1 text-base text-black font-bold justify-around items-center">
            <span className="font-bold text-red-500"><span className="font-mono text-lg">₱</span>{formatNumber(fightData.meron_total)}</span>
            <span className="font-bold text-blue-500"><span className="font-mono text-lg">₱</span>{formatNumber(fightData.wala_total)}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-end justify-center gap-y-2">
          <div className="flex w-full flex-row items-center justify-end gap-4">
            <div className="text-lg font-bold tracking-widest mb-1">
              STATUS:
            </div>
            <button
              className={`font-bold w-1/3 px-6 py-2 rounded-lg shadow transition flex items-center justify-center ${
                fightData.status === "OPEN"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : fightData.status === "CLOSED"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-yellow-400 text-white hover:bg-yellow-500"
              } ${fightData.outcome !== "PENDING" ? "opacity-50" : ""}`}
              onClick={changeFightStatus}
              disabled={fightData.outcome !== "PENDING"}
            >
              {fightData.status === "OPEN" ? " OPEN " : fightData.status === "CLOSED" ? "CLOSED" : "STANDBY"}
            </button>
          </div>
          <div className="flex w-full flex-row items-center justify-end gap-4">
            <div className="text-lg font-bold tracking-widest mb-1">
              OUTCOME:
            </div>
            <button
              className={`font-bold w-1/3 px-6 py-2 rounded-lg shadow transition flex items-center justify-center ${
                fightData.outcome === "MERON"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : fightData.outcome === "WALA"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : fightData.outcome === "DRAW"
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              {fightData.outcome}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-2">
        <button
          className={`flex-1 bg-gradient-to-t from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${fightData.outcome !== "PENDING" ? "opacity-50" : ""}`}
          onClick={() => confirmOutcome("MERON")}
          disabled={fightData.outcome !== "PENDING"}
        >
          MERON WIN
        </button>
        <button
          className={`flex-1 bg-gradient-to-t from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${fightData.outcome !== "PENDING" ? "opacity-50" : ""}`}
          onClick={() => confirmOutcome("WALA")}
          disabled={fightData.outcome !== "PENDING"}
        >
          WALA WIN
        </button>
        <button
          className={`flex-1 bg-gradient-to-b from-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${fightData.outcome !== "PENDING" ? "opacity-50" : ""}`}
          onClick={() => confirmOutcome("DRAW")}
          disabled={fightData.outcome !== "PENDING"}
        >
          DRAW
        </button>
        <button
          className={`flex-1 bg-gradient-to-b from-neutral-600 to-neutral-800 hover:from-neutral-700 hover:to-neutral-900 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${fightData.outcome !== "PENDING" ? "opacity-50" : ""}`}
          onClick={() => confirmOutcome("CANCELLED")}
          disabled={fightData.outcome !== "PENDING"}
        >
          CANCEL
        </button>
        <button
          disabled={fightData.outcome === "PENDING"}
          className={`flex-1 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-xl py-3 rounded-lg shadow transition ${fightData.outcome === "PENDING" ? "opacity-50" : ""}`}
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