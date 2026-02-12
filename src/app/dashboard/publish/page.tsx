"use client";

import { useState } from "react";
import {
    ChevronDown,
    Check,
    Video,
    Image as ImageIcon,
    Type,
    Instagram,
    Youtube,
    Globe,
    Share2,
    Twitter,
    MessageCircle,
    Send,
    Building2,
    Plus,
    ArrowRight,
    Calendar,
    Clock,
    Sparkles,
    Layers,
    ChevronRight,
    Upload,
    Film,
    Clapperboard,
    FileVideo,
    FileImage,
    X,
    GripVertical,
    Paperclip,
} from "lucide-react";

/* ─── Dummy businesses / projects ─── */
interface SocialAccount {
    id: string;
    platform: string;
    handle: string;
    icon: typeof Instagram;
    color: string;
    connected: boolean;
    followers?: string;
}

interface Business {
    id: string;
    name: string;
    logo: string;
    plan: string;
    socialAccounts: SocialAccount[];
}

const BUSINESSES: Business[] = [
    {
        id: "biz-1",
        name: "TechGear Pro",
        logo: "T",
        plan: "Pro",
        socialAccounts: [
            { id: "s1", platform: "Instagram", handle: "@techgearpro", icon: Instagram, color: "#E1306C", connected: true, followers: "24.5K" },
            { id: "s2", platform: "TikTok", handle: "@techgearpro", icon: MessageCircle, color: "#fff", connected: true, followers: "18.2K" },
            { id: "s3", platform: "YouTube", handle: "TechGear Pro", icon: Youtube, color: "#FF0000", connected: true, followers: "8.1K" },
            { id: "s4", platform: "X / Twitter", handle: "@techgear_pro", icon: Twitter, color: "#1DA1F2", connected: true, followers: "12.3K" },
            { id: "s5", platform: "Facebook", handle: "TechGear Pro", icon: Share2, color: "#1877F2", connected: false },
        ],
    },
    {
        id: "biz-2",
        name: "FitTrack",
        logo: "F",
        plan: "Starter",
        socialAccounts: [
            { id: "s6", platform: "Instagram", handle: "@fittrack_app", icon: Instagram, color: "#E1306C", connected: true, followers: "42.1K" },
            { id: "s7", platform: "TikTok", handle: "@fittrack", icon: MessageCircle, color: "#fff", connected: true, followers: "95.3K" },
            { id: "s8", platform: "YouTube", handle: "FitTrack", icon: Youtube, color: "#FF0000", connected: false },
        ],
    },
    {
        id: "biz-3",
        name: "EcoLiving",
        logo: "E",
        plan: "Pro",
        socialAccounts: [
            { id: "s9", platform: "Instagram", handle: "@ecoliving_co", icon: Instagram, color: "#E1306C", connected: true, followers: "15.8K" },
            { id: "s10", platform: "Facebook", handle: "EcoLiving Co.", icon: Share2, color: "#1877F2", connected: true, followers: "9.2K" },
        ],
    },
];

/* ─── Content types ─── */
const CONTENT_TYPES = [
    {
        id: "video",
        title: "Video",
        description: "Short-form or long-form video content",
        icon: Video,
        formats: ["Reel / Short", "Story", "Feed Video", "Long-form"],
    },
    {
        id: "images",
        title: "Image(s)",
        description: "Single image or carousel post",
        icon: ImageIcon,
        formats: ["Single Image", "Carousel (up to 10)", "Story Image"],
    },
    {
        id: "text",
        title: "Text",
        description: "Text-only post or thread",
        icon: Type,
        formats: ["Single Post", "Thread / Series"],
    },
];

/* ─── Storyboard projects (created in studio) ─── */
interface StoryboardProject {
    id: string;
    name: string;
    thumbnail: string;
    duration: string;
    segments: number;
    status: "ready" | "generating" | "draft";
    createdAt: string;
}

const STORYBOARD_PROJECTS: StoryboardProject[] = [
    {
        id: "sb-1",
        name: "Luxe Chronograph Ad",
        thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
        duration: "0:29",
        segments: 4,
        status: "ready",
        createdAt: "2h ago",
    },
    {
        id: "sb-2",
        name: "SprintX Pro Reveal",
        thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
        duration: "0:45",
        segments: 6,
        status: "ready",
        createdAt: "1d ago",
    },
    {
        id: "sb-3",
        name: "Cloud Nine Teaser",
        thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
        duration: "0:18",
        segments: 3,
        status: "generating",
        createdAt: "3h ago",
    },
    {
        id: "sb-4",
        name: "Summer Campaign B-Roll",
        thumbnail: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&q=80",
        duration: "1:12",
        segments: 8,
        status: "draft",
        createdAt: "5d ago",
    },
];

/* ─── Uploaded files (dummy) ─── */
interface UploadedFile {
    id: string;
    name: string;
    type: "video" | "image";
    size: string;
}

/* ─── Shared styles ─── */
const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
};

const stepBadge = (active: boolean): React.CSSProperties => ({
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: active ? "rgba(125,211,252,0.12)" : "rgba(255,255,255,0.06)",
    color: active ? "#7DD3FC" : "#555",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
});

export default function PublishPage() {
    const [selectedBusiness, setSelectedBusiness] = useState<string>("biz-1");
    const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
    const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [scheduleType, setScheduleType] = useState<"now" | "schedule">("now");

    // Content attachment state
    const [contentSource, setContentSource] = useState<"storyboard" | "upload" | null>(null);
    const [selectedStoryboard, setSelectedStoryboard] = useState<string | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const currentBusiness = BUSINESSES.find((b) => b.id === selectedBusiness)!;
    const connectedAccounts = currentBusiness.socialAccounts.filter((a) => a.connected);

    const togglePlatform = (accountId: string) => {
        setSelectedPlatforms((prev) =>
            prev.includes(accountId) ? prev.filter((id) => id !== accountId) : [...prev, accountId]
        );
    };

    const selectAllPlatforms = () => {
        const allConnected = connectedAccounts.map((a) => a.id);
        if (selectedPlatforms.length === allConnected.length) {
            setSelectedPlatforms([]);
        } else {
            setSelectedPlatforms(allConnected);
        }
    };

    const addDummyUpload = (type: "video" | "image") => {
        const newFile: UploadedFile = {
            id: `file-${Date.now()}`,
            name: type === "video" ? `clip_${uploadedFiles.length + 1}.mp4` : `photo_${uploadedFiles.length + 1}.jpg`,
            type,
            size: type === "video" ? "24.3 MB" : "2.1 MB",
        };
        setUploadedFiles((prev) => [...prev, newFile]);
    };

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const currentContentType = CONTENT_TYPES.find((c) => c.id === selectedContentType);
    const hasContent = selectedStoryboard || uploadedFiles.length > 0;
    const getStatusColor = (s: string) => s === "ready" ? "#22c55e" : s === "generating" ? "#f59e0b" : "#555";

    return (
        <div style={{ padding: "32px 32px 48px", flex: 1, overflowY: "auto" }}>
            {/* ─── Header ─── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: 6 }}>
                        Create & Publish
                    </h1>
                    <p style={{ fontSize: 14, color: "#888" }}>
                        Select your project, attach content, and publish to your platforms
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 900 }}>
                {/* ═══════════════════════════════════════════
                    STEP 1: Select Business / Project
                   ═══════════════════════════════════════════ */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={stepBadge(true)}>1</div>
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Select Project</h2>
                    </div>

                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                            style={{ ...cardStyle, width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", textAlign: "left" }}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #7DD3FC, #38BDF8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <span style={{ fontSize: 18, fontWeight: 700, color: "#000" }}>{currentBusiness.logo}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{currentBusiness.name}</p>
                                <p style={{ fontSize: 12, color: "#555" }}>
                                    {currentBusiness.socialAccounts.filter((a) => a.connected).length} connected accounts · {currentBusiness.plan} plan
                                </p>
                            </div>
                            <ChevronDown style={{ width: 18, height: 18, color: "#555", transform: businessDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                        </button>

                        {businessDropdownOpen && (
                            <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 20, borderRadius: 14, backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", overflow: "hidden" }}>
                                {BUSINESSES.map((biz) => {
                                    const isSelected = biz.id === selectedBusiness;
                                    return (
                                        <button key={biz.id} onClick={() => { setSelectedBusiness(biz.id); setBusinessDropdownOpen(false); setSelectedPlatforms([]); }}
                                            style={{ width: "100%", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, border: "none", backgroundColor: isSelected ? "rgba(125,211,252,0.06)" : "transparent", cursor: "pointer", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: isSelected ? "linear-gradient(135deg, #7DD3FC, #38BDF8)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: isSelected ? "#000" : "#888" }}>{biz.logo}</span>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: 13, fontWeight: 500, color: isSelected ? "#fff" : "#ccc" }}>{biz.name}</p>
                                                <p style={{ fontSize: 11, color: "#555" }}>{biz.socialAccounts.filter((a) => a.connected).length} accounts · {biz.plan}</p>
                                            </div>
                                            {isSelected && <Check style={{ width: 16, height: 16, color: "#7DD3FC" }} />}
                                        </button>
                                    );
                                })}
                                <button style={{ width: "100%", padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#7DD3FC", fontSize: 13, fontWeight: 500 }}>
                                    <Plus style={{ width: 14, height: 14 }} /> Add New Project
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════
                    STEP 2: Content Type
                   ═══════════════════════════════════════════ */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={stepBadge(!!selectedContentType)}>2</div>
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Content Type</h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                        {CONTENT_TYPES.map((ct) => {
                            const isSelected = selectedContentType === ct.id;
                            const Icon = ct.icon;
                            return (
                                <button key={ct.id} onClick={() => { setSelectedContentType(ct.id); setSelectedFormat(null); }}
                                    style={{
                                        ...cardStyle, padding: "24px 20px", cursor: "pointer", textAlign: "left",
                                        border: isSelected ? "1px solid rgba(125,211,252,0.3)" : "1px solid rgba(255,255,255,0.06)",
                                        backgroundColor: isSelected ? "rgba(125,211,252,0.06)" : "rgba(255,255,255,0.02)"
                                    }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: isSelected ? "rgba(125,211,252,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${isSelected ? "rgba(125,211,252,0.2)" : "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                                        <Icon style={{ width: 20, height: 20, color: isSelected ? "#7DD3FC" : "#666" }} />
                                    </div>
                                    <p style={{ fontSize: 15, fontWeight: 600, color: isSelected ? "#fff" : "#ccc", marginBottom: 4 }}>{ct.title}</p>
                                    <p style={{ fontSize: 12, color: "#555", lineHeight: 1.4 }}>{ct.description}</p>
                                </button>
                            );
                        })}
                    </div>

                    {currentContentType && (
                        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                            {currentContentType.formats.map((fmt) => (
                                <button key={fmt} onClick={() => setSelectedFormat(fmt)}
                                    style={{
                                        padding: "7px 16px", borderRadius: 100,
                                        border: selectedFormat === fmt ? "1px solid rgba(125,211,252,0.3)" : "1px solid rgba(255,255,255,0.08)",
                                        backgroundColor: selectedFormat === fmt ? "rgba(125,211,252,0.08)" : "transparent",
                                        color: selectedFormat === fmt ? "#7DD3FC" : "#888", fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.2s"
                                    }}>
                                    {fmt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ═══════════════════════════════════════════
                    STEP 3: Attach Content
                   ═══════════════════════════════════════════ */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={stepBadge(hasContent)}>3</div>
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Attach Content</h2>
                    </div>

                    {/* Source tabs */}
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        {([
                            { id: "storyboard" as const, label: "From Storyboard", icon: Clapperboard },
                            { id: "upload" as const, label: "Upload from Computer", icon: Upload },
                        ]).map((tab) => {
                            const Icon = tab.icon;
                            const isActive = contentSource === tab.id;
                            return (
                                <button key={tab.id} onClick={() => setContentSource(tab.id)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10,
                                        border: isActive ? "1px solid rgba(125,211,252,0.3)" : "1px solid rgba(255,255,255,0.08)",
                                        backgroundColor: isActive ? "rgba(125,211,252,0.06)" : "transparent",
                                        color: isActive ? "#7DD3FC" : "#888", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s"
                                    }}>
                                    <Icon style={{ width: 16, height: 16 }} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* ── Storyboard projects grid ── */}
                    {contentSource === "storyboard" && (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                            {STORYBOARD_PROJECTS.map((proj) => {
                                const isSelected = selectedStoryboard === proj.id;
                                const isDisabled = proj.status !== "ready";
                                return (
                                    <button key={proj.id}
                                        onClick={() => !isDisabled && setSelectedStoryboard(isSelected ? null : proj.id)}
                                        disabled={isDisabled}
                                        style={{
                                            ...cardStyle, padding: 0, overflow: "hidden", cursor: isDisabled ? "default" : "pointer", textAlign: "left", opacity: isDisabled ? 0.5 : 1,
                                            border: isSelected ? "1px solid rgba(125,211,252,0.4)" : "1px solid rgba(255,255,255,0.06)",
                                            backgroundColor: isSelected ? "rgba(125,211,252,0.04)" : "rgba(255,255,255,0.02)"
                                        }}>
                                        <div style={{ display: "flex", gap: 14, padding: 14 }}>
                                            {/* Thumbnail */}
                                            <div style={{ width: 80, height: 54, borderRadius: 8, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                                                <img src={proj.thumbnail} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                <div style={{ position: "absolute", bottom: 3, right: 3, padding: "1px 5px", borderRadius: 4, backgroundColor: "rgba(0,0,0,0.75)", fontSize: 10, color: "#fff", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                                                    {proj.duration}
                                                </div>
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                                    <p style={{ fontSize: 13, fontWeight: 600, color: isSelected ? "#fff" : "#ccc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                        {proj.name}
                                                    </p>
                                                    {isSelected && <Check style={{ width: 14, height: 14, color: "#7DD3FC", flexShrink: 0 }} />}
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#555" }}>
                                                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                                        <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: getStatusColor(proj.status), display: "inline-block" }} />
                                                        <span style={{ textTransform: "capitalize" }}>{proj.status}</span>
                                                    </span>
                                                    <span>·</span>
                                                    <span>{proj.segments} segments</span>
                                                    <span>·</span>
                                                    <span>{proj.createdAt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* ── Upload area ── */}
                    {contentSource === "upload" && (
                        <div>
                            {/* Drop zone */}
                            <div
                                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                onDragLeave={() => setIsDragOver(false)}
                                onDrop={(e) => { e.preventDefault(); setIsDragOver(false); addDummyUpload("video"); }}
                                style={{
                                    border: `2px dashed ${isDragOver ? "rgba(125,211,252,0.5)" : "rgba(255,255,255,0.1)"}`,
                                    borderRadius: 14,
                                    padding: "40px 20px",
                                    textAlign: "center",
                                    backgroundColor: isDragOver ? "rgba(125,211,252,0.04)" : "rgba(255,255,255,0.01)",
                                    transition: "all 0.2s",
                                    marginBottom: uploadedFiles.length > 0 ? 16 : 0,
                                }}
                            >
                                <Upload style={{ width: 32, height: 32, color: isDragOver ? "#7DD3FC" : "#333", margin: "0 auto 12px", display: "block" }} />
                                <p style={{ fontSize: 14, color: "#888", marginBottom: 4 }}>
                                    Drag & drop files here, or <span style={{ color: "#7DD3FC", cursor: "pointer", fontWeight: 500 }}>browse</span>
                                </p>
                                <p style={{ fontSize: 12, color: "#444" }}>
                                    Supports MP4, MOV, JPG, PNG, WEBP · Max 500 MB
                                </p>
                                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
                                    <button onClick={() => addDummyUpload("video")}
                                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "transparent", color: "#888", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                                        <FileVideo style={{ width: 14, height: 14 }} /> Add Video
                                    </button>
                                    <button onClick={() => addDummyUpload("image")}
                                        style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "transparent", color: "#888", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                                        <FileImage style={{ width: 14, height: 14 }} /> Add Image
                                    </button>
                                </div>
                            </div>

                            {/* Uploaded files list */}
                            {uploadedFiles.length > 0 && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {uploadedFiles.map((file) => (
                                        <div key={file.id}
                                            style={{ ...cardStyle, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: file.type === "video" ? "rgba(125,211,252,0.08)" : "rgba(168,85,247,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                {file.type === "video"
                                                    ? <FileVideo style={{ width: 16, height: 16, color: "#7DD3FC" }} />
                                                    : <FileImage style={{ width: 16, height: 16, color: "#a855f7" }} />}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{ fontSize: 13, fontWeight: 500, color: "#ccc" }}>{file.name}</p>
                                                <p style={{ fontSize: 11, color: "#555" }}>{file.size}</p>
                                            </div>
                                            <button onClick={() => removeFile(file.id)}
                                                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#555" }}>
                                                <X style={{ width: 14, height: 14 }} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* No source selected placeholder */}
                    {!contentSource && (
                        <div style={{ ...cardStyle, padding: "32px 20px", textAlign: "center" }}>
                            <Paperclip style={{ width: 28, height: 28, color: "#333", margin: "0 auto 10px", display: "block" }} />
                            <p style={{ fontSize: 13, color: "#555" }}>Choose a source above to attach content</p>
                        </div>
                    )}
                </div>

                {/* ═══════════════════════════════════════════
                    STEP 4: Select Platforms
                   ═══════════════════════════════════════════ */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={stepBadge(selectedPlatforms.length > 0)}>4</div>
                            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Target Platforms</h2>
                        </div>
                        <button onClick={selectAllPlatforms} style={{ background: "none", border: "none", color: "#7DD3FC", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                            {selectedPlatforms.length === connectedAccounts.length ? "Deselect All" : "Select All"}
                        </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                        {currentBusiness.socialAccounts.map((account) => {
                            const Icon = account.icon;
                            const isSelected = selectedPlatforms.includes(account.id);
                            const isDisconnected = !account.connected;
                            return (
                                <button key={account.id} onClick={() => account.connected && togglePlatform(account.id)} disabled={isDisconnected}
                                    style={{
                                        ...cardStyle, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: isDisconnected ? "default" : "pointer", textAlign: "left", opacity: isDisconnected ? 0.4 : 1,
                                        border: isSelected ? `1px solid ${account.color}44` : "1px solid rgba(255,255,255,0.06)",
                                        backgroundColor: isSelected ? `${account.color}08` : "rgba(255,255,255,0.02)"
                                    }}>
                                    <div style={{ width: 20, height: 20, borderRadius: 6, border: isSelected ? `2px solid ${account.color}` : "2px solid rgba(255,255,255,0.12)", backgroundColor: isSelected ? account.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                                        {isSelected && <Check style={{ width: 12, height: 12, color: "#fff" }} />}
                                    </div>
                                    <Icon style={{ width: 20, height: 20, color: isSelected ? account.color : "#555", flexShrink: 0 }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 13, fontWeight: 500, color: isSelected ? "#fff" : "#ccc", marginBottom: 1 }}>{account.platform}</p>
                                        <p style={{ fontSize: 11, color: "#555" }}>{account.handle}{account.followers && ` · ${account.followers}`}</p>
                                    </div>
                                    {isDisconnected && (
                                        <span style={{ fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 100, backgroundColor: "rgba(255,255,255,0.06)", color: "#555" }}>
                                            Not connected
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════
                    STEP 5: Schedule
                   ═══════════════════════════════════════════ */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <div style={stepBadge(false)}>5</div>
                        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Schedule</h2>
                    </div>

                    <div style={{ display: "flex", gap: 10 }}>
                        {([
                            { id: "now" as const, label: "Publish Now", icon: Send, desc: "Post immediately to selected platforms" },
                            { id: "schedule" as const, label: "Schedule", icon: Calendar, desc: "Choose a date and time to publish" },
                        ]).map((opt) => {
                            const Icon = opt.icon;
                            const isActive = scheduleType === opt.id;
                            return (
                                <button key={opt.id} onClick={() => setScheduleType(opt.id)}
                                    style={{
                                        ...cardStyle, flex: 1, padding: "18px 20px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14,
                                        border: isActive ? "1px solid rgba(125,211,252,0.3)" : "1px solid rgba(255,255,255,0.06)",
                                        backgroundColor: isActive ? "rgba(125,211,252,0.06)" : "rgba(255,255,255,0.02)"
                                    }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: isActive ? "rgba(125,211,252,0.12)" : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                        <Icon style={{ width: 18, height: 18, color: isActive ? "#7DD3FC" : "#555" }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 14, fontWeight: 600, color: isActive ? "#fff" : "#ccc", marginBottom: 2 }}>{opt.label}</p>
                                        <p style={{ fontSize: 12, color: "#555" }}>{opt.desc}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {scheduleType === "schedule" && (
                        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: 11, fontWeight: 600, color: "#555", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Date</label>
                                <input type="date" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none", colorScheme: "dark", boxSizing: "border-box" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: 11, fontWeight: 600, color: "#555", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Time</label>
                                <input type="time" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none", colorScheme: "dark", boxSizing: "border-box" }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* ─── CTA ─── */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {selectedPlatforms.length > 0 && (
                            <div style={{ display: "flex" }}>
                                {selectedPlatforms.slice(0, 4).map((pid) => {
                                    const acc = currentBusiness.socialAccounts.find((a) => a.id === pid);
                                    if (!acc) return null;
                                    const Icon = acc.icon;
                                    return (
                                        <div key={pid} style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: `${acc.color}22`, border: "2px solid #000", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -6 }}>
                                            <Icon style={{ width: 12, height: 12, color: acc.color }} />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        <span style={{ fontSize: 13, color: "#888" }}>
                            {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""} selected
                        </span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button style={{ padding: "12px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "transparent", color: "#888", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                            Save as Draft
                        </button>
                        <button
                            style={{
                                display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 10, border: "none",
                                backgroundColor: selectedContentType && selectedPlatforms.length > 0 && hasContent ? "#7DD3FC" : "rgba(255,255,255,0.06)",
                                color: selectedContentType && selectedPlatforms.length > 0 && hasContent ? "#000" : "#555",
                                fontSize: 13, fontWeight: 700, cursor: selectedContentType && selectedPlatforms.length > 0 && hasContent ? "pointer" : "default",
                                boxShadow: selectedContentType && selectedPlatforms.length > 0 && hasContent ? "0 0 30px rgba(125,211,252,0.15)" : "none",
                                transition: "all 0.25s",
                            }}>
                            <Sparkles style={{ width: 15, height: 15 }} />
                            {scheduleType === "now" ? "Create & Publish" : "Create & Schedule"}
                            <ArrowRight style={{ width: 15, height: 15 }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
