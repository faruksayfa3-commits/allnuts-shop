'use client'

import { Navbar } from '@/components/ui/Navbar'
import { useCart } from '@/context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, total, count, updateQty, removeItem } = useCart()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="mb-10 space-y-2">
          <h1 className="text-4xl font-black text-white">Coșul tău</h1>
          <p className="text-white/40">
            {count > 0 ? `${count} ${count === 1 ? 'produs' : 'produse'}` : 'Coșul este gol'}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 space-y-6">
            <ShoppingBag size={64} className="text-white/10 mx-auto" />
            <p className="text-white/30 text-lg">Adaugă produse din shop</p>
            <Link
              href="/shop"
              className="inline-flex px-8 py-4 bg-amber-400 text-black font-bold uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all text-sm"
            >
              Mergi la Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-6 p-5 bg-white/5 border border-white/10 rounded-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-900/30 to-black/50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  🌰
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold truncate">{product.name}</h3>
                  <p className="text-amber-400 font-bold">{product.price.toFixed(2)} RON</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(product.id, quantity - 1)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-white font-bold w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => updateQty(product.id, quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <p className="text-white font-black w-24 text-right">
                  {(product.price * quantity).toFixed(2)} RON
                </p>
                <button
                  onClick={() => removeItem(product.id)}
                  className="p-2 text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            {/* Total + checkout */}
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <div className="flex justify-between text-white/50 text-sm">
                <span>Subtotal</span>
                <span>{total.toFixed(2)} RON</span>
              </div>
              <div className="flex justify-between text-white/50 text-sm">
                <span>Transport</span>
                <span>{total >= 100 ? <span className="text-green-400">Gratuit</span> : '15.00 RON'}</span>
              </div>
              <div className="flex justify-between text-white font-black text-xl pt-4 border-t border-white/10">
                <span>Total</span>
                <span className="text-amber-400">
                  {(total >= 100 ? total : total + 15).toFixed(2)} RON
                </span>
              </div>
              <button className="w-full py-4 bg-amber-400 text-black font-black uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all hover:scale-[1.02] active:scale-95 mt-2">
                Finalizează Comanda
              </button>
              {total < 100 && (
                <p className="text-center text-white/30 text-xs">
                  Adaugă {(100 - total).toFixed(2)} RON pentru transport gratuit
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
