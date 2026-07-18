import React, { useState } from 'react'
import { Unlockable } from '../../state/types'
import './UnlockGallery.css'

interface UnlockGalleryProps {
  unlockables: Unlockable[]
  onThemeSelect: (themeId: string) => void
  onEffectSelect: (effectId: string | null) => void
  activeThemeId: string
  activeEffectId: string | null
}

export function UnlockGallery({
  unlockables,
  onThemeSelect,
  onEffectSelect,
  activeThemeId,
  activeEffectId,
}: UnlockGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)

  const themes = unlockables.filter((u) => u.type === 'theme')
  const effects = unlockables.filter((u) => u.type === 'effect')
  const snippets = unlockables.filter((u) => u.type === 'snippet')

  if (!isOpen) {
    return (
      <button className="unlock-gallery-btn" onClick={() => setIsOpen(true)}>
        Unlocks
      </button>
    )
  }

  return (
    <div className="unlock-gallery-modal" onClick={() => setIsOpen(false)}>
      <div className="unlock-gallery-content" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-header">
          <h2>🔓 Unlockables</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        <div className="gallery-section">
          <h3>Themes</h3>
          <div className="gallery-items">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`gallery-item ${theme.unlocked ? 'unlocked' : 'locked'} ${
                  activeThemeId === theme.id ? 'active' : ''
                }`}
                onClick={() => {
                  if (theme.unlocked) onThemeSelect(theme.id)
                }}
              >
                <div className="item-icon">{theme.unlocked ? '🎨' : '🔒'}</div>
                <div className="item-name">{theme.name}</div>
                {!theme.unlocked && <div className="item-hint">{theme.description}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-section">
          <h3>Effects</h3>
          <div className="gallery-items">
            {effects.map((effect) => (
              <div
                key={effect.id}
                className={`gallery-item ${effect.unlocked ? 'unlocked' : 'locked'} ${
                  activeEffectId === effect.id ? 'active' : ''
                }`}
                onClick={() => {
                  if (effect.unlocked) {
                    onEffectSelect(activeEffectId === effect.id ? null : effect.id)
                  }
                }}
              >
                <div className="item-icon">{effect.unlocked ? '✨' : '🔒'}</div>
                <div className="item-name">{effect.name}</div>
                {!effect.unlocked && <div className="item-hint">{effect.description}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-section">
          <h3>Bonus Snippets</h3>
          <div className="gallery-items">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className={`gallery-item ${snippet.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="item-icon">{snippet.unlocked ? '📚' : '🔒'}</div>
                <div className="item-name">{snippet.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
