import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, error, id, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="block text-[10px] font-medium text-white/50 mb-2 uppercase tracking-[0.2em]"
                    >
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={id}
                    className={`w-full h-10 px-4 text-sm bg-white/5 border border-white/10 rounded-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F97316]/50 focus:bg-white/[0.07] transition-all duration-300 ${error ? "border-red-500/50" : ""} ${className}`}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-[10px] text-red-400">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
