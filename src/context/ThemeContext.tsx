// ThemeContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ThemeContextType {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Check if dark mode is set in localStorage on client side
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") {
                setDarkMode(true);
            } else {
                setDarkMode(false);
            }
        }
    }, []); // This effect runs only once on mount

    useEffect(() => {
        // This effect runs whenever darkMode changes
        if (typeof window !== "undefined") {
            if (darkMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useDarkMode = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a ThemeProvider");
    }
    return context;
};
