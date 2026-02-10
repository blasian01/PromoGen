interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "error" | "info";
    size?: "sm" | "md";
    className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className = "" }: BadgeProps) {
    const variants = {
        default: "bg-white/10 text-white/70 border-white/10",
        success: "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30",
        warning: "bg-[#F97316]/20 text-[#F97316] border-[#F97316]/30",
        error: "bg-red-500/20 text-red-400 border-red-500/30",
        info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-[8px]",
        md: "px-2.5 py-1 text-[10px]",
    };

    return (
        <span
            className={`inline-flex items-center font-bold uppercase tracking-widest rounded-sm border ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </span>
    );
}
