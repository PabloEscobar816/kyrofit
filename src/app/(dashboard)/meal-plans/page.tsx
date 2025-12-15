import Link from "next/link"
import { Search, Filter, ExternalLink, ShoppingBag } from "lucide-react"
import { KyroCard } from "@/components/kyro-ui/KyroCard"

// Mock data for meal plans
const mealPlans = [
    {
        id: "1",
        name: "Keto Shred",
        provider: "GreenChef",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1000",
        description: "Low carb, high fat meals designed for rapid fat loss.",
        tags: ["Keto", "Fat Loss", "Gluten Free"],
        price: "$12.99/meal",
        rating: 4.8,
    },
    {
        id: "2",
        name: "Muscle Builder",
        provider: "Factor75",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000",
        description: "High protein meals to support muscle growth and recovery.",
        tags: ["High Protein", "Muscle Gain"],
        price: "$13.50/meal",
        rating: 4.9,
    },
    {
        id: "3",
        name: "Plant Power",
        provider: "PurpleCarrot",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
        description: "100% plant-based meals rich in nutrients and flavor.",
        tags: ["Vegan", "Health"],
        price: "$11.99/meal",
        rating: 4.7,
    },
    {
        id: "4",
        name: "Balanced Lifestyle",
        provider: "HelloFresh",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000",
        description: "Well-rounded meals for maintaining a healthy weight.",
        tags: ["Balanced", "Family Friendly"],
        price: "$9.99/meal",
        rating: 4.6,
    },
]

export default function MealPlansPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground text-glow">Fuel Packs</h1>
                    <p className="text-foreground-muted mt-1">Acquire optimized nutrition modules for your protocol.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-foreground-muted" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded bg-white border-slate-200 text-foreground pl-10 focus:border-primary focus:ring-primary sm:text-sm py-2 border placeholder:text-slate-400"
                            placeholder="Search packs..."
                        />
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-slate-200 shadow-sm text-sm font-bold rounded text-foreground bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary uppercase tracking-wider">
                        <Filter className="h-5 w-5 mr-2 text-foreground-muted" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mealPlans.map((plan) => (
                    <KyroCard key={plan.id} className="p-0 overflow-hidden group hover:border-primary/50 transition-all">
                        <div className="flex-shrink-0 relative">
                            <img className="h-48 w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" src={plan.image} alt={plan.name} />
                            <div className="absolute top-0 right-0 p-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-white/90 text-foreground backdrop-blur-sm border border-slate-200 shadow-sm">
                                    {plan.provider}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between p-6">
                            <div className="flex-1">
                                <Link href={`/meal-plans/${plan.id}`} className="block">
                                    <p className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{plan.name}</p>
                                    <p className="mt-3 text-sm text-foreground-muted">{plan.description}</p>
                                </Link>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {plan.tags.map((tag) => (
                                        <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-lg font-bold text-foreground">{plan.price}</span>
                                </div>
                                <Link
                                    href={`/meal-plans/${plan.id}`}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-bold rounded shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary uppercase tracking-wider"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </KyroCard>
                ))}
            </div>
        </div>
    )
}
