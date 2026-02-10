"use client";

import { useState } from "react";

const SETTINGS_NAV = [
    { id: "profile", label: "Profile", icon: "person" },
    { id: "billing", label: "Billing", icon: "payments" },
    { id: "integrations", label: "API & Integrations", icon: "hub" },
    { id: "notifications", label: "Notifications", icon: "notifications_active" },
    { id: "team", label: "Team", icon: "group" },
];

const INTEGRATIONS = [
    {
        id: "veo3",
        title: "Google Veo 3",
        description: "Enhanced AI video generation using Google's latest cinematic models.",
        icon: "movie_filter",
        iconColor: "text-blue-500",
        enabled: true,
        connected: false,
        buttonText: "Configure Model",
    },
    {
        id: "meta",
        title: "Meta Ads",
        description: "Sync generated ads directly to Facebook and Instagram Ads Manager.",
        icon: "facebook",
        iconColor: "text-[#1d4ed8]",
        enabled: true,
        connected: true,
        connectedText: "Connected: Ad Account #8291",
    },
    {
        id: "tiktok",
        title: "TikTok Ads",
        description: "Optimize creative for TikTok Spark Ads and Creator Marketplace.",
        icon: "music_note",
        iconColor: "text-slate-900 dark:text-white",
        enabled: false,
        connected: false,
        buttonText: "Connect TikTok",
        buttonStyle: "primary",
    },
    {
        id: "api",
        title: "API Keys",
        description: "Access our generation API via secret keys.",
        icon: "key",
        iconColor: "text-slate-500",
        isApiKey: true,
        apiKey: "sk_live_51Mv********************",
    },
];

const CLOUD_PROVIDERS = [
    {
        id: "dropbox",
        name: "Dropbox Business",
        status: "Active",
        lastSynced: "Last synced 2 hours ago",
        connected: true,
        logo: (
            <svg fill="#0061FF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L1 5L6 8L11 5L6 2ZM1 11L6 14L11 11L6 8L1 11ZM18 2L13 5L18 8L23 5L18 2ZM13 11L18 14L23 11L18 8L13 11ZM6 16L11 19L16 16L11 13L6 16ZM6 22L11 19L16 22L11 25L6 22Z" />
            </svg>
        ),
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        id: "gdrive",
        name: "Google Drive",
        status: "Not connected",
        connected: false,
        logo: (
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3H15L21.5 14H15.5L9 3Z" fill="#0066DA" />
                <path d="M15.5 14H2.5L5.5 19H18.5L15.5 14Z" fill="#00AC47" />
                <path d="M2.5 14L9 3L12 8L5.5 19L2.5 14Z" fill="#EA4335" />
            </svg>
        ),
        bgColor: "bg-slate-50 dark:bg-slate-800",
    },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <label className="relative inline-block w-11 h-6 cursor-pointer">
            <input
                type="checkbox"
                checked={enabled}
                onChange={onChange}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-600 peer-checked:bg-[#1d4ed8] rounded-full transition-colors" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
        </label>
    );
}

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("integrations");
    const [integrationStates, setIntegrationStates] = useState<Record<string, boolean>>({
        veo3: true,
        meta: true,
        tiktok: false,
    });
    const [searchQuery, setSearchQuery] = useState("");

    const toggleIntegration = (id: string) => {
        setIntegrationStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
            {/* Top Bar */}
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-sm">
                <div className="relative w-96">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                        search
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-[#1d4ed8] outline-none"
                        placeholder="Search settings..."
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-500 hover:text-[#1d4ed8] transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                    </button>
                    <button className="bg-[#1d4ed8] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
                        <span className="material-symbols-outlined text-sm">add</span>
                        New Project
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Settings Sub-Navigation */}
                <nav className="w-64 border-r border-slate-200 dark:border-slate-800 p-6 flex-shrink-0">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                        Settings
                    </h2>
                    <div className="space-y-1">
                        {SETTINGS_NAV.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${activeSection === item.id
                                        ? "bg-[#1d4ed8]/10 text-[#3b82f6] border-r-2 border-[#3b82f6]"
                                        : "text-slate-600 dark:text-slate-400 hover:text-[#1d4ed8] dark:hover:text-slate-200"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span className="text-sm font-medium">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl">
                        {/* Header */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-1">API & Integrations</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Connect your marketing platforms and cloud storage to automate your workflow.
                            </p>
                        </div>

                        {/* Integration Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {INTEGRATIONS.map((integration) => (
                                <div
                                    key={integration.id}
                                    className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                            <span className={`material-symbols-outlined ${integration.iconColor} text-2xl`}>
                                                {integration.icon}
                                            </span>
                                        </div>
                                        {!integration.isApiKey && (
                                            <Toggle
                                                enabled={integrationStates[integration.id] || false}
                                                onChange={() => toggleIntegration(integration.id)}
                                            />
                                        )}
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{integration.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                        {integration.description}
                                    </p>

                                    {integration.connected && (
                                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-500 bg-emerald-500/10 w-fit px-2 py-1 rounded">
                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                            {integration.connectedText}
                                        </div>
                                    )}

                                    {integration.buttonText && !integration.connected && (
                                        <button
                                            className={`w-full py-2 text-sm font-semibold rounded-lg transition-colors ${integration.buttonStyle === "primary"
                                                    ? "bg-slate-900 dark:bg-slate-700 text-white hover:opacity-90"
                                                    : "border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                }`}
                                        >
                                            {integration.buttonText}
                                        </button>
                                    )}

                                    {integration.isApiKey && (
                                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                                            <code className="text-xs text-slate-500 flex-1 truncate">
                                                {integration.apiKey}
                                            </code>
                                            <button className="p-1 hover:text-[#1d4ed8] transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Product Library Sync */}
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-1">Product Library Sync</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Sync high-res product assets from your external cloud storage.
                                    </p>
                                </div>
                                <button className="flex items-center gap-2 text-[#1d4ed8] font-semibold text-sm hover:underline">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Add Provider
                                </button>
                            </div>

                            <div className="space-y-4">
                                {CLOUD_PROVIDERS.map((provider) => (
                                    <div
                                        key={provider.id}
                                        className="flex items-center justify-between p-4 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 ${provider.bgColor} rounded flex items-center justify-center`}>
                                                {provider.logo}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{provider.name}</h4>
                                                <p className="text-xs text-slate-500">{provider.lastSynced || provider.status}</p>
                                            </div>
                                        </div>
                                        {provider.connected ? (
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
                                                    {provider.status}
                                                </span>
                                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                    <span className="material-symbols-outlined">delete_outline</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="px-4 py-1.5 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                Connect
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <button className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                Discard
                            </button>
                            <button className="px-8 py-2 bg-[#1d4ed8] text-white text-sm font-bold rounded-lg shadow-lg shadow-[#1d4ed8]/20 hover:opacity-90 transition-all">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
