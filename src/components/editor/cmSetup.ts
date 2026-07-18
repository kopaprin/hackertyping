import { python } from '@codemirror/lang-python'
import { EditorView, keymap, highlightSelectionMatches } from '@codemirror/view'
import { EditorState, Extension } from '@codemirror/state'

export function createExtensions(): Extension[] {
  return [
    python(),
    EditorView.editable.of(false),
    keymap.of([]),
    highlightSelectionMatches(),
  ]
}

export function createBasicExtensions(): Extension[] {
  return [
    python(),
    EditorView.editable.of(false),
    highlightSelectionMatches(),
  ]
}

export function createDocState(initialCode: string, extensions: Extension[]): EditorState {
  return EditorState.create({
    doc: initialCode,
    extensions,
  })
}
