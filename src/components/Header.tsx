"use client";

import {
    MousePointer2,
    Minus,
    Square,
    Circle,
    Hexagon,
    Eraser,
    Type,
    Download,
    Moon,
    Sun,
    Ruler,
    Compass,
    Undo,
    Redo
} from "lucide-react";
import { useCadStore, CadTool } from "@/store/useCadStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const ToolButton = ({
    tool,
    active,
    onClick,
    icon: Icon,
    label
}: {
    tool: CadTool,
    active: boolean,
    onClick: () => void,
    icon: any,
    label: string
}) => (
    <button
        onClick={onClick}
        title={label}
        className={cn(
            "p-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2",
            active
                ? "bg-accent-dark text-black shadow-lg scale-105 font-bold"
                : "hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300"
        )}
    >
        <Icon size={20} />
    </button>
);

export default function Header() {
    const { tool, setTool, mode, toggleMode } = useCadStore();

    const tools: { id: CadTool; icon: any; label: string }[] = [
        { id: 'select', icon: MousePointer2, label: 'Select (V)' },
        { id: 'line', icon: Minus, label: 'Line (L)' },
        { id: 'rect', icon: Square, label: 'Rectangle (R)' },
        { id: 'circle', icon: Circle, label: 'Circle (C)' },
        { id: 'poly', icon: Hexagon, label: 'Polygon (P)' },
        { id: 'text', icon: Type, label: 'Text (T)' },
        { id: 'eraser', icon: Eraser, label: 'Eraser (E)' },
        // { id: 'measure', icon: Ruler, label: 'Measure (M)' },
        // { id: 'angle', icon: Compass, label: 'Angle (A)' },
    ];

    const handleExport = () => {
        const { projectTree } = useCadStore.getState();

        if (projectTree.length === 0) {
            alert("Please draw something before exporting!");
            return;
        }

        const canvas = document.getElementById('cad-canvas') as HTMLCanvasElement;
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'ultracad-export.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <header className="h-16 border-b border-gray-200 dark:border-white/10 glass flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent-dark rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-xl">U</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-display">
                        UltraCAD
                    </h1>
                </div>
                <div className="h-6 w-px bg-gray-300 dark:bg-white/10 mx-2" />
                <nav className="flex items-center gap-1.5">
                    {tools.map((t) => (
                        <ToolButton
                            key={t.id}
                            tool={t.id}
                            label={t.label}
                            icon={t.icon}
                            active={tool === t.id}
                            onClick={() => setTool(t.id)}
                        />
                    ))}
                </nav>
                <div className="h-6 w-px bg-gray-300 dark:bg-white/10 mx-2" />
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={useCadStore.getState().undo}
                        disabled={useCadStore(s => s.undoStack.length <= 1)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={20} />
                    </button>
                    <button
                        onClick={useCadStore.getState().redo}
                        disabled={useCadStore(s => s.redoStack.length === 0)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo size={20} />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-accent-dark hover:bg-accent-light text-black rounded-lg transition-colors text-sm font-bold shadow-sm"
                >
                    <Download size={18} />
                    Export PNG
                </button>
                <button
                    onClick={toggleMode}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                    {mode === 'dark' ? <Sun size={20} className="text-accent-dark" /> : <Moon size={20} className="text-gray-600" />}
                </button>
            </div>
        </header>
    );
}
