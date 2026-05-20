'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export function Navbar() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <Link href="/" className="text-2xl font-black text-white tracking-widest">
        ALL<span className="text-amber-400">NUTS</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: 'Produse', href: '/#products' },
          { label: 'Despre', href: '/#about' },
          { label: 'Shop', href: '/shop' },
          { label: 'Contact', href: '/#contact' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/cart"
          className="relative p-2 text-white/80 hover:text-white transition-colors"
        >
          <ShoppingCart size={22} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full text-black text-xs font-bold flex items-center justify-center">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </Link>

        <Link
          href="/shop"
          className="hidden md:flex px-5 py-2 bg-amber-400 text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all hover:scale-105 active:scale-95"
        >
          Comandă
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 py-6 flex flex-col items-center gap-6">
          {[
            { label: 'Produse', href: '/#products' },
            { label: 'Despre', href: '/#about' },
            { label: 'Shop', href: '/shop' },
            { label: 'Contact', href: '/#contact' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors text-sm uppercase tracking-widest font-medium"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="px-8 py-3 bg-amber-400 text-black text-sm font-bold uppercase tracking-widest rounded-full"
          >
            Comandă Acum
          </Link>
        </div>
      )}
    </nav>
  )
}
