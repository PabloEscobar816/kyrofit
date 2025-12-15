"use client"

import { useState } from "react"
import { ChevronLeft, Save, Clock, Info, Activity } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { KyroCard } from "@/components/kyro-ui/KyroCard"
import { cn } from "@/lib/utils"

// Mock data structure for a workout
const initialWorkout = {
    id: "1",
    name: "Upper Body Power",
    exercises: [
        {
            id: "e1",
            name: "Bench Press",
            sets: 3,
            reps: "8-10",
            rpe: 8,
            rest: 120,
            logs: [{ weight: 0, reps: 0, rpe: 0 }, { weight: 0, reps: 0, rpe: 0 }, { weight: 0, reps: 0, rpe: 0 }]
        },
        {
            id: "e2",
            name: "Pull Ups",
            sets: 3,
            reps: "AMRAP",
            rpe: 9,
            rest: 90,
            logs: [{ weight: 0, reps: 0, rpe: 0 }, { weight: 0, reps: 0, rpe: 0 }, { weight: 0, reps: 0, rpe: 0 }]
        }
    ]
}

export default function WorkoutPlayerPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [workout, setWorkout] = useState(initialWorkout)
    const [isSaving, setIsSaving] = useState(false)

    const handleLogChange = (exerciseIndex: number, setIndex: number, field: string, value: number) => {
        const newWorkout = { ...workout }
        // @ts-ignore
        newWorkout.exercises[exerciseIndex].logs[setIndex][field] = value
        setWorkout(newWorkout)
    }

    const finishWorkout = async () => {
        setIsSaving(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
        router.push("/dashboard")
    }

    return (
        <div className="max-w-3xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Link href="/workouts" className="flex items-center text-foreground-muted hover:text-foreground transition-colors">
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Abort
                </Link>
                <h1 className="text-xl font-display font-bold text-foreground text-glow flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    {workout.name}
                </h1>
                <button
                    onClick={finishWorkout}
                    disabled={isSaving}
                    className="flex items-center bg-kyro-success text-white px-4 py-2 rounded text-sm font-bold hover:bg-kyro-success/90 disabled:opacity-50 shadow-md uppercase tracking-wider transition-all"
                >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Syncing..." : "Complete"}
                </button>
            </div>

            {/* Exercises */}
            <div className="space-y-6">
                {workout.exercises.map((exercise, exIndex) => (
                    <KyroCard key={exercise.id} className="p-0 overflow-hidden">
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">{exercise.name}</h3>
                                <p className="text-xs text-foreground-muted flex items-center mt-1 font-mono">
                                    <Clock className="h-3 w-3 mr-1" /> Rest: {exercise.rest}s
                                    <span className="mx-2 text-slate-300">|</span>
                                    Target: {exercise.sets} x {exercise.reps}
                                </p>
                            </div>
                            <button className="text-foreground-muted hover:text-primary transition-colors">
                                <Info className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-4">
                            <div className="grid grid-cols-10 gap-2 mb-2 text-[10px] font-bold text-foreground-muted text-center uppercase tracking-wider">
                                <div className="col-span-1">Set</div>
                                <div className="col-span-3">Load (lbs)</div>
                                <div className="col-span-3">Reps</div>
                                <div className="col-span-3">RPE</div>
                            </div>

                            {exercise.logs.map((set, setIndex) => (
                                <div key={setIndex} className="grid grid-cols-10 gap-2 mb-3 items-center">
                                    <div className="col-span-1 flex justify-center">
                                        <span className="flex items-center justify-center h-6 w-6 rounded bg-slate-100 border border-slate-200 text-xs font-bold text-foreground-muted">
                                            {setIndex + 1}
                                        </span>
                                    </div>
                                    <div className="col-span-3">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="block w-full rounded bg-white border-slate-200 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-center placeholder:text-slate-300"
                                            onChange={(e) => handleLogChange(exIndex, setIndex, 'weight', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="block w-full rounded bg-white border-slate-200 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-center placeholder:text-slate-300"
                                            onChange={(e) => handleLogChange(exIndex, setIndex, 'reps', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-span-3">
                                        <input
                                            type="number"
                                            placeholder="-"
                                            max="10"
                                            className="block w-full rounded bg-white border-slate-200 text-foreground shadow-sm focus:border-primary focus:ring-primary sm:text-sm text-center placeholder:text-slate-300"
                                            onChange={(e) => handleLogChange(exIndex, setIndex, 'rpe', parseFloat(e.target.value))}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </KyroCard>
                ))}
            </div>
        </div>
    )
}
