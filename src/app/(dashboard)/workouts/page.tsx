import { auth } from "@/auth"
import Link from "next/link"
import { Calendar, ChevronRight, Clock, Activity, Lock } from "lucide-react"
import { KyroCard } from "@/components/kyro-ui/KyroCard"
import { cn } from "@/lib/utils"

export default async function WorkoutsPage() {
    const session = await auth()

    // Mock data
    const sessions = [
        { id: "1", name: "Upper Body Power", date: "Today", status: "READY", duration: "45 min", intensity: "HIGH", xp: 120 },
        { id: "2", name: "Lower Body Strength", date: "Tomorrow", status: "LOCKED", duration: "60 min", intensity: "HIGH", xp: 150 },
        { id: "3", name: "Active Recovery", date: "Wed, Nov 22", status: "LOCKED", duration: "30 min", intensity: "LOW", xp: 50 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground text-glow">Training Protocol</h1>
                    <p className="text-foreground-muted">Select a session to initiate sequence.</p>
                </div>
            </div>

            <div className="space-y-4">
                {sessions.map((session) => (
                    <Link key={session.id} href={`/workouts/${session.id}`} className="block group">
                        <KyroCard className={cn(
                            "transition-all duration-300",
                            session.status === 'READY' ? "border-primary/50 hover:border-primary" : "opacity-75 grayscale hover:grayscale-0"
                        )}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "h-12 w-12 rounded-lg flex items-center justify-center border",
                                        session.status === 'READY'
                                            ? "bg-primary/10 border-primary text-primary"
                                            : "bg-slate-100 border-slate-200 text-slate-400"
                                    )}>
                                        {session.status === 'LOCKED' ? <Lock className="h-6 w-6" /> : <Activity className="h-6 w-6" />}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                                {session.name}
                                            </h3>
                                            <span className={cn(
                                                "text-[10px] px-1.5 py-0.5 rounded border font-mono uppercase",
                                                session.intensity === 'HIGH' ? "border-red-500 text-red-500" :
                                                    session.intensity === 'MODERATE' ? "border-blue-500 text-blue-500" :
                                                        "border-green-500 text-green-500"
                                            )}>
                                                {session.intensity}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-foreground-muted mt-1">
                                            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {session.duration}</span>
                                            <span className="flex items-center gap-1 text-kyro-success"><span className="text-xs">XP</span> +{session.xp}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm text-foreground font-bold">
                                            {session.date}
                                        </p>
                                        <p className={cn(
                                            "text-xs font-mono uppercase tracking-wider",
                                            session.status === 'READY' ? "text-kyro-success" : "text-foreground-muted"
                                        )}>
                                            {session.status}
                                        </p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-foreground-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </KyroCard>
                    </Link>
                ))}
            </div>
        </div>
    )
}
