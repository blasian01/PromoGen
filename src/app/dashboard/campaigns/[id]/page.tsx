"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    DUMMY_CAMPAIGNS,
    DUMMY_PRODUCTS,
    DUMMY_AI_ASSETS,
    EXPORT_FORMATS,
    CAMPAIGN_TYPES,
    CTA_TYPES,
    DURATION_OPTIONS,
    VIDEO_STYLES,
    CAMERA_MOVEMENTS,
} from "@/lib/dummy-data";
import {
    ArrowLeft,
    Save,
    Settings,
    ShoppingCart,
    Users,
    Camera,
    Play,
    Download,
    Plus,
    Trash2,
    Package,
    Code,
    Megaphone,
    ExternalLink,
    Clock,
    Check,
    Smartphone,
    Monitor,
    Wand2,
} from "lucide-react";

/* ─── shared token ─── */
const ACCENT = "#7DD3FC";

const CAMPAIGN_TYPE_ICONS: Record<string, typeof Package> = {
    product: Package,
    software: Code,
    service: Users,
    brand_awareness: Megaphone,
};

const TAB_CONFIG = [
    { id: "setup", label: "Setup", icon: Settings },
    { id: "products", label: "Products", icon: ShoppingCart },
    { id: "assets", label: "AI Assets", icon: Users },
    { id: "style", label: "Style", icon: Camera },
    { id: "preview", label: "Preview", icon: Play },
    { id: "export", label: "Export", icon: Download },
];

/* ─── reusable style helpers ─── */
const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 14,
    transition: "all 0.25s",
};

const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 14,
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.03)",
    color: "#fff",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border 0.2s",
};

export default function CampaignEditorPage() {
    const params = useParams();
    const router = useRouter();
    const campaignId = params.id as string;
    const isNew = campaignId === "new";

    const existingCampaign = DUMMY_CAMPAIGNS.find((c) => c.id === campaignId);

    const [activeTab, setActiveTab] = useState("setup");
    const [isSaving, setIsSaving] = useState(false);

    const [campaignName, setCampaignName] = useState(existingCampaign?.name || "New Campaign");
    const [brandName, setBrandName] = useState(existingCampaign?.brandName || "");
    const [tagline, setTagline] = useState(existingCampaign?.tagline || "");
    const [campaignType, setCampaignType] = useState<string>(existingCampaign?.type || "product");
    const [duration, setDuration] = useState(existingCampaign?.duration || 30);
    const [ctaType, setCtaType] = useState(existingCampaign?.ctaType || "buy_now");
    const [ctaText, setCtaText] = useState(existingCampaign?.ctaText || "Shop Now");
    const [ctaUrl, setCtaUrl] = useState(existingCampaign?.ctaUrl || "");

    const [selectedProducts, setSelectedProducts] = useState<string[]>(DUMMY_PRODUCTS.slice(0, 2).map((p) => p.id));
    const [selectedAssets, setSelectedAssets] = useState<string[]>(DUMMY_AI_ASSETS.slice(0, 2).map((a) => a.id));
    const [videoStyle, setVideoStyle] = useState("cinematic");
    const [cameraMovement, setCameraMovement] = useState("pan_right");
    const [selectedFormats, setSelectedFormats] = useState<string[]>(["tiktok", "youtube-ad"]);

    const handleSave = async () => { setIsSaving(true); await new Promise((r) => setTimeout(r, 1000)); setIsSaving(false); };
    const toggleProduct = (id: string) => setSelectedProducts((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
    const toggleAsset = (id: string) => setSelectedAssets((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
    const toggleFormat = (id: string) => setSelectedFormats((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

    const statusColor = existingCampaign?.status === "published" ? "#22c55e"
        : existingCampaign?.status === "ready" ? "#22c55e"
            : existingCampaign?.status === "generating" ? "#f59e0b"
                : "#888";

    /* ───────────────────────── render ───────────────────────── */
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* ═══ Top Bar ═══ */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(16px)", backgroundColor: "rgba(0,0,0,0.5)",
                position: "sticky", top: 0, zIndex: 10,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <button onClick={() => router.back()} style={{ padding: 8, borderRadius: 8, border: "none", backgroundColor: "transparent", color: "#888", cursor: "pointer" }}>
                        <ArrowLeft style={{ width: 20, height: 20 }} />
                    </button>
                    <div>
                        <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)}
                            style={{ fontSize: 18, fontWeight: 700, color: "#fff", background: "transparent", border: "none", outline: "none", width: 280 }} />
                        <p style={{ fontSize: 11, color: "#444", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                            {isNew ? "Creating new campaign" : `Last saved: ${existingCampaign?.updatedAt ? new Date(existingCampaign.updatedAt).toLocaleDateString() : "Never"}`}
                        </p>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600, backgroundColor: `${statusColor}18`, color: statusColor, textTransform: "capitalize" }}>
                        {existingCampaign?.status || "Draft"}
                    </span>
                    <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "transparent", color: "#ccc", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                        <Save style={{ width: 14, height: 14 }} /> {isSaving ? "Saving…" : "Save"}
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 22px", borderRadius: 10, border: "none", backgroundColor: ACCENT, color: "#000", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 0 24px ${ACCENT}33` }}>
                        <Wand2 style={{ width: 14, height: 14 }} /> Generate Ad
                    </button>
                </div>
            </div>

            {/* ═══ Tab Bar ═══ */}
            <div style={{ display: "flex", gap: 0, padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.01)" }}>
                {TAB_CONFIG.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "12px 20px", border: "none", backgroundColor: "transparent",
                                color: isActive ? ACCENT : "#555", fontSize: 13, fontWeight: isActive ? 600 : 400,
                                borderBottom: isActive ? `2px solid ${ACCENT}` : "2px solid transparent",
                                cursor: "pointer", transition: "all 0.2s",
                            }}>
                            <Icon style={{ width: 15, height: 15 }} /> {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ═══ Content ═══ */}
            <div style={{ flex: 1, padding: "32px 28px 48px", overflowY: "auto" }}>
                <div style={{ maxWidth: 960, margin: "0 auto" }}>

                    {/* ────── SETUP TAB ────── */}
                    {activeTab === "setup" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                            {/* Campaign Type */}
                            <div>
                                <p style={sectionLabel}>Campaign Type</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                                    {CAMPAIGN_TYPES.map((type) => {
                                        const Icon = CAMPAIGN_TYPE_ICONS[type.id] || Package;
                                        const isActive = campaignType === type.id;
                                        return (
                                            <button key={type.id} onClick={() => setCampaignType(type.id)}
                                                style={{
                                                    ...cardStyle, padding: "22px 18px", cursor: "pointer", textAlign: "left",
                                                    border: isActive ? `1px solid ${ACCENT}44` : "1px solid rgba(255,255,255,0.06)",
                                                    backgroundColor: isActive ? `${ACCENT}08` : "rgba(255,255,255,0.02)",
                                                }}>
                                                <Icon style={{ width: 28, height: 28, color: isActive ? ACCENT : "#444", marginBottom: 12 }} />
                                                <p style={{ fontSize: 14, fontWeight: 600, color: isActive ? "#fff" : "#ccc", marginBottom: 3 }}>{type.name}</p>
                                                <p style={{ fontSize: 11, color: "#555" }}>{type.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Brand Information */}
                            <div>
                                <p style={sectionLabel}>Brand Information</p>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Brand Name</label>
                                        <input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Your brand name" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Tagline</label>
                                        <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Your catchy tagline" style={inputStyle} />
                                    </div>
                                </div>
                            </div>

                            {/* Duration */}
                            <div>
                                <p style={sectionLabel}>Ad Duration</p>
                                <div style={{ display: "flex", gap: 8 }}>
                                    {DURATION_OPTIONS.map((opt) => {
                                        const isActive = duration === opt.value;
                                        return (
                                            <button key={opt.value} onClick={() => setDuration(opt.value)}
                                                style={{
                                                    padding: "9px 22px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer",
                                                    border: isActive ? `1px solid ${ACCENT}44` : "1px solid rgba(255,255,255,0.08)",
                                                    backgroundColor: isActive ? ACCENT : "transparent",
                                                    color: isActive ? "#000" : "#888",
                                                    boxShadow: isActive ? `0 0 20px ${ACCENT}33` : "none",
                                                    transition: "all 0.2s",
                                                }}>
                                                {opt.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* CTA */}
                            <div>
                                <p style={sectionLabel}>Call to Action</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                                    {CTA_TYPES.map((cta) => {
                                        const isActive = ctaType === cta.id;
                                        return (
                                            <button key={cta.id} onClick={() => { setCtaType(cta.id); if (cta.id !== "custom") setCtaText(cta.label); }}
                                                style={{
                                                    padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: "pointer",
                                                    border: isActive ? `1px solid ${ACCENT}44` : "1px solid rgba(255,255,255,0.08)",
                                                    backgroundColor: isActive ? `${ACCENT}12` : "transparent",
                                                    color: isActive ? ACCENT : "#888",
                                                    transition: "all 0.2s",
                                                }}>
                                                {cta.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    <div>
                                        <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Button Text</label>
                                        <input value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Shop Now" style={inputStyle} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Destination URL</label>
                                        <input value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} placeholder="https://yourstore.com/product" style={inputStyle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ────── PRODUCTS TAB ────── */}
                    {activeTab === "products" && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                <p style={{ ...sectionLabel, marginBottom: 0 }}>Products ({selectedProducts.length} selected)</p>
                                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "transparent", color: ACCENT, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                                    <Plus style={{ width: 14, height: 14 }} /> Add Product
                                </button>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                                {DUMMY_PRODUCTS.map((product) => {
                                    const isSelected = selectedProducts.includes(product.id);
                                    return (
                                        <button key={product.id} onClick={() => toggleProduct(product.id)}
                                            style={{
                                                ...cardStyle, padding: 16, cursor: "pointer", textAlign: "left",
                                                border: isSelected ? `1px solid ${ACCENT}44` : "1px solid rgba(255,255,255,0.06)",
                                                backgroundColor: isSelected ? `${ACCENT}06` : "rgba(255,255,255,0.02)",
                                            }}>
                                            <div style={{ display: "flex", gap: 14 }}>
                                                <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0, backgroundColor: "rgba(255,255,255,0.04)" }}>
                                                    {product.imageUrl
                                                        ? <img src={product.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                        : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><Package style={{ width: 20, height: 20, color: "#333" }} /></div>}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                                        <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
                                                        {isSelected && <Check style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0 }} />}
                                                    </div>
                                                    <p style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>${product.price}</p>
                                                    <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 100, backgroundColor: "rgba(255,255,255,0.06)", color: "#888", textTransform: "capitalize", marginTop: 6, display: "inline-block" }}>{product.type}</span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ────── ASSETS TAB ────── */}
                    {activeTab === "assets" && (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                <p style={{ ...sectionLabel, marginBottom: 0 }}>AI Assets ({selectedAssets.length} selected)</p>
                                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "transparent", color: ACCENT, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                                    <Plus style={{ width: 14, height: 14 }} /> Generate New
                                </button>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                                {DUMMY_AI_ASSETS.map((asset) => {
                                    const isSelected = selectedAssets.includes(asset.id);
                                    return (
                                        <button key={asset.id} onClick={() => toggleAsset(asset.id)}
                                            style={{
                                                ...cardStyle, padding: 0, overflow: "hidden", cursor: "pointer", textAlign: "left",
                                                border: isSelected ? `1px solid ${ACCENT}44` : "1px solid rgba(255,255,255,0.06)"
                                            }}>
                                            <div style={{ aspectRatio: "1", position: "relative", overflow: "hidden", backgroundColor: "rgba(255,255,255,0.03)" }}>
                                                {asset.imageUrl && <img src={asset.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />}
                                                {isSelected && (
                                                    <div style={{ position: "absolute", top: 8, right: 8, width: 24, height: 24, borderRadius: 6, backgroundColor: ACCENT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <Check style={{ width: 14, height: 14, color: "#000" }} />
                                                    </div>
                                                )}
                                                <span style={{ position: "absolute", bottom: 8, left: 8, fontSize: 10, padding: "2px 8px", borderRadius: 100, backgroundColor: "rgba(0,0,0,0.6)", color: "#ccc", textTransform: "capitalize" }}>{asset.type.replace("_", " ")}</span>
                                            </div>
                                            <div style={{ padding: "10px 12px" }}>
                                                <p style={{ fontSize: 13, fontWeight: 600, color: "#ccc", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{asset.name}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ────── STYLE TAB ────── */}
                    {activeTab === "style" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
                            <div>
                                <p style={sectionLabel}>Video Style</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                                    {VIDEO_STYLES.map((style) => {
                                        const isActive = videoStyle === style.id;
                                        return (
                                            <button key={style.id} onClick={() => setVideoStyle(style.id)}
                                                style={{
                                                    ...cardStyle, padding: "20px 18px", cursor: "pointer", textAlign: "left",
                                                    border: isActive ? `1px solid ${ACCENT}44` : "1px solid rgba(255,255,255,0.06)",
                                                    backgroundColor: isActive ? `${ACCENT}08` : "rgba(255,255,255,0.02)",
                                                }}>
                                                <p style={{ fontSize: 14, fontWeight: 600, color: isActive ? "#fff" : "#ccc", marginBottom: 3 }}>{style.name}</p>
                                                <p style={{ fontSize: 11, color: "#555" }}>{style.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <p style={sectionLabel}>Camera Movement</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {CAMERA_MOVEMENTS.map((m) => {
                                        const isActive = cameraMovement === m.id;
                                        return (
                                            <button key={m.id} onClick={() => setCameraMovement(m.id)}
                                                style={{
                                                    padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer",
                                                    border: isActive ? `1px solid ${ACCENT}44` : "1px solid rgba(255,255,255,0.08)",
                                                    backgroundColor: isActive ? ACCENT : "transparent",
                                                    color: isActive ? "#000" : "#888",
                                                    transition: "all 0.2s",
                                                }}>
                                                {m.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <p style={sectionLabel}>Style Preview</p>
                                <div style={{ ...cardStyle, padding: "14px 18px" }}>
                                    <p style={{ fontSize: 13, color: "#888", fontFamily: "monospace" }}>
                                        Style: <span style={{ color: ACCENT }}>{videoStyle}</span> | Camera: <span style={{ color: ACCENT }}>{cameraMovement.replace("_", " ")}</span> | Duration: <span style={{ color: ACCENT }}>{duration}s</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ────── PREVIEW TAB ────── */}
                    {activeTab === "preview" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <div style={{ aspectRatio: "16/9", borderRadius: 14, backgroundColor: "#080808", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                <Wand2 style={{ width: 52, height: 52, color: "#222", marginBottom: 14 }} />
                                <p style={{ fontSize: 15, color: "#555" }}>Video preview will appear here</p>
                                <p style={{ fontSize: 12, color: "#333", marginTop: 4 }}>Generate your ad to see the preview</p>
                                {ctaText && (
                                    <div style={{ position: "absolute", bottom: 24, right: 24 }}>
                                        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 10, border: "none", backgroundColor: ACCENT, color: "#000", fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: `0 0 24px ${ACCENT}33` }}>
                                            {ctaText} <ExternalLink style={{ width: 14, height: 14 }} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                                {[
                                    { label: "Duration", value: `${duration}s`, icon: Clock, color: ACCENT },
                                    { label: "Products", value: String(selectedProducts.length), icon: Package, color: "#22c55e" },
                                    { label: "AI Assets", value: String(selectedAssets.length), icon: Users, color: "#a855f7" },
                                ].map((stat) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={stat.label} style={{ ...cardStyle, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
                                            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${stat.color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Icon style={{ width: 18, height: 18, color: stat.color }} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>{stat.label}</p>
                                                <p style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{stat.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ────── EXPORT TAB ────── */}
                    {activeTab === "export" && (
                        <div>
                            <p style={{ ...sectionLabel, marginBottom: 20 }}>Select Export Formats</p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                                {EXPORT_FORMATS.map((fmt) => {
                                    const isSelected = selectedFormats.includes(fmt.id);
                                    const isVertical = fmt.aspectRatio === "9:16";
                                    const isSquare = fmt.aspectRatio === "1:1";
                                    return (
                                        <button key={fmt.id} onClick={() => toggleFormat(fmt.id)}
                                            style={{
                                                ...cardStyle, padding: 16, cursor: "pointer", textAlign: "left",
                                                border: isSelected ? `1px solid ${ACCENT}44` : "1px solid rgba(255,255,255,0.06)",
                                                backgroundColor: isSelected ? `${ACCENT}06` : "rgba(255,255,255,0.02)",
                                            }}>
                                            <div style={{ display: "flex", gap: 14, alignItems: "start" }}>
                                                <div style={{
                                                    width: isVertical ? 28 : isSquare ? 40 : 48,
                                                    height: isVertical ? 48 : isSquare ? 40 : 28,
                                                    borderRadius: 6, backgroundColor: "rgba(255,255,255,0.06)",
                                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                                }}>
                                                    {isVertical ? <Smartphone style={{ width: 14, height: 14, color: "#555" }} /> : <Monitor style={{ width: 14, height: 14, color: "#555" }} />}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                                        <div>
                                                            <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{fmt.name}</p>
                                                            <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{fmt.platform}</p>
                                                        </div>
                                                        {isSelected && <Check style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0 }} />}
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                                                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 100, backgroundColor: "rgba(255,255,255,0.06)", color: "#888" }}>{fmt.aspectRatio}</span>
                                                        <span style={{ fontSize: 10, color: "#444" }}>Max {fmt.maxDuration}s</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                                <div>
                                    <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{selectedFormats.length} format{selectedFormats.length !== 1 ? "s" : ""} selected</p>
                                    <p style={{ fontSize: 12, color: "#555", marginTop: 2 }}>Your ad will be exported in the selected formats</p>
                                </div>
                                <button style={{
                                    display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 10, border: "none",
                                    backgroundColor: selectedFormats.length > 0 ? ACCENT : "rgba(255,255,255,0.06)",
                                    color: selectedFormats.length > 0 ? "#000" : "#555",
                                    fontSize: 13, fontWeight: 700, cursor: selectedFormats.length > 0 ? "pointer" : "default",
                                    transition: "all 0.25s",
                                }}>
                                    <Download style={{ width: 15, height: 15 }} /> Export All
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
