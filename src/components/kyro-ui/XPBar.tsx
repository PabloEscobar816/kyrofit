import React from "react"
import { cn } from "@/lib/utils"

interface XPBarProps {
    current: number
    max: number
    className?: string
    showLabel?: boolean
}

export function XPBar({ current, max, className, showLabel = true }: XPBarProps) {
    const percentage = Math.min(100, Math.max(0, (current / max) * 100))

    return (
        <div className={cn("w-full", className)}>
            {showLabel && (
                <div className="flex justify-between text-xs font-bold mb-1 text-foreground-muted uppercase tracking-widest">
                    <span>XP</span>
                    <span>{current} / {max}</span>
                </div>
            )}
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/10">
                <div
                    className="h-full bg-kyro-success shadow-[0_0_10px_var(--success)] transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}
