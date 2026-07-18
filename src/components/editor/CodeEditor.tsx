import React, { useRef, useEffect, useState } from 'react'
import { EditorView, EditorViewConfig } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { getEditorTheme } from './vscodeTheme'
import { createBasicExtensions } from './cmSetup'

interface CodeEditorProps {
  code: string
  mode: 'hacker' | 'hard'
  onStatsUpdate?: (wpm: number, accuracy: number, cursorIndex: number) => void
  onComplete?: () => void
}

export const CodeEditor = React.forwardRef<
  { view: EditorView | null },
  CodeEditorProps
>(({ code, mode, onStatsUpdate, onComplete }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const extensions = [...createBasicExtensions(), ...getEditorTheme()]

    const state = EditorState.create({
      doc: code,
      extensions,
    })

    const view = new EditorView({
      state,
      parent: containerRef.current,
    })

    viewRef.current = view
    setIsReady(true)

    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, [])

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref({ view: viewRef.current })
      } else {
        ref.current = { view: viewRef.current }
      }
    }
  }, [ref, isReady])

  return <div ref={containerRef} className="code-editor-container" />
})

CodeEditor.displayName = 'CodeEditor'
