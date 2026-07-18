import React from 'react'
import './StatsPanel.css'

interface StatsPanelProps {
  wpm: number
  accuracy: number
  elapsedSeconds: number
  errors: number
}

export function StatsPanel({ wpm, accuracy, elapsedSeconds, errors }: StatsPanelProps) {
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60

  return (
    <div className="stats-panel">
      <div className="stat-group">
        <div className="stat-label">WPM</div>
        <div className="stat-value">{Math.round(wpm)}</div>
      </div>
      <div className="stat-group">
        <div className="stat-label">Accuracy</div>
        <div className="stat-value">{Math.round(accuracy)}%</div>
      </div>
      <div className="stat-group">
        <div className="stat-label">Time</div>
        <div className="stat-value">{minutes}:{String(seconds).padStart(2, '0')}</div>
      </div>
      <div className="stat-group">
        <div className="stat-label">Errors</div>
        <div className="stat-value">{errors}</div>
      </div>
    </div>
  )
}
