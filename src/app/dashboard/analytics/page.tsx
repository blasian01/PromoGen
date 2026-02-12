"use client";

import { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    Eye,
    MousePointerClick,
    DollarSign,
    Users,
    BarChart3,
    ArrowUpRight,
    Calendar,
    Download,
    Globe,
    Smartphone,
    Monitor,
    Play,
    Share2,
} from "lucide-react";

/* ─── Dummy data ─── */
const TIME_RANGES = ["7 days", "30 days", "90 days", "12 months"];

const KPI_CARDS = [
    {
        label: "Total Impressions",
        value: "1.2M",
        change: "+14.2%",
        trend: "up" as const,
        icon: Eye,
    },
    {
        label: "Total Clicks",
        value: "84.6K",
        change: "+8.7%",
        trend: "up" as const,
        icon: MousePointerClick,
    },
    {
        label: "Avg. CTR",
        value: "3.8%",
        change: "+0.4%",
        trend: "up" as const,
        icon: BarChart3,
    },
    {
        label: "Ad Spend",
        value: "$4,280",
        change: "-2.1%",
        trend: "down" as const,
        icon: DollarSign,
    },
    {
        label: "Conversions",
        value: "1,847",
        change: "+22.3%",
        trend: "up" as const,
        icon: Users,
    },
    {
        label: "Cost per Conv.",
        value: "$2.32",
        change: "-11.5%",
        trend: "up" as const,
        icon: TrendingDown,
    },
];

const CHART_DATA = [
    { day: "Mon", impressions: 42, clicks: 18 },
    { day: "Tue", impressions: 58, clicks: 25 },
    { day: "Wed", impressions: 45, clicks: 20 },
    { day: "Thu", impressions: 72, clicks: 38 },
    { day: "Fri", impressions: 85, clicks: 42 },
    { day: "Sat", impressions: 65, clicks: 30 },
    { day: "Sun", impressions: 52, clicks: 22 },
];

const TOP_CAMPAIGNS = [
    { name: "Luxe Chronograph Ad", impressions: "342K", clicks: "12.4K", ctr: "3.6%", spend: "$820", conversions: 486 },
    { name: "SprintX Pro Reveal", impressions: "289K", clicks: "10.8K", ctr: "3.7%", spend: "$750", conversions: 412 },
    { name: "Summer Launch Promo", impressions: "215K", clicks: "8.1K", ctr: "3.8%", spend: "$580", conversions: 328 },
    { name: "Cloud Nine Teaser", impressions: "187K", clicks: "6.9K", ctr: "3.7%", spend: "$420", conversions: 275 },
    { name: "Zen Lamp Social Cut", impressions: "142K", clicks: "5.2K", ctr: "3.7%", spend: "$310", conversions: 198 },
];

const PLATFORM_BREAKDOWN = [
    { platform: "Instagram", icon: Globe, impressions: "520K", share: 43, color: "#E1306C" },
    { platform: "TikTok", icon: Smartphone, impressions: "380K", share: 32, color: "#fff" },
    { platform: "YouTube", icon: Play, impressions: "210K", share: 17, color: "#FF0000" },
    { platform: "Facebook", icon: Share2, impressions: "90K", share: 8, color: "#1877F2" },
];

const DEVICE_STATS = [
    { device: "Mobile", icon: Smartphone, share: 68, color: "#7DD3FC" },
    { device: "Desktop", icon: Monitor, share: 24, color: "#22c55e" },
    { device: "Tablet", icon: Monitor, share: 8, color: "#f59e0b" },
];

/* ─── Shared styles ─── */
const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
};

export default function AnalyticsPage() {
    const [selectedRange, setSelectedRange] = useState("30 days");

    const maxImpressions = Math.max(...CHART_DATA.map((d) => d.impressions));

    return (
        <div style={{ padding: "32px 32px 48px", flex: 1 }}>
            {/* ─── Header ─── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 32,
                }}
            >
                <div>
                    <h1
                        style={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: "#fff",
                            letterSpacing: "-0.03em",
                            marginBottom: 6,
                        }}
                    >
                        Analytics
                    </h1>
                    <p style={{ fontSize: 14, color: "#888" }}>
                        Track performance across all your campaigns
                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Time Range Selector */}
                    <div
                        style={{
                            display: "flex",
                            gap: 4,
                            padding: 4,
                            borderRadius: 10,
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                    >
                        {TIME_RANGES.map((range) => (
                            <button
                                key={range}
                                onClick={() => setSelectedRange(range)}
                                style={{
                                    padding: "6px 14px",
                                    borderRadius: 8,
                                    border: "none",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    backgroundColor:
                                        selectedRange === range
                                            ? "rgba(125, 211, 252, 0.12)"
                                            : "transparent",
                                    color:
                                        selectedRange === range
                                            ? "#7DD3FC"
                                            : "#888",
                                }}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 18px",
                            borderRadius: 10,
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            backgroundColor: "transparent",
                            color: "#ccc",
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        <Download style={{ width: 14, height: 14 }} />
                        Export
                    </button>
                </div>
            </div>

            {/* ─── KPI Cards ─── */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: 14,
                    marginBottom: 28,
                }}
            >
                {KPI_CARDS.map((kpi) => {
                    const Icon = kpi.icon;
                    const isUp = kpi.trend === "up";
                    return (
                        <div key={kpi.label} style={{ ...cardStyle, padding: "18px 16px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 12,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 500,
                                        color: "#888",
                                        letterSpacing: "0.02em",
                                    }}
                                >
                                    {kpi.label}
                                </span>
                                <Icon
                                    style={{
                                        width: 14,
                                        height: 14,
                                        color: "#555",
                                    }}
                                />
                            </div>
                            <p
                                style={{
                                    fontSize: 22,
                                    fontWeight: 700,
                                    color: "#fff",
                                    letterSpacing: "-0.03em",
                                    marginBottom: 4,
                                }}
                            >
                                {kpi.value}
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                {isUp ? (
                                    <TrendingUp
                                        style={{
                                            width: 12,
                                            height: 12,
                                            color: "#22c55e",
                                        }}
                                    />
                                ) : (
                                    <TrendingDown
                                        style={{
                                            width: 12,
                                            height: 12,
                                            color: kpi.label === "Ad Spend" ? "#ef4444" : "#22c55e",
                                        }}
                                    />
                                )}
                                <span
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 500,
                                        color:
                                            kpi.change.startsWith("+") &&
                                                kpi.label !== "Ad Spend"
                                                ? "#22c55e"
                                                : kpi.label === "Cost per Conv."
                                                    ? "#22c55e"
                                                    : kpi.change.startsWith("-")
                                                        ? kpi.label === "Ad Spend"
                                                            ? "#ef4444"
                                                            : "#22c55e"
                                                        : "#22c55e",
                                    }}
                                >
                                    {kpi.change}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ─── Two-column: Chart + Platform breakdown ─── */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 340px",
                    gap: 20,
                    marginBottom: 28,
                }}
            >
                {/* Bar Chart */}
                <div style={{ ...cardStyle, padding: 24 }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 24,
                        }}
                    >
                        <h3
                            style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#fff",
                            }}
                        >
                            Performance Overview
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                gap: 16,
                                fontSize: 12,
                                color: "#888",
                            }}
                        >
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                }}
                            >
                                <span
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 2,
                                        backgroundColor: "#7DD3FC",
                                        display: "inline-block",
                                    }}
                                />
                                Impressions
                            </span>
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                }}
                            >
                                <span
                                    style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 2,
                                        backgroundColor: "#22c55e",
                                        display: "inline-block",
                                    }}
                                />
                                Clicks
                            </span>
                        </div>
                    </div>

                    {/* Simple bar chart */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: 12,
                            height: 200,
                            paddingTop: 8,
                        }}
                    >
                        {CHART_DATA.map((d) => (
                            <div
                                key={d.day}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 8,
                                    height: "100%",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 4,
                                        alignItems: "flex-end",
                                        width: "100%",
                                        justifyContent: "center",
                                    }}
                                >
                                    {/* Impressions bar */}
                                    <div
                                        style={{
                                            width: "35%",
                                            height: `${(d.impressions / maxImpressions) * 160}px`,
                                            borderRadius: "4px 4px 0 0",
                                            background:
                                                "linear-gradient(180deg, #7DD3FC, rgba(125,211,252,0.4))",
                                            transition: "height 0.4s ease",
                                        }}
                                    />
                                    {/* Clicks bar */}
                                    <div
                                        style={{
                                            width: "35%",
                                            height: `${(d.clicks / maxImpressions) * 160}px`,
                                            borderRadius: "4px 4px 0 0",
                                            background:
                                                "linear-gradient(180deg, #22c55e, rgba(34,197,94,0.4))",
                                            transition: "height 0.4s ease",
                                        }}
                                    />
                                </div>
                                <span
                                    style={{
                                        fontSize: 11,
                                        color: "#555",
                                        fontWeight: 500,
                                    }}
                                >
                                    {d.day}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform + Device breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* Platform Breakdown */}
                    <div style={{ ...cardStyle, padding: 20 }}>
                        <h3
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: 16,
                            }}
                        >
                            Platform Breakdown
                        </h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            {PLATFORM_BREAKDOWN.map((p) => {
                                const Icon = p.icon;
                                return (
                                    <div
                                        key={p.platform}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                width: 16,
                                                height: 16,
                                                color: p.color,
                                                flexShrink: 0,
                                            }}
                                        />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: 12,
                                                        color: "#ccc",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {p.platform}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: 11,
                                                        color: "#888",
                                                    }}
                                                >
                                                    {p.impressions} ({p.share}%)
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: 4,
                                                    borderRadius: 2,
                                                    backgroundColor:
                                                        "rgba(255,255,255,0.06)",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${p.share}%`,
                                                        height: "100%",
                                                        borderRadius: 2,
                                                        backgroundColor:
                                                            p.color,
                                                        opacity: 0.7,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Device Breakdown */}
                    <div style={{ ...cardStyle, padding: 20 }}>
                        <h3
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: 16,
                            }}
                        >
                            Device Breakdown
                        </h3>
                        <div style={{ display: "flex", gap: 8 }}>
                            {DEVICE_STATS.map((d) => {
                                const Icon = d.icon;
                                return (
                                    <div
                                        key={d.device}
                                        style={{
                                            flex: 1,
                                            textAlign: "center",
                                            padding: "14px 8px",
                                            borderRadius: 10,
                                            backgroundColor:
                                                "rgba(255,255,255,0.02)",
                                            border: "1px solid rgba(255,255,255,0.04)",
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                width: 18,
                                                height: 18,
                                                color: d.color,
                                                margin: "0 auto 8px",
                                                display: "block",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: "#fff",
                                                marginBottom: 2,
                                            }}
                                        >
                                            {d.share}%
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 11,
                                                color: "#555",
                                            }}
                                        >
                                            {d.device}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Top Campaigns Table ─── */}
            <div style={{ ...cardStyle, padding: 24 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <h3
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#fff",
                        }}
                    >
                        Top Performing Campaigns
                    </h3>
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

                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                        }}
                    >
                        <thead>
                            <tr>
                                {[
                                    "Campaign",
                                    "Impressions",
                                    "Clicks",
                                    "CTR",
                                    "Spend",
                                    "Conversions",
                                ].map((header) => (
                                    <th
                                        key={header}
                                        style={{
                                            textAlign:
                                                header === "Campaign"
                                                    ? "left"
                                                    : "right",
                                            padding: "10px 16px",
                                            fontSize: 11,
                                            fontWeight: 600,
                                            color: "#555",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            borderBottom:
                                                "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TOP_CAMPAIGNS.map((campaign, i) => (
                                <tr
                                    key={campaign.name}
                                    style={{
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: "14px 16px",
                                            fontSize: 13,
                                            fontWeight: 500,
                                            color: "#fff",
                                            borderBottom:
                                                i < TOP_CAMPAIGNS.length - 1
                                                    ? "1px solid rgba(255,255,255,0.04)"
                                                    : "none",
                                        }}
                                    >
                                        {campaign.name}
                                    </td>
                                    {[
                                        campaign.impressions,
                                        campaign.clicks,
                                        campaign.ctr,
                                        campaign.spend,
                                        campaign.conversions.toLocaleString(),
                                    ].map((val, j) => (
                                        <td
                                            key={j}
                                            style={{
                                                padding: "14px 16px",
                                                fontSize: 13,
                                                color: "#888",
                                                textAlign: "right",
                                                fontWeight: 500,
                                                borderBottom:
                                                    i <
                                                        TOP_CAMPAIGNS.length - 1
                                                        ? "1px solid rgba(255,255,255,0.04)"
                                                        : "none",
                                                fontVariantNumeric:
                                                    "tabular-nums",
                                            }}
                                        >
                                            {val}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
