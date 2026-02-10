"use client";

import { ReactNode } from "react";

interface Tab {
    id: string;
    label: string;
    icon?: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (tabId: string) => void;
    className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = "" }: TabsProps) {
    return (
        <div className={`flex gap-1 py-2 ${className}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${activeTab === tab.id
                            ? "bg-white/10 text-white"
                            : "text-white/40 hover:text-white/70 hover:bg-white/5"
                        }`}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

interface TabPanelProps {
    children: ReactNode;
    isActive: boolean;
}

export function TabPanel({ children, isActive }: TabPanelProps) {
    if (!isActive) return null;
    return <div className="animate-fade-in">{children}</div>;
}
