"use client";

import { useState, useCallback } from "react";
import {
    Plus,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Upload,
    ImagePlus,
    Trash2,
    Copy,
    MoveUp,
    MoveDown,
    Wand2,
    Sparkles,
    Clock,
    Film,
    Type,
    Music,
    Volume2,
    VolumeX,
    Maximize,
    ZoomIn,
    ZoomOut,
    ChevronDown,
    ChevronRight,
    GripVertical,
    Clapperboard,
    Settings2,
    Eye,
    Download,
    Layers,
    SplitSquareHorizontal,
    Image as ImageIcon,
    Video,
    RefreshCw,
} from "lucide-react";

/* ─── Types ─── */
interface Segment {
    id: string;
    name: string;
    startFrame: string | null;
    endFrame: string | null;
    prompt: string;
    duration: number;
    motionType: string;
    status: "idle" | "generating" | "ready" | "error";
    thumbnailUrl?: string;
}

/* ─── Dummy data ─── */
const INITIAL_SEGMENTS: Segment[] = [
    {
        id: "seg-1",
        name: "Opening Shot",
        startFrame: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
        endFrame: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
        prompt: "Smooth cinematic zoom from product on marble surface to close-up detail shot, dramatic lighting",
        duration: 8,
        motionType: "Zoom In",
        status: "ready",
        thumbnailUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
    },
    {
        id: "seg-2",
        name: "Brand Reveal",
        startFrame: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
        endFrame: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
        prompt: "Camera orbits around headphones revealing brand logo with lens flare, cinematic color grade",
        duration: 6,
        motionType: "Orbit",
        status: "ready",
        thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    },
    {
        id: "seg-3",
        name: "Product Features",
        startFrame: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
        endFrame: null,
        prompt: "Dynamic tracking shot showcasing sneaker from multiple angles, particles and motion blur",
        duration: 10,
        motionType: "Dolly",
        status: "generating",
        thumbnailUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80",
    },
    {
        id: "seg-4",
        name: "Call to Action",
        startFrame: null,
        endFrame: null,
        prompt: "",
        duration: 5,
        motionType: "Pan",
        status: "idle",
    },
];

const MOTION_TYPES = [
    "Zoom In",
    "Zoom Out",
    "Orbit",
    "Dolly",
    "Pan",
    "Tilt",
    "Crane",
    "Truck",
    "Static",
];

const STYLE_PRESETS = [
    { id: "cinematic", label: "Cinematic", color: "#f59e0b" },
    { id: "minimal", label: "Minimal", color: "#7DD3FC" },
    { id: "energetic", label: "Energetic", color: "#ef4444" },
    { id: "luxury", label: "Luxury", color: "#a855f7" },
    { id: "organic", label: "Organic", color: "#22c55e" },
];

/* ─── Shared styles ─── */
const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 12,
};

const smallBtnStyle: React.CSSProperties = {
    background: "none",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
    color: "#888",
    cursor: "pointer",
    padding: "6px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
};

const iconBtn: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 6,
    borderRadius: 6,
    color: "#555",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
};

/* ─── Frame Drop Zone component ─── */
function FrameSlot({
    label,
    imageUrl,
    onUpload,
}: {
    label: string;
    imageUrl: string | null;
    onUpload: () => void;
}) {
    return (
        <div style={{ flex: 1 }}>
            <p
                style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#555",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                }}
            >
                {label}
            </p>
            {imageUrl ? (
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: 8,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={label}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <button
                        onClick={onUpload}
                        style={{
                            position: "absolute",
                            bottom: 4,
                            right: 4,
                            ...smallBtnStyle,
                            backgroundColor: "rgba(0,0,0,0.7)",
                            border: "none",
                            padding: 4,
                        }}
                    >
                        <RefreshCw style={{ width: 12, height: 12 }} />
                    </button>
                </div>
            ) : (
                <button
                    onClick={onUpload}
                    style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: 8,
                        border: "2px dashed rgba(255,255,255,0.1)",
                        backgroundColor: "rgba(255,255,255,0.02)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        color: "#555",
                        transition: "all 0.2s",
                    }}
                >
                    <ImagePlus style={{ width: 18, height: 18 }} />
                    <span style={{ fontSize: 10, fontWeight: 500 }}>Upload</span>
                </button>
            )}
        </div>
    );
}

export default function StoryboardPage() {
    const [segments, setSegments] = useState<Segment[]>(INITIAL_SEGMENTS);
    const [selectedSegmentId, setSelectedSegmentId] = useState<string>("seg-1");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState("cinematic");

    const selectedSegment = segments.find((s) => s.id === selectedSegmentId) || segments[0];
    const totalDuration = segments.reduce((sum, s) => sum + s.duration, 0);

    const addSegment = () => {
        const newSeg: Segment = {
            id: `seg-${Date.now()}`,
            name: `Segment ${segments.length + 1}`,
            startFrame: null,
            endFrame: null,
            prompt: "",
            duration: 5,
            motionType: "Pan",
            status: "idle",
        };
        setSegments([...segments, newSeg]);
        setSelectedSegmentId(newSeg.id);
    };

    const deleteSegment = (id: string) => {
        if (segments.length <= 1) return;
        const newSegments = segments.filter((s) => s.id !== id);
        setSegments(newSegments);
        if (selectedSegmentId === id) {
            setSelectedSegmentId(newSegments[0].id);
        }
    };

    const duplicateSegment = (seg: Segment) => {
        const dup: Segment = {
            ...seg,
            id: `seg-${Date.now()}`,
            name: `${seg.name} (Copy)`,
            status: "idle",
        };
        const idx = segments.findIndex((s) => s.id === seg.id);
        const newSegments = [...segments];
        newSegments.splice(idx + 1, 0, dup);
        setSegments(newSegments);
    };

    const updateSegment = (id: string, updates: Partial<Segment>) => {
        setSegments(segments.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ready":
                return "#22c55e";
            case "generating":
                return "#f59e0b";
            case "error":
                return "#ef4444";
            default:
                return "#555";
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* ─── Top Toolbar ─── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 24px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    flexShrink: 0,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Clapperboard style={{ width: 20, height: 20, color: "#7DD3FC" }} />
                        <h1
                            style={{
                                fontSize: 18,
                                fontWeight: 700,
                                color: "#fff",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Storyboard Studio
                        </h1>
                    </div>
                    <div
                        style={{
                            height: 20,
                            width: 1,
                            backgroundColor: "rgba(255,255,255,0.08)",
                        }}
                    />
                    <span
                        style={{
                            fontSize: 13,
                            color: "#888",
                            fontWeight: 400,
                        }}
                    >
                        Untitled Project
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Style Presets */}
                    <div
                        style={{
                            display: "flex",
                            gap: 4,
                            padding: "4px 6px",
                            borderRadius: 8,
                            backgroundColor: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        {STYLE_PRESETS.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => setSelectedStyle(preset.id)}
                                style={{
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    border: "none",
                                    fontSize: 11,
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    backgroundColor:
                                        selectedStyle === preset.id
                                            ? `${preset.color}18`
                                            : "transparent",
                                    color:
                                        selectedStyle === preset.id
                                            ? preset.color
                                            : "#666",
                                }}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "8px 16px",
                            borderRadius: 8,
                            border: "none",
                            backgroundColor: "rgba(255,255,255,0.06)",
                            color: "#ccc",
                            fontSize: 12,
                            fontWeight: 500,
                            cursor: "pointer",
                        }}
                    >
                        <Eye style={{ width: 14, height: 14 }} />
                        Preview
                    </button>
                    <button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "8px 16px",
                            borderRadius: 8,
                            border: "none",
                            backgroundColor: "#7DD3FC",
                            color: "#000",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 0 20px rgba(125,211,252,0.15)",
                        }}
                    >
                        <Download style={{ width: 14, height: 14 }} />
                        Export Video
                    </button>
                </div>
            </div>

            {/* ─── Main 3-Panel Layout ─── */}
            <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
                {/* ── LEFT: Segment List ── */}
                <div
                    style={{
                        width: 280,
                        borderRight: "1px solid rgba(255,255,255,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        flexShrink: 0,
                    }}
                >
                    {/* Segment list header */}
                    <div
                        style={{
                            padding: "14px 16px",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#888",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                            }}
                        >
                            Segments ({segments.length})
                        </span>
                        <button
                            onClick={addSegment}
                            style={{
                                ...smallBtnStyle,
                                borderColor: "rgba(125,211,252,0.2)",
                                color: "#7DD3FC",
                                padding: "4px 8px",
                                gap: 4,
                                fontSize: 11,
                                fontWeight: 500,
                            }}
                        >
                            <Plus style={{ width: 13, height: 13 }} />
                            Add
                        </button>
                    </div>

                    {/* Segment items */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            padding: "8px 8px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                        }}
                    >
                        {segments.map((seg, i) => {
                            const isSelected = seg.id === selectedSegmentId;
                            return (
                                <button
                                    key={seg.id}
                                    onClick={() => setSelectedSegmentId(seg.id)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        padding: "10px 10px",
                                        borderRadius: 10,
                                        border: isSelected
                                            ? "1px solid rgba(125,211,252,0.2)"
                                            : "1px solid transparent",
                                        backgroundColor: isSelected
                                            ? "rgba(125,211,252,0.06)"
                                            : "transparent",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        width: "100%",
                                        transition: "all 0.15s",
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        style={{
                                            width: 48,
                                            height: 32,
                                            borderRadius: 6,
                                            overflow: "hidden",
                                            backgroundColor: "rgba(255,255,255,0.04)",
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {seg.thumbnailUrl ? (
                                            <img
                                                src={seg.thumbnailUrl}
                                                alt=""
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <Film
                                                style={{
                                                    width: 16,
                                                    height: 16,
                                                    color: "#333",
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 500,
                                                color: isSelected ? "#fff" : "#ccc",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                marginBottom: 2,
                                            }}
                                        >
                                            {seg.name}
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: "50%",
                                                    backgroundColor: getStatusColor(seg.status),
                                                    display: "inline-block",
                                                }}
                                            />
                                            <span
                                                style={{
                                                    fontSize: 10,
                                                    color: "#555",
                                                }}
                                            >
                                                {seg.duration}s · {seg.motionType}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Duration footer */}
                    <div
                        style={{
                            padding: "12px 16px",
                            borderTop: "1px solid rgba(255,255,255,0.04)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span style={{ fontSize: 11, color: "#555" }}>Total Duration</span>
                        <span style={{ fontSize: 13, color: "#7DD3FC", fontWeight: 600 }}>
                            {totalDuration}s
                        </span>
                    </div>
                </div>

                {/* ── CENTER: Preview + Canvas ── */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    }}
                >
                    {/* Video Preview */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#050505",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {selectedSegment.thumbnailUrl ? (
                            <div
                                style={{
                                    width: "70%",
                                    maxWidth: 700,
                                    aspectRatio: "16/9",
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    position: "relative",
                                    boxShadow: "0 0 80px rgba(0,0,0,0.5)",
                                }}
                            >
                                <img
                                    src={selectedSegment.thumbnailUrl}
                                    alt="Preview"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                {/* Overlay info */}
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: "40px 20px 16px",
                                        background:
                                            "linear-gradient(transparent, rgba(0,0,0,0.8))",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    <div>
                                        <p
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                color: "#fff",
                                            }}
                                        >
                                            {selectedSegment.name}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 11,
                                                color: "rgba(255,255,255,0.6)",
                                            }}
                                        >
                                            {selectedSegment.motionType} · {selectedSegment.duration}s
                                        </p>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: 10,
                                            fontWeight: 600,
                                            padding: "3px 8px",
                                            borderRadius: 4,
                                            backgroundColor: `${getStatusColor(selectedSegment.status)}22`,
                                            color: getStatusColor(selectedSegment.status),
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {selectedSegment.status}
                                    </span>
                                </div>
                                {/* Generating spinner */}
                                {selectedSegment.status === "generating" && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            backgroundColor: "rgba(0,0,0,0.5)",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 12,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 36,
                                                height: 36,
                                                border: "3px solid rgba(255,255,255,0.1)",
                                                borderTopColor: "#7DD3FC",
                                                borderRadius: "50%",
                                                animation: "spin 1s linear infinite",
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: 12,
                                                color: "#7DD3FC",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Generating with AI...
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 12,
                                    color: "#333",
                                }}
                            >
                                <Film style={{ width: 48, height: 48 }} />
                                <p style={{ fontSize: 14, color: "#555" }}>
                                    Upload start & end frames to preview
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ── Timeline ── */}
                    <div
                        style={{
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            padding: "12px 20px",
                            flexShrink: 0,
                        }}
                    >
                        {/* Transport controls */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 12,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <button onClick={() => setCurrentTime(0)} style={iconBtn}>
                                    <SkipBack style={{ width: 16, height: 16 }} />
                                </button>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    style={{
                                        ...iconBtn,
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        backgroundColor: "#7DD3FC",
                                        color: "#000",
                                    }}
                                >
                                    {isPlaying ? (
                                        <Pause style={{ width: 16, height: 16 }} />
                                    ) : (
                                        <Play style={{ width: 16, height: 16, marginLeft: 1 }} />
                                    )}
                                </button>
                                <button
                                    onClick={() => setCurrentTime(totalDuration)}
                                    style={iconBtn}
                                >
                                    <SkipForward style={{ width: 16, height: 16 }} />
                                </button>
                                <span
                                    style={{
                                        fontSize: 12,
                                        color: "#888",
                                        fontVariantNumeric: "tabular-nums",
                                        marginLeft: 8,
                                        fontWeight: 500,
                                    }}
                                >
                                    0:{currentTime.toString().padStart(2, "0")} / 0:
                                    {totalDuration.toString().padStart(2, "0")}
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <button
                                    onClick={() => setIsMuted(!isMuted)}
                                    style={iconBtn}
                                >
                                    {isMuted ? (
                                        <VolumeX style={{ width: 15, height: 15 }} />
                                    ) : (
                                        <Volume2 style={{ width: 15, height: 15 }} />
                                    )}
                                </button>
                                <button
                                    onClick={() => setZoom(Math.max(50, zoom - 25))}
                                    style={iconBtn}
                                >
                                    <ZoomOut style={{ width: 15, height: 15 }} />
                                </button>
                                <span
                                    style={{
                                        fontSize: 11,
                                        color: "#555",
                                        width: 36,
                                        textAlign: "center",
                                    }}
                                >
                                    {zoom}%
                                </span>
                                <button
                                    onClick={() => setZoom(Math.min(200, zoom + 25))}
                                    style={iconBtn}
                                >
                                    <ZoomIn style={{ width: 15, height: 15 }} />
                                </button>
                            </div>
                        </div>

                        {/* Timeline track */}
                        <div
                            style={{
                                display: "flex",
                                gap: 3,
                                padding: "8px 0",
                                overflowX: "auto",
                            }}
                        >
                            {segments.map((seg) => {
                                const isSelected = seg.id === selectedSegmentId;
                                const widthPercent = (seg.duration / totalDuration) * 100;
                                return (
                                    <button
                                        key={seg.id}
                                        onClick={() => setSelectedSegmentId(seg.id)}
                                        style={{
                                            flex: `${widthPercent} 0 0`,
                                            minWidth: 60,
                                            height: 44,
                                            borderRadius: 6,
                                            border: isSelected
                                                ? "1px solid rgba(125,211,252,0.4)"
                                                : "1px solid rgba(255,255,255,0.06)",
                                            backgroundColor: isSelected
                                                ? "rgba(125,211,252,0.08)"
                                                : "rgba(255,255,255,0.03)",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "0 10px",
                                            gap: 8,
                                            overflow: "hidden",
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: 5,
                                                height: 5,
                                                borderRadius: "50%",
                                                backgroundColor: getStatusColor(seg.status),
                                                flexShrink: 0,
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: 10,
                                                fontWeight: 500,
                                                color: isSelected ? "#7DD3FC" : "#888",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {seg.name}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 9,
                                                color: "#555",
                                                marginLeft: "auto",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {seg.duration}s
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Properties Panel ── */}
                <div
                    style={{
                        width: 320,
                        borderLeft: "1px solid rgba(255,255,255,0.06)",
                        overflowY: "auto",
                        flexShrink: 0,
                    }}
                >
                    {/* Properties Header */}
                    <div
                        style={{
                            padding: "14px 16px",
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#888",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                            }}
                        >
                            Properties
                        </span>
                        <div style={{ display: "flex", gap: 4 }}>
                            <button
                                onClick={() => duplicateSegment(selectedSegment)}
                                style={iconBtn}
                                title="Duplicate"
                            >
                                <Copy style={{ width: 14, height: 14 }} />
                            </button>
                            <button
                                onClick={() => deleteSegment(selectedSegment.id)}
                                style={{ ...iconBtn, color: "#ef4444" }}
                                title="Delete"
                            >
                                <Trash2 style={{ width: 14, height: 14 }} />
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                        }}
                    >
                        {/* Segment name */}
                        <div>
                            <label
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#555",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    display: "block",
                                    marginBottom: 6,
                                }}
                            >
                                Segment Name
                            </label>
                            <input
                                type="text"
                                value={selectedSegment.name}
                                onChange={(e) =>
                                    updateSegment(selectedSegment.id, {
                                        name: e.target.value,
                                    })
                                }
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    borderRadius: 8,
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                    color: "#fff",
                                    fontSize: 13,
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Start & End Frames */}
                        <div>
                            <label
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#555",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    display: "block",
                                    marginBottom: 8,
                                }}
                            >
                                Reference Frames
                            </label>
                            <div style={{ display: "flex", gap: 10 }}>
                                <FrameSlot
                                    label="Start Frame"
                                    imageUrl={selectedSegment.startFrame}
                                    onUpload={() => { }}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "0 2px",
                                    }}
                                >
                                    <ChevronRight
                                        style={{
                                            width: 16,
                                            height: 16,
                                            color: "#333",
                                        }}
                                    />
                                </div>
                                <FrameSlot
                                    label="End Frame"
                                    imageUrl={selectedSegment.endFrame}
                                    onUpload={() => { }}
                                />
                            </div>
                        </div>

                        {/* AI Prompt */}
                        <div>
                            <label
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#555",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.06em",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    marginBottom: 6,
                                }}
                            >
                                <Sparkles
                                    style={{
                                        width: 12,
                                        height: 12,
                                        color: "#7DD3FC",
                                    }}
                                />
                                AI Motion Prompt
                            </label>
                            <textarea
                                value={selectedSegment.prompt}
                                onChange={(e) =>
                                    updateSegment(selectedSegment.id, {
                                        prompt: e.target.value,
                                    })
                                }
                                placeholder="Describe the motion between start and end frames..."
                                rows={3}
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    borderRadius: 8,
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                    color: "#fff",
                                    fontSize: 12,
                                    lineHeight: 1.5,
                                    resize: "vertical",
                                    outline: "none",
                                    fontFamily: "inherit",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>

                        {/* Motion Type + Duration */}
                        <div style={{ display: "flex", gap: 10 }}>
                            <div style={{ flex: 1 }}>
                                <label
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 600,
                                        color: "#555",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        display: "block",
                                        marginBottom: 6,
                                    }}
                                >
                                    Camera Motion
                                </label>
                                <select
                                    value={selectedSegment.motionType}
                                    onChange={(e) =>
                                        updateSegment(selectedSegment.id, {
                                            motionType: e.target.value,
                                        })
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "8px 12px",
                                        borderRadius: 8,
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                        color: "#fff",
                                        fontSize: 12,
                                        outline: "none",
                                        appearance: "none",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    {MOTION_TYPES.map((mt) => (
                                        <option
                                            key={mt}
                                            value={mt}
                                            style={{
                                                backgroundColor: "#111",
                                                color: "#fff",
                                            }}
                                        >
                                            {mt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ width: 90 }}>
                                <label
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 600,
                                        color: "#555",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.06em",
                                        display: "block",
                                        marginBottom: 6,
                                    }}
                                >
                                    Duration
                                </label>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        padding: "6px 10px",
                                        borderRadius: 8,
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                    }}
                                >
                                    <Clock
                                        style={{
                                            width: 12,
                                            height: 12,
                                            color: "#555",
                                        }}
                                    />
                                    <input
                                        type="number"
                                        min={1}
                                        max={60}
                                        value={selectedSegment.duration}
                                        onChange={(e) =>
                                            updateSegment(selectedSegment.id, {
                                                duration: parseInt(e.target.value) || 1,
                                            })
                                        }
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            backgroundColor: "transparent",
                                            color: "#fff",
                                            fontSize: 12,
                                            outline: "none",
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    />
                                    <span style={{ fontSize: 11, color: "#555" }}>s</span>
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            style={{
                                width: "100%",
                                padding: "12px 0",
                                borderRadius: 10,
                                border: "none",
                                background:
                                    "linear-gradient(135deg, #7DD3FC, #38BDF8)",
                                color: "#000",
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                boxShadow: "0 0 30px rgba(125,211,252,0.2)",
                                transition: "all 0.2s",
                            }}
                        >
                            <Wand2 style={{ width: 16, height: 16 }} />
                            Generate Segment
                        </button>

                        {/* Quick tips */}
                        <div
                            style={{
                                padding: 14,
                                borderRadius: 10,
                                backgroundColor: "rgba(125,211,252,0.04)",
                                border: "1px solid rgba(125,211,252,0.08)",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: "#7DD3FC",
                                    marginBottom: 6,
                                }}
                            >
                                💡 Tips
                            </p>
                            <ul
                                style={{
                                    fontSize: 11,
                                    color: "#888",
                                    lineHeight: 1.6,
                                    padding: "0 0 0 14px",
                                    margin: 0,
                                }}
                            >
                                <li>Upload reference images for start & end frames</li>
                                <li>Describe the motion between frames in detail</li>
                                <li>Each segment can be 1–60 seconds long</li>
                                <li>Combine segments for 1–3 minute videos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS animation for spinner */}
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
