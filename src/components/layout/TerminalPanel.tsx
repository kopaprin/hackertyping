import React, { useRef, useEffect, useState } from 'react'
import { terminalLines } from '../../data/terminalLines'
import './TerminalPanel.css'

export function TerminalPanel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])

  useEffect(() => {
    let lineIndex = 0

    const interval = setInterval(() => {
      if (lineIndex < terminalLines.length) {
        setDisplayedLines((prev) => [...prev, terminalLines[lineIndex]])
        lineIndex++
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayedLines])

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <span className="terminal-title">Terminal</span>
      </div>
      <div className="terminal-content" ref={scrollRef}>
        {displayedLines.map((line, idx) => (
          <div key={idx} className="terminal-line">
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}
