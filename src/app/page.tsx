import Link from "next/link"
// Force rebuild timestamp: 2025-12-14
import { ArrowRight, CheckCircle, Activity, Zap, Shield } from "lucide-react"
import { auth } from "@/auth"
import { KyroCard } from "@/components/kyro-ui/KyroCard"

export default async function Home() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <div className="flex min-h-screen flex-col bg-kyro-bg text-foreground font-sans selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm fixed w-full z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded flex items-center justify-center shadow-md">
            <span className="text-white font-display font-bold text-xl">K</span>
          </div>
          <span className="text-xl font-display font-bold text-foreground tracking-wide">KYRO<span className="text-primary">FIT</span></span>
        </div>
        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="rounded bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-md uppercase tracking-wider"
            >
              Control Center
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-foreground-muted hover:text-foreground transition-colors uppercase tracking-wider">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-md uppercase tracking-wider"
              >
                Initialize
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-kyro-success/5 rounded-full blur-[100px]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-primary mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          SYSTEM ONLINE
        </div>

        <h1 className="text-5xl font-display font-extrabold tracking-tight text-foreground sm:text-7xl mb-6 text-glow">
          UPGRADE YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">HUMAN HARDWARE</span>
        </h1>
        <p className="max-w-2xl text-lg text-foreground-muted mb-10 leading-relaxed">
          KyroFit is your AI-influenced fitness operating system. Execute sessions, track metrics, and level up your physical stats through consistent action.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded bg-primary px-8 py-4 text-lg font-bold text-white hover:bg-primary/90 transition-all shadow-lg hover:scale-105 uppercase tracking-widest"
            >
              Enter System <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded bg-primary px-8 py-4 text-lg font-bold text-white hover:bg-primary/90 transition-all shadow-lg hover:scale-105 uppercase tracking-widest"
              >
                Start Protocol <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-foreground hover:bg-slate-50 transition-all hover:scale-105 uppercase tracking-widest shadow-sm"
              >
                Resume Session
              </Link>
            </>
          )}
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-6xl w-full text-left px-4">
          <FeatureCard
            title="Training Sessions"
            description="Execute structured workout protocols designed to optimize your physical output."
            icon={Activity}
          />
          <FeatureCard
            title="Progress Matrix"
            description="Visualize your data. Track strength, endurance, and body composition metrics over time."
            icon={Zap}
          />
          <FeatureCard
            title="Kyro Fuel Packs"
            description="Access elite nutrition plans from our marketplace to fuel your performance."
            icon={Shield}
          />
        </div>
      </main>

      <footer className="bg-slate-50 py-8 text-center text-sm text-foreground-muted border-t border-slate-200">
        &copy; {new Date().getFullYear()} KyroFit. All rights reserved.
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon: Icon }: { title: string; description: string, icon: any }) {
  return (
    <KyroCard className="hover:border-primary/50 group">
      <div className="h-12 w-12 rounded bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6 text-primary group-hover:text-primary-dark transition-colors" />
      </div>
      <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-foreground-muted leading-relaxed">{description}</p>
    </KyroCard>
  )
}
