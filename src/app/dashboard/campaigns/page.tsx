"use client";

import Link from "next/link";
import { useState } from "react";
import { DUMMY_CAMPAIGNS } from "@/lib/dummy-data";
import {
    Plus,
    Search,
    Video,
    Clock,
    Edit3,
    Copy,
    Eye,
    ArrowUpRight,
    Filter,
    Sparkles,
    Globe,
    CheckCircle2,
    Loader2,
    FileText,
} from "lucide-react";

const STATUS_CONFIG: Record<string, { color: string; icon: React.ElementType }> = {
    published: { color: "#22c55e", icon: CheckCircle2 },
    ready: { color: "#7DD3FC", icon: Sparkles },
    generating: { color: "#f59e0b", icon: Loader2 },
    draft: { color: "#555", icon: FileText },
};

const TYPE_LABELS: Record<string, string> = {
    product: "Product",
    software: "Software",
    service: "Service",
    brand_awareness: "Brand",
};

const FILTER_TABS = ["all", "draft", "generating", "ready", "published"];

const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    overflow: "hidden",
};

export default function CampaignsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    const filteredCampaigns = DUMMY_CAMPAIGNS.filter((campaign) => {
        const matchesSearch =
            campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.brandName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            selectedStatus === "all" || campaign.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

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
                        Campaigns
                    </h1>
                    <p style={{ fontSize: 14, color: "#888" }}>
                        Manage and monitor all your ad campaigns
                    </p>
                </div>
                <Link href="/dashboard/campaigns/new" style={{ textDecoration: "none" }}>
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "10px 20px",
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
                </Link>
            </div>

            {/* ─── Filters ─── */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 16,
                    alignItems: "center",
                    marginBottom: 28,
                }}
            >
                {/* Search */}
                <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
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
                        placeholder="Search campaigns..."
                        style={{
                            width: "100%",
                            height: 40,
                            paddingLeft: 40,
                            paddingRight: 16,
                            borderRadius: 10,
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            color: "#fff",
                            fontSize: 13,
                            outline: "none",
                        }}
                    />
                </div>

                {/* Status Tabs */}
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
                    {FILTER_TABS.map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            style={{
                                padding: "6px 14px",
                                borderRadius: 8,
                                border: "none",
                                fontSize: 12,
                                fontWeight: 500,
                                cursor: "pointer",
                                textTransform: "capitalize",
                                transition: "all 0.2s",
                                backgroundColor:
                                    selectedStatus === status
                                        ? "rgba(125, 211, 252, 0.12)"
                                        : "transparent",
                                color:
                                    selectedStatus === status ? "#7DD3FC" : "#888",
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── Campaign Grid ─── */}
            {filteredCampaigns.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "80px 0",
                    }}
                >
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 16,
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px",
                        }}
                    >
                        <Video style={{ width: 28, height: 28, color: "#555" }} />
                    </div>
                    <h3
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "#fff",
                            marginBottom: 8,
                        }}
                    >
                        No campaigns found
                    </h3>
                    <p style={{ fontSize: 13, color: "#555", marginBottom: 24 }}>
                        {searchQuery
                            ? "Try adjusting your search or filters"
                            : "Create your first campaign to get started"}
                    </p>
                    <Link
                        href="/dashboard/campaigns/new"
                        style={{ textDecoration: "none" }}
                    >
                        <button
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "10px 20px",
                                borderRadius: 10,
                                border: "none",
                                backgroundColor: "#7DD3FC",
                                color: "#000",
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            <Plus style={{ width: 16, height: 16 }} />
                            Create Campaign
                        </button>
                    </Link>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 20,
                    }}
                >
                    {filteredCampaigns.map((campaign) => {
                        const statusCfg = STATUS_CONFIG[campaign.status] || {
                            color: "#555",
                            icon: FileText,
                        };
                        const StatusIcon = statusCfg.icon;

                        return (
                            <Link
                                key={campaign.id}
                                href={`/dashboard/campaigns/${campaign.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <div style={cardStyle} className="glass-card">
                                    {/* Thumbnail */}
                                    <div
                                        style={{
                                            position: "relative",
                                            aspectRatio: "16 / 9",
                                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {campaign.thumbnailUrl ? (
                                            <img
                                                src={campaign.thumbnailUrl}
                                                alt={campaign.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    opacity: 0.7,
                                                    transition: "all 0.5s",
                                                }}
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Video
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        color: "#333",
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Status badge */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 12,
                                                left: 12,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 5,
                                                    padding: "4px 10px",
                                                    borderRadius: 100,
                                                    backgroundColor: `${statusCfg.color}20`,
                                                    backdropFilter: "blur(10px)",
                                                    WebkitBackdropFilter: "blur(10px)",
                                                    color: statusCfg.color,
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                <StatusIcon
                                                    style={{
                                                        width: 12,
                                                        height: 12,
                                                    }}
                                                />
                                                {campaign.status}
                                            </span>
                                        </div>

                                        {/* Duration badge */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: 12,
                                                right: 12,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                padding: "3px 8px",
                                                borderRadius: 6,
                                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                backdropFilter: "blur(10px)",
                                                WebkitBackdropFilter: "blur(10px)",
                                                color: "#fff",
                                                fontSize: 11,
                                                fontWeight: 500,
                                            }}
                                        >
                                            <Clock
                                                style={{ width: 11, height: 11 }}
                                            />
                                            {campaign.duration}s
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div style={{ padding: "16px 18px 18px" }}>
                                        <h3
                                            style={{
                                                fontSize: 15,
                                                fontWeight: 600,
                                                color: "#fff",
                                                marginBottom: 4,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {campaign.name}
                                        </h3>
                                        <p
                                            style={{
                                                fontSize: 12,
                                                color: "#888",
                                                marginBottom: 14,
                                            }}
                                        >
                                            {campaign.brandName}
                                        </p>
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
                                                    fontWeight: 500,
                                                    padding: "3px 10px",
                                                    borderRadius: 6,
                                                    backgroundColor:
                                                        "rgba(255, 255, 255, 0.04)",
                                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                                    color: "#888",
                                                }}
                                            >
                                                {TYPE_LABELS[campaign.type] ||
                                                    campaign.type}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 11,
                                                    color: "#555",
                                                }}
                                            >
                                                {new Date(
                                                    campaign.updatedAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
