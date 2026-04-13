"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

const ThemeContext = createContext();

export const themes = {
    apollo: {
        id: "apollo",
        primary: "#ae8625",
        secondary: "#f7ef8a",
        accent: "#d2ac47",
        glow: "rgba(174, 134, 37, 0.3)",
        textGradient: "linear-gradient(to right, #ae8625, #f7ef8a, #d2ac47, #edc967)",
        background: `
      radial-gradient(circle at 20% 0%, rgba(174, 134, 37, 0.15), transparent 50%),
      radial-gradient(circle at 80% 100%, rgba(210, 172, 71, 0.08), transparent 50%),
      linear-gradient(145deg, #0a0b0b, #050606)
    `,
        card: "linear-gradient(145deg, rgba(25, 25, 20, 0.9), rgba(14, 14, 10, 0.9))",
        cardHover: "linear-gradient(145deg, rgba(35, 35, 25, 0.95), rgba(20, 20, 15, 0.98))",
        border: "rgba(174, 134, 37, 0.2)",
        borderHover: "rgba(174, 134, 37, 0.5)",
        surface: "rgba(20, 25, 25, 0.4)",
        chartColor: "#edc967",
        chartColorAlt: "#ae8625",
        chartFill: "rgba(174, 134, 37, 0.1)",
        gridColor: "rgba(255, 255, 255, 0.05)",
        positive: "#10b981",
        negative: "#ef4444",
        successColor: "#d2ac47",
        mutedText: "rgba(255, 255, 255, 0.4)"
    },
    orion: {
        id: "orion",
        primary: "#8b5cf6",
        secondary: "#d8b4fe",
        accent: "#a855f7",
        glow: "rgba(139, 92, 246, 0.3)",
        textGradient: "linear-gradient(to right, #8b5cf6, #d8b4fe, #a855f7)",
        background: `
      radial-gradient(circle at 20% 0%, rgba(139, 92, 246, 0.15), transparent 50%),
      radial-gradient(circle at 80% 100%, rgba(168, 85, 247, 0.08), transparent 50%),
      linear-gradient(145deg, #0a0b0b, #050606)
    `,
        card: "linear-gradient(145deg, rgba(22, 20, 28, 0.9), rgba(12, 10, 16, 0.9))",
        cardHover: "linear-gradient(145deg, rgba(30, 25, 40, 0.95), rgba(18, 14, 25, 0.98))",
        border: "rgba(139, 92, 246, 0.2)",
        borderHover: "rgba(139, 92, 246, 0.5)",
        surface: "rgba(20, 25, 25, 0.4)",
        chartColor: "#a855f7",
        chartColorAlt: "#8b5cf6",
        chartFill: "rgba(139, 92, 246, 0.1)",
        gridColor: "rgba(255, 255, 255, 0.05)",
        positive: "#10b981",
        negative: "#ef4444",
        successColor: "#a855f7",
        mutedText: "rgba(255, 255, 255, 0.4)"
    },
    nikolai: {
        id: "nikolai",
        primary: "#3b82f6",
        secondary: "#93c5fd",
        accent: "#60a5fa",
        glow: "rgba(59, 130, 246, 0.3)",
        textGradient: "linear-gradient(to right, #3b82f6, #93c5fd, #60a5fa)",
        background: `
      radial-gradient(circle at 20% 0%, rgba(59, 130, 246, 0.15), transparent 50%),
      radial-gradient(circle at 80% 100%, rgba(96, 165, 250, 0.08), transparent 50%),
      linear-gradient(145deg, #0a0b0b, #050606)
    `,
        card: "linear-gradient(145deg, rgba(20, 25, 30, 0.9), rgba(10, 14, 16, 0.9))",
        cardHover: "linear-gradient(145deg, rgba(25, 35, 45, 0.95), rgba(15, 20, 30, 0.98))",
        border: "rgba(59, 130, 246, 0.2)",
        borderHover: "rgba(59, 130, 246, 0.5)",
        surface: "rgba(20, 25, 25, 0.4)",
        chartColor: "#60a5fa",
        chartColorAlt: "#3b82f6",
        chartFill: "rgba(59, 130, 246, 0.1)",
        gridColor: "rgba(255, 255, 255, 0.05)",
        positive: "#10b981",
        negative: "#ef4444",
        successColor: "#60a5fa",
        mutedText: "rgba(255, 255, 255, 0.4)"
    }
};

export const ThemeProvider = ({ children, initialStrategy = "orion" }) => {
    const [strategy, setStrategy] = useState(initialStrategy);

    const theme = useMemo(() => themes[strategy] || themes.orion, [strategy]);

    const value = {
        strategy,
        setStrategy,
        theme
    };

    return (
        <ThemeContext.Provider value={value}>
            <div
                style={{
                    background: theme.background,
                    minHeight: "100vh",
                    transition: "background 0.5s ease-in-out"
                }}
                className="text-white selection:bg-white/10"
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
