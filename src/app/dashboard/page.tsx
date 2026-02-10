"use client";

import { useState } from "react";

// Template data
const TEMPLATES = [
    {
        id: 1,
        title: "Product Showcase",
        description: "Ideal for high-end e-commerce ads.",
        icon: "shopping_bag",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNrjw3CKZa00Qg8aGAQqhshv1C2nSWZ-fKnGBgShxRNKMFLPolu51XItzAKc0v_WQkUlYAlERn11edTF51TTrcpz_6UWbRExmZX6nzh-M1uS-hudvOKCd7uoPfX_5xV3KteyDfSPzUtyE0TJfilkYwiuRwGjuiINXFuZWAr4YJ15RVhKxUJZDmQSe97p44KPEqNC_wBHQG8aJzkZLh8_rEirAsjJJd8OMki8z0idhAHpFML8Br3JGdRUa07I-nHk2H4ilriRlAXG0",
    },
    {
        id: 2,
        title: "Cinematic Story",
        description: "Brand-focused storytelling with AI voiceover.",
        icon: "movie_filter",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt2AOpglZ9yzN4pID4Z4KibabDvs8gngkQNj8EH1-7c8ARBBQv_EjJLZWiR3kQ3HwSU8U9AomNuv_U5uMXItDWaTzf7AkWJBYr4md24EsxOyyyWPY6sMXcoGJV4oBdOujFx_LDZXDkMYF3uBuPHaQiAo6-se2t1_qaL348RRnU8sv6EE4NZ_m-qmchKxImpNXBwClvBFBb78jrySW_Nq-YUEbm6zPVfposLOflqrvMsJIGUOoO5pWgmd0XeIROSz2yazOEANXieFM",
    },
    {
        id: 3,
        title: "Social Short",
        description: "Fast-paced 9:16 cuts for TikTok & Reels.",
        icon: "smartphone",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpwKuElVaW5UBVAd3WBtjZ6Da3_2fDaeKNY2QbyWNIqFu3JVGNj22JaMgKZpr5dAWJrj73d8GS7Zn0rzyPoBYGpFJgKx6aIPpvuVxXSutdaRveV3ztMjKkoY1O2qC2Oz4NU-UuZJNbHovr9lDuNkJ4L-XhqROyjht07qPywwjnnPC3rAOCBf9qa7sX5qU73PbGtxW5J-YrytBbs_KWfXzw3Iu0NxGGQmHWfBTdHZUo7dLwWX3Izxid5HKnyBXCuxHp_qZJsdCLG_o",
    },
];

// Project data
const PROJECTS = [
    {
        id: 1,
        title: "Luxe Chronograph Ad",
        status: "PUBLISHED",
        statusColor: "bg-green-500/90",
        aspectRatio: "16:9",
        views: "12.4k",
        ctr: "3.2%",
        time: "2h ago",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmm3V_u6XJzwQESGDX36SjVjL_XiMJj7RVSvYM27CusNiYl0JttiZIflBMh9pGpyq-YzPhU8W6r_lUOXGj9cLLerxao5NM4qvxgP75GrW_xNbZ5cyksJyW8wnw6UvcE5xRbwHj5CdkqxdfPJnydWGf7HUEY1GkiOjsVoYd3k7-_Sl3ApD3eFs2eCpaLGtz2WpLJal-tMqVVjpdv22C4MhxhbpJPqemEXW-tNnVi5gLJMqyqs7H2Ckeefw-7sMtlyc9W35vOEx9sxQ",
        isRendering: false,
    },
    {
        id: 2,
        title: "SprintX Pro Reveal",
        status: "RENDERING",
        statusColor: "bg-blue-500/90",
        progress: 75,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTR7NtRpaEBSVMsSho8p0yomGteZGpCBFVkIaTiAvTMf6RqDaHt-xFTUhC9QBxc5lGf8gpU6ry89yepT4Pki2Fb24MHZlxwRcp60Py43o5l5gqKMSDMiYyJ0bv0eodFeYg73jLoRfT9dKq6TSFIAwURrNwmqVYWovOSh-vd73j2RRGBUgmwxJ74Mn3CBI8vJXryg_146d87FnwwiyNxy_sSQjOqqg8KrqiK8T3udPecgXsHr-NSwqumz6WNBUF1NHEDqzprfEkIjk",
        isRendering: true,
    },
    {
        id: 3,
        title: "Zen Lamp Social Cut",
        status: "DRAFT",
        statusColor: "bg-slate-500/90",
        aspectRatio: "9:16",
        assets: 4,
        time: "1 day ago",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt6Gyf7WtbpiN7p-UG_hXLT_8Gd-kr8mZVnET7r2tsg8ATPt9I66YZyr7wyewrVvECJ7qGK0QoNtKzyP04pmy0_PNkNRqwfhdW1WNE5uSLoN2gnQcKRgiIPo5PC-EjFvbsBsXYOg9uasrmJDgMDySHlK6sZw8koAvQmBjDlW25v52U6W5BLWm4f-LRIDWCpco7plMzye7gcu7enT-lf83OJcZyJgGC5LYjuigio0FIxSy_OKFMqPuJW-nA4tH8shU2ZrJrcN2_aEo",
        isRendering: false,
        isDraft: true,
    },
];

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            {/* Top Bar */}
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-xl bg-[#101622]/80">
                <div className="flex-1 max-w-xl">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#135bec] transition-colors">
                            search
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-800/50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#135bec] transition-all outline-none"
                            placeholder="Search projects or assets..."
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex gap-1">
                            <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 text-[10px] text-slate-500">⌘</kbd>
                            <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 text-[10px] text-slate-500">K</kbd>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#101622]" />
                    </button>
                    <button className="bg-[#135bec] hover:bg-[#135bec]/90 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#135bec]/20">
                        <span className="material-symbols-outlined text-sm">add</span>
                        New Project
                    </button>
                </div>
            </header>

            <div className="p-8 space-y-10">
                {/* Quick Start Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold tracking-tight">Quick Start</h2>
                        <a className="text-sm text-[#135bec] font-medium hover:underline cursor-pointer">
                            View all templates
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TEMPLATES.map((template) => (
                            <div
                                key={template.id}
                                className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-slate-200 dark:bg-slate-800"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)), url('${template.image}')`,
                                    }}
                                />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="bg-white/10 backdrop-blur-md w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                                        <span className="material-symbols-outlined text-white">{template.icon}</span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg">{template.title}</h3>
                                    <p className="text-white/70 text-sm">{template.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recent Projects Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold tracking-tight">Recent Projects</h2>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-sm">grid_view</span>
                            </button>
                            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                className="group bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-[#135bec]/50 transition-all"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${project.isRendering ? "opacity-60" : "opacity-80 group-hover:opacity-100"
                                            }`}
                                    />

                                    {/* Status badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className={`${project.statusColor} text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md`}>
                                            {project.status}
                                        </span>
                                        {project.aspectRatio && (
                                            <span className="bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md">
                                                {project.aspectRatio}
                                            </span>
                                        )}
                                    </div>

                                    {/* Rendering state */}
                                    {project.isRendering && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                            <div className="w-10 h-10 border-2 border-[#135bec] border-t-transparent rounded-full animate-spin" />
                                            <span className="text-white text-xs font-bold tracking-widest uppercase">
                                                Rendering AI Shots...
                                            </span>
                                        </div>
                                    )}

                                    {/* Hover overlay for published */}
                                    {!project.isRendering && !project.isDraft && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                            <button className="w-12 h-12 bg-[#135bec] text-white rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                                                <span className="material-symbols-outlined">play_arrow</span>
                                            </button>
                                        </div>
                                    )}

                                    {/* Hover overlay for draft */}
                                    {project.isDraft && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                            <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                                Continue Editing
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-sm truncate">{project.title}</h4>
                                        <button className="text-slate-400 hover:text-white">
                                            <span className="material-symbols-outlined text-sm">more_vert</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        {project.views && (
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">visibility</span>
                                                <span>{project.views}</span>
                                            </div>
                                        )}
                                        {project.ctr && (
                                            <div className="flex items-center gap-1 text-[#135bec]">
                                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                                <span>{project.ctr} CTR</span>
                                            </div>
                                        )}
                                        {project.assets && (
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">inventory_2</span>
                                                <span>{project.assets} Assets</span>
                                            </div>
                                        )}
                                        {project.progress !== undefined && (
                                            <>
                                                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-[#135bec] h-full"
                                                        style={{ width: `${project.progress}%` }}
                                                    />
                                                </div>
                                                <span className="whitespace-nowrap">{project.progress}%</span>
                                            </>
                                        )}
                                        {project.time && !project.progress && (
                                            <span className="ml-auto">{project.time}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
