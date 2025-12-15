import Link from "next/link"
import {
    LayoutDashboard,
    Activity,
    LineChart,
    Utensils,
    ClipboardCheck,
    ShoppingBag,
    LogOut,
    Menu
} from "lucide-react"
import { auth, signOut } from "@/auth"
import { cn } from "@/lib/utils"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    return (
        <div className="flex h-screen bg-kyro-bg text-foreground font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col bg-kyro-card border-r border-slate-200 md:flex">
                <div className="flex h-16 items-center justify-center border-b border-slate-200 px-4">
                    <h1 className="text-xl font-display font-bold text-foreground tracking-wider">KYRO<span className="text-primary">FIT</span></h1>
                </div>
                <nav className="flex-1 space-y-2 px-3 py-6">
                    <NavLink href="/dashboard" icon={LayoutDashboard}>Control Center</NavLink>
                    <NavLink href="/workouts" icon={Activity}>Sessions</NavLink>
                    <NavLink href="/progress" icon={LineChart}>Progress Matrix</NavLink>
                    <NavLink href="/nutrition" icon={Utensils}>Kyro Fuel</NavLink>
                    <NavLink href="/check-in" icon={ClipboardCheck}>Checkpoint</NavLink>
                    <NavLink href="/meal-plans" icon={ShoppingBag}>Fuel Packs</NavLink>
                </nav>
                <div className="border-t border-slate-200 p-4 bg-slate-50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded border border-kyro-gold bg-white flex items-center justify-center text-kyro-gold font-bold font-display shadow-sm">
                            {session?.user?.name?.[0] || "K"}
                        </div>
                        <div className="text-sm overflow-hidden">
                            <p className="font-bold text-foreground truncate">{session?.user?.name || "User"}</p>
                            <p className="text-xs text-foreground-muted truncate">{session?.user?.email}</p>
                        </div>
                    </div>
                    <form action={async () => {
                        "use server"
                        await signOut()
                    }}>
                        <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground-muted hover:bg-kyro-danger/10 hover:text-kyro-danger transition-colors">
                            <LogOut className="h-5 w-5" />
                            Log Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Mobile Header & Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-kyro-card px-4 shadow-sm md:hidden">
                    <h1 className="text-lg font-display font-bold text-foreground">KYRO<span className="text-primary">FIT</span></h1>
                    <button className="rounded-md p-2 text-foreground-muted hover:bg-slate-100">
                        <Menu className="h-6 w-6" />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-kyro-bg">
                    {children}
                </main>

                {/* Mobile Bottom Nav */}
                <nav className="flex h-16 items-center justify-around border-t border-slate-200 bg-kyro-card md:hidden">
                    <MobileNavLink href="/dashboard" icon={LayoutDashboard} label="Home" />
                    <MobileNavLink href="/workouts" icon={Activity} label="Sessions" />
                    <MobileNavLink href="/progress" icon={LineChart} label="Stats" />
                    <MobileNavLink href="/nutrition" icon={Utensils} label="Fuel" />
                </nav>
            </div>
        </div>
    )
}

function NavLink({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground-muted hover:bg-primary/10 hover:text-primary transition-all hover:pl-4 relative overflow-hidden"
        >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <Icon className="h-5 w-5 group-hover:text-primary transition-all" />
            {children}
        </Link>
    )
}

function MobileNavLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link href={href} className="flex flex-col items-center justify-center p-1 text-foreground-muted hover:text-primary active:text-primary">
            <Icon className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] font-medium">{label}</span>
        </Link>
    )
}
