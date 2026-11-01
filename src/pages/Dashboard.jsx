import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, CircleCheck, Dumbbell, Flame, MapPin, Play, Timer, User, Zap } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../components/ui/Card'
import ProgressRing from '../components/ui/ProgressRing'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import EmptyState from '../components/ui/EmptyState'
import ChartTooltip from '../components/ui/ChartTooltip'
import QuoteOfDay from '../components/QuoteOfDay'
import { classes, todayWorkout, user, weeklyActivity } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'
import { useAppState } from '../context/AppStateContext'
import { fadeUp, stagger } from '../lib/motion'
import { currentWeek, todayIndex, upcomingDays } from '../lib/utils'
import usePageTitle from '../lib/usePageTitle'

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

export default function Dashboard() {
  usePageTitle('Dashboard')
  const { palette } = useTheme()
  const { streak, weekWorkouts, completedToday, bookings } = useAppState()
  const tIdx = todayIndex()
  const week = currentWeek()
  const days = upcomingDays()

  const activity = weeklyActivity.map((d, i) => ({
    ...d,
    minutes: i > tIdx ? 0 : i === tIdx ? d.minutes + (completedToday ? todayWorkout.duration : 0) : d.minutes,
  }))
  const totalMinutes = activity.reduce((a, d) => a + d.minutes, 0)

  const nextClass = classes
    .filter((c) => bookings.includes(c.id))
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))[0]

  const rings = [
    { label: 'Workouts', value: weekWorkouts, max: user.weeklyGoal, display: `${weekWorkouts}/${user.weeklyGoal}`, colors: [palette.accent, palette.accent2] },
    { label: 'Active min', value: totalMinutes, max: user.activeMinutesGoal, display: totalMinutes, colors: [palette.accent2, palette.accent3] },
    { label: 'Goals hit', value: user.goalsHit + (completedToday ? 1 : 0), max: user.goalsTotal, display: `${user.goalsHit + (completedToday ? 1 : 0)}/${user.goalsTotal}`, colors: [palette.accent3, palette.accent] },
  ]

  return (
    <motion.div variants={stagger()} initial="hidden" animate="show" className="grid gap-4 sm:gap-6 lg:grid-cols-3">
      <motion.header variants={fadeUp} className="lg:col-span-3">
        <p className="eyebrow">{week[tIdx].full}</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {greeting()}, {user.firstName}. <span className="text-gradient">Let&apos;s move.</span>
        </h1>
      </motion.header>

      {/* Today's workout */}
      <Card pad={false} className="overflow-hidden lg:col-span-2">
        <div className="bg-brand pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-20 blur-3xl" />
        <Dumbbell className="pointer-events-none absolute -bottom-8 right-2 h-44 w-44 -rotate-12 text-fg/[0.05]" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">
              <Zap size={14} className="text-accent" /> Today&apos;s workout
            </span>
            <span className="chip">{todayWorkout.difficulty}</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{todayWorkout.title}</h2>
          <p className="mt-1 text-muted">{todayWorkout.focus}</p>

          <div className="mt-6 grid max-w-md grid-cols-3 gap-3">
            {[
              { icon: Timer, value: todayWorkout.duration, unit: 'min' },
              { icon: Flame, value: todayWorkout.calories, unit: 'kcal' },
              { icon: Dumbbell, value: todayWorkout.exercises.length, unit: 'exercises' },
            ].map(({ icon: Icon, value, unit }) => (
              <div key={unit} className="rounded-2xl border border-line bg-bg/30 p-3">
                <Icon size={16} className="text-accent" />
                <p className="mt-2 font-display text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted">{unit}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {todayWorkout.exercises.map((e) => (
              <span key={e.id} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {e.name}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            {completedToday ? (
              <>
                <span className="chip border-accent/40 text-accent">
                  <CircleCheck size={14} /> Completed today
                </span>
                <Link to="/workout" className="btn btn-ghost btn-sm">
                  Train again
                </Link>
              </>
            ) : (
              <Link to="/workout" className="btn btn-primary btn-lg group">
                <Play size={18} className="fill-current" /> Start
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <p className="text-sm italic text-muted">Coach tip: {todayWorkout.coachNote}</p>
          </div>
        </div>
      </Card>

      {/* Streak */}
      <Card className="overflow-hidden">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <p className="eyebrow">Streak</p>
          <span className="chip">Best {user.longestStreak} days</span>
        </div>
        <div className="relative mt-5 flex items-center gap-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, -4, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-orange-500/30 to-yellow-400/10 text-orange-400 shadow-[0_0_40px_-8px_rgba(249,115,22,0.6)]"
          >
            <Flame size={44} className="fill-orange-500/40" />
          </motion.div>
          <div>
            <p className="font-display text-5xl font-bold">
              <AnimatedCounter value={streak} duration={1.4} />
            </p>
            <p className="text-sm text-muted">days in a row</p>
          </div>
        </div>
        <div className="relative mt-6 grid grid-cols-7 gap-1.5">
          {week.map((d, i) => {
            const active = i < tIdx ? activity[i].minutes > 0 : i === tIdx && completedToday
            return (
              <div key={d.label} className="flex flex-col items-center gap-1.5">
                <span
                  className={`grid h-8 w-full place-items-center rounded-lg ${
                    active
                      ? 'bg-brand text-ink'
                      : i === tIdx
                        ? 'border border-dashed border-accent/60'
                        : 'border border-line'
                  }`}
                >
                  {active && <Check size={14} strokeWidth={3} />}
                </span>
                <span className={`text-[11px] ${i === tIdx ? 'font-semibold text-fg' : 'text-muted'}`}>{d.label[0]}</span>
              </div>
            )
          })}
        </div>
        <p className="relative mt-4 text-sm text-muted">
          {completedToday ? 'Streak secured for today. Legend.' : 'Train today to keep the fire burning.'}
        </p>
      </Card>

      {/* Weekly activity */}
      <Card className="lg:col-span-2">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="eyebrow">Weekly activity</p>
            <p className="mt-2 font-display text-3xl font-bold">
              <AnimatedCounter value={totalMinutes} /> <span className="text-base font-medium text-muted">active minutes</span>
            </p>
          </div>
          <span className="chip">
            <Flame size={14} className="text-orange-400" /> ~{Math.round(totalMinutes * 9.2).toLocaleString()} kcal
          </span>
        </div>
        <div className="mt-6 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activity} margin={{ top: 8, right: 0, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.accent} />
                  <stop offset="100%" stopColor={palette.accent2} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={palette.grid} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: palette.muted, fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: palette.muted, fontSize: 12 }} width={40} />
              <Tooltip
                cursor={{ fill: palette.grid, radius: 10 }}
                content={<ChartTooltip unit=" min" color={palette.accent} />}
              />
              <Bar dataKey="minutes" name="Active" radius={[10, 10, 4, 4]} maxBarSize={38} animationDuration={1300}>
                {activity.map((d, i) => (
                  <Cell key={d.day} fill="url(#barGrad)" fillOpacity={i === tIdx ? 1 : 0.55} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Rings */}
      <Card>
        <p className="eyebrow">This week</p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {rings.map((r, i) => (
            <div key={r.label} className="flex flex-col items-center text-center">
              <ProgressRing value={r.value} max={r.max} size={88} stroke={9} colors={r.colors} delay={i * 0.15}>
                <p className="font-display text-base font-bold">{r.display}</p>
              </ProgressRing>
              <p className="mt-2 text-xs font-medium">{r.label}</p>
              <p className="text-[11px] text-muted">{Math.round(Math.min(r.value / r.max, 1) * 100)}%</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-line bg-bg/30 p-4 text-sm">
          <p className="font-medium">
            {weekWorkouts >= user.weeklyGoal ? 'Weekly goal smashed! 🏆' : `${user.weeklyGoal - weekWorkouts} more workouts to hit your weekly goal.`}
          </p>
          <p className="mt-0.5 text-muted">You&apos;re ahead of 72% of members this week.</p>
        </div>
      </Card>

      <QuoteOfDay className="lg:col-span-2" />

      {/* Next class */}
      <Card>
        <div className="flex items-center justify-between">
          <p className="eyebrow">Next class</p>
          <Link to="/classes" className="text-sm font-medium text-accent hover:underline">
            Schedule
          </Link>
        </div>
        {nextClass ? (
          <div className="mt-4">
            <span className="chip">{nextClass.type}</span>
            <h3 className="mt-3 text-xl font-semibold">{nextClass.name}</h3>
            <div className="mt-3 space-y-2 text-sm text-muted">
              <p className="flex items-center gap-2">
                <CalendarDays size={15} /> {nextClass.day === 0 ? 'Today' : days[nextClass.day].full} · {nextClass.time}
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={15} /> {nextClass.room}
              </p>
              <p className="flex items-center gap-2">
                <User size={15} /> with {nextClass.coach}
              </p>
            </div>
          </div>
        ) : (
          <EmptyState
            compact
            icon={CalendarDays}
            title="No classes booked"
            message="Grab a spot in Yoga, HIIT, Spin or Boxing."
            action={
              <Link to="/classes" className="btn btn-ghost btn-sm">
                Browse classes
              </Link>
            }
          />
        )}
      </Card>
    </motion.div>
  )
}
