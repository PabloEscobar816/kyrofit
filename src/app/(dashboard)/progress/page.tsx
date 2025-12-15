"use client"

import { useState } from "react"
import { Camera, TrendingUp, Calendar, Activity, Zap, Shield, Heart } from "lucide-react"
import { KyroCard } from "@/components/kyro-ui/KyroCard"
import { cn } from "@/lib/utils"

export default function ProgressPage() {
    const [selectedMetric, setSelectedMetric] = useState("weight")

    // Mock data for charts
    const weightData = [
        { date: "Oct 1", value: 185 },
        { date: "Oct 8", value: 184 },
        { date: "Oct 15", value: 183.5 },
        { date: "Oct 22", value: 182 },
        { date: "Oct 29", value: 181.5 },
        { date: "Nov 5", value: 180 },
    ]

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground text-glow">Progress Matrix</h1>
                    <p className="text-foreground-muted">Analyze your physical evolution and metric trends.</p>
                </div>
                <button className="inline-flex items-center rounded bg-primary px-4 py-2 text-sm font-bold text-white shadow-md hover:shadow-lg hover:bg-primary/90 uppercase tracking-wider">
                    <TrendingUp className="h-4 w-4 mr-2" /> Log Data
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Skill Tree Visualization */}
                    <KyroCard>
                        <h2 className="text-lg font-display font-bold text-foreground mb-6 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-kyro-gold" /> Performance Stats
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <StatNode label="Strength" value={78} icon={Zap} color="text-red-500" />
                            <StatNode label="Endurance" value={52} icon={Heart} color="text-green-500" />
                            <StatNode label="Mobility" value={35} icon={Activity} color="text-blue-500" />
                            <StatNode label="Recovery" value={64} icon={Shield} color="text-yellow-500" />
                        </div>
                    </KyroCard>

                    <KyroCard>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-display font-bold text-foreground">Body Metrics</h2>
                            <select
                                value={selectedMetric}
                                onChange={(e) => setSelectedMetric(e.target.value)}
                                className="rounded bg-slate-50 border-slate-200 text-foreground text-sm focus:ring-primary focus:border-primary"
                            >
                                <option value="weight">Body Weight</option>
                                <option value="bodyFat">Body Fat %</option>
                                <option value="waist">Waist Circumference</option>
                            </select>
                        </div>

                        {/* Simple CSS Chart for Demo */}
                        <div className="h-64 flex items-end justify-between space-x-2 px-4 border-b border-slate-200 pb-4">
                            {weightData.map((point, i) => (
                                <div key={i} className="flex flex-col items-center w-full group">
                                    <div
                                        className="w-full bg-primary/20 rounded-t relative group-hover:bg-primary/40 transition-all border-t border-x border-primary/30"
                                        style={{ height: `${((point.value - 175) / 15) * 100}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border border-primary text-primary text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-sm">
                                            {point.value} lbs
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-foreground-muted mt-2 font-mono">{point.date}</span>
                                </div>
                            ))}
                        </div>
                    </KyroCard>

                    {/* Recent Measurements Table */}
                    <KyroCard className="p-0 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Data Log</h3>
                        </div>
                        <ul className="divide-y divide-slate-200">
                            {weightData.slice().reverse().map((entry, i) => (
                                <li key={i} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 text-foreground-muted mr-3" />
                                        <span className="text-sm font-medium text-foreground">{entry.date}</span>
                                    </div>
                                    <span className="text-sm font-mono text-kyro-gold">{entry.value} lbs</span>
                                </li>
                            ))}
                        </ul>
                    </KyroCard>
                </div>

                {/* Progress Photos Section */}
                <div className="lg:col-span-1 space-y-6">
                    <KyroCard>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-display font-bold text-foreground">Visual Data</h2>
                            <button className="text-xs text-primary hover:text-primary/80 font-bold uppercase tracking-wider">Add New</button>
                        </div>

                        <div className="space-y-4">
                            <div className="aspect-[3/4] bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                                <div className="text-center">
                                    <Camera className="mx-auto h-12 w-12 text-slate-400 group-hover:text-primary transition-colors" />
                                    <span className="mt-2 block text-sm font-medium text-slate-500 group-hover:text-foreground">Upload Scan</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-[3/4] bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                                    <span className="text-xs text-slate-400 uppercase">Side</span>
                                </div>
                                <div className="aspect-[3/4] bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                                    <span className="text-xs text-slate-400 uppercase">Back</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h3 className="text-xs font-bold text-foreground-muted uppercase mb-3">Evolution Comparison</h3>
                            <div className="flex items-center justify-between text-[10px] font-mono text-foreground-muted mb-2">
                                <span>OCT 1</span>
                                <span>NOV 5</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="aspect-[3/4] bg-slate-200 rounded border border-slate-300"></div>
                                <div className="aspect-[3/4] bg-slate-200 rounded border border-slate-300"></div>
                            </div>
                        </div>
                    </KyroCard>
                </div>
            </div>
        </div>
    )
}

function StatNode({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) {
    return (
        <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className={cn("p-2 rounded-full bg-white mb-2 shadow-sm", color)}>
                <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold text-foreground-muted uppercase mb-1">{label}</span>
            <span className="text-xl font-display font-bold text-foreground">{value}%</span>
            <div className="w-full h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                <div className={cn("h-full", color.replace("text-", "bg-"))} style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}
