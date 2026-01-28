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

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

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
