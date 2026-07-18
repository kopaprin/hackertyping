import React, { useEffect, useState } from 'react'
import { Unlockable } from '../../state/types'
import './UnlockToast.css'

interface UnlockToastProps {
  unlockables: Unlockable[]
}

export function UnlockToast({ unlockables }: UnlockToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible || unlockables.length === 0) return null

  return (
    <div className="unlock-toast">
      <div className="unlock-icon">🔓</div>
      <div className="unlock-content">
        <div className="unlock-title">Achievement Unlocked!</div>
        <div className="unlock-items">
          {unlockables.map((u) => (
            <div key={u.id} className="unlock-item">
              {u.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
