import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        theme: {
            extend: {
                colors: {
                    background: {
                        primary: "#f9f9f9",
                        secondary: "#1c1b15",
                    },
                    brand: {
                        primary: "#4B413D",
                        secondary: "#DC9853",
                        tirth: "#A54E2B",
                        fourth: "#FFD2A4",
                        fifth: "#1a153d",
                    },
                    text: {
                        title: "#1a153d",
                        primary: "#4B413D",
                        secondary: "#FFD2A4",
                        light: "#d9e1e1",
                        dark: "#1c1b15",
                        gray: "#a2a1a880",
                    },
                },
                fontSize: {
                    xxs: "0.5rem",
                    xs: "0.75rem",
                    sm: "0.875rem",
                    md: "16px",
                    lg: "1.125rem",
                    xl: "1.25rem",
                    "2xl": "1.5rem",
                    "3xl": "1.875rem",
                    "4xl": "2.25rem",
                    "5xl": "3rem",
                },
                fontWeight: {
                    light: "300",
                    medium: "500",
                    bold: "700",
                },
            }
        }
    },
    plugins: [],
};

export default config;