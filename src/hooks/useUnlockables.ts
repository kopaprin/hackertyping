import { useState, useEffect } from 'react'
import { unlockables } from '../data/unlockables'
import { UnlockState } from '../state/types'
import { evaluateUnlocks } from '../utils/evaluateUnlocks'

const STORAGE_KEY = 'hackertyping.unlocks.v1'

const initialState: UnlockState = {
  unlockedIds: [],
  progress: {
    roundsCompleted: 0,
    bestWpm: 0,
    bestAccuracy: 0,
    completedSnippetIds: [],
  },
  activeThemeId: 'default',
  activeEffectId: null,
}

export function useUnlockables() {
  const [state, setState] = useState<UnlockState>(initialState)
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([])

  // Load from storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState(parsed)
      } catch {
        setState(initialState)
      }
    }
  }, [])

  // Persist to storage on state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const recordRoundResult = (mode: 'hacker' | 'hard', wpm: number, accuracy: number, snippetId: string) => {
    setState((prev) => {
      let newProgress = { ...prev.progress, roundsCompleted: prev.progress.roundsCompleted + 1 }

      newProgress.bestWpm = Math.max(newProgress.bestWpm, wpm)
      newProgress.bestAccuracy = Math.max(newProgress.bestAccuracy, accuracy)

      if (mode === 'hard') {
        newProgress.completedSnippetIds = Array.from(
          new Set([...newProgress.completedSnippetIds, snippetId])
        )
      }

      const newlyUnlockedIds = evaluateUnlocks(newProgress, unlockables, prev.unlockedIds)
      const newUnlockedIds = Array.from(new Set([...prev.unlockedIds, ...newlyUnlockedIds]))

      if (newlyUnlockedIds.length > 0) {
        setNewlyUnlocked(newlyUnlockedIds)
        setTimeout(() => setNewlyUnlocked([]), 3000)
      }

      return {
        ...prev,
        progress: newProgress,
        unlockedIds: newUnlockedIds,
      }
    })
  }

  const setTheme = (themeId: string) => {
    setState((prev) => ({ ...prev, activeThemeId: themeId }))
  }

  const setEffect = (effectId: string | null) => {
    setState((prev) => ({ ...prev, activeEffectId: effectId }))
  }

  const unlockedList = unlockables.map((u) => ({
    ...u,
    unlocked: state.unlockedIds.includes(u.id),
  }))

  return {
    unlockables: unlockedList,
    progress: state.progress,
    activeThemeId: state.activeThemeId,
    activeEffectId: state.activeEffectId,
    newlyUnlocked,
    recordRoundResult,
    setTheme,
    setEffect,
  }
}
