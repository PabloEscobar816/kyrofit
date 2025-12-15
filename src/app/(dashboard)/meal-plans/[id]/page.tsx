import Link from "next/link"
import { ChevronLeft, ExternalLink, Check, Star } from "lucide-react"
import { KyroCard } from "@/components/kyro-ui/KyroCard"

// Mock data (in real app, fetch from DB based on ID)
const getMealPlan = (id: string) => ({
    id,
    name: "Keto Shred",
    provider: "GreenChef",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1000",
    description: "Low carb, high fat meals designed for rapid fat loss. Perfect for those looking to shed pounds while enjoying delicious, rich foods.",
    longDescription: "Our Keto Shred plan takes the guesswork out of ketosis. We provide perfectly macro-balanced meals that keep your carbs low and your satisfaction high. Enjoy steak with garlic butter, salmon with asparagus, and more.",
    features: [
        "Strictly low carb (<20g net carbs)",
        "High quality fats",
        "Organic produce",
        "Ready in 30 minutes or less"
    ],
    price: "$12.99 per meal",
    rating: 4.8,
    reviews: 1240,
    affiliateUrl: "https://greenchef.com/keto-shred?ref=kyrofit" // Mock affiliate link
})

export default function MealPlanDetailsPage({ params }: { params: { id: string } }) {
    const plan = getMealPlan(params.id)

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Link href="/meal-plans" className="flex items-center text-foreground-muted hover:text-foreground mb-6 transition-colors">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Fuel Packs
            </Link>

            <KyroCard className="p-0 overflow-hidden">
                <div className="relative h-64 sm:h-80">
                    <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent flex items-end">
                        <div className="p-6 text-foreground">
                            <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">{plan.provider}</p>
                            <h1 className="text-4xl font-display font-bold text-glow">{plan.name}</h1>
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-2">About this pack</h2>
                            <p className="text-foreground-muted leading-relaxed">
                                {plan.longDescription}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-3">Key Features</h3>
                            <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="h-5 w-5 text-kyro-success mr-2 mt-0.5" />
                                        <span className="text-foreground-muted">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-kyro-gold/5 border border-kyro-gold/20 rounded-md p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <Star className="h-5 w-5 text-kyro-gold" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-bold text-kyro-gold uppercase tracking-wide">
                                        User Verified
                                    </h3>
                                    <div className="mt-2 text-sm text-foreground-muted">
                                        <p>
                                            Rated {plan.rating}/5 stars by {plan.reviews} users.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 sticky top-6">
                            <h3 className="text-lg font-bold text-foreground mb-4">Pack Details</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-foreground-muted text-sm">Price</span>
                                    <span className="font-bold text-foreground">{plan.price}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-foreground-muted text-sm">Delivery</span>
                                    <span className="text-foreground">Weekly</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-foreground-muted text-sm">Cancel anytime</span>
                                    <span className="text-kyro-success font-bold text-sm uppercase">Yes</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={plan.affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-bold rounded shadow-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary uppercase tracking-wider transition-all"
                                >
                                    Go to {plan.provider} <ExternalLink className="ml-2 h-4 w-4" />
                                </a>
                                <p className="text-[10px] text-center text-foreground-muted">
                                    Redirecting to provider interface for acquisition.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </KyroCard>
        </div>
    )
}
