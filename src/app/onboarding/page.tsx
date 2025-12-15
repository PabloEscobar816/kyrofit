"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"

// Define schemas for each step or a big schema
const onboardingSchema = z.object({
    // Step 1: Basic Info
    sex: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    height: z.number().min(36, "Height must be valid (in)"),
    currentWeight: z.number().min(60, "Weight must be valid (lbs)"),

    // Step 2: Goals & Experience
    goal: z.enum(["fat_loss", "muscle_gain", "recomposition", "performance", "general_health"]),
    trainingExperience: z.enum(["beginner", "intermediate", "advanced"]),
    trainingLocation: z.enum(["home", "gym", "both"]),
    daysPerWeek: z.number().min(1).max(7),

    // Step 3: Equipment (simplified for now as text/multiselect later)
    equipment: z.string().optional(), // e.g., comma separated

    // Step 4: Nutrition
    dietaryStyle: z.string().optional(),
    allergies: z.string().optional(),
    mealBudgetPreference: z.enum(["low", "medium", "high"]).optional(),
})

type OnboardingValues = z.infer<typeof onboardingSchema>

const steps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Goals & Training" },
    { id: 3, title: "Nutrition Preferences" },
]

export default function OnboardingPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<OnboardingValues>({
        resolver: zodResolver(onboardingSchema),
        mode: "onChange",
        defaultValues: {
            sex: "male",
            goal: "fat_loss",
            trainingExperience: "beginner",
            trainingLocation: "gym",
            daysPerWeek: 3,
            mealBudgetPreference: "medium",
        }
    })

    const nextStep = async () => {
        // Trigger validation for current step fields before moving
        let fieldsToValidate: (keyof OnboardingValues)[] = []
        if (currentStep === 1) fieldsToValidate = ["sex", "dateOfBirth", "height", "currentWeight"]
        if (currentStep === 2) fieldsToValidate = ["goal", "trainingExperience", "trainingLocation", "daysPerWeek"]

        const isValid = await form.trigger(fieldsToValidate)
        if (isValid) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1)
    }

    async function onSubmit(data: OnboardingValues) {
        setIsLoading(true)
        try {
            const response = await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!response.ok) throw new Error("Failed to save profile")

            router.push("/dashboard")
            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome to KyroFit</h1>
                    <p className="text-gray-600">Let's personalize your experience.</p>

                    {/* Progress Bar */}
                    <div className="mt-4 flex items-center justify-between">
                        {steps.map((step) => (
                            <div key={step.id} className={`flex items-center ${step.id <= currentStep ? "text-indigo-600" : "text-gray-400"}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.id <= currentStep ? "border-indigo-600 bg-indigo-50" : "border-gray-300"}`}>
                                    {step.id}
                                </div>
                                <span className="ml-2 text-sm font-medium hidden sm:block">{step.title}</span>
                                {step.id < steps.length && <div className="w-12 h-0.5 bg-gray-200 mx-2 hidden sm:block" />}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* STEP 1: Basic Info */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">About You</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sex</label>
                                <select {...form.register("sex")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input type="date" {...form.register("dateOfBirth")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" />
                                {form.formState.errors.dateOfBirth && <p className="text-red-500 text-xs">{form.formState.errors.dateOfBirth.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Height (in)</label>
                                    <input type="number" {...form.register("height", { valueAsNumber: true })} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" />
                                    {form.formState.errors.height && <p className="text-xs text-red-500">{form.formState.errors.height.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
                                    <input type="number" {...form.register("currentWeight", { valueAsNumber: true })} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" />
                                    {form.formState.errors.currentWeight && <p className="text-xs text-red-500">{form.formState.errors.currentWeight.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Goals & Training */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Training Goals</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Main Goal</label>
                                <select {...form.register("goal")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border">
                                    <option value="fat_loss">Fat Loss</option>
                                    <option value="muscle_gain">Muscle Gain</option>
                                    <option value="recomposition">Body Recomposition</option>
                                    <option value="performance">Performance / Strength</option>
                                    <option value="general_health">General Health</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                                <select {...form.register("trainingExperience")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border">
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Training Location</label>
                                <select {...form.register("trainingLocation")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border">
                                    <option value="gym">Gym</option>
                                    <option value="home">Home</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Days per week available (1-7)</label>
                                <input type="number" min="1" max="7" {...form.register("daysPerWeek", { valueAsNumber: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" />
                                {form.formState.errors.daysPerWeek && <p className="text-red-500 text-xs">{form.formState.errors.daysPerWeek.message}</p>}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Nutrition */}
                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Nutrition & Preferences</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Dietary Style (Optional)</label>
                                <input type="text" placeholder="e.g. Keto, Vegan, None" {...form.register("dietaryStyle")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Allergies / Intolerances</label>
                                <input type="text" placeholder="e.g. Peanuts, Dairy" {...form.register("allergies")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Meal Plan Budget Preference</label>
                                <select {...form.register("mealBudgetPreference")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border">
                                    <option value="low">Low ($)</option>
                                    <option value="medium">Medium ($$)</option>
                                    <option value="high">High ($$$)</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t">
                        {currentStep > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Back
                            </button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            >
                                {isLoading ? "Saving..." : "Complete Setup"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
