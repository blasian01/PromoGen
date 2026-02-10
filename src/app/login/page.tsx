"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Layers, ArrowRight, Lock, Eye, EyeOff } from "lucide-react";

const PhoneScene = dynamic(() => import("@/components/PhoneScene"), {
    ssr: false,
    loading: () => null,
});

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
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000",
                }}
            >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        border: "2px solid #7DD3FC",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                    }}
                />
            </div>
        );
    }

    if (user) return null;

    const inputStyle: React.CSSProperties = {
        width: "100%",
        height: 48,
        padding: "0 16px",
        borderRadius: 10,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        color: "#fff",
        fontSize: 14,
        outline: "none",
        transition: "border-color 0.2s",
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                backgroundColor: "#000",
                color: "#fff",
            }}
        >
            {/* Left — Brand panel */}
            <div
                style={{
                    flex: 1,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 64,
                }}
                className="hidden-mobile"
            >
                {/* Severance grid */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        pointerEvents: "none",
                    }}
                />
                {/* Glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        height: 400,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(ellipse, rgba(125, 211, 252, 0.06) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Three.js Phone Scene */}
                <PhoneScene />

                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        position: "relative",
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            backgroundColor: "#7DD3FC",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Layers style={{ width: 18, height: 18, color: "#000" }} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>
                        PromoGen
                    </span>
                </div>

                {/* Tagline */}
                <div style={{ position: "relative", zIndex: 10, maxWidth: 420 }}>
                    <h1
                        style={{
                            fontSize: 48,
                            fontWeight: 700,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.1,
                            marginBottom: 20,
                        }}
                    >
                        Ship products.
                        <br />
                        <span className="gradient-text">Market fast.</span>
                    </h1>
                    <p style={{ fontSize: 16, color: "#888", lineHeight: 1.7 }}>
                        One platform to manage every social account, generate AI ads, and
                        publish everywhere — so you can focus on building.
                    </p>
                </div>

                {/* Social proof */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 24,
                        position: "relative",
                        zIndex: 10,
                    }}
                >
                    <div style={{ display: "flex", gap: 32 }}>
                        {[
                            { value: "10K+", label: "Devs" },
                            { value: "2M+", label: "Posts" },
                            { value: "99.9%", label: "Uptime" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                        color: "#7DD3FC",
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    {stat.value}
                                </p>
                                <p
                                    style={{
                                        fontSize: 11,
                                        color: "#555",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        fontWeight: 500,
                                    }}
                                >
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right — Login form */}
            <div
                style={{
                    width: "100%",
                    maxWidth: 520,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "48px 40px",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
                }}
            >
                <div style={{ width: "100%", maxWidth: 380 }}>
                    {/* Mobile logo */}
                    <div
                        className="show-mobile"
                        style={{
                            display: "none",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 40,
                        }}
                    >
                        <div
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 6,
                                backgroundColor: "#7DD3FC",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Layers style={{ width: 16, height: 16, color: "#000" }} strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize: 18, fontWeight: 600 }}>PromoGen</span>
                    </div>

                    {/* Heading */}
                    <h2
                        style={{
                            fontSize: 28,
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                            marginBottom: 8,
                        }}
                    >
                        Welcome back
                    </h2>
                    <p style={{ fontSize: 14, color: "#888", marginBottom: 36 }}>
                        Sign in to your command center
                    </p>

                    {/* SSO */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                        <button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 12,
                                width: "100%",
                                height: 48,
                                borderRadius: 10,
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                color: "#fff",
                                fontSize: 14,
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "background-color 0.2s, border-color 0.2s",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </button>

                    </div>

                    {/* Divider */}
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 32,
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                            }}
                        />
                        <span
                            style={{
                                padding: "0 16px",
                                fontSize: 11,
                                color: "#555",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                fontWeight: 500,
                            }}
                        >
                            Or continue with email
                        </span>
                        <div
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                            }}
                        />
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        style={{ display: "flex", flexDirection: "column", gap: 20 }}
                    >
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "#888",
                                    marginBottom: 8,
                                    letterSpacing: "0.02em",
                                }}
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 8,
                                }}
                            >
                                <label
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "#888",
                                        letterSpacing: "0.02em",
                                    }}
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    style={{
                                        fontSize: 12,
                                        color: "#7DD3FC",
                                        textDecoration: "none",
                                        fontWeight: 500,
                                    }}
                                >
                                    Forgot?
                                </a>
                            </div>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={inputStyle}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: 12,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 4,
                                        color: "#555",
                                    }}
                                >
                                    {showPassword ? (
                                        <EyeOff style={{ width: 18, height: 18 }} />
                                    ) : (
                                        <Eye style={{ width: 18, height: 18 }} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                style={{
                                    padding: 12,
                                    borderRadius: 10,
                                    backgroundColor: "rgba(239, 68, 68, 0.08)",
                                    border: "1px solid rgba(239, 68, 68, 0.2)",
                                }}
                            >
                                <p style={{ fontSize: 13, color: "#f87171" }}>{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                width: "100%",
                                height: 48,
                                borderRadius: 10,
                                border: "none",
                                backgroundColor: "#7DD3FC",
                                color: "#000",
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                opacity: isSubmitting ? 0.5 : 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                boxShadow: "0 0 30px rgba(125,211,252,0.15)",
                                transition: "opacity 0.2s",
                                marginTop: 4,
                            }}
                        >
                            {isSubmitting ? "Signing In..." : "Sign In"}
                            <ArrowRight style={{ width: 16, height: 16 }} />
                        </button>
                    </form>

                    {/* Footer */}
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: 13,
                            color: "#555",
                            marginTop: 28,
                        }}
                    >
                        Don&apos;t have an account?{" "}
                        <a
                            href="#"
                            style={{
                                color: "#7DD3FC",
                                fontWeight: 600,
                                textDecoration: "none",
                            }}
                        >
                            Start free
                        </a>
                    </p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            marginTop: 24,
                            opacity: 0.4,
                        }}
                    >
                        <Lock style={{ width: 12, height: 12 }} />
                        <span
                            style={{
                                fontSize: 10,
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                fontWeight: 600,
                            }}
                        >
                            256-bit encryption
                        </span>
                    </div>
                </div>
            </div>

            {/* CSS for responsive hiding — only used for the brand panel */}
            <style jsx global>{`
        @media (max-width: 1024px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
        }
      `}</style>
        </div>
    );
}
