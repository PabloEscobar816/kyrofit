"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { KyroCard } from "@/components/kyro-ui/KyroCard"
import { ClipboardCheck, Activity, Zap, Moon } from "lucide-react"

const checkInSchema = z.object({
    energy: z.number().min(1).max(10),
    stress: z.number().min(1).max(10),
    sleepHours: z.number().min(0).max(24),
    workoutsCompleted: z.number().min(0),
    nutritionConsistency: z.enum(["high", "medium", "low"]),
    winsText: z.string().min(1, "Please share a win!"),
    strugglesText: z.string().optional(),
    focusNextWeekText: z.string().min(1, "Set a focus for next week"),
})

type CheckInValues = z.infer<typeof checkInSchema>

export default function CheckInPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<CheckInValues>({
        resolver: zodResolver(checkInSchema),
        defaultValues: {
            energy: 7,
            stress: 5,
            sleepHours: 7,
            workoutsCompleted: 3,
            nutritionConsistency: "medium",
            winsText: "",
            strugglesText: "",
            focusNextWeekText: "",
        }
    })

    async function onSubmit(data: CheckInValues) {
        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(data)
        setIsSubmitting(false)
        router.push("/dashboard")
    }

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground text-glow">Weekly Checkpoint</h1>
                <p className="text-foreground-muted">Analyze weekly performance and recalibrate protocol.</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* Metrics Section */}
                <KyroCard className="space-y-6">
                    <h3 className="text-lg font-bold text-foreground border-b border-slate-200 pb-2 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" /> System Status
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-bold text-foreground-muted uppercase tracking-wider mb-2">Energy Level (1-10)</label>
                            <input
                                type="range" min="1" max="10"
                                {...form.register("energy", { valueAsNumber: true })}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-foreground-muted mt-1 font-mono">
                                <span>LOW</span>
                                <span>HIGH</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground-muted uppercase tracking-wider mb-2">Stress Level (1-10)</label>
                            <input
                                type="range" min="1" max="10"
                                {...form.register("stress", { valueAsNumber: true })}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                            <div className="flex justify-between text-xs text-foreground-muted mt-1 font-mono">
                                <span>LOW</span>
                                <span>HIGH</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground-muted uppercase tracking-wider mb-2">Avg Sleep (Hours)</label>
                            <div className="relative">
                                <Moon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="number" step="0.5"
                                    {...form.register("sleepHours", { valueAsNumber: true })}
                                    className="block w-full rounded bg-white border-slate-200 text-foreground pl-10 focus:border-primary focus:ring-primary sm:text-sm py-2"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-foreground-muted uppercase tracking-wider mb-2">Sessions Completed</label>
                            <div className="relative">
                                <Zap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="number"
                                    {...form.register("workoutsCompleted", { valueAsNumber: true })}
                                    className="block w-full rounded bg-white border-slate-200 text-foreground pl-10 focus:border-primary focus:ring-primary sm:text-sm py-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground-muted uppercase tracking-wider mb-2">Fuel Consistency</label>
                        <select
                            {...form.register("nutritionConsistency")}
                            className="block w-full rounded bg-white border-slate-200 text-foreground focus:border-primary focus:ring-primary sm:text-sm py-2 px-3"
                        >
                            <option value="high">High (On track 90%+)</option>
                            <option value="medium">Medium (On track 60-80%)</option>
                            <option value="low">Low (Struggled this week)</option>
                        </select>
                    </div>
                </KyroCard>

                {/* Reflection Section */}
                <KyroCard className="space-y-6">
                    <h3 className="text-lg font-bold text-foreground border-b border-slate-200 pb-2 flex items-center gap-2">
                        <ClipboardCheck className="h-5 w-5 text-kyro-gold" /> Protocol Analysis
                    </h3>

                    <div>
                        <label className="block text-sm font-bold text-foreground-muted uppercase tracking-wider mb-2">Wins for the week</label>
                        <textarea
                            rows={3}
                            {...form.register("winsText")}
                            className="block w-full rounded bg-white border-slate-200 text-foreground focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 placeholder:text-slate-400"
                            placeholder="What went well? Hit a PR? Stuck to diet?"
                        />
                        {form.formState.errors.winsText && <p className="text-red-500 text-xs mt-1">{form.formState.errors.winsText.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground-muted uppercase tracking-wider mb-2">Struggles / Obstacles</label>
                        <textarea
                            rows={3}
                            {...form.register("strugglesText")}
                            className="block w-full rounded bg-white border-slate-200 text-foreground focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 placeholder:text-slate-400"
                            placeholder="What was difficult? How can we improve?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-foreground-muted uppercase tracking-wider mb-2">Focus for next week</label>
                        <textarea
                            rows={2}
                            {...form.register("focusNextWeekText")}
                            className="block w-full rounded bg-white border-slate-200 text-foreground focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 placeholder:text-slate-400"
                            placeholder="One main goal to focus on..."
                        />
                        {form.formState.errors.focusNextWeekText && <p className="text-red-500 text-xs mt-1">{form.formState.errors.focusNextWeekText.message}</p>}
                    </div>
                </KyroCard>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded shadow-md text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 uppercase tracking-widest transition-all hover:shadow-lg"
                    >
                        {isSubmitting ? "Processing..." : "Submit Checkpoint"}
                    </button>
                </div>
            </form>
        </div>
    )
}
