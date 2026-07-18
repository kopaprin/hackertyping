import { Snippet } from '../state/types'

export function randomPick(items: Snippet[], excludeId?: string): Snippet {
  const filtered = excludeId ? items.filter((item) => item.id !== excludeId) : items
  if (filtered.length === 0) return items[0]
  return filtered[Math.floor(Math.random() * filtered.length)]
}
