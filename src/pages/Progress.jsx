import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Trophy } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import ChartTooltip from '../components/ui/ChartTooltip'
import { personalRecords, progressSummary, strengthHistory } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { stagger } from '../lib/motion'
import usePageTitle from '../lib/usePageTitle'

const lifts = [
  { key: 'bench', label: 'Bench', color: 'accent' },
  { key: 'squat', label: 'Squat', color: 'accent2' },
  { key: 'deadlift', label: 'Deadlift', color: 'accent3' },
]

const tiers = {
  gold: 'from-amber-200 via-yellow-300 to-amber-500',
  silver: 'from-slate-100 via-slate-300 to-slate-400',
  bronze: 'from-orange-200 via-orange-300 to-orange-600',
}

function TrophyBadge({ tier }) {
  return (
    <div className="relative">
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tiers[tier]} opacity-50 blur-lg`} />
      <div className={`relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${tiers[tier]} text-amber-950`}>
        <Trophy size={26} />
        <span className="shimmer-sweep absolute inset-0" />
      </div>
    </div>
  )
}

export default function Progress() {
  usePageTitle('Progress')
  const { palette } = useTheme()
  const toast = useToast()
  const [visible, setVisible] = useState(lifts.map((l) => l.key))

  const toggle = (key) => {
    if (visible.includes(key) && visible.length === 1) {
      toast({ type: 'info', title: 'Keep one lift on the chart', message: 'Pick another lift first, then hide this one.' })
      return
    }
    setVisible((v) => (v.includes(key) ? v.filter((k) => k !== key) : [...v, key]))
  }

  const first = strengthHistory[0]
  const last = strengthHistory[strengthHistory.length - 1]

  return (
    <motion.div variants={stagger()} initial="hidden" animate="show">
      <PageHeader eyebrow="Progress" title="Every rep," highlight="on the record." subtitle="Your strength trend over the last 12 weeks and the personal records you've earned along the way." />

      <motion.div variants={stagger()} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {progressSummary.map((s) => (
          <Card key={s.label} hover>
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs text-muted">{s.hint}</p>
          </Card>
        ))}
      </motion.div>

      <Card className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Strength gains</h2>
            <p className="text-sm text-muted">Estimated 1-rep max (kg) · weekly</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {lifts.map((l) => {
              const on = visible.includes(l.key)
              const gain = last[l.key] - first[l.key]
              return (
                <button
                  key={l.key}
                  onClick={() => toggle(l.key)}
                  aria-pressed={on}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    on ? 'border-line bg-card text-fg' : 'border-dashed border-line text-muted opacity-60'
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: palette[l.color] }} />
                  {l.label}
                  <span className="text-accent">+{gain}</span>
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-6 h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={strengthHistory} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={palette.grid} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: palette.muted, fontSize: 12 }} minTickGap={24} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: palette.muted, fontSize: 12 }} width={44} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip content={<ChartTooltip unit=" kg" />} cursor={{ stroke: palette.muted, strokeDasharray: '4 4' }} />
              {lifts
                .filter((l) => visible.includes(l.key))
                .map((l) => (
                  <Line
                    key={l.key}
                    type="monotone"
                    dataKey={l.key}
                    name={l.label}
                    stroke={palette[l.color]}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 3, stroke: palette[l.color], fill: 'var(--bg)' }}
                    animationDuration={1600}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-10 flex items-end justify-between">
        <div>
          <p className="eyebrow">Hall of fame</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Personal records</h2>
        </div>
        <span className="chip">
          <Trophy size={14} className="text-gold" /> {personalRecords.length} PRs
        </span>
      </div>
      <motion.div variants={stagger()} className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {personalRecords.map((pr) => (
          <Card key={pr.lift} hover>
            <div className="flex items-start justify-between">
              <TrophyBadge tier={pr.tier} />
              <span className="chip border-accent/30 text-accent">
                <TrendingUp size={14} /> {pr.gain}
              </span>
            </div>
            <p className="mt-5 text-sm text-muted">{pr.lift}</p>
            <p className="font-display text-4xl font-bold">
              {pr.value}
              <span className="ml-1.5 text-base font-medium text-muted">{pr.unit}</span>
            </p>
            <p className="mt-1 text-xs text-muted">Set on {pr.date}</p>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
}
