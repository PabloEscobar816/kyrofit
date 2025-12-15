import Link from "next/link"
import {
    Activity,
    Zap,
    Trophy,
    ArrowRight,
    Flame,
    ShoppingBag,
    ClipboardCheck
} from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { KyroCard } from "@/components/kyro-ui/KyroCard"
import { XPBar } from "@/components/kyro-ui/XPBar"
import { RankBadge } from "@/components/kyro-ui/RankBadge"

export default async function DashboardPage() {
    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { profile: true }
    })

    if (!user?.profile) {
        redirect("/onboarding")
    }

    // Mock Data for KyroFit Theme
    const userLevel = 7
    const currentXP = 320
    const nextLevelXP = 500
    const userRank = "A" // S, A, B, C
    const phase = "Builder Phase" // Starter, Builder, Momentum, Control, Peak
    const streak = 5
    const streakName = "Spark Streak"

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Hunter Profile Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KyroCard className="md:col-span-2 flex flex-col justify-between bg-gradient-to-r from-kyro-card to-kyro-bg border-primary/20">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-widest border border-primary/20">
                                {phase}
                            </span>
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-kyro-gold/10 text-kyro-gold uppercase tracking-widest border border-kyro-gold/20">
                                Rank {userRank}
                            </span>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
                            Welcome back, <span className="text-primary">{user.name || "User"}</span>
                        </h1>
                        <p className="text-foreground-muted text-sm">System Status: Online. Ready for protocol execution.</p>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-between text-xs font-bold text-foreground-muted mb-2 uppercase tracking-wider">
                            <span>Level {userLevel}</span>
                            <span>{currentXP} / {nextLevelXP} XP</span>
                        </div>
                        <XPBar current={currentXP} max={nextLevelXP} />
                    </div>
                </KyroCard>

                <KyroCard className="flex flex-col items-center justify-center text-center border-kyro-gold/20 bg-kyro-gold/5">
                    <div className="mb-3 p-3 rounded-full bg-kyro-gold/10 border border-kyro-gold/20">
                        <Flame className="h-8 w-8 text-kyro-gold animate-pulse" />
                    </div>
                    <div className="text-3xl font-display font-bold text-foreground mb-1">{streak} Days</div>
                    <div className="text-xs font-bold text-kyro-gold uppercase tracking-widest">{streakName}</div>
                </KyroCard>
            </div>

            {/* Today's Mission & Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Today's Session Card */}
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" /> Today's Protocol
                    </h2>

                    <KyroCard className="group border-primary/30 hover:border-primary transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Activity className="h-32 w-32 text-primary" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-1">Upper Body Power</h3>
                                    <p className="text-foreground-muted text-sm">Focus: Chest, Back, Shoulders</p>
                                </div>
                                <span className="px-3 py-1 rounded bg-kyro-success/10 text-kyro-success text-xs font-bold border border-kyro-success/20 uppercase">
                                    +150 XP
                                </span>
                            </div>

                            <div className="flex gap-4 mb-6 text-sm text-foreground-muted">
                                <span className="flex items-center gap-1"><Activity className="h-4 w-4" /> 45 Min</span>
                                <span className="flex items-center gap-1"><Zap className="h-4 w-4" /> High Intensity</span>
                            </div>

                            <Link
                                href="/workouts/today"
                                className="inline-flex items-center justify-center w-full rounded bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-md hover:shadow-lg uppercase tracking-wider"
                            >
                                Execute Session <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </KyroCard>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/nutrition" className="block">
                            <KyroCard className="h-full hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center py-8">
                                <div className="p-3 rounded bg-kyro-success/10 text-kyro-success mb-3">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-bold text-foreground uppercase tracking-wide">Log Fuel</span>
                            </KyroCard>
                        </Link>
                        <Link href="/check-in" className="block">
                            <KyroCard className="h-full hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center py-8">
                                <div className="p-3 rounded bg-primary/10 text-primary mb-3">
                                    <ClipboardCheck className="h-6 w-6" />
                                </div>
                                <span className="text-sm font-bold text-foreground uppercase tracking-wide">Checkpoint</span>
                            </KyroCard>
                        </Link>
                    </div>
                </div>

                {/* Side Panel: Fuel Packs & Stats */}
                <div className="space-y-6">
                    <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-kyro-gold" /> Recommended Fuel
                    </h2>

                    <div className="space-y-4">
                        <KyroCard className="p-4 flex gap-4 items-center hover:bg-slate-50 cursor-pointer transition-colors">
                            <div className="h-12 w-12 rounded bg-slate-100 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-foreground text-sm">Keto Shred Pack</h4>
                                <p className="text-xs text-foreground-muted">High Protein • Low Carb</p>
                            </div>
                        </KyroCard>
                        <KyroCard className="p-4 flex gap-4 items-center hover:bg-slate-50 cursor-pointer transition-colors">
                            <div className="h-12 w-12 rounded bg-slate-100 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-foreground text-sm">Muscle Builder</h4>
                                <p className="text-xs text-foreground-muted">High Calorie • Balanced</p>
                            </div>
                        </KyroCard>

                        <Link href="/meal-plans" className="block text-center text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-widest mt-2">
                            View All Fuel Packs
                        </Link>
                    </div>

                    <KyroCard className="mt-8 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy className="h-5 w-5 text-kyro-gold" />
                            <h3 className="font-bold text-foreground">Next Achievement</h3>
                        </div>
                        <p className="text-sm text-foreground mb-2">Consistency Machine</p>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-kyro-gold h-full w-[75%]" />
                        </div>
                        <p className="text-[10px] text-foreground-muted mt-1 text-right">75% Complete</p>
                    </KyroCard>
                </div>
            </div>
        </div>
    )
}
