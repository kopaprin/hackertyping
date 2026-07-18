import { useState, useRef, useEffect, useCallback } from 'react'
import { isModifierKey } from '../utils/typingStats'

interface HackerEngineState {
  revealIndex: number
  elapsedMs: number
  isComplete: boolean
}

export function useHackerModeEngine(
  targetCode: string,
  onStatsUpdate: (wpm: number, accuracy: number, index: number) => void,
  onComplete: () => void
) {
  const [state, setState] = useState<HackerEngineState>({
    revealIndex: 0,
    elapsedMs: 0,
    isComplete: false,
  })

  const revealQueueRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())
  const lastTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [targetCode])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (state.isComplete || isModifierKey(event.key)) {
        return
      }

      event.preventDefault()
      revealQueueRef.current++

      // Drain queue with timing
      const drainQueue = () => {
        if (revealQueueRef.current > 0 && state.revealIndex < targetCode.length) {
          setState((prev) => {
            const newIndex = Math.min(prev.revealIndex + 1, targetCode.length)
            const elapsed = Date.now() - startTimeRef.current
            const wpm = (newIndex / 5) / (Math.max(elapsed / 60000, 0.001))

            onStatsUpdate(wpm, 100, newIndex)

            if (newIndex >= targetCode.length) {
              setTimeout(onComplete, 500)
              return { ...prev, revealIndex: newIndex, isComplete: true, elapsedMs: elapsed }
            }

            return { ...prev, revealIndex: newIndex, elapsedMs: elapsed }
          })

          revealQueueRef.current--

          const delay = 40 + Math.random() * 40
          lastTimerRef.current = setTimeout(drainQueue, delay)
        }
      }

      drainQueue()
    },
    [state.isComplete, state.revealIndex, targetCode, onStatsUpdate, onComplete]
  )

  useEffect(() => {
    if (!state.isComplete) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, state.isComplete])

  return { revealIndex: state.revealIndex, elapsedMs: state.elapsedMs, isComplete: state.isComplete }
}
