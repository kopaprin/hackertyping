export function calculateWPM(correctChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0
  const elapsedMinutes = elapsedMs / 60000
  return (correctChars / 5) / elapsedMinutes
}

export function calculateAccuracy(totalKeystrokes: number, totalErrors: number): number {
  if (totalKeystrokes === 0) return 100
  return ((totalKeystrokes - totalErrors) / totalKeystrokes) * 100
}

export function normalizeKey(key: string, shiftKey: boolean): string {
  if (key === 'Enter') return '\n'
  if (key === ' ') return ' '
  if (key === 'Tab') return '\t'
  if (key.length === 1) {
    return shiftKey ? key.toUpperCase() : key.toLowerCase()
  }
  return key
}

export function isModifierKey(key: string): boolean {
  return ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(key)
}
