'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'

export function Navbar() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      {/* Top strip roșu */}
      <div className="bg-[#EC1C24] text-white text-center text-xs py-1.5 px-4 font-medium tracking-wide">
        🚚 Transport gratuit la comenzi peste 100 RON · 📞 0751 165 383
      </div>

      <div className="flex items-center justify-between px-6 md:px-10 py-3">
        {/* Logo real AllNuts SVG */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-allnuts.svg"
            alt="AllNuts"
            width={140}
            height={56}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Acasă', href: '/' },
            { label: 'Produse', href: '/#products' },
            { label: 'Despre Noi', href: '/#about' },
            { label: 'Contact', href: '/#contact' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-gray-700 hover:text-[#EC1C24] transition-colors text-sm font-semibold uppercase tracking-wider"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:0751165383"
            className="hidden md:flex items-center gap-1.5 text-gray-500 hover:text-[#EC1C24] transition-colors text-xs"
          >
            <Phone size={14} />
            0751 165 383
          </a>

          <Link
            href="/cart"
            className="relative p-2 text-gray-600 hover:text-[#EC1C24] transition-colors"
          >
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EC1C24] rounded-full text-white text-xs font-bold flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          <a
            href="/#products"
            className="hidden md:flex px-5 py-2 bg-[#EC1C24] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#c01018] transition-all hover:scale-105 active:scale-95 shadow-md shadow-red-200"
          >
            Comandă
          </a>

          <button className="md:hidden text-gray-700 p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl py-6 flex flex-col items-center gap-5">
          {[
            { label: 'Acasă', href: '/' },
            { label: 'Produse', href: '/#products' },
            { label: 'Despre Noi', href: '/#about' },
            { label: 'Contact', href: '/#contact' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-[#EC1C24] text-sm font-semibold uppercase tracking-wider transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="/#products"
            onClick={() => setMenuOpen(false)}
            className="px-8 py-3 bg-[#EC1C24] text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md"
          >
            Comandă Acum
          </a>
        </div>
      )}
    </nav>
  )
}
