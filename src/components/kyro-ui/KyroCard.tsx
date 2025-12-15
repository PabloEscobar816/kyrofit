import React from "react"
import { cn } from "@/lib/utils"

interface KyroCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

export function KyroCard({ children, className, ...props }: KyroCardProps) {
    return (
        <div
            className={cn(
                "kyro-card rounded-xl p-6 relative overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
