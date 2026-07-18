import React from 'react'
import { useAppState } from '../../state/AppContext'
import './TitleBar.css'

export function TitleBar() {
  const { state } = useAppState()
  const modeLabel = state.mode === 'hacker' ? 'hacker_mode' : 'hard_mode'

  return (
    <div className="title-bar">
      <div className="title-bar-controls">
        <div className="control minimize"></div>
        <div className="control maximize"></div>
        <div className="control close"></div>
      </div>
      <div className="title-bar-text">
        Hacker Typing — {modeLabel}.py
      </div>
    </div>
  )
}
