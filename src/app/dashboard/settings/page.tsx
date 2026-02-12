"use client";

import { useState } from "react";
import {
    User,
    CreditCard,
    Plug,
    Bell,
    Users,
    Film,
    Key,
    Copy,
    CheckCircle2,
    Trash2,
    Plus,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Shield,
    Save,
    Loader2,
    Briefcase,
    Globe,
    ExternalLink,
    Mail,
    Clock,
    Crown,
    Send,
} from "lucide-react";

/* ─── Settings sub-nav ─── */
const SETTINGS_NAV = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "integrations", label: "API & Integrations", icon: Plug },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "team", label: "Team", icon: Users },
    { id: "projects", label: "Projects", icon: Briefcase },
];

/* ─── Integrations data ─── */
const INTEGRATIONS = [
    {
        id: "veo3",
        title: "Google Veo 3",
        description: "Enhanced AI video generation using Google's latest cinematic models.",
        icon: Film,
        iconBg: "rgba(125, 211, 252, 0.1)",
        iconColor: "#7DD3FC",
        enabled: true,
        connected: false,
        buttonText: "Configure Model",
    },
    {
        id: "meta",
        title: "Meta Ads",
        description: "Sync generated ads directly to Facebook and Instagram Ads Manager.",
        icon: Shield,
        iconBg: "rgba(59, 130, 246, 0.1)",
        iconColor: "#3b82f6",
        enabled: true,
        connected: true,
        connectedText: "Connected: Ad Account #8291",
    },
    {
        id: "tiktok",
        title: "TikTok Ads",
        description: "Optimize creative for TikTok Spark Ads and Creator Marketplace.",
        icon: Plug,
        iconBg: "rgba(255, 255, 255, 0.04)",
        iconColor: "#fff",
        enabled: false,
        connected: false,
        buttonText: "Connect TikTok",
        isPrimary: true,
    },
    {
        id: "api",
        title: "API Keys",
        description: "Access our generation API via secret keys.",
        icon: Key,
        iconBg: "rgba(255, 255, 255, 0.04)",
        iconColor: "#888",
        isApiKey: true,
        apiKey: "sk_live_51Mv********************",
    },
];

/* ─── Cloud providers ─── */
const CLOUD_PROVIDERS = [
    {
        id: "dropbox",
        name: "Dropbox Business",
        status: "Active",
        lastSynced: "Last synced 2 hours ago",
        connected: true,
    },
    {
        id: "gdrive",
        name: "Google Drive",
        status: "Not connected",
        connected: false,
    },
];

/* ─── Shared styles ─── */
const cardStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 14,
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
};

/* ─── Toggle component ─── */
function Toggle({
    enabled,
    onChange,
}: {
    enabled: boolean;
    onChange: () => void;
}) {
    return (
        <button
            onClick={onChange}
            style={{
                position: "relative",
                width: 44,
                height: 24,
                borderRadius: 12,
                border: "none",
                backgroundColor: enabled
                    ? "#7DD3FC"
                    : "rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                transition: "background-color 0.2s",
                flexShrink: 0,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 2,
                    left: enabled ? 22 : 2,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: enabled ? "#000" : "#555",
                    transition: "left 0.2s, background-color 0.2s",
                }}
            />
        </button>
    );
}

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("profile");
    const [expandedProject, setExpandedProject] = useState<string | null>("proj-1");
    const [integrationStates, setIntegrationStates] = useState<
        Record<string, boolean>
    >({
        veo3: true,
        meta: true,
        tiktok: false,
    });
    const [copiedKey, setCopiedKey] = useState(false);

    const toggleIntegration = (id: string) => {
        setIntegrationStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const copyApiKey = () => {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
    };

    return (
        <div style={{ display: "flex", flex: 1, minHeight: "100vh" }}>
            {/* ─── Settings Sub-nav ─── */}
            <nav
                style={{
                    width: 240,
                    borderRight: "1px solid rgba(255, 255, 255, 0.06)",
                    padding: "28px 16px",
                    flexShrink: 0,
                }}
            >
                <h2
                    style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#555",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "0 12px",
                        marginBottom: 16,
                    }}
                >
                    Settings
                </h2>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {SETTINGS_NAV.map((item) => {
                        const isActive = activeSection === item.id;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontSize: 13,
                                    fontWeight: isActive ? 500 : 400,
                                    transition: "all 0.2s",
                                    backgroundColor: isActive
                                        ? "rgba(125, 211, 252, 0.08)"
                                        : "transparent",
                                    color: isActive ? "#7DD3FC" : "#888",
                                }}
                            >
                                <Icon
                                    style={{
                                        width: 18,
                                        height: 18,
                                        opacity: isActive ? 1 : 0.6,
                                    }}
                                />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* ─── Main Content ─── */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "32px 40px 48px",
                }}
            >
                <div style={{ maxWidth: 800 }}>

                    {/* ═══════════════ PROFILE ═══════════════ */}
                    {activeSection === "profile" && (
                        <>
                            <SectionHeader title="Profile" subtitle="Manage your personal information and preferences." />
                            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
                                {/* Avatar */}
                                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                                    <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg, rgba(125,211,252,0.2), rgba(125,211,252,0.05))", border: "1px solid rgba(125,211,252,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <User style={{ width: 32, height: 32, color: "#7DD3FC" }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4 }}>Profile Photo</p>
                                        <button style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 14px", color: "#7DD3FC", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Upload Image</button>
                                    </div>
                                </div>
                                {/* Fields */}
                                <FieldRow label="Display Name" defaultValue="Alex Rivera" />
                                <FieldRow label="Email Address" defaultValue="alex@company.com" />
                                <FieldRow label="Timezone" defaultValue="America/New_York" />
                                <FieldRow label="Company" defaultValue="Rivera Creative LLC" />
                            </div>
                            <ActionButtons />
                        </>
                    )}

                    {/* ═══════════════ BILLING ═══════════════ */}
                    {activeSection === "billing" && (
                        <>
                            <SectionHeader title="Billing" subtitle="Manage your subscription, usage, and payment methods." />
                            {/* Current Plan */}
                            <div style={{ ...cardStyle, padding: 24, marginBottom: 20 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <Crown style={{ width: 20, height: 20, color: "#7DD3FC" }} />
                                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Pro Plan</h3>
                                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, backgroundColor: "rgba(125,211,252,0.1)", color: "#7DD3FC" }}>Active</span>
                                    </div>
                                    <p style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>$49<span style={{ fontSize: 13, fontWeight: 400, color: "#555" }}>/mo</span></p>
                                </div>
                                {/* Usage bar */}
                                <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>Credits used this cycle: 187 / 500</p>
                                <div style={{ height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                                    <div style={{ width: "37.4%", height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #7DD3FC, #38bdf8)" }} />
                                </div>
                            </div>
                            {/* Payment Method */}
                            <div style={{ ...cardStyle, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <CreditCard style={{ width: 18, height: 18, color: "#7DD3FC" }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 2 }}>•••• •••• •••• 4242</p>
                                        <p style={{ fontSize: 12, color: "#555" }}>Expires 08/2027</p>
                                    </div>
                                </div>
                                <button style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "7px 16px", color: "#ccc", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Update</button>
                            </div>
                            {/* Invoices */}
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Recent Invoices</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
                                {[{ date: "Feb 1, 2026", amount: "$49.00", status: "Paid" }, { date: "Jan 1, 2026", amount: "$49.00", status: "Paid" }, { date: "Dec 1, 2025", amount: "$49.00", status: "Paid" }].map((inv) => (
                                    <div key={inv.date} style={{ ...cardStyle, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <p style={{ fontSize: 13, color: "#ccc" }}>{inv.date}</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                            <p style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{inv.amount}</p>
                                            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e" }}>{inv.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ═══════════════ INTEGRATIONS (existing) ═══════════════ */}
                    {activeSection === "integrations" && (
                        <>
                            <SectionHeader title="API & Integrations" subtitle="Connect your marketing platforms and cloud storage to automate your workflow." />
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40 }}>
                                {INTEGRATIONS.map((integration) => {
                                    const Icon = integration.icon;
                                    return (
                                        <div key={integration.id} style={{ ...cardStyle, padding: 24 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: integration.iconBg, border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Icon style={{ width: 20, height: 20, color: integration.iconColor }} />
                                                </div>
                                                {!integration.isApiKey && (
                                                    <Toggle enabled={integrationStates[integration.id] || false} onChange={() => toggleIntegration(integration.id)} />
                                                )}
                                            </div>
                                            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{integration.title}</h3>
                                            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5, marginBottom: 16 }}>{integration.description}</p>
                                            {integration.connected && (
                                                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 100, backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", fontSize: 12, fontWeight: 500 }}>
                                                    <CheckCircle2 style={{ width: 13, height: 13 }} />
                                                    {integration.connectedText}
                                                </div>
                                            )}
                                            {integration.buttonText && !integration.connected && (
                                                <button style={{ width: "100%", padding: "10px 0", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", ...(integration.isPrimary ? { backgroundColor: "#7DD3FC", color: "#000", border: "none" } : { backgroundColor: "transparent", color: "#ccc", border: "1px solid rgba(255,255,255,0.1)" }) }}>
                                                    {integration.buttonText}
                                                </button>
                                            )}
                                            {integration.isApiKey && (
                                                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                                    <code style={{ flex: 1, fontSize: 12, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "monospace" }}>{integration.apiKey}</code>
                                                    <button onClick={copyApiKey} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: copiedKey ? "#22c55e" : "#555", transition: "color 0.2s" }}>
                                                        {copiedKey ? <CheckCircle2 style={{ width: 16, height: 16 }} /> : <Copy style={{ width: 16, height: 16 }} />}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Product Library Sync */}
                            <div style={{ marginBottom: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <div>
                                        <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Product Library Sync</h3>
                                        <p style={{ fontSize: 13, color: "#888" }}>Sync high-res product assets from your external cloud storage.</p>
                                    </div>
                                    <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#7DD3FC", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                                        <Plus style={{ width: 14, height: 14 }} /> Add Provider
                                    </button>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {CLOUD_PROVIDERS.map((provider) => (
                                        <div key={provider.id} style={{ ...cardStyle, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <Plug style={{ width: 18, height: 18, color: provider.connected ? "#7DD3FC" : "#555" }} />
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 2 }}>{provider.name}</p>
                                                    <p style={{ fontSize: 12, color: "#555" }}>{provider.lastSynced || provider.status}</p>
                                                </div>
                                            </div>
                                            {provider.connected ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e" }}>{provider.status}</span>
                                                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#555", transition: "color 0.2s" }}><Trash2 style={{ width: 16, height: 16 }} /></button>
                                                </div>
                                            ) : (
                                                <button style={{ padding: "7px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "transparent", color: "#ccc", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>Connect</button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ActionButtons />
                        </>
                    )}

                    {/* ═══════════════ NOTIFICATIONS ═══════════════ */}
                    {activeSection === "notifications" && (
                        <>
                            <SectionHeader title="Notifications" subtitle="Choose how and when you'd like to be notified." />
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
                                {[
                                    { label: "Campaign Completed", desc: "Get notified when an ad generation finishes.", default: true },
                                    { label: "Weekly Performance Digest", desc: "Receive a summary of your campaign metrics every Monday.", default: true },
                                    { label: "Billing Alerts", desc: "Alerts for upcoming renewals and failed payments.", default: true },
                                    { label: "Team Invitations", desc: "Notifications when you're invited to a workspace.", default: false },
                                    { label: "Product Updates", desc: "New features, improvements, and platform announcements.", default: false },
                                ].map((n) => (
                                    <NotificationRow key={n.label} label={n.label} description={n.desc} defaultEnabled={n.default} />
                                ))}
                            </div>
                            <ActionButtons />
                        </>
                    )}

                    {/* ═══════════════ TEAM ═══════════════ */}
                    {activeSection === "team" && (
                        <>
                            <SectionHeader title="Team" subtitle="Manage team members and invitations." />
                            {/* Members */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
                                {[
                                    { name: "Alex Rivera", email: "alex@company.com", role: "Owner", initials: "AR" },
                                    { name: "Jordan Lee", email: "jordan@company.com", role: "Editor", initials: "JL" },
                                    { name: "Sam Chen", email: "sam@company.com", role: "Viewer", initials: "SC" },
                                ].map((m) => (
                                    <div key={m.email} style={{ ...cardStyle, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, rgba(125,211,252,0.15), rgba(125,211,252,0.05))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#7DD3FC" }}>{m.initials}</div>
                                            <div>
                                                <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 2 }}>{m.name}</p>
                                                <p style={{ fontSize: 12, color: "#555" }}>{m.email}</p>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, backgroundColor: m.role === "Owner" ? "rgba(125,211,252,0.1)" : "rgba(255,255,255,0.04)", color: m.role === "Owner" ? "#7DD3FC" : "#888" }}>{m.role}</span>
                                    </div>
                                ))}
                            </div>
                            {/* Invite */}
                            <div style={{ ...cardStyle, padding: 20 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Invite a Team Member</h3>
                                <div style={{ display: "flex", gap: 10 }}>
                                    <input placeholder="email@example.com" style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 13, outline: "none" }} />
                                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "none", backgroundColor: "#7DD3FC", color: "#000", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                        <Send style={{ width: 14, height: 14 }} /> Send Invite
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ═══════════════ PROJECTS ═══════════════ */}
                    {activeSection === "projects" && (
                        <>
                            <SectionHeader title="SaaS Projects" subtitle="Manage your SaaS products and their linked social media accounts." />
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {PROJECTS.map((project) => {
                                    const isExpanded = expandedProject === project.id;
                                    return (
                                        <div key={project.id} style={{ ...cardStyle, overflow: "hidden" }}>
                                            {/* Project header */}
                                            <button onClick={() => setExpandedProject(isExpanded ? null : project.id)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "none", border: "none", cursor: "pointer" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                    <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`, border: `1px solid ${project.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <Globe style={{ width: 20, height: 20, color: project.color }} />
                                                    </div>
                                                    <div style={{ textAlign: "left" }}>
                                                        <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{project.name}</p>
                                                        <p style={{ fontSize: 12, color: "#555" }}>{project.url}</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, backgroundColor: project.status === "Active" ? "rgba(34,197,94,0.1)" : "rgba(255,180,0,0.1)", color: project.status === "Active" ? "#22c55e" : "#f59e0b" }}>{project.status}</span>
                                                    {isExpanded ? <ChevronUp style={{ width: 16, height: 16, color: "#555" }} /> : <ChevronDown style={{ width: 16, height: 16, color: "#555" }} />}
                                                </div>
                                            </button>
                                            {/* Expanded social accounts */}
                                            {isExpanded && (
                                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 24px 20px" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                                                        <p style={{ fontSize: 12, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>Linked Social Accounts</p>
                                                        <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", color: "#7DD3FC", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                                                            <Plus style={{ width: 13, height: 13 }} /> Add Account
                                                        </button>
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                        {project.socials.map((social) => (
                                                            <div key={social.handle} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                                                    <span style={{ fontSize: 16 }}>{social.icon}</span>
                                                                    <div>
                                                                        <p style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{social.platform}</p>
                                                                        <p style={{ fontSize: 11, color: "#555" }}>{social.handle}</p>
                                                                    </div>
                                                                </div>
                                                                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#555", transition: "color 0.2s" }}>
                                                                    <Trash2 style={{ width: 14, height: 14 }} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Add project button */}
                            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", marginTop: 16, padding: "14px 0", borderRadius: 12, border: "1px dashed rgba(255,255,255,0.1)", backgroundColor: "transparent", color: "#7DD3FC", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
                                <Plus style={{ width: 16, height: 16 }} /> Add New Project
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

/* ─── Shared sub-components ─── */

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", marginBottom: 6 }}>{title}</h2>
            <p style={{ fontSize: 14, color: "#888" }}>{subtitle}</p>
        </div>
    );
}

function FieldRow({ label, defaultValue }: { label: string; defaultValue: string }) {
    return (
        <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
            <input defaultValue={defaultValue} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 14, outline: "none", transition: "border-color 0.2s" }} />
        </div>
    );
}

function NotificationRow({ label, description, defaultEnabled }: { label: string; description: string; defaultEnabled: boolean }) {
    const [enabled, setEnabled] = useState(defaultEnabled);
    return (
        <div style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 3 }}>{label}</p>
                <p style={{ fontSize: 12, color: "#555" }}>{description}</p>
            </div>
            <Toggle enabled={enabled} onChange={() => setEnabled(!enabled)} />
        </div>
    );
}

function ActionButtons() {
    return (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "transparent", color: "#888", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>Discard</button>
            <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 10, border: "none", backgroundColor: "#7DD3FC", color: "#000", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 0 25px rgba(125,211,252,0.15)", transition: "all 0.2s" }}>
                <Save style={{ width: 15, height: 15 }} /> Save Changes
            </button>
        </div>
    );
}

/* ─── Mock project data ─── */
const PROJECTS = [
    {
        id: "proj-1",
        name: "PromoGen",
        url: "promogen.io",
        status: "Active",
        color: "#7DD3FC",
        socials: [
            { platform: "Instagram", handle: "@promogen.ai", icon: "📸" },
            { platform: "X (Twitter)", handle: "@promogen_ai", icon: "𝕏" },
            { platform: "TikTok", handle: "@promogen", icon: "🎵" },
            { platform: "YouTube", handle: "PromoGen AI", icon: "▶️" },
        ],
    },
    {
        id: "proj-2",
        name: "Notica",
        url: "notica.app",
        status: "Paused",
        color: "#f59e0b",
        socials: [
            { platform: "Instagram", handle: "@notica.app", icon: "📸" },
            { platform: "Facebook", handle: "Notica App", icon: "📘" },
        ],
    },
];
