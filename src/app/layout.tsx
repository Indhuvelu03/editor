import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "UltraCAD | Professional drafting Suite",
    description: "High-precision vector-based architectural drafting suite built with Next.js and Paper.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased select-none">
                {children}
            </body>
        </html>
    );
}
