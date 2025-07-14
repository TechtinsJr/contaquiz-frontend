
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.scss";
import { ScreenSizeProvider } from "@/context/ScreenSizeContext";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ContaQuiz",
    description: "Plataforma ContaQuiz",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={`${roboto.className}`}>
                <ScreenSizeProvider>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        gutter={8}
                        toastOptions={{
                            removeDelay: 500,
                        }}
                    />
                    {children}
                </ScreenSizeProvider>
            </body>
        </html>
    );
}
