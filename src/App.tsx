import React, { useState } from 'react'
import { AppProvider } from './state/AppContext'
import { MatrixRain } from './components/effects/MatrixRain'
import { BootSequence } from './components/effects/BootSequence'
import { VSCodeShell } from './components/layout/VSCodeShell'
import { useUnlockables } from './hooks/useUnlockables'
import './App.css'

function AppContent() {
  const [bootComplete, setBootComplete] = useState(false)
  const { activeThemeId } = useUnlockables()

  React.useEffect(() => {
    document.documentElement.dataset.theme = activeThemeId
  }, [activeThemeId])

  return (
    <div className="app-root">
      <MatrixRain />
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
      {bootComplete && <VSCodeShell />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
