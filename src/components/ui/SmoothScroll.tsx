'use client'

import { useEffect, useRef } from 'react'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let lenis: any = null
    let raf: number

    async function init() {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      const tick = (time: number) => {
        lenis.raf(time)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      // Sync cu GSAP ScrollTrigger
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      lenis.on('scroll', ScrollTrigger.update)
    }

    init()
    return () => {
      lenis?.destroy()
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={wrapperRef}>{children}</div>
}
