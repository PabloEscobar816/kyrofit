import React from "react"
import { cn } from "@/lib/utils"

type Rank = "S" | "A" | "B" | "C" | "D" | "E"

interface RankBadgeProps {
    rank: Rank
    className?: string
    size?: "sm" | "md" | "lg"
}

const rankColors: Record<Rank, string> = {
    S: "text-kyro-gold border-kyro-gold shadow-[0_0_15px_var(--gold)] bg-kyro-gold/10",
    A: "text-purple-400 border-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)] bg-purple-400/10",
    B: "text-blue-400 border-blue-400 bg-blue-400/10",
    C: "text-kyro-success border-kyro-success bg-kyro-success/10",
    D: "text-foreground-muted border-foreground-muted bg-white/5",
    E: "text-gray-600 border-gray-600 bg-white/5",
}

export function RankBadge({ rank, className, size = "md" }: RankBadgeProps) {
    const sizeClasses = {
        sm: "w-6 h-6 text-xs border",
        md: "w-10 h-10 text-lg border-2",
        lg: "w-16 h-16 text-3xl border-4",
    }

    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-full font-display font-bold backdrop-blur-sm",
                rankColors[rank],
                sizeClasses[size],
                className
            )}
        >
            {rank}
        </div>
    )
}
