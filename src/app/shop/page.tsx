import { Navbar } from '@/components/ui/Navbar'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Shop — AllNuts',
  description: 'Toate produsele AllNuts. Semințe și nuci premium disponibile online.',
}

export default async function ShopPage() {
  let products: any[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    products = data ?? []
  } catch {
    products = []
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="text-amber-400/70 text-xs uppercase tracking-[0.4em] font-semibold">
            Toate Produsele
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white">
            Shop
          </h1>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Selecție completă de semințe și nuci premium. Livrare rapidă în toată România.
          </p>
        </div>
        <ProductGrid products={products} />
      </main>
    </>
  )
}
