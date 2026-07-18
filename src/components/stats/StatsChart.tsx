import React from 'react'
import './StatsChart.css'

interface Sample {
  t: number
  wpm: number
  accuracy: number
}

interface StatsChartProps {
  samples: Sample[]
  maxWpm?: number
  height?: number
}

export function StatsChart({ samples, maxWpm = 100, height = 100 }: StatsChartProps) {
  if (samples.length === 0) {
    return <div className="stats-chart-empty">No data yet...</div>
  }

  const width = Math.max(samples.length * 2, 200)
  const padding = 10

  const points = samples.map((sample, idx) => {
    const x = padding + (idx / Math.max(samples.length - 1, 1)) * (width - padding * 2)
    const y = height - padding - (sample.wpm / maxWpm) * (height - padding * 2)
    return `${x},${y}`
  })

  const polylinePoints = points.join(' ')

  return (
    <div className="stats-chart">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="var(--color-accent, #00ff00)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="var(--color-accent, #00ff00)"
          strokeWidth="1"
          strokeDasharray="4,4"
          opacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
