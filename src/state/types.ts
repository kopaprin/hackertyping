export type Mode = 'hacker' | 'hard'

export interface Snippet {
  id: string
  title: string
  topic: 'algorithm' | 'script' | 'class' | 'list-comprehension' | 'recursion' | 'file-io' | 'decorator'
  code: string
}

export type UnlockableType = 'theme' | 'effect' | 'snippet'

export interface UnlockCriteria {
  kind: 'wpmThreshold' | 'accuracyThreshold' | 'roundsCompleted' | 'allSnippetsCompleted'
  value?: number
}

export interface Unlockable {
  id: string
  name: string
  description: string
  type: UnlockableType
  criteria: UnlockCriteria
  unlocked?: boolean
}

export interface UnlockProgress {
  roundsCompleted: number
  bestWpm: number
  bestAccuracy: number
  completedSnippetIds: string[]
}

export interface UnlockState {
  unlockedIds: string[]
  progress: UnlockProgress
  activeThemeId: string
  activeEffectId: string | null
}

export interface AppState {
  mode: Mode
  snippetId: string
  unlockedIds: string[]
  progress: UnlockProgress
  activeThemeId: string
  activeEffectId: string | null
}

export type AppAction =
  | { type: 'SET_MODE'; payload: { mode: Mode; snippetId: string } }
  | { type: 'SET_SNIPPET'; payload: string }
  | { type: 'SET_THEME'; payload: string }
  | { type: 'SET_EFFECT'; payload: string | null }
  | { type: 'RECORD_ROUND'; payload: { mode: Mode; wpm: number; accuracy: number; snippetId: string } }
  | { type: 'UNLOCK_ITEMS'; payload: string[] }
  | { type: 'HYDRATE'; payload: Partial<AppState> }

export interface SessionStats {
  mode: Mode
  wpm: number
  accuracy: number
  snippetId: string
}
