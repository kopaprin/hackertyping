import React, { useState } from 'react'
import { TitleBar } from './TitleBar'
import { ActivityBar } from './ActivityBar'
import { Sidebar } from './Sidebar'
import { TabBar } from './TabBar'
import { CodeEditor } from '../editor/CodeEditor'
import { StatusBar } from './StatusBar'
import { TerminalPanel } from './TerminalPanel'
import { useAppState } from '../../state/AppContext'
import { snippets } from '../../data/snippets'
import './VSCodeShell.css'

export function VSCodeShell() {
  const { state } = useAppState()
  const currentSnippet = snippets.find((s) => s.id === state.snippetId) || snippets[0]
  const [showTerminal, setShowTerminal] = useState(false)
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100 })

  return (
    <div className="vscode-shell" data-theme={state.activeThemeId}>
      <TitleBar />
      <div className="vscode-main">
        <ActivityBar onToggleTerminal={() => setShowTerminal(!showTerminal)} />
        <Sidebar />
        <div className="vscode-editor-area">
          <TabBar snippet={currentSnippet} />
          <div className="vscode-editor-pane">
            <CodeEditor
              key={`${state.mode}-${state.snippetId}`}
              code={currentSnippet.code}
              mode={state.mode}
              onStatsUpdate={(wpm, accuracy) => setStats({ wpm, accuracy })}
            />
          </div>
          {showTerminal && <TerminalPanel />}
        </div>
      </div>
      <StatusBar wpm={stats.wpm} accuracy={stats.accuracy} snippet={currentSnippet} />
    </div>
  )
}
