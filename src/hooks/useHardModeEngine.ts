import { useState, useRef, useEffect, useCallback } from 'react'
import { calculateWPM, calculateAccuracy, normalizeKey, isModifierKey } from '../utils/typingStats'

interface HardEngineState {
  correctness: ('pending' | 'correct' | 'incorrect')[]
  cursorIndex: number
  totalKeystrokes: number
  totalErrors: number
  firstKeystrokeAt: number | null
  samples: { t: number; wpm: number; accuracy: number }[]
  isComplete: boolean
  elapsedMs: number
}

export function useHardModeEngine(
  targetCode: string,
  onStatsUpdate: (wpm: number, accuracy: number, cursorIndex: number, samples: any[]) => void,
  onComplete: (stats: { wpm: number; accuracy: number }) => void
) {
  const [state, setState] = useState<HardEngineState>({
    correctness: Array(targetCode.length).fill('pending'),
    cursorIndex: 0,
    totalKeystrokes: 0,
    totalErrors: 0,
    firstKeystrokeAt: null,
    samples: [],
    isComplete: false,
    elapsedMs: 0,
  })

  const statsTimerRef = useRef<NodeJS.Timeout | null>(null)

  const updateStats = useCallback(
    (newState: HardEngineState) => {
      if (!newState.firstKeystrokeAt) return

      const elapsed = Date.now() - newState.firstKeystrokeAt
      const correctChars = newState.correctness.filter((c) => c === 'correct').length
      const wpm = calculateWPM(correctChars, elapsed)
      const accuracy = calculateAccuracy(newState.totalKeystrokes, newState.totalErrors)

      onStatsUpdate(wpm, accuracy, newState.cursorIndex, newState.samples)
    },
    [onStatsUpdate]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (state.isComplete || isModifierKey(event.key)) {
        return
      }

      event.preventDefault()

      setState((prev) => {
        let newState = { ...prev }

        if (!newState.firstKeystrokeAt) {
          newState.firstKeystrokeAt = Date.now()
        }

        if (event.key === 'Backspace') {
          if (newState.cursorIndex > 0) {
            newState.cursorIndex--
            newState.correctness[newState.cursorIndex] = 'pending'
          }
        } else {
          const normalizedKey = normalizeKey(event.key, event.shiftKey)
          const targetChar = targetCode[newState.cursorIndex]

          if (normalizedKey === targetChar) {
            newState.correctness[newState.cursorIndex] = 'correct'
          } else {
            newState.correctness[newState.cursorIndex] = 'incorrect'
            newState.totalErrors++
          }

          newState.cursorIndex++
          newState.totalKeystrokes++

          if (newState.cursorIndex >= targetCode.length) {
            newState.isComplete = true
            const elapsed = Date.now() - (newState.firstKeystrokeAt || Date.now())
            const correctChars = newState.correctness.filter((c) => c === 'correct').length
            const finalWpm = calculateWPM(correctChars, elapsed)
            const finalAccuracy = calculateAccuracy(newState.totalKeystrokes, newState.totalErrors)
            onComplete({ wpm: finalWpm, accuracy: finalAccuracy })
          }
        }

        newState.elapsedMs = newState.firstKeystrokeAt ? Date.now() - newState.firstKeystrokeAt : 0
        updateStats(newState)
        return newState
      })
    },
    [state.isComplete, targetCode, onComplete, updateStats]
  )

  // Update stats every 500ms
  useEffect(() => {
    if (!state.isComplete && state.firstKeystrokeAt) {
      statsTimerRef.current = setInterval(() => {
        setState((prev) => {
          const elapsed = Date.now() - (prev.firstKeystrokeAt || Date.now())
          const correctChars = prev.correctness.filter((c) => c === 'correct').length
          const wpm = calculateWPM(correctChars, elapsed)
          const accuracy = calculateAccuracy(prev.totalKeystrokes, prev.totalErrors)

          const newSamples = [...prev.samples, { t: Date.now(), wpm, accuracy }].slice(-60)

          return { ...prev, samples: newSamples }
        })
      }, 500)
    }

    return () => {
      if (statsTimerRef.current) clearInterval(statsTimerRef.current)
    }
  }, [state.isComplete, state.firstKeystrokeAt])

  useEffect(() => {
    if (!state.isComplete) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, state.isComplete])

  return {
    correctness: state.correctness,
    cursorIndex: state.cursorIndex,
    totalKeystrokes: state.totalKeystrokes,
    totalErrors: state.totalErrors,
    wpm: state.samples.length > 0 ? state.samples[state.samples.length - 1].wpm : 0,
    accuracy: state.samples.length > 0 ? state.samples[state.samples.length - 1].accuracy : 100,
    isComplete: state.isComplete,
    elapsedMs: state.elapsedMs,
    samples: state.samples,
  }
}
