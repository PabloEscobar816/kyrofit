import prisma from "@/lib/prisma"
import { Plus, Search, ExternalLink, Edit } from "lucide-react"

async function getAffiliates() {
    return await prisma.mealPartner.findMany({
        include: {
            plans: true
        }
    })
}

export default async function AdminAffiliatesPage() {
    const partners = await getAffiliates()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Meal Partners & Affiliates</h1>
                <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                    <Plus className="h-5 w-5 mr-2" /> Add Partner
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner) => (
                    <div key={partner.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">{partner.name}</h3>
                                <button className="text-gray-400 hover:text-indigo-600">
                                    <Edit className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="text-sm text-gray-500 mb-4">
                                {partner.description || "No description provided."}
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Active Plans</h4>
                                <ul className="space-y-2">
                                    {partner.plans.map((plan) => (
                                        <li key={plan.id} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-900">{plan.name}</span>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${plan.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {plan.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </li>
                                    ))}
                                    {partner.plans.length === 0 && (
                                        <li className="text-sm text-gray-400 italic">No plans added yet.</li>
                                    )}
                                </ul>
                                <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    <Plus className="h-4 w-4 mr-2" /> Add Plan
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State / Add New Card */}
                <button className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Plus className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-900">Add a new partner</span>
                </button>
            </div>
        </div>
    )
}
