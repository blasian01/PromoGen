import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className = "", hover = false, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`bg-white/[0.03] rounded-lg border border-white/[0.07] backdrop-blur-sm ${hover ? "hover:bg-white/[0.06] hover:border-white/[0.12] cursor-pointer transition-all duration-300" : ""} ${className}`}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`p-4 border-b border-white/5 ${className}`}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <h3 className={`text-lg font-bold text-white ${className}`}>
            {children}
        </h3>
    );
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <p className={`text-sm text-white/50 mt-1 ${className}`}>
            {children}
        </p>
    );
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`p-4 border-t border-white/5 bg-white/[0.01] ${className}`}>
            {children}
        </div>
    );
}
