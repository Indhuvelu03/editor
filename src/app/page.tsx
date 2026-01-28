"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useCadStore } from "@/store/useCadStore";
import Header from "@/components/Header";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";

// Dynamically import Editor to avoid SSR issues with Paper.js
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function Home() {
    const mode = useCadStore((state) => state.mode);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Check if mobile on mount
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        
        // Listen to resize events
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!mounted) return null;

    if (isMobile) {
        return (
            <main className="flex flex-col h-screen w-screen overflow-hidden bg-background-light dark:bg-background-dark items-center justify-center">
                <div className="text-center px-8 max-w-md">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 mb-4">
                            <svg className="w-8 h-8 text-accent-light dark:text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                        Desktop View Required
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                        This CAD application requires a desktop or laptop environment for optimal performance and functionality.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        Please access this application on a larger screen to continue.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className={`flex flex-col h-screen w-screen overflow-hidden ${mode}`}>
            <Header />
            <div className="flex flex-1 overflow-hidden relative">
                <SidebarLeft />
                <div className="flex-1 relative bg-background-light dark:bg-background-dark overflow-hidden">
                    <Editor />
                </div>
                <SidebarRight />
            </div>
        </main>
    );
}
