'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export function Navbar() {
  const { count } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-6">
      {/* Logo */}
      <Link href="/" className="group" data-cursor>
        <Image
          src="/logo-allnuts.svg"
          alt="AllNuts"
          width={110}
          height={44}
          priority
          className="h-9 w-auto opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-lg"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-10">
        {[
          ['Produse', '/#products'],
          ['Pahare', '/#pahare-section'],
          ['Despre', '/#about'],
          ['Contact', '/#contact'],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            data-cursor
            className="text-white/40 hover:text-white transition-colors duration-300 text-xs uppercase tracking-[0.25em] font-medium"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-5">
        <Link href="/cart" data-cursor className="relative text-white/40 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#EC1C24] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
        <a
          href="#contact"
          data-cursor
          className="px-5 py-2 border border-white/20 text-white/70 hover:border-[#EC1C24] hover:text-white text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-red-900/20"
        >
          Comandă
        </a>
      </div>
    </nav>
  )
}
