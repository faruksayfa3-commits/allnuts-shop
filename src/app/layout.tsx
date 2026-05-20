import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AllNuts — Semințe & Nuci Premium',
  description: 'Semințe și nuci de cea mai înaltă calitate. 100% naturale, selectate cu grijă din cele mai bune surse.',
  keywords: 'seminte, nuci, snacks, natural, premium, romania',
  openGraph: {
    title: 'AllNuts — Semințe & Nuci Premium',
    description: 'Semințe și nuci de cea mai înaltă calitate.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full bg-[#0a0500]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
