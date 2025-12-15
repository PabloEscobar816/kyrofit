import { Users, Dumbbell, ShoppingBag, Activity } from "lucide-react"

export default function AdminDashboardPage() {
    // Mock stats
    const stats = [
        { name: 'Total Users', value: '1,234', icon: Users, change: '+12%', changeType: 'positive' },
        { name: 'Active Workouts', value: '456', icon: Activity, change: '+5%', changeType: 'positive' },
        { name: 'Exercises in Library', value: '89', icon: Dumbbell, change: '+2', changeType: 'neutral' },
        { name: 'Meal Plan Clicks', value: '2,345', icon: ShoppingBag, change: '+18%', changeType: 'positive' },
    ]

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
                        <dt>
                            <div className="absolute rounded-md bg-indigo-500 p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-7">
                            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                            <p
                                className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
                                    }`}
                            >
                                {item.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Recent Activity */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent User Signups</h3>
                    <ul className="divide-y divide-gray-200">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <li key={i} className="py-3 flex justify-between">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">U{i}</div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">User {i}</p>
                                        <p className="text-xs text-gray-500">user{i}@example.com</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">2h ago</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Affiliate Performance */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Meal Plans</h3>
                    <ul className="divide-y divide-gray-200">
                        {[
                            { name: "Keto Shred", clicks: 450 },
                            { name: "Muscle Builder", clicks: 320 },
                            { name: "Plant Power", clicks: 210 },
                        ].map((plan) => (
                            <li key={plan.name} className="py-3 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {plan.clicks} clicks
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
