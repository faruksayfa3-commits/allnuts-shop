import { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[]
  title?: string
}

export function ProductGrid({ products, title }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-4">🌰</p>
        <p className="text-white/30 text-lg">Niciun produs disponibil momentan.</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <h2 className="text-3xl font-black text-white mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
