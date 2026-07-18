import React from 'react'
import { Snippet } from '../../state/types'
import { useAppState } from '../../state/AppContext'
import { snippets } from '../../data/snippets'
import { randomPick } from '../../utils/randomPick'
import './TabBar.css'

interface TabBarProps {
  snippet: Snippet
}

export function TabBar({ snippet }: TabBarProps) {
  const { dispatch, state } = useAppState()

  const handleReroll = () => {
    const newSnippet = randomPick(snippets, state.snippetId)
    dispatch({
      type: 'SET_SNIPPET',
      payload: newSnippet.id,
    })
  }

  return (
    <div className="tab-bar">
      <div className="tab active">
        <span className="tab-icon">📄</span>
        <span className="tab-name">{snippet.title}</span>
      </div>
      <div className="tab-actions">
        <button className="tab-action-btn" title="Reroll (next snippet)" onClick={handleReroll}>
          🔄
        </button>
      </div>
    </div>
  )
}
