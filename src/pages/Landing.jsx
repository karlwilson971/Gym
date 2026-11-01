import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Dumbbell,
  Flame,
  HeartPulse,
  Play,
  Star,
  Timer,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react'
import Logo from '../components/ui/Logo'
import ThemeToggle from '../components/ui/ThemeToggle'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import ProgressRing from '../components/ui/ProgressRing'
import Card from '../components/ui/Card'
import QuoteOfDay from '../components/QuoteOfDay'
import Backdrop from '../components/layout/Backdrop'
import { communityStats, todayWorkout } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'
import { ease, fadeUp, stagger } from '../lib/motion'
import usePageTitle from '../lib/usePageTitle'

const statIcons = [Users, Dumbbell, CalendarDays]

const features = [
  { icon: HeartPulse, title: 'Your daily dashboard', text: "Today's plan, weekly activity and goal rings at a glance.", to: '/dashboard' },
  { icon: Dumbbell, title: 'Smart workout library', text: 'Moves filtered by muscle group, with sets, reps and difficulty dialed in.', to: '/library' },
  { icon: Timer, title: 'Live workout mode', text: 'A big, bold rest timer and one-tap set tracking built for sweaty thumbs.', to: '/workout' },
  { icon: TrendingUp, title: 'Progress you can see', text: 'Strength curves and PR trophies that make every extra kilo feel earned.', to: '/progress' },
  { icon: CalendarDays, title: 'Book classes in a tap', text: 'Yoga, HIIT, Spin and Boxing. See spots left and lock in your place.', to: '/classes' },
  { icon: Flame, title: 'Streaks that stick', text: 'Daily streaks, badges and achievements that keep you coming back.', to: '/profile' },
]

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-bg/60 py-2 pl-4 pr-2 backdrop-blur-xl">
        <Logo size="sm" />
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#features" className="transition-colors hover:text-fg">Features</a>
          <Link to="/classes" className="transition-colors hover:text-fg">Classes</Link>
          <Link to="/progress" className="transition-colors hover:text-fg">Progress</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/dashboard" className="btn btn-primary btn-sm">Open app</Link>
        </div>
      </div>
    </header>
  )
}

function PulseLine() {
  const { palette } = useTheme()
  return (
    <svg viewBox="0 0 300 60" className="mt-3 h-14 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="pulse-line" x1="0" x2="1">
          <stop offset="0" stopColor={palette.accent} />
          <stop offset="1" stopColor={palette.accent2} />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 32 H60 L72 32 L82 10 L94 52 L104 22 L112 32 H170 L180 32 L190 6 L202 56 L212 26 L220 32 H300"
        fill="none"
        stroke="url(#pulse-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
        style={{ filter: `drop-shadow(0 0 6px ${palette.accent})` }}
      />
    </svg>
  )
}

function FloatChip({ className, delay = 0, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay: 0.8 + delay * 0.2 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay } }}
      className={`glass-strong absolute flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-medium ${className}`}
    >
      {children}
    </motion.div>
  )
}

function HeroVisual() {
  const sets = todayWorkout.exercises.reduce((a, e) => a + e.sets, 0)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.2 }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="bg-brand absolute inset-10 rounded-full opacity-30 blur-[90px]" />
      <div className="glass relative rounded-[2rem] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Today</p>
            <p className="font-display text-xl font-semibold">{todayWorkout.title}</p>
          </div>
          <span className="chip">
            <Timer size={14} className="text-accent" /> {todayWorkout.duration} min
          </span>
        </div>

        <div className="mt-6 flex items-center gap-6">
          <ProgressRing value={78} size={128} stroke={12}>
            <div>
              <p className="font-display text-3xl font-bold">
                <AnimatedCounter value={78} />%
              </p>
              <p className="text-[11px] text-muted">weekly goal</p>
            </div>
          </ProgressRing>
          <div className="flex-1 space-y-3">
            {[
              { icon: Flame, label: 'kcal', value: todayWorkout.calories, pct: 70 },
              { icon: Dumbbell, label: 'sets', value: sets, pct: 55 },
              { icon: Trophy, label: 'PRs', value: 2, pct: 40 },
            ].map(({ icon: Icon, label, value, pct }, i) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted">
                    <Icon size={14} /> {label}
                  </span>
                  <span className="font-display font-semibold">{value}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line">
                  <motion.div
                    className="bg-brand h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-bg/40 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted">
              <HeartPulse size={16} className="text-danger" /> Heart rate
            </span>
            <span className="font-display font-semibold">
              142 <span className="text-xs text-muted">bpm</span>
            </span>
          </div>
          <PulseLine />
        </div>
      </div>

      <FloatChip className="-left-2 -top-6 sm:-left-10" delay={0}>
        <Flame size={16} className="text-orange-400" /> 12-day streak
      </FloatChip>
      <FloatChip className="-right-3 top-[46%] sm:-right-12" delay={1}>
        <Trophy size={16} className="text-gold" /> New PR · 170 kg
      </FloatChip>
      <FloatChip className="-bottom-5 left-6" delay={2}>
        <CalendarDays size={16} className="text-accent-2" /> HIIT 18:45 · 3 spots
      </FloatChip>
    </motion.div>
  )
}

export default function Landing() {
  usePageTitle()

  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <Backdrop />
      <Nav />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-16 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-40">
        <motion.div variants={stagger(0.1)} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            New: Live Workout Mode
          </motion.div>
          <motion.h1 variants={fadeUp} className="mt-6 font-bold leading-[0.92]">
            <span className="text-gradient block text-2xl tracking-tight sm:text-3xl">PulseFit</span>
            <span className="mt-2 block text-5xl sm:text-6xl lg:text-7xl">Train smarter.</span>
            <span className="text-gradient block pb-2 text-5xl sm:text-6xl lg:text-7xl">Get stronger.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg text-muted">
            Your gym in your pocket. Plan workouts, crush sets with a live timer, book classes and watch your progress climb.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link to="/workout" className="btn btn-primary btn-lg group">
              <Play size={18} className="fill-current" />
              Start Your Workout
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/dashboard" className="btn btn-ghost btn-lg">
              View dashboard
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {['MC', 'JB', 'SO', 'PN'].map((i, n) => (
                <span
                  key={i}
                  className="grid h-10 w-10 place-items-center rounded-full font-display text-xs font-bold text-ink ring-4 ring-bg"
                  style={{ background: ['#c6ff3d', '#22d3ee', '#a78bfa', '#fbbf24'][n] }}
                >
                  {i}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-muted">
                <span className="font-semibold text-fg">4.9</span> from 12,400+ athletes
              </p>
            </div>
          </motion.div>
        </motion.div>
        <HeroVisual />
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {communityStats.map((s, i) => {
            const Icon = statIcons[i]
            return (
              <Card key={s.label} hover className="overflow-hidden">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
                <Icon className="text-accent" size={22} />
                <p className="mt-4 font-display text-4xl font-bold lg:text-5xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} duration={2.4} />
                </p>
                <p className="mt-1 text-muted">{s.label}</p>
              </Card>
            )
          })}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-24 sm:px-6">
        <motion.div variants={stagger()} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
          <motion.p variants={fadeUp} className="eyebrow">Everything in one app</motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">
            Built for people who <span className="text-gradient">actually show up.</span>
          </motion.h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text, to }) => (
              <Link key={title} to={to} className="block">
                <Card hover className="group h-full">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Explore <ArrowRight size={14} />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quote + CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 lg:grid-cols-2"
        >
          <QuoteOfDay />
          <Card className="overflow-hidden">
            <div className="bg-brand absolute inset-0 opacity-[0.12]" />
            <div className="bg-brand absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-40 blur-3xl" />
            <div className="relative">
              <p className="eyebrow">Your move</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Your next PR starts today.</h2>
              <p className="mt-2 text-muted">{todayWorkout.title} is ready and waiting. 50 minutes, zero guesswork.</p>
              <Link to="/workout" className="btn btn-primary btn-lg group mt-6">
                <Play size={18} className="fill-current" /> Start Your Workout
              </Link>
            </div>
          </Card>
        </motion.div>
      </section>

      <footer className="mx-auto mt-24 max-w-6xl border-t border-line px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <Logo size="sm" />
          <p className="text-sm text-muted">© {new Date().getFullYear()} PulseFit. Built for people who show up.</p>
          <div className="flex gap-5 text-sm text-muted">
            <Link to="/dashboard" className="hover:text-fg">App</Link>
            <Link to="/classes" className="hover:text-fg">Classes</Link>
            <Link to="/profile" className="hover:text-fg">Profile</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
