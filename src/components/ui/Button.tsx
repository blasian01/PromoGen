import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest";

        const variants = {
            primary: "bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg shadow-[#F97316]/20 hover:shadow-[#F97316]/30",
            secondary: "bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-[#10B981]/20",
            outline: "border border-white/10 text-white hover:bg-white/5 hover:border-white/20",
            ghost: "text-white/70 hover:text-white hover:bg-white/5",
            destructive: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30",
        };

        const sizes = {
            sm: "h-8 px-4 text-[10px] rounded-sm",
            md: "h-10 px-5 text-[11px] rounded-sm",
            lg: "h-12 px-8 text-xs rounded-sm",
            icon: "h-10 w-10 rounded-sm",
        };

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
