"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useCadStore } from "@/store/useCadStore";
import Header from "@/components/Header";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";

import MobileView from "@/components/MobileView";

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
        return <MobileView />;
    }

    return (
        <main className={`flex flex-col h-screen w-screen overflow-hidden ${mode}`}>
            <Header />
            <div className="flex flex-1 overflow-hidden relative">
                <SidebarLeft />
                <div className="flex-1 relative bg-white overflow-hidden">
                    <Editor />
                </div>
                <SidebarRight />
            </div>
        </main>
    );
}
