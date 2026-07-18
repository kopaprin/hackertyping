import React from 'react'
import { ModeSelect } from '../ModeSelect'
import './Sidebar.css'

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">EXPLORER</div>
        <div className="sidebar-content">
          <ModeSelect />
        </div>
      </div>
    </div>
  )
}
