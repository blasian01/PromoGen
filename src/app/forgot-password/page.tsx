"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        setIsSubmitting(true);

        // Mock — simulate sending a reset link
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSent(true);
        setIsSubmitting(false);
    };

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
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
                color: "#fff",
                padding: 24,
            }}
        >
            {/* Subtle background glow */}
            <div
                style={{
                    position: "fixed",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    height: 400,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(ellipse, rgba(125, 211, 252, 0.04) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Severance grid */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    width: "100%",
                    maxWidth: 420,
                    position: "relative",
                    zIndex: 10,
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 48,
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
                        Sociably
                    </span>
                </div>

                {isSent ? (
                    /* ─── Success state ─── */
                    <div>
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 16,
                                backgroundColor: "rgba(125, 211, 252, 0.1)",
                                border: "1px solid rgba(125, 211, 252, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 24,
                            }}
                        >
                            <CheckCircle2
                                style={{ width: 28, height: 28, color: "#7DD3FC" }}
                            />
                        </div>

                        <h2
                            style={{
                                fontSize: 28,
                                fontWeight: 700,
                                letterSpacing: "-0.03em",
                                marginBottom: 12,
                            }}
                        >
                            Check your inbox
                        </h2>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#888",
                                lineHeight: 1.7,
                                marginBottom: 8,
                            }}
                        >
                            We sent a password reset link to
                        </p>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#fff",
                                fontWeight: 500,
                                marginBottom: 32,
                            }}
                        >
                            {email}
                        </p>
                        <p
                            style={{
                                fontSize: 13,
                                color: "#555",
                                lineHeight: 1.7,
                                marginBottom: 32,
                            }}
                        >
                            Didn&apos;t receive the email? Check your spam folder or{" "}
                            <button
                                onClick={() => {
                                    setIsSent(false);
                                    setEmail("");
                                }}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#7DD3FC",
                                    cursor: "pointer",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    padding: 0,
                                }}
                            >
                                try a different email
                            </button>
                            .
                        </p>

                        <Link
                            href="/login"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 14,
                                color: "#7DD3FC",
                                fontWeight: 500,
                                textDecoration: "none",
                            }}
                        >
                            <ArrowLeft style={{ width: 16, height: 16 }} />
                            Back to sign in
                        </Link>
                    </div>
                ) : (
                    /* ─── Form state ─── */
                    <div>
                        {/* Icon */}
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                borderRadius: 16,
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 24,
                            }}
                        >
                            <Mail style={{ width: 24, height: 24, color: "#7DD3FC" }} />
                        </div>

                        <h2
                            style={{
                                fontSize: 28,
                                fontWeight: 700,
                                letterSpacing: "-0.03em",
                                marginBottom: 8,
                            }}
                        >
                            Reset your password
                        </h2>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#888",
                                lineHeight: 1.7,
                                marginBottom: 36,
                            }}
                        >
                            Enter the email address associated with your account and we&apos;ll
                            send you a link to reset your password.
                        </p>

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
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>

                        <div style={{ textAlign: "center", marginTop: 28 }}>
                            <Link
                                href="/login"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    fontSize: 13,
                                    color: "#555",
                                    textDecoration: "none",
                                    fontWeight: 500,
                                    transition: "color 0.2s",
                                }}
                            >
                                <ArrowLeft style={{ width: 14, height: 14 }} />
                                Back to sign in
                            </Link>
                        </div>
                    </div>
                )}

                {/* Encryption badge */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        marginTop: 48,
                        opacity: 0.4,
                    }}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
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
    );
}
