import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

const darkTheme = EditorView.theme(
  {
    '.cm-content': {
      fontFamily: '"Monaco", "Courier New", monospace',
      fontSize: '14px',
      lineHeight: '1.5',
      color: 'var(--color-text, #00ff00)',
      backgroundColor: 'transparent',
    },
    '.cm-gutters': {
      backgroundColor: 'var(--color-bg-dim, #1a1a1a)',
      color: 'var(--color-text-muted, #666)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'var(--color-bg-lighter, #2d2d2d)',
    },
    '.cm-cursor': {
      borderLeftColor: 'var(--color-accent, #00ff00)',
    },
    '.cm-selectionBackground': {
      backgroundColor: 'var(--color-selection, rgba(0,255,0,0.2))',
    },
    '.cm-matching-bracket': {
      outline: '1px solid var(--color-accent, #00ff00)',
      backgroundColor: 'var(--color-bg-lighter, #2d2d2d)',
    },
    '.cm-correct': {
      backgroundColor: 'rgba(0, 200, 0, 0.15)',
      textDecoration: 'underline wavy #00c800',
    },
    '.cm-incorrect': {
      backgroundColor: 'rgba(255, 0, 0, 0.15)',
      textDecoration: 'underline wavy #ff0000',
    },
  },
  { dark: true }
)

const highlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#ff79c6' },
  { tag: t.string, color: '#a1efe4' },
  { tag: t.number, color: '#bd93f9' },
  { tag: t.boolean, color: '#bd93f9' },
  { tag: t.variableName, color: '#8be9fd' },
  { tag: t.function(t.variableName), color: '#50fa7b' },
  { tag: t.comment, color: '#6272a4' },
  { tag: t.operator, color: '#ff79c6' },
  { tag: t.propertyName, color: '#8be9fd' },
  { tag: t.className, color: '#50fa7b' },
  { tag: t.punctuation, color: '#f8f8f2' },
])

export function getEditorTheme() {
  return [darkTheme, syntaxHighlighting(highlightStyle)]
}
