"use client";

import {
    Settings2,
    RotateCw,
    Maximize2,
    Trash2,
    Magnet,
    Hash,
    Scale
} from "lucide-react";
import { useCadStore } from "@/store/useCadStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function SidebarRight() {
    const {
        selection,
        smartSnapping,
        setSmartSnapping,
        radioAngle,
        setRadioAngle,
        measuringScale,
        setMeasuringScale,
        purge,
        mode
    } = useCadStore();

    const [propValues, setPropValues] = useState({
        width: "0",
        height: "0",
        rotation: "0",
        text: ""
    });

    const inputClass = clsx(
        "border focus:border-accent-dark/50 rounded p-2 text-sm outline-none w-full transition-colors",
        mode === 'dark'
            ? "bg-white/5 border-transparent text-white"
            : "bg-white border-gray-300 !text-black placeholder:text-gray-400"
    );

    // Listen for selection updates from Editor
    useEffect(() => {
        const handleSelectionUpdate = (e: any) => {
            const { width, height, rotation, content } = e.detail;
            setPropValues({
                width: width ? Math.round(width).toString() : "0",
                height: height ? Math.round(height).toString() : "0",
                rotation: rotation ? Math.round(rotation).toString() : "0",
                text: content || ""
            });
        };
        window.addEventListener('cad-selection-update', handleSelectionUpdate);
        return () => window.removeEventListener('cad-selection-update', handleSelectionUpdate);
    }, []);

    const handleAction = (type: string) => {
        // Include prop values for apply action
        const detail: any = { type };
        if (type === 'apply-props') {
            detail.props = {
                width: parseFloat(propValues.width),
                height: parseFloat(propValues.height),
                rotation: parseFloat(propValues.rotation),
                content: propValues.text
            };
        }
        window.dispatchEvent(new CustomEvent('cad-action', { detail }));
    };

    return (
        <aside className="w-72 border-l border-gray-200 dark:border-white/10 glass flex flex-col h-full z-40">
            {/* Properties Inspector */}
            <div className="p-4 flex flex-col gap-4 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                    <Settings2 size={18} className="text-accent-light dark:text-accent-dark" />
                    <h2 className={cn(
                        "text-sm font-bold uppercase tracking-wider",
                        mode === 'dark' ? "text-white" : "text-gray-900"
                    )}>Properties</h2>
                </div>

                {selection.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className={cn(
                                    "text-[10px] uppercase font-bold",
                                    mode === 'dark' ? "text-gray-400" : "text-gray-600"
                                )}>Width (mm)</label>
                                <input
                                    type="text"
                                    value={propValues.width}
                                    onChange={(e) => setPropValues({ ...propValues, width: e.target.value })}
                                    className={inputClass}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className={cn(
                                    "text-[10px] uppercase font-bold",
                                    mode === 'dark' ? "text-gray-400" : "text-gray-600"
                                )}>Height (mm)</label>
                                <input
                                    type="text"
                                    value={propValues.height}
                                    onChange={(e) => setPropValues({ ...propValues, height: e.target.value })}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={cn(
                                "text-[10px] uppercase font-bold",
                                mode === 'dark' ? "text-gray-400" : "text-gray-600"
                            )}>Rotation (°)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={propValues.rotation}
                                    onChange={(e) => setPropValues({ ...propValues, rotation: e.target.value })}
                                    className={`w-full ${inputClass}`}
                                />
                                <RotateCw size={14} className="absolute right-2 top-2.5 opacity-30" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className={cn(
                                "text-[10px] uppercase font-bold",
                                mode === 'dark' ? "text-gray-400" : "text-gray-600"
                            )}>Text Content</label>
                            <input
                                type="text"
                                placeholder="Enter text..."
                                value={propValues.text}
                                onChange={(e) => setPropValues({ ...propValues, text: e.target.value })}
                                className={inputClass}
                            />
                        </div>

                        <button
                            onClick={() => handleAction('apply-props')}
                            className="w-full py-2 bg-accent-dark text-black text-sm font-bold rounded hover:shadow-lg transition-all"
                        >
                            Apply Changes
                        </button>
                    </div>
                ) : (
                    <div className={cn(
                        "py-8 text-center text-xs italic opacity-70",
                        mode === 'dark' ? "text-gray-300" : "text-gray-500"
                    )}>
                        Select an object to inspect properties
                    </div>
                )}
            </div>

            {/* Global Actions */}
            <div className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Hash size={18} className="text-accent-light dark:text-accent-dark" />
                    <h2 className={cn(
                        "text-sm font-bold uppercase tracking-wider",
                        mode === 'dark' ? "text-white" : "text-gray-900"
                    )}>Global Settings</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => setSmartSnapping(!smartSnapping)}>
                        <div className="flex items-center gap-2">
                            <Magnet size={16} className={smartSnapping ? "text-accent-light dark:text-accent-dark" : "text-gray-500"} />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Smart Snapping</span>
                        </div>
                        <div className={cn(
                            "w-8 h-4 rounded-full transition-colors relative",
                            smartSnapping ? "bg-accent-dark" : "bg-gray-600"
                        )}>
                            <div className={cn(
                                "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                                smartSnapping ? "left-4.5" : "left-0.5"
                            )} />
                        </div>
                    </div>

                    {/* <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs text-gray-400 font-bold">RADIO ANGLE (°)</label>
                            <span className="text-xs font-mono">{radioAngle}°</span>
                        </div>
                        <input
                            type="range" min="0" max="360" step="15"
                            value={radioAngle}
                            onChange={(e) => setRadioAngle(parseInt(e.target.value))}
                            className="w-full accent-accent-dark h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div> */}

                    {/* <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Scale size={16} className="text-gray-500" />
                                <label className="text-xs text-gray-400 font-bold">MEASURING SCALE</label>
                            </div>
                            <span className="text-xs font-mono">1:{measuringScale}</span>
                        </div>
                        <select
                            value={measuringScale}
                            onChange={(e) => setMeasuringScale(parseFloat(e.target.value))}
                            className="bg-accent-dark hover:bg-accent-light text-black border border-transparent rounded p-1.5 text-xs outline-none font-medium cursor-pointer"
                        >
                            <option value="1">1:1 (Default)</option>
                            <option value="2">1:2</option>
                            <option value="5">1:5</option>
                            <option value="10">1:10</option>
                            <option value="50">1:50</option>
                        </select>
                    </div> */}
                </div>

                <div className="h-px bg-gray-200 dark:bg-white/10 my-2" />

                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => handleAction('rotate-90')}
                        className="flex items-center justify-center gap-2 p-2 bg-accent-dark hover:bg-accent-light text-black rounded text-xs font-bold transition-colors shadow-sm"
                    >
                        <RotateCw size={14} /> Rotate 90
                    </button>
                    <button
                        onClick={() => handleAction('skew')}
                        className="flex items-center justify-center gap-2 p-2 bg-accent-dark hover:bg-accent-light text-black rounded text-xs font-bold transition-colors shadow-sm"
                    >
                        <Maximize2 size={14} /> Perspective
                    </button>
                </div>

                <button
                    onClick={() => handleAction('purge')}
                    className="w-full mt-2 flex items-center justify-center gap-2 p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded text-xs font-bold transition-all border border-red-500/20"
                >
                    <Trash2 size={14} /> PURGE SELECTED
                </button>
            </div>
        </aside>
    );
}
