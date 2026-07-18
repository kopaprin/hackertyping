import React, { useState, useEffect } from 'react'
import { bootLines } from '../../data/bootLines'
import './BootSequence.css'

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let lineIndex = 0
    let lineTimer: NodeJS.Timeout

    const displayNextLine = () => {
      if (lineIndex < bootLines.length) {
        setDisplayedLines((prev) => [...prev, bootLines[lineIndex]])
        setProgress(Math.round(((lineIndex + 1) / bootLines.length) * 100))
        lineIndex++
        lineTimer = setTimeout(displayNextLine, 300)
      } else {
        setTimeout(onComplete, 800)
      }
    }

    displayNextLine()

    return () => clearTimeout(lineTimer)
  }, [onComplete])

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="boot-sequence">
      <div className="boot-content">
        <div className="boot-lines">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="boot-line">
              {line}
            </div>
          ))}
          <div className="boot-cursor">▌</div>
        </div>
        <div className="boot-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="boot-hint">
          Press ESC or click to skip
        </div>
      </div>
    </div>
  )
}
