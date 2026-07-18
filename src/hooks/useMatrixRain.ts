import { useEffect } from 'react'

const CHARACTERS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const COLUMN_WIDTH = 20

export function useMatrixRain(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.ceil(canvas.width / COLUMN_WIDTH)
    const drops: number[] = Array(columns).fill(0)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff00'
      ctx.font = '12px "Monaco", "Courier New", monospace'
      ctx.globalAlpha = 0.8

      for (let i = 0; i < drops.length; i++) {
        const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        const x = i * COLUMN_WIDTH
        const y = drops[i] * COLUMN_WIDTH

        ctx.fillText(char, x, y)

        if (drops[i] * COLUMN_WIDTH > canvas.height && Math.random() > 0.9) {
          drops[i] = 0
        } else {
          drops[i]++
        }
      }

      ctx.globalAlpha = 1
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
      } else {
        animationId = requestAnimationFrame(animate)
      }
    }

    let animationId = requestAnimationFrame(animate)

    function animate() {
      draw()
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationId)
    }
  }, [canvasRef])
}
