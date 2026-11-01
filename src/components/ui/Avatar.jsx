import { user } from '../../data/mockData'

export default function Avatar({ size = 40, className = '' }) {
  return (
    <span
      className={`bg-brand relative grid shrink-0 place-items-center rounded-full font-display font-bold text-ink ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {user.initials}
    </span>
  )
}
