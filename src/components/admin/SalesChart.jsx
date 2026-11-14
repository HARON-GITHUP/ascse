export function SalesChart({ data, labels, formatValue }) {
  const max = Math.max(...data.map((value) => value.value), 1)
  const width = 640
  const height = 220
  const pad = { top: 18, right: 10, bottom: 26, left: 40 }
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom
  const step = innerW / Math.max(data.length - 1, 1)
  const points = data.map((item, index) => ({
    x: pad.left + index * step,
    y: pad.top + innerH - (item.value / max) * innerH,
    ...item,
  }))
  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
  const area = `${path} L ${pad.left + (data.length - 1) * step} ${pad.top + innerH} L ${pad.left} ${pad.top + innerH} Z`

  const ticks = [0, 0.5, 1].map((ratio) => ({
    y: pad.top + innerH - ratio * innerH,
    value: Math.round(max * ratio),
  }))

  return (
    <svg
      className="sales-chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="مبيعات حسب اليوم"
    >
      <defs>
        <linearGradient id="salesChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--olive)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--olive)" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {ticks.map((tick) => (
        <g key={tick.y}>
          <line
            x1={pad.left}
            x2={width - pad.right}
            y1={tick.y}
            y2={tick.y}
            stroke="var(--line)"
            strokeDasharray="3 5"
          />
          <text x={pad.left - 8} y={tick.y + 3} textAnchor="end" className="sales-chart__tick">
            {formatValue ? formatValue(tick.value) : tick.value}
          </text>
        </g>
      ))}

      <path d={area} fill="url(#salesChartFill)" />
      <path d={path} fill="none" stroke="var(--olive)" strokeWidth="2.4" strokeLinecap="round" />

      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="3.4" fill="var(--paper)" stroke="var(--olive)" strokeWidth="2" />
          <text x={point.x} y={height - 8} textAnchor="middle" className="sales-chart__tick">
            {point.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
