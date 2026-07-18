import React from 'react'
import './ActivityBar.css'

interface ActivityBarProps {
  onToggleTerminal: () => void
}

export function ActivityBar({ onToggleTerminal }: ActivityBarProps) {
  return (
    <div className="activity-bar">
      <div className="activity-icon" title="Explorer">
        📁
      </div>
      <div className="activity-icon" title="Unlocks">
        🔓
      </div>
      <div className="activity-icon" title="Settings" onClick={onToggleTerminal}>
        ⚙️
      </div>
    </div>
  )
}
