import React, { useState, useEffect } from 'react'
import './GlitchText.css'

interface GlitchTextProps {
  children: React.ReactNode
  intensity?: 'low' | 'medium' | 'high'
}

export function GlitchText({ children, intensity = 'medium' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 100)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`glitch-text glitch-${intensity} ${isGlitching ? 'glitching' : ''}`}>
      {children}
    </span>
  )
}
