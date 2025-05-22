"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        function handleResize() {
            setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === "andeellenes@gmail.com" && password === "password") {
            setShowSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        }
        else {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 2000);
        }
    }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-orbitron tracking-widest">
      <Image
        src="/auth/bg.png" 
        alt="Background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />

        <div className="relative inset-0 bg-gradient-to-b shadow-black from-blue-900 via-blue-600 to-blue-300 rounded-3xl w-[90vh] h-[50vh] shadow-xl overflow-visible">
            <Image
            src="/auth/chickens.png"
            alt="Rooster"
            width={1500}
            height={1500}
            className="absolute left-[-230] bottom-10 z-20 scale-125 -rotate-50 drop-shadow-xl"
            priority
            />

            <Image
            src="/auth/coins.png"
            alt="Coins"
            width={800}
            height={800}
            className="absolute left-[-100] top-[-50] z-10 -rotate-20 "
            priority
            />

            <Image
            src="/auth/explosion.png"
            alt="Explosion"
            width={650}
            height={650}
            className="absolute top-[-80] left-[-80] z-0 "
            priority
            />
        </div>

        <div className=" bg-white w-xl px-20 h-5/9 shadow-xl shadow-black -skew-x-20 absolute right-100 flex justify-center items-center z-30">
            <div className="skew-x-20 mr-5">
                <div className="flex items-center justify-center gap-8 mb-8">
                    <span className="text-5xl ml-22 text-black text-center font-[Orbitron] font-semibold tracking-wide">
                    Sign In
                    </span>
                </div>
                <form onSubmit={handleForm}>
                    <div className="mb-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 mb-3 text-lg rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 text-lg rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    </div>
                    <div className="flex justify-between items-center mb-4">
                    <label className="text-sm flex items-center gap-1">
                        <input type="checkbox" className="mr-1" />
                        Remember Me
                    </label>
                    {/* <a
                        href="#"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Forgot Password?
                    </a> */}
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-2 rounded transition"
                    >
                    Login
                    </button>
                    {showSuccess && (
                        <p className="text-sm text-center mt-4 text-green-500">
                            Login successful!
                        </p>
                    )}
                    {showError && (
                        <p className="text-sm text-center mt-4 text-red-500">
                            Invalid credentials, please try again.
                        </p>
                    )}
                    {!showSuccess && !showError && (
                        <p className="text-sm text-center mt-4 text-white">a</p>
                    )}
                </form>
            </div>
        </div> 
    </div> 
  );
}