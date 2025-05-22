'use client';

import { useRouter } from "next/navigation";

export default function Menu({ currPage }: { currPage: string }) {
    const router = useRouter();
    return (
        <ul className="w-full mt-4 mb-6 space-y-6 px-4">
            <li onClick={() => router.push('/dashboard')} className={`text-2xl text-center cursor-pointer ${currPage === 'dashboard' ? "scale-103 text-yellow-300" : "hover:scale-103 text-white hover:text-yellow-300"} transition`}>DASHBOARD</li>
            <li onClick={() => router.push('/history')} className={`text-2xl text-center cursor-pointer ${currPage === 'history' ? "scale-103 text-yellow-300" : "hover:scale-103 text-white hover:text-yellow-300"} transition`}>HISTORY</li>
            <li onClick={() => router.push('/')} className={`text-2xl text-center cursor-pointer ${currPage === 'accounts' ? "scale-103 text-yellow-300" : "hover:scale-103 text-white hover:text-yellow-300"} transition`}>ACCOUNTS</li>
            <li onClick={() => router.push('/')} className="text-white hover:scale-103 text-2xl text-center cursor-pointer hover:text-yellow-300 transition">LOG OUT</li>
        </ul>
    );
}