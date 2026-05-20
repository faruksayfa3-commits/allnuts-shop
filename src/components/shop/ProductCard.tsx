'use client'

import { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { ShoppingCart, Star, Package } from 'lucide-react'
import { useState } from 'react'

interface Props {
  product: Product & { categories?: { name: string; slug: string } }
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
    setTimeout(() => setAdded(false), 1800)
  }

  const isBestseller = product.tags?.includes('bestseller')

  return (
    <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-900/20">
      {hasDiscount && (
        <span className="absolute top-3 right-3 z-10 bg-amber-400 text-black text-[11px] font-black px-2.5 py-1 rounded-full">
          -{discountPct}%
        </span>
      )}
      {isBestseller && (
        <span className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-white/10 backdrop-blur text-amber-400 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30">
          <Star size={9} fill="currentColor" /> Best Seller
        </span>
      )}

      {/* Imagine produs */}
      <div className="relative h-52 bg-gradient-to-br from-amber-950/20 to-black/60 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Package size={40} className="text-white/10" />
            <span className="text-white/15 text-xs uppercase tracking-widest">AllNuts</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Categorie badge */}
        {product.categories?.name && (
          <span className="absolute bottom-3 left-3 text-white/40 text-[10px] uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {product.categories.name}
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {product.tags?.filter(t => t !== 'bestseller').slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] text-amber-400/50 uppercase tracking-wider">
              #{tag}
            </span>
          ))}
        </div>

        <h3 className="text-white font-bold text-base mb-1 leading-snug">{product.name}</h3>

        {/* Short description sau description */}
        {(product as any).short_description && (
          <p className="text-white/35 text-xs mb-3 line-clamp-1 italic">
            {(product as any).short_description}
          </p>
        )}
        {!( product as any).short_description && product.description && (
          <p className="text-white/35 text-xs mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Weight + units */}
        <div className="flex items-center gap-3 mb-4 text-white/25 text-[11px]">
          {product.weight_grams && <span>{product.weight_grams}g / pungă</span>}
          {(product as any).units_per_box && (
            <span className="text-white/15">· {(product as any).units_per_box} buc/cutie</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-amber-400 text-xl font-black">{product.price.toFixed(2)} RON</span>
            {hasDiscount && (
              <span className="text-white/20 text-sm line-through">
                {product.compare_at_price!.toFixed(2)} RON
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 ${
              added
                ? 'bg-green-400 text-black scale-105'
                : product.stock === 0
                ? 'bg-white/8 text-white/25 cursor-not-allowed'
                : 'bg-amber-400 text-black hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/25'
            }`}
          >
            <ShoppingCart size={13} />
            {added ? '✓ Adăugat' : product.stock === 0 ? 'Epuizat' : 'Adaugă'}
          </button>
        </div>
      </div>
    </div>
  )
}
