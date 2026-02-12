"use client";

import { useState } from "react";
import {
    Search,
    Bell,
    Plus,
    TrendingUp,
    Eye,
    MoreVertical,
    Play,
    Pencil,
    Sparkles,
    Video,
    Smartphone,
    Globe,
    Clock,
    ArrowUpRight,
    Zap,
    Users,
    BarChart3,
} from "lucide-react";

/* ─── Dummy data ─── */
const STATS = [
    { label: "Total Campaigns", value: "24", change: "+3 this week", icon: Sparkles, trend: "up" },
    { label: "Published Posts", value: "156", change: "+12 today", icon: Globe, trend: "up" },
    { label: "Total Reach", value: "2.4M", change: "+18.2%", icon: Users, trend: "up" },
    { label: "Avg. CTR", value: "3.8%", change: "+0.4%", icon: BarChart3, trend: "up" },
];

const TEMPLATES = [
    {
        id: 1,
        title: "Product Showcase",
        description: "High-end e-commerce ads that convert",
        icon: Sparkles,
    },
    {
        id: 2,
        title: "Cinematic Story",
        description: "Brand storytelling with AI voiceover",
        icon: Video,
    },
    {
        id: 3,
        title: "Social Short",
        description: "9:16 cuts for TikTok & Reels",
        icon: Smartphone,
    },
];

const PROJECTS = [
    {
        id: 1,
        title: "Luxe Chronograph Ad",
        status: "Published",
        statusColor: "#22c55e",
        views: "12.4k",
        ctr: "3.2%",
        time: "2h ago",
    },
    {
        id: 2,
        title: "SprintX Pro Reveal",
        status: "Rendering",
        statusColor: "#7DD3FC",
        progress: 75,
    },
    {
        id: 3,
        title: "Zen Lamp Social Cut",
        status: "Draft",
        statusColor: "#555",
        time: "1 day ago",
    },
    {
        id: 4,
        title: "Summer Launch Promo",
        status: "Published",
        statusColor: "#22c55e",
        views: "8.1k",
        ctr: "4.1%",
        time: "3 days ago",
    },
    {
        id: 5,
        title: "Cloud Nine Teaser",
        status: "Scheduled",
        statusColor: "#f59e0b",
        time: "Tomorrow 9am",
    },
    {
        id: 6,
        title: "Bolt Studio Reel",
        status: "Draft",
        statusColor: "#555",
        time: "5 days ago",
    },
];

const ACTIVITY = [
    { text: "Summer Launch Promo published to Instagram & TikTok", time: "2 hours ago" },
    { text: "SprintX Pro Reveal started rendering", time: "4 hours ago" },
    { text: "Cloud Nine Teaser scheduled for tomorrow", time: "6 hours ago" },
    { text: "Luxe Chronograph Ad reached 10k views", time: "1 day ago" },
];

/* ─── Style helpers ─── */
const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
};

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* ─── Top Bar ─── */}
            <header
                style={{
                    height: 64,
                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 32px",
                    position: "sticky",
                    top: 0,
                    zIndex: 40,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                }}
            >
                {/* Search */}
                <div style={{ flex: 1, maxWidth: 480 }}>
                    <div style={{ position: "relative" }}>
                        <Search
                            style={{
                                position: "absolute",
                                left: 14,
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: 16,
                                height: 16,
                                color: "#555",
                            }}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search campaigns, assets..."
                            style={{
                                width: "100%",
                                height: 40,
                                paddingLeft: 40,
                                paddingRight: 60,
                                borderRadius: 10,
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                color: "#fff",
                                fontSize: 13,
                                outline: "none",
                                transition: "border-color 0.2s",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                right: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                display: "flex",
                                gap: 4,
                            }}
                        >
                            <kbd
                                style={{
                                    padding: "2px 6px",
                                    borderRadius: 4,
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    fontSize: 10,
                                    color: "#555",
                                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                                }}
                            >
                                ⌘
                            </kbd>
                            <kbd
                                style={{
                                    padding: "2px 6px",
                                    borderRadius: 4,
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    fontSize: 10,
                                    color: "#555",
                                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                                }}
                            >
                                K
                            </kbd>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                        style={{
                            position: "relative",
                            padding: 8,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#555",
                            transition: "color 0.2s",
                        }}
                    >
                        <Bell style={{ width: 18, height: 18 }} />
                        <span
                            style={{
                                position: "absolute",
                                top: 6,
                                right: 6,
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                backgroundColor: "#ef4444",
                                border: "2px solid #000",
                            }}
                        />
                    </button>
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 18px",
                            borderRadius: 10,
                            border: "none",
                            backgroundColor: "#7DD3FC",
                            color: "#000",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 0 25px rgba(125,211,252,0.15)",
                            transition: "all 0.2s",
                        }}
                    >
                        <Plus style={{ width: 16, height: 16 }} />
                        New Campaign
                    </button>
                </div>
            </header>

            {/* ─── Main Content ─── */}
            <div style={{ padding: "32px 32px 48px", flex: 1 }}>
                {/* Stats Row */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 16,
                        marginBottom: 32,
                    }}
                >
                    {STATS.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} style={{ ...cardStyle, padding: "20px 24px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        marginBottom: 12,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: "#888",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        {stat.label}
                                    </span>
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 8,
                                            backgroundColor: "rgba(125, 211, 252, 0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                width: 16,
                                                height: 16,
                                                color: "#7DD3FC",
                                            }}
                                        />
                                    </div>
                                </div>
                                <p
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 700,
                                        color: "#fff",
                                        letterSpacing: "-0.03em",
                                        marginBottom: 4,
                                    }}
                                >
                                    {stat.value}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                    }}
                                >
                                    <TrendingUp
                                        style={{
                                            width: 12,
                                            height: 12,
                                            color: "#22c55e",
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: 12,
                                            color: "#22c55e",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Start */}
                <div style={{ marginBottom: 36 }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                        }}
                    >
                        <h2
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: "#fff",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Quick Start
                        </h2>
                        <button
                            style={{
                                background: "none",
                                border: "none",
                                color: "#7DD3FC",
                                fontSize: 13,
                                fontWeight: 500,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            All templates
                            <ArrowUpRight style={{ width: 14, height: 14 }} />
                        </button>
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 16,
                        }}
                    >
                        {TEMPLATES.map((t) => {
                            const Icon = t.icon;
                            return (
                                <div
                                    key={t.id}
                                    style={{
                                        ...cardStyle,
                                        padding: 24,
                                        cursor: "pointer",
                                        position: "relative",
                                        overflow: "hidden",
                                    }}
                                    className="glass-card"
                                >
                                    {/* Subtle glow */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: -20,
                                            right: -20,
                                            width: 100,
                                            height: 100,
                                            borderRadius: "50%",
                                            background:
                                                "radial-gradient(ellipse, rgba(125,211,252,0.06) 0%, transparent 70%)",
                                            pointerEvents: "none",
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 12,
                                            backgroundColor: "rgba(125, 211, 252, 0.08)",
                                            border: "1px solid rgba(125, 211, 252, 0.12)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginBottom: 16,
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                width: 22,
                                                height: 22,
                                                color: "#7DD3FC",
                                            }}
                                        />
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 600,
                                            color: "#fff",
                                            marginBottom: 6,
                                        }}
                                    >
                                        {t.title}
                                    </h3>
                                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>
                                        {t.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Two-column layout: Projects + Activity */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 340px",
                        gap: 24,
                    }}
                >
                    {/* Recent Campaigns */}
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 16,
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: "#fff",
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                Recent Campaigns
                            </h2>
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#7DD3FC",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                View all
                                <ArrowUpRight style={{ width: 14, height: 14 }} />
                            </button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {PROJECTS.map((project) => (
                                <div
                                    key={project.id}
                                    style={{
                                        ...cardStyle,
                                        padding: "16px 20px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 16,
                                        cursor: "pointer",
                                    }}
                                    className="glass-card"
                                >
                                    {/* Thumbnail placeholder */}
                                    <div
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 10,
                                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                                            border: "1px solid rgba(255, 255, 255, 0.06)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {project.status === "Rendering" ? (
                                            <div
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    border: "2px solid #7DD3FC",
                                                    borderTopColor: "transparent",
                                                    borderRadius: "50%",
                                                    animation: "spin 1s linear infinite",
                                                }}
                                            />
                                        ) : project.status === "Published" ? (
                                            <Play
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    color: "#22c55e",
                                                }}
                                            />
                                        ) : project.status === "Scheduled" ? (
                                            <Clock
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    color: "#f59e0b",
                                                }}
                                            />
                                        ) : (
                                            <Pencil
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    color: "#555",
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                color: "#fff",
                                                marginBottom: 4,
                                            }}
                                        >
                                            {project.title}
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    padding: "2px 8px",
                                                    borderRadius: 100,
                                                    backgroundColor: `${project.statusColor}15`,
                                                    color: project.statusColor,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em",
                                                }}
                                            >
                                                {project.status}
                                            </span>
                                            {project.progress !== undefined && (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 8,
                                                        flex: 1,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            flex: 1,
                                                            height: 3,
                                                            borderRadius: 2,
                                                            backgroundColor:
                                                                "rgba(255,255,255,0.08)",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: `${project.progress}%`,
                                                                height: "100%",
                                                                borderRadius: 2,
                                                                background:
                                                                    "linear-gradient(90deg, #7DD3FC, #38BDF8)",
                                                            }}
                                                        />
                                                    </div>
                                                    <span
                                                        style={{
                                                            fontSize: 11,
                                                            color: "#7DD3FC",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {project.progress}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 16,
                                        }}
                                    >
                                        {project.views && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 4,
                                                }}
                                            >
                                                <Eye
                                                    style={{
                                                        width: 14,
                                                        height: 14,
                                                        color: "#555",
                                                    }}
                                                />
                                                <span
                                                    style={{
                                                        fontSize: 12,
                                                        color: "#888",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {project.views}
                                                </span>
                                            </div>
                                        )}
                                        {project.ctr && (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 4,
                                                }}
                                            >
                                                <TrendingUp
                                                    style={{
                                                        width: 14,
                                                        height: 14,
                                                        color: "#7DD3FC",
                                                    }}
                                                />
                                                <span
                                                    style={{
                                                        fontSize: 12,
                                                        color: "#7DD3FC",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {project.ctr}
                                                </span>
                                            </div>
                                        )}
                                        {project.time && !project.progress && (
                                            <span
                                                style={{
                                                    fontSize: 12,
                                                    color: "#555",
                                                }}
                                            >
                                                {project.time}
                                            </span>
                                        )}
                                    </div>

                                    {/* More */}
                                    <button
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            padding: 4,
                                            color: "#555",
                                        }}
                                    >
                                        <MoreVertical style={{ width: 16, height: 16 }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div>
                        <h2
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: "#fff",
                                letterSpacing: "-0.02em",
                                marginBottom: 16,
                            }}
                        >
                            Activity
                        </h2>
                        <div
                            style={{
                                ...cardStyle,
                                padding: 20,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0,
                                }}
                            >
                                {ACTIVITY.map((item, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            gap: 14,
                                            padding: "14px 0",
                                            borderBottom:
                                                i < ACTIVITY.length - 1
                                                    ? "1px solid rgba(255,255,255,0.04)"
                                                    : "none",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                backgroundColor: "#7DD3FC",
                                                marginTop: 5,
                                                flexShrink: 0,
                                                opacity: 1 - i * 0.2,
                                            }}
                                        />
                                        <div>
                                            <p
                                                style={{
                                                    fontSize: 13,
                                                    color: "#ccc",
                                                    lineHeight: 1.5,
                                                    marginBottom: 4,
                                                }}
                                            >
                                                {item.text}
                                            </p>
                                            <span
                                                style={{
                                                    fontSize: 11,
                                                    color: "#555",
                                                }}
                                            >
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spin animation for rendering spinner */}
            <style jsx global>{`
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}
