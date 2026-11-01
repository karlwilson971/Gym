import { motion } from 'framer-motion'
import { Bell, CalendarDays, Crown, Dumbbell, Flame, Heart, Lock, Medal, Moon, RotateCcw, Sunrise, Trophy, Zap } from 'lucide-react'
import Card from '../components/ui/Card'
import Avatar from '../components/ui/Avatar'
import Switch from '../components/ui/Switch'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import { achievements, personalRecords, user } from '../data/mockData'
import { useAppState } from '../context/AppStateContext'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { ease, fadeUp, stagger } from '../lib/motion'
import usePageTitle from '../lib/usePageTitle'

const achIcons = { flame: Flame, dumbbell: Dumbbell, trophy: Trophy, sunrise: Sunrise, calendar: CalendarDays, medal: Medal, zap: Zap, heart: Heart }

function Badge({ a }) {
  const Icon = achIcons[a.icon]
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5 }}
      className={`glass flex flex-col items-center p-5 text-center ${a.earned ? 'hover-glow' : ''}`}
    >
      <div className="relative">
        {a.earned && <div className="bg-brand absolute inset-0 rounded-full opacity-40 blur-xl" />}
        <div
          className={`relative grid h-16 w-16 place-items-center rounded-full ${
            a.earned ? 'bg-brand text-ink' : 'border-2 border-dashed border-line text-muted'
          }`}
        >
          <Icon size={28} className={a.earned ? '' : 'opacity-50'} />
          {!a.earned && (
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border border-line bg-bg-2">
              <Lock size={12} />
            </span>
          )}
        </div>
      </div>
      <p className="mt-3 font-display font-semibold">{a.name}</p>
      <p className="mt-0.5 text-xs text-muted">{a.description}</p>
      {a.earned ? (
        <p className="mt-3 text-[11px] font-medium text-accent">Earned {a.date}</p>
      ) : (
        <div className="mt-3 w-full">
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              whileInView={{ width: `${(a.progress / a.goal) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-muted">
            {a.progress} / {a.goal}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default function Profile() {
  usePageTitle('Profile')
  const { totalWorkouts, streak, bookings, notifications, setNotifications, reset } = useAppState()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()
  const earned = achievements.filter((a) => a.earned).length
  const xpPct = (user.xp / user.xpNext) * 100

  const stats = [
    { label: 'Workouts', value: totalWorkouts, icon: Dumbbell },
    { label: 'Day streak', value: streak, icon: Flame },
    { label: 'Personal records', value: personalRecords.length, icon: Trophy },
    { label: 'Classes booked', value: bookings.length, icon: CalendarDays },
  ]

  return (
    <motion.div variants={stagger()} initial="hidden" animate="show" className="space-y-6">
      <Card pad={false} className="overflow-hidden">
        <div className="bg-brand relative h-32 sm:h-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_120%,rgba(7,16,6,0.35),transparent_60%)]" />
          <svg viewBox="0 0 600 120" className="absolute inset-x-0 bottom-4 h-16 w-full opacity-25" preserveAspectRatio="none" aria-hidden>
            <path d="M0 70 H140 L160 70 L180 20 L205 110 L225 45 L240 70 H380 L400 70 L420 10 L445 115 L465 50 L480 70 H600" fill="none" stroke="#071006" strokeWidth="4" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="px-5 pb-6 sm:px-8 sm:pb-8">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar size={104} className="ring-[6px] ring-bg-2" />
                <span className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full bg-fg font-display text-sm font-bold text-bg ring-4 ring-bg-2">
                  {user.level}
                </span>
              </div>
              <div className="pb-1">
                <h1 className="text-2xl font-bold sm:text-3xl">{user.name}</h1>
                <p className="text-sm text-muted">
                  {user.handle} · {user.homeGym}
                </p>
              </div>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 px-4 py-2 text-sm font-bold text-amber-950 shadow-[0_10px_30px_-10px_rgba(251,191,36,0.7)]">
              <Crown size={16} /> {user.membership} member
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                Level {user.level} <span className="text-muted">→ {user.level + 1}</span>
              </span>
              <span className="text-muted">
                {user.xp.toLocaleString()} / {user.xpNext.toLocaleString()} XP
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-line">
              <motion.div
                className="bg-brand shadow-glow h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpPct}%` }}
                transition={{ duration: 1.4, ease, delay: 0.3 }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">
              Member since {user.memberSince} · {user.xpNext - user.xp} XP to your next level
            </p>
          </div>
        </div>
      </Card>

      <motion.div variants={stagger()} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} hover>
            <Icon size={20} className="text-accent" />
            <p className="mt-3 font-display text-3xl font-bold">
              <AnimatedCounter value={value} duration={1.6} />
            </p>
            <p className="text-sm text-muted">{label}</p>
          </Card>
        ))}
      </motion.div>

      <div>
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Achievements</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Badges & milestones</h2>
          </div>
          <span className="chip">
            {earned}/{achievements.length} unlocked
          </span>
        </div>
        <motion.div variants={stagger(0.05)} className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {achievements.map((a) => (
            <Badge key={a.id} a={a} />
          ))}
        </motion.div>
      </div>

      <Card>
        <h2 className="text-xl font-semibold">Settings</h2>
        <div className="mt-4 divide-y divide-line">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <Moon size={18} />
              </span>
              <div>
                <p className="font-medium">Dark mode</p>
                <p className="text-sm text-muted">Easy on the eyes at 6am</p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onChange={toggleTheme} label="Dark mode" />
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-2/10 text-accent-2">
                <Bell size={18} />
              </span>
              <div>
                <p className="font-medium">Workout reminders</p>
                <p className="text-sm text-muted">A nudge when it&apos;s time to train</p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onChange={(v) => {
                setNotifications(v)
                toast({ type: 'info', title: v ? 'Reminders on' : 'Reminders off', message: v ? "We'll nudge you before your sessions." : 'You can switch them back on anytime.' })
              }}
              label="Workout reminders"
            />
          </div>
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/10 text-gold">
                <Crown size={18} />
              </span>
              <div>
                <p className="font-medium">Membership</p>
                <p className="text-sm text-muted">
                  {user.membership} · renews {user.renews}
                </p>
              </div>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => toast({ type: 'info', title: 'Coming soon', message: 'Membership management lands in the next update.' })}
            >
              Manage
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-danger/10 text-danger">
                <RotateCcw size={18} />
              </span>
              <div>
                <p className="font-medium">Reset demo data</p>
                <p className="text-sm text-muted">Clear bookings and today&apos;s workout</p>
              </div>
            </div>
            <button
              className="btn btn-ghost btn-sm text-danger"
              onClick={() => {
                reset()
                toast({ title: 'Demo data reset', message: 'Fresh start. Same goals.' })
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </Card>

      <p className="pb-2 text-center text-xs text-muted lg:hidden">© {new Date().getFullYear()} PulseFit · Train smarter. Get stronger.</p>
    </motion.div>
  )
}
