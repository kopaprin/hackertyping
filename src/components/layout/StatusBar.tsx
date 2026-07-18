import React from 'react'
import { Snippet } from '../../state/types'
import { useAppState } from '../../state/AppContext'
import './StatusBar.css'

interface StatusBarProps {
  wpm: number
  accuracy: number
  snippet: Snippet
}

export function StatusBar({ wpm, accuracy, snippet }: StatusBarProps) {
  const { state } = useAppState()
  const modeLabel = state.mode === 'hacker' ? 'HACKER' : 'HARD'

  return (
    <div className="status-bar">
      <div className="status-item">Mode: {modeLabel}</div>
      <div className="status-item">WPM: {Math.round(wpm)}</div>
      <div className="status-item">Accuracy: {Math.round(accuracy)}%</div>
      <div className="status-item">Topic: {snippet.topic}</div>
      <div className="status-item status-right">Ln 1, Col 1</div>
    </div>
  )
}
