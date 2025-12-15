import Link from "next/link"
import {
    LayoutDashboard,
    Users,
    Dumbbell,
    ShoppingBag,
    LogOut,
    Settings
} from "lucide-react"
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    // Basic role check - in real app, check session.user.role === 'ADMIN'
    if (!session?.user) {
        redirect("/login")
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Admin Sidebar */}
            <aside className="hidden w-64 flex-col bg-gray-900 text-white md:flex">
                <div className="flex h-16 items-center justify-center border-b border-gray-800 px-4">
                    <h1 className="text-xl font-bold text-white">KyroFit Admin</h1>
                </div>
                <nav className="flex-1 space-y-1 px-2 py-4">
                    <AdminNavLink href="/admin" icon={LayoutDashboard}>Dashboard</AdminNavLink>
                    <AdminNavLink href="/admin/users" icon={Users}>Users</AdminNavLink>
                    <AdminNavLink href="/admin/exercises" icon={Dumbbell}>Exercises & Programs</AdminNavLink>
                    <AdminNavLink href="/admin/affiliates" icon={ShoppingBag}>Meal Partners</AdminNavLink>
                    <AdminNavLink href="/admin/settings" icon={Settings}>Settings</AdminNavLink>
                </nav>
                <div className="border-t border-gray-800 p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-gray-200">Admin</p>
                        </div>
                    </div>
                    <form action={async () => {
                        "use server"
                        await signOut()
                    }}>
                        <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white">
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

function AdminNavLink({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
        >
            <Icon className="h-5 w-5" />
            {children}
        </Link>
    )
}
