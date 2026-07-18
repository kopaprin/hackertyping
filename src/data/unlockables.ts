import { Unlockable } from '../state/types'

export const unlockables: Unlockable[] = [
  {
    id: 'theme-cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Reach 40 WPM in Hard mode',
    type: 'theme',
    criteria: { kind: 'wpmThreshold', value: 40 },
  },
  {
    id: 'theme-amber-terminal',
    name: 'Amber Terminal',
    description: 'Complete 5 Hard mode rounds',
    type: 'theme',
    criteria: { kind: 'roundsCompleted', value: 5 },
  },
  {
    id: 'theme-matrix-green',
    name: 'Matrix Green',
    description: 'Reach 90% accuracy',
    type: 'theme',
    criteria: { kind: 'accuracyThreshold', value: 90 },
  },
  {
    id: 'effect-heavy-glitch',
    name: 'Heavy Glitch Overlay',
    description: 'Finish a round at 98%+ accuracy',
    type: 'effect',
    criteria: { kind: 'accuracyThreshold', value: 98 },
  },
  {
    id: 'effect-rainbow-text',
    name: 'Rainbow Text Effect',
    description: 'Complete 10 Hard mode rounds',
    type: 'effect',
    criteria: { kind: 'roundsCompleted', value: 10 },
  },
  {
    id: 'snippet-bonus-pack',
    name: 'Bonus Snippet Pack',
    description: 'Complete all 10 snippets at least once',
    type: 'snippet',
    criteria: { kind: 'allSnippetsCompleted' },
  },
  {
    id: 'theme-dark-mode-pro',
    name: 'Dark Mode Pro',
    description: 'Reach 50 WPM',
    type: 'theme',
    criteria: { kind: 'wpmThreshold', value: 50 },
  },
  {
    id: 'effect-pulse-glow',
    name: 'Pulse Glow Effect',
    description: 'Complete 20 Hard mode rounds',
    type: 'effect',
    criteria: { kind: 'roundsCompleted', value: 20 },
  },
]
