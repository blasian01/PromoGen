"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
    Layers,
    LayoutGrid,
    FolderOpen,
    Clapperboard,
    Send,
    BarChart3,
    Settings,
    LogOut,
    Zap,
    ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
    { href: "/dashboard", label: "Overview", icon: LayoutGrid },
    { href: "/dashboard/campaigns", label: "Campaigns", icon: FolderOpen },
    { href: "/dashboard/storyboard", label: "Storyboard", icon: Clapperboard },
    { href: "/dashboard/publish", label: "Publish", icon: Send },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <aside
            style={{
                width: 260,
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 50,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#0A0A0A",
                borderRight: "1px solid rgba(255, 255, 255, 0.06)",
            }}
        >
            {/* Logo */}
            <div
                style={{
                    padding: "24px 24px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
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
                        flexShrink: 0,
                    }}
                >
                    <Layers style={{ width: 18, height: 18, color: "#000" }} strokeWidth={2.5} />
                </div>
                <span
                    style={{
                        fontSize: 18,
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: "#fff",
                    }}
                >
                    Sociably
                </span>
            </div>

            {/* Navigation */}
            <nav
                style={{
                    flex: 1,
                    padding: "8px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "10px 14px",
                                borderRadius: 10,
                                fontSize: 14,
                                fontWeight: isActive ? 500 : 400,
                                color: isActive ? "#fff" : "#888",
                                backgroundColor: isActive
                                    ? "rgba(125, 211, 252, 0.08)"
                                    : "transparent",
                                textDecoration: "none",
                                transition: "all 0.2s",
                            }}
                        >
                            <Icon
                                style={{
                                    width: 18,
                                    height: 18,
                                    color: isActive ? "#7DD3FC" : "#555",
                                }}
                            />
                            <span>{item.label}</span>
                            {isActive && (
                                <div
                                    style={{
                                        marginLeft: "auto",
                                        width: 4,
                                        height: 4,
                                        borderRadius: "50%",
                                        backgroundColor: "#7DD3FC",
                                    }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Storage + Upgrade */}
            <div style={{ padding: "0 16px 16px" }}>
                <div
                    style={{
                        padding: 16,
                        borderRadius: 12,
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "#555",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                            }}
                        >
                            Storage
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#7DD3FC" }}>
                            41%
                        </span>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            height: 3,
                            borderRadius: 2,
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                width: "41%",
                                height: "100%",
                                borderRadius: 2,
                                background: "linear-gradient(90deg, #7DD3FC, #38BDF8)",
                            }}
                        />
                    </div>
                    <p
                        style={{
                            fontSize: 11,
                            color: "#555",
                            marginTop: 8,
                        }}
                    >
                        8.2 GB of 20 GB used
                    </p>
                    <button
                        style={{
                            width: "100%",
                            marginTop: 12,
                            padding: "8px 0",
                            borderRadius: 8,
                            border: "1px solid rgba(125, 211, 252, 0.2)",
                            backgroundColor: "rgba(125, 211, 252, 0.06)",
                            color: "#7DD3FC",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            transition: "all 0.2s",
                        }}
                    >
                        <Zap style={{ width: 14, height: 14 }} />
                        Upgrade Plan
                    </button>
                </div>
            </div>

            {/* User Profile */}
            <div
                style={{
                    padding: "16px 20px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <div
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #7DD3FC, #38BDF8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#000" }}>
                        {user?.name?.charAt(0) || "A"}
                    </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                        style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#fff",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {user?.name || "Admin User"}
                    </p>
                    <p style={{ fontSize: 11, color: "#555" }}>Pro Plan</p>
                </div>
                <button
                    onClick={logout}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 4,
                        color: "#555",
                        transition: "color 0.2s",
                    }}
                    title="Sign out"
                >
                    <LogOut style={{ width: 16, height: 16 }} />
                </button>
            </div>
        </aside>
    );
}
