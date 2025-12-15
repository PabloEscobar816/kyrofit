"use client"

import { useState } from "react"
import { Plus, Camera, Zap, Flame, Droplet, Activity } from "lucide-react"
import { KyroCard } from "@/components/kyro-ui/KyroCard"
import { cn } from "@/lib/utils"

export default function NutritionPage() {
    const [meals, setMeals] = useState([
        { id: 1, name: "Oatmeal & Berries", calories: 350, protein: 12, carbs: 60, fats: 6, time: "08:00 AM" },
        { id: 2, name: "Chicken Salad", calories: 450, protein: 40, carbs: 15, fats: 20, time: "12:30 PM" },
    ])

    const targets = {
        calories: 2200,
        protein: 180,
        carbs: 220,
        fats: 70
    }

    const current = meals.reduce((acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 })

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground text-glow">Kyro Fuel</h1>
                    <p className="text-foreground-muted">Monitor intake to optimize performance output.</p>
                </div>
                <button className="inline-flex items-center rounded bg-primary px-4 py-2 text-sm font-bold text-white shadow-md hover:shadow-lg hover:bg-primary/90 uppercase tracking-wider">
                    <Plus className="h-4 w-4 mr-2" /> Log Fuel
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <SummaryCard label="Calories" current={current.calories} target={targets.calories} unit="kcal" icon={Flame} color="text-orange-500" />
                <SummaryCard label="Protein" current={current.protein} target={targets.protein} unit="g" icon={Activity} color="text-red-500" />
                <SummaryCard label="Carbs" current={current.carbs} target={targets.carbs} unit="g" icon={Zap} color="text-blue-500" />
                <SummaryCard label="Fats" current={current.fats} target={targets.fats} unit="g" icon={Droplet} color="text-yellow-500" />
            </div>

            {/* Meal Log */}
            <KyroCard className="p-0 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Daily Intake Log</h3>
                </div>
                <ul role="list" className="divide-y divide-slate-200">
                    {meals.map((meal) => (
                        <li key={meal.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                        <Camera className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-bold text-foreground">{meal.name}</p>
                                        <p className="text-xs text-foreground-muted">{meal.time}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-4 text-sm font-mono text-foreground-muted">
                                    <span className="text-foreground font-bold">{meal.calories} kcal</span>
                                    <span className="hidden sm:inline"><span className="text-red-400">P:</span> {meal.protein}g</span>
                                    <span className="hidden sm:inline"><span className="text-blue-400">C:</span> {meal.carbs}g</span>
                                    <span className="hidden sm:inline"><span className="text-yellow-400">F:</span> {meal.fats}g</span>
                                </div>
                            </div>
                        </li>
                    ))}
                    {meals.length === 0 && (
                        <li className="px-6 py-12 text-center text-foreground-muted">
                            No fuel logged yet today. Initiate intake sequence.
                        </li>
                    )}
                </ul>
            </KyroCard>
        </div>
    )
}

function SummaryCard({ label, current, target, unit, icon: Icon, color }: { label: string, current: number, target: number, unit: string, icon: any, color: string }) {
    const percentage = Math.min(100, Math.round((current / target) * 100))

    return (
        <KyroCard className="p-4 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-2">
                <dt className="truncate text-xs font-bold text-foreground-muted uppercase tracking-wider">{label}</dt>
                <Icon className={cn("h-4 w-4", color)} />
            </div>
            <dd className="mt-1 text-xl font-display font-bold text-foreground">
                {current} <span className="text-xs text-foreground-muted font-sans font-normal">/ {target} {unit}</span>
            </dd>
            <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-500", color.replace("text-", "bg-"))}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </KyroCard>
    )
}
