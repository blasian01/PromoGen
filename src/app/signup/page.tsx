"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Layers, ArrowRight, Eye, EyeOff, Lock, Check } from "lucide-react";

/* ─── Password strength calculator ─── */
function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 1) return { score, label: "Weak", color: "#ef4444" };
    if (score <= 2) return { score, label: "Fair", color: "#f59e0b" };
    if (score <= 3) return { score, label: "Good", color: "#22c55e" };
    return { score, label: "Strong", color: "#7DD3FC" };
}

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user, isLoading, signup } = useAuth();
    const router = useRouter();

    const strength = useMemo(() => getPasswordStrength(password), [password]);

    useEffect(() => {
        if (!isLoading && user) {
            router.replace("/dashboard");
        }
    }, [user, isLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }
        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);
        const success = await signup(name, email, password);

        if (success) {
            router.push("/dashboard");
        } else {
            setError("Could not create account. Please try again.");
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

                {/* Heading */}
                <h2
                    style={{
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        marginBottom: 8,
                    }}
                >
                    Create your account
                </h2>
                <p style={{ fontSize: 14, color: "#888", marginBottom: 36 }}>
                    Start managing every channel in one place
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
                    {/* Full Name */}
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
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Doe"
                            style={inputStyle}
                        />
                    </div>

                    {/* Email */}
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

                    {/* Password */}
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
                            Password
                        </label>
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

                        {/* Strength indicator */}
                        {password.length > 0 && (
                            <div style={{ marginTop: 10 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 4,
                                        marginBottom: 6,
                                    }}
                                >
                                    {[1, 2, 3, 4].map((segment) => (
                                        <div
                                            key={segment}
                                            style={{
                                                flex: 1,
                                                height: 3,
                                                borderRadius: 2,
                                                backgroundColor:
                                                    strength.score >= segment
                                                        ? strength.color
                                                        : "rgba(255,255,255,0.08)",
                                                transition: "background-color 0.3s",
                                            }}
                                        />
                                    ))}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 11,
                                            color: strength.color,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {strength.label}
                                    </span>
                                    <span style={{ fontSize: 11, color: "#555" }}>
                                        Min. 8 characters
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
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
                            Confirm Password
                        </label>
                        <div style={{ position: "relative" }}>
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    ...inputStyle,
                                    ...(confirmPassword.length > 0 && password === confirmPassword
                                        ? { borderColor: "rgba(34, 197, 94, 0.4)" }
                                        : {}),
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    right: 12,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                {confirmPassword.length > 0 && password === confirmPassword && (
                                    <Check
                                        style={{ width: 16, height: 16, color: "#22c55e" }}
                                    />
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 4,
                                        color: "#555",
                                    }}
                                >
                                    {showConfirm ? (
                                        <EyeOff style={{ width: 18, height: 18 }} />
                                    ) : (
                                        <Eye style={{ width: 18, height: 18 }} />
                                    )}
                                </button>
                            </div>
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
                        {isSubmitting ? "Creating Account..." : "Create Account"}
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
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        style={{
                            color: "#7DD3FC",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        Sign in
                    </Link>
                </p>

                {/* Encryption badge */}
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
    );
}
