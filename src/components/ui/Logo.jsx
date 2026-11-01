import { Link } from 'react-router-dom'

const sizes = {
  sm: { text: 'text-xl', box: 'h-8 w-8', icon: 'h-4 w-4' },
  md: { text: 'text-2xl', box: 'h-9 w-9', icon: 'h-5 w-5' },
}

export default function Logo({ to = '/', size = 'md', className = '' }) {
  const s = sizes[size]
  return (
    <Link to={to} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="PulseFit home">
      <span
        className={`bg-brand grid ${s.box} place-items-center rounded-xl shadow-[0_0_24px_-4px_rgba(198,255,61,0.65)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}
      >
        <svg viewBox="0 0 24 24" className={s.icon} fill="none" stroke="#071006" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12.5h4.5l2.5-6 4 12 2.5-6H22" />
        </svg>
      </span>
      <span className={`font-display font-bold tracking-tighter ${s.text}`}>
        <span className="text-gradient">PulseFit</span>
      </span>
    </Link>
  )
}
