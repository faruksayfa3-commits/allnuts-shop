import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Syne } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { Cursor } from '@/components/ui/Cursor'
import { SmoothScroll } from '@/components/ui/SmoothScroll'

// Font display condensat — atmosferă cinematic
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AllNuts — Premium Seeds',
  description: 'Produse sănătoase, naturale și gustoase. Producător român certificat BRC & IFS.',
  keywords: 'seminte floarea soarelui, arahide, snacks naturale, allnuts, romania',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${syne.variable}`}>
      <body className="bg-[#080808] text-[#f5f0eb] min-h-screen antialiased">
        <CartProvider>
          <Cursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  )
}
