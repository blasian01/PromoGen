"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";

const NAV_ITEMS = [
    { href: "/dashboard", label: "Projects", icon: "grid_view" },
    { href: "/dashboard/library", label: "Library", icon: "video_library" },
    { href: "/dashboard/analytics", label: "Analytics", icon: "bar_chart" },
    { href: "/dashboard/settings", label: "Settings", icon: "settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full bg-background-light dark:bg-[#101622] z-50">
            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#135bec] rounded flex items-center justify-center">
                    <svg className="text-white w-5 h-5" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold tracking-tight">AdGen AI</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                ? "bg-[#135bec] text-white font-medium"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Storage & User Section */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                {/* Storage Widget */}
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Storage</span>
                        <span className="text-xs font-bold text-[#135bec]">41%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#135bec] h-full rounded-full" style={{ width: "41%" }} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">8.2 GB of 20 GB used</p>
                    <button className="w-full mt-3 py-2 bg-[#135bec]/10 text-[#135bec] text-xs font-bold rounded-lg hover:bg-[#135bec]/20 transition-colors">
                        Upgrade Plan
                    </button>
                </div>

                {/* User Profile */}
                <div className="mt-4 flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                            {user?.name?.charAt(0) || "A"}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{user?.name || "Alex Rivard"}</p>
                        <p className="text-xs text-slate-500 truncate">Pro Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
