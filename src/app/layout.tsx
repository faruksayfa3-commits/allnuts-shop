import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AllNuts — Semințe & Arahide Premium | Producător Român BRC & IFS',
  description: 'Produse sănătoase, naturale și gustoase. Semințe de floarea soarelui și arahide premium, certificate BRC & IFS. Livrare rapidă în toată România.',
  keywords: 'seminte floarea soarelui, arahide, snacks naturale, allnuts, romania, brc, ifs',
  openGraph: {
    title: 'AllNuts — Semințe & Arahide Premium',
    description: 'Produse sănătoase, naturale și gustoase. Producător român certificat BRC & IFS.',
    type: 'website',
    locale: 'ro_RO',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${inter.className} antialiased`}>
      <body className="bg-white text-gray-900 min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
