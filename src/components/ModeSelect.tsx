import React from 'react'
import { useAppState } from '../state/AppContext'
import { snippets } from '../data/snippets'
import { randomPick } from '../utils/randomPick'
import './ModeSelect.css'

export function ModeSelect() {
  const { state, dispatch } = useAppState()

  const handleModeChange = (mode: 'hacker' | 'hard') => {
    const snippet = randomPick(snippets)
    dispatch({
      type: 'SET_MODE',
      payload: { mode, snippetId: snippet.id },
    })
  }

  return (
    <div className="mode-select">
      <div className="mode-group">
        <div className={`mode-item ${state.mode === 'hacker' ? 'active' : ''}`}>
          <span className="mode-icon">📝</span>
          <span
            className="mode-label"
            onClick={() => handleModeChange('hacker')}
          >
            hacker_mode.py
          </span>
        </div>
        <div className={`mode-item ${state.mode === 'hard' ? 'active' : ''}`}>
          <span className="mode-icon">⌨️</span>
          <span
            className="mode-label"
            onClick={() => handleModeChange('hard')}
          >
            hard_mode.py
          </span>
        </div>
      </div>
    </div>
  )
}
