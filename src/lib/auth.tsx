"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session in localStorage
        const stored = localStorage.getItem("sociably_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("sociably_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Hardcoded admin/admin credentials
        if (email === "admin" && password === "admin") {
            const userData = { email: "admin@sociably.ai", name: "Admin User" };
            setUser(userData);
            localStorage.setItem("sociably_user", JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
        // Mock signup — simply creates a session
        const userData = { email, name };
        setUser(userData);
        localStorage.setItem("sociably_user", JSON.stringify(userData));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("sociably_user");
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
