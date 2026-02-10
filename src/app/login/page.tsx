"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user, isLoading, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            router.replace("/dashboard");
        }
    }, [user, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        const success = await login(email, password);

        if (success) {
            router.push("/dashboard");
        } else {
            setError("Invalid credentials. Use admin/admin to login.");
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-dark">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (user) return null;

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center overflow-hidden">
            <div className="flex h-screen w-full">
                {/* Left Side: Immersive Brand Visual */}
                <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#05070a]">
                    {/* Hero Image Background */}
                    <div
                        className="absolute inset-0 z-0 opacity-60 bg-center bg-cover"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6EOft8B6MWD4agOv1bAwVsmILyKpoMd-21PI4Q6KvAnv--uhymm0X6MxFxgyGIQA_nYi7PCX0n6Yrd3vONJm7tvMpj04Y-09LXvbBnBJdcU1quUT5rMEDx405Ib7rclIx53eoq5-FflwvN_IvIk2R2j-oAkDu6m2A5712tgNDdKIGq1tAROJJlWkuzu8CbbexpWrdop2ZlV_Qmc9AzdLZ5CwS9FH94ctV1GilM9KNO8mzvaP9RMEAmcsdF831Ntz2C4u8T9E7yAA")'
                        }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#05070a] via-transparent to-primary/20" />

                    {/* Content Overlay */}
                    <div className="relative z-20 flex flex-col justify-between p-16 w-full">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-white">auto_videocam</span>
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white">ADGEN AI</span>
                        </div>

                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                                Transform Products into Ads.
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Our AI engine converts physical product photos into high-converting 3D video advertisements in seconds.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-slate-500 text-sm">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-[#05070a] bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img
                                        alt="User 1"
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYKg8gML9ftKoxiUbwb2RNA8uQaORuBiKe-8NFtalGTISauk10_VUgDP0keSo5d7uRndmBJ9HExvq7LcyCyrk4nC5J28qyrKjxMmNsgrV-qCD0Lr4jLz6tuME02aQ7DZUP4ZctzIG3Uvhmv4cvfkzjB0HhgVBIIgFp_gh2zRuomIjBjet7l8Lxj1szkVPOoEJIHo65EYKKKELSIFAMvbMgmlo3j_Syoq42jBsS6AWHVsNPIUstG7CqliN1vSN923AogriAqmNDPBo"
                                    />
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-[#05070a] bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img
                                        alt="User 2"
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ7ZEoQmSxzJSaT81YmdHaY3OUgGYlvRZQDmpE6NIzWxsMluCGaerRxeo7myKL_pEHMIcZ1vbgElmvd-LYFxvsFi3QSL8g9Ji4-ftZ3gOyRat0nuOorKuBVvLhtEnIhGhZv1hrd6tppeDa9ghQ0h88f0C0wpxsM1MmbMvQMx2pScXsaZ88veVd6x7CglF3PJsrJxZjNKwQ7wGzD_htgeDwk-n7Y5MFRZx6_UgplRpFDlDmbLd_zCyPiTn1GdoggKT7F1kw6xM8Dc8"
                                    />
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-[#05070a] bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <img
                                        alt="User 3"
                                        className="w-full h-full object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH0jT98QZnbZE14mtYnr5BhZwk-f_G8V2oxIi5BPbkkWvW74oc-lLeHR5UFU71xEjNmzeL4hG_2yMhKqHK9XZXlZUTqgSQ25dBt0IUGucI5UVyUFky2-cZfg7KPy40tQXGVG52fF4PMInEMaheCEMp7cAq08I8v1wUjxbVdmkyScgxVWJrFP0L5kU2H1tuPGMWEAC8vkLuv8NVDAVou-QGgycf6serW6OHS6kgMkGokbzZsXRP0krt619Pnu3lFd82AowXPz1r--M"
                                    />
                                </div>
                            </div>
                            <span>Trusted by 2,000+ creative agencies</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Interface */}
                <div className="flex-1 flex flex-col justify-center items-center px-8 lg:px-20 bg-background-light dark:bg-background-dark">
                    <div className="w-full max-w-[440px] flex flex-col gap-8">
                        {/* Page Heading */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-base">Sign in to access your AI creative studio</p>
                        </div>

                        {/* SSO Buttons */}
                        <div className="flex flex-col gap-3">
                            <button className="flex items-center justify-center gap-3 w-full h-12 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-200 font-medium">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                                </svg>
                                Sign in with Google
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full h-12 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-200 font-medium">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05 1.72-3.2 2.27-1.15.55-2.3.82-3.45.82-1.25 0-2.43-.3-3.54-.92-1.11-.61-2.02-1.47-2.72-2.58-.7-1.11-1.05-2.39-1.05-3.83 0-1.44.37-2.75 1.12-3.92.75-1.17 1.77-2.09 3.07-2.75 1.3-.66 2.76-1 4.38-1 .75 0 1.5.07 2.25.22.75.15 1.4.37 1.95.67.55.3 1.05.67 1.5 1.12l-1.05 1.05c-.3-.3-.65-.55-1.05-.75-.4-.2-.85-.35-1.35-.45s-1.05-.15-1.65-.15c-1.25 0-2.37.27-3.37.82-1 .55-1.77 1.3-2.32 2.25-.55.95-.82 2.02-.82 3.22 0 1.2.27 2.27.82 3.22.55.95 1.32 1.7 2.32 2.25 1 .55 2.12.82 3.37.82 1.5 0 2.82-.45 3.97-1.35l1.05 1.05zM12 2.1c0 .55-.15 1.1-.45 1.65-.3.55-.7 1.02-1.2 1.42-.5.4-1.05.72-1.65.97-.6.25-1.2.37-1.8.37s-1.1-.15-1.65-.45c-.55-.3-1.02-.7-1.42-1.2-.4-.5-.72-1.05-.97-1.65-.25-.6-.37-1.2-.37-1.8 0-.55.15-1.1.45-1.65.3-.55.7-1.02 1.2-1.42.5-.4 1.05-.72 1.65-.97s1.2-.37 1.8-.37 1.1.15 1.65.45c.55.3 1.02.7 1.42 1.2.4.5.72 1.05.97 1.65.25.6.37 1.2.37 1.8z" />
                                </svg>
                                Sign in with Apple
                            </button>
                        </div>

                        {/* Meta Text Separator */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background-light dark:bg-background-dark px-4 text-slate-500 font-medium">Or continue with email</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                                    <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <p className="text-sm text-red-400">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="text-primary font-bold hover:underline">Create one for free</a>
                            </p>
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center justify-center gap-2 pt-4 opacity-50">
                            <span className="material-symbols-outlined text-[16px]">lock</span>
                            <span className="text-[11px] uppercase tracking-widest font-bold">Secure AES-256 Encryption</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
