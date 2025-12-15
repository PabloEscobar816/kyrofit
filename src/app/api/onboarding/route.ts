import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const onboardingSchema = z.object({
    sex: z.string(),
    dateOfBirth: z.string(),
    height: z.number().min(36),
    currentWeight: z.number().min(60),
    goal: z.string(),
    trainingExperience: z.string(),
    trainingLocation: z.string(),
    daysPerWeek: z.number(),
    equipment: z.string().optional(),
    dietaryStyle: z.string().optional(),
    allergies: z.string().optional(),
    mealBudgetPreference: z.string().optional(),
})

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const data = onboardingSchema.parse(body)

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Create or update profile
        const profile = await prisma.userProfile.upsert({
            where: { userId: user.id },
            update: {
                sex: data.sex,
                dateOfBirth: new Date(data.dateOfBirth),
                height: data.height,
                currentWeight: data.currentWeight,
                goal: data.goal,
                trainingExperience: data.trainingExperience,
                trainingLocation: data.trainingLocation,
                daysPerWeek: data.daysPerWeek,
                equipment: data.equipment,
                dietaryStyle: data.dietaryStyle,
                allergies: data.allergies,
                mealBudgetPreference: data.mealBudgetPreference,
            },
            create: {
                userId: user.id,
                sex: data.sex,
                dateOfBirth: new Date(data.dateOfBirth),
                height: data.height,
                currentWeight: data.currentWeight,
                goal: data.goal,
                trainingExperience: data.trainingExperience,
                trainingLocation: data.trainingLocation,
                daysPerWeek: data.daysPerWeek,
                equipment: data.equipment,
                dietaryStyle: data.dietaryStyle,
                allergies: data.allergies,
                mealBudgetPreference: data.mealBudgetPreference,
            },
        })

        // TODO: Assign default program based on answers here

        return NextResponse.json(profile, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
