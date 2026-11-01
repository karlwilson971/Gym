export default function ChartTooltip({ active, payload, label, unit = '', color }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-sm">
      <p className="mb-1 text-xs text-muted">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center gap-2 font-medium">
          <span className="h-2 w-2 rounded-full" style={{ background: color ?? p.stroke ?? p.color }} />
          <span className="text-muted">{p.name}</span>
          <span className="font-display">
            {p.value}
            {unit}
          </span>
        </p>
      ))}
    </div>
  )
}
