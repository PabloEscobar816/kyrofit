import prisma from "@/lib/prisma"
import { Plus, Search, Edit, Trash } from "lucide-react"

async function getExercises() {
    return await prisma.exercise.findMany({
        orderBy: { name: 'asc' }
    })
}

export default async function AdminExercisesPage() {
    const exercises = await getExercises()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Exercise Library</h1>
                <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                    <Plus className="h-5 w-5 mr-2" /> Add Exercise
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="relative rounded-md shadow-sm max-w-xs">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 border"
                            placeholder="Search exercises..."
                        />
                    </div>
                </div>
                <ul role="list" className="divide-y divide-gray-200">
                    {exercises.map((exercise) => (
                        <li key={exercise.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-indigo-600 truncate">{exercise.name}</h3>
                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                        <span className="truncate mr-4">Muscle: {exercise.primaryMuscleGroup || "N/A"}</span>
                                        <span className="truncate">Equipment: {exercise.equipment || "None"}</span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-indigo-600">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-600">
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                    {exercises.length === 0 && (
                        <li className="px-4 py-10 text-center text-gray-500">
                            No exercises found. Add your first exercise to get started.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
