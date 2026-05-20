import { Navbar } from '@/components/ui/Navbar'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Shop — AllNuts | Semințe și Arahide Premium',
  description: 'Toate produsele AllNuts. Semințe de floarea soarelui și arahide premium. Livrare rapidă în România.',
}

export default async function ShopPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const supabase = await createClient()
    const [productsRes, categoriesRes] = await Promise.all([
      supabase
        .from('products')
        .select('*, categories(name, slug)')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('sort_order'),
    ])
    products = productsRes.data ?? []
    categories = categoriesRes.data ?? []
  } catch {
    products = []
    categories = []
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-amber-400/60 text-xs uppercase tracking-[0.4em] font-semibold">
            AllNuts — Magazin Online
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white">
            Toate Produsele
          </h1>
          <p className="text-white/35 text-base max-w-lg mx-auto">
            Semințe de floarea soarelui și arahide premium. 100% naturale, certificate BRC & IFS.
          </p>
        </div>

        {/* Filtre categorii */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <span className="px-5 py-2 bg-amber-400 text-black text-xs font-black uppercase tracking-widest rounded-full">
              Toate
            </span>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="px-5 py-2 bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest rounded-full cursor-pointer hover:border-amber-400/30 hover:text-white transition-all"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Grid produse */}
        <ProductGrid products={products} />

        {/* Info livrare */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Livrare gratuită', desc: 'La comenzi peste 100 RON în toată România', emoji: '🚚' },
            { title: 'Produse certificate', desc: 'BRC & IFS Food Standard — calitate garantată', emoji: '🏅' },
            { title: 'Returnare 30 zile', desc: 'Nu ești mulțumit? Banii înapoi, garantat', emoji: '✅' },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5 bg-white/5 border border-white/8 rounded-2xl">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-white/8 py-8 px-8 text-center">
        <p className="text-white/15 text-xs">
          © {new Date().getFullYear()} AllNuts · office@allnuts.ro · 0751 165 383
        </p>
      </footer>
    </>
  )
}
