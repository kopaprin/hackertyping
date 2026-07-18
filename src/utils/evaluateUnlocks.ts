import { Unlockable, UnlockProgress } from '../state/types'

export function evaluateUnlocks(
  progress: UnlockProgress,
  unlockables: Unlockable[],
  currentUnlockedIds: string[]
): string[] {
  const newlyUnlocked: string[] = []

  for (const unlockable of unlockables) {
    if (currentUnlockedIds.includes(unlockable.id)) {
      continue
    }

    let isMet = false

    switch (unlockable.criteria.kind) {
      case 'wpmThreshold':
        isMet = progress.bestWpm >= (unlockable.criteria.value ?? 0)
        break
      case 'accuracyThreshold':
        isMet = progress.bestAccuracy >= (unlockable.criteria.value ?? 0)
        break
      case 'roundsCompleted':
        isMet = progress.roundsCompleted >= (unlockable.criteria.value ?? 0)
        break
      case 'allSnippetsCompleted':
        isMet = progress.completedSnippetIds.length >= 10
        break
    }

    if (isMet) {
      newlyUnlocked.push(unlockable.id)
    }
  }

  return newlyUnlocked
}
