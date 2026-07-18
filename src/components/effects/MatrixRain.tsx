import React, { useRef } from 'react'
import { useMatrixRain } from '../../hooks/useMatrixRain'
import './MatrixRain.css'

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useMatrixRain(canvasRef)

  return <canvas ref={canvasRef} className="matrix-rain" />
}
