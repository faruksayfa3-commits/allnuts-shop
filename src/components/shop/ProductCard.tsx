'use client'

import { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'
import { useState } from 'react'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compare_at_price!) * 100)
    : 0

  function handleAdd() {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20">
      {hasDiscount && (
        <span className="absolute top-3 right-3 z-10 bg-amber-400 text-black text-xs font-bold px-2.5 py-1 rounded-full">
          -{discountPct}%
        </span>
      )}

      {product.tags.includes('bestseller') && (
        <span className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-white/10 backdrop-blur text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-400/30">
          <Star size={10} fill="currentColor" /> Best Seller
        </span>
      )}

      <div className="relative h-52 bg-gradient-to-br from-amber-900/20 to-black/60 overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-6xl">🌰</span>
            <span className="text-white/20 text-xs uppercase tracking-widest">AllNuts</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {product.tags.filter(t => t !== 'bestseller').slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-amber-400/60 uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>
        <h3 className="text-white font-bold text-lg mb-1 leading-tight">{product.name}</h3>
        {product.description && (
          <p className="text-white/45 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        )}
        {product.weight_grams && (
          <p className="text-white/30 text-xs mb-4">{product.weight_grams}g / pungă</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-amber-400 text-xl font-black">{product.price.toFixed(2)} RON</span>
            {hasDiscount && (
              <span className="text-white/25 text-sm line-through">
                {product.compare_at_price!.toFixed(2)} RON
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all active:scale-95 ${
              added
                ? 'bg-green-400 text-black'
                : product.stock === 0
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-amber-400 text-black hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20'
            }`}
          >
            <ShoppingCart size={14} />
            {added ? 'Adăugat!' : product.stock === 0 ? 'Stoc epuizat' : 'Adaugă'}
          </button>
        </div>
      </div>
    </div>
  )
}
