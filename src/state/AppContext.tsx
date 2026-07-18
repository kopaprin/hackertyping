import React, { createContext, useReducer, ReactNode, useEffect } from 'react'
import { AppState, AppAction } from './types'

const STORAGE_KEY = 'hackertyping.save.v1'

const initialState: AppState = {
  mode: 'hacker',
  snippetId: 'bubble-sort',
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

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload.mode,
        snippetId: action.payload.snippetId,
      }
    case 'SET_SNIPPET':
      return { ...state, snippetId: action.payload }
    case 'SET_THEME':
      return { ...state, activeThemeId: action.payload }
    case 'SET_EFFECT':
      return { ...state, activeEffectId: action.payload }
    case 'UNLOCK_ITEMS':
      return {
        ...state,
        unlockedIds: Array.from(new Set([...state.unlockedIds, ...action.payload])),
      }
    case 'RECORD_ROUND':
      return {
        ...state,
        progress: {
          ...state.progress,
          roundsCompleted: state.progress.roundsCompleted + 1,
          bestWpm: Math.max(state.progress.bestWpm, action.payload.wpm),
          bestAccuracy: Math.max(state.progress.bestAccuracy, action.payload.accuracy),
          completedSnippetIds: action.payload.mode === 'hard'
            ? Array.from(new Set([...state.progress.completedSnippetIds, action.payload.snippetId]))
            : state.progress.completedSnippetIds,
        },
      }
    case 'HYDRATE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return { ...initial, ...parsed }
      } catch {
        return initial
      }
    }
    return initial
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppState() {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context
}
