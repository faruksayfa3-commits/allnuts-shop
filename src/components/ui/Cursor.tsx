'use client'

import { useEffect, useRef } from 'react'

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    // Hover effects
    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          ringRef.current?.classList.add('cursor-hover')
          dotRef.current?.classList.add('cursor-hover')
        })
        el.addEventListener('mouseleave', () => {
          ringRef.current?.classList.remove('cursor-hover')
          dotRef.current?.classList.remove('cursor-hover')
        })
      })
    }
    addHover()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 8px; height: 8px;
          background: #EC1C24;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transition: opacity 0.2s;
          mix-blend-mode: normal;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 40px; height: 40px;
          border: 1.5px solid rgba(236,28,36,0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transition: border-color 0.3s, width 0.3s, height 0.3s, background 0.3s;
        }
        .cursor-ring.cursor-hover {
          width: 56px; height: 56px;
          border-color: rgba(236,28,36,0.9);
          background: rgba(236,28,36,0.06);
          margin-top: -8px; margin-left: -8px;
        }
        .cursor-dot.cursor-hover {
          width: 6px; height: 6px;
          background: #ffffff;
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
