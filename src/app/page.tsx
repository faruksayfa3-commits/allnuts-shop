import { Navbar } from '@/components/ui/Navbar'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { createClient } from '@/lib/supabase/server'
import { Leaf, Truck, Shield, Award } from 'lucide-react'
import { SceneClient } from '@/components/scene/SceneClient'

export default async function HomePage() {
  let products: any[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(8)
    products = data ?? []
  } catch {
    // Supabase keys not set yet — show demo UI
    products = []
  }

  const features = [
    { icon: Leaf, title: '100% Natural', desc: 'Fără aditivi, fără conservanți. Doar natura pură.' },
    { icon: Award, title: 'Premium Quality', desc: 'Selectate manual din cele mai bune surse.' },
    { icon: Truck, title: 'Livrare Rapidă', desc: 'Comanda ta ajunge în 24-48h în toată România.' },
    { icon: Shield, title: 'Garanție Totală', desc: '30 de zile garanție rambursare, fără întrebări.' },
  ]

  return (
    <>
      {/* Canvas 3D în background */}
      <SceneClient />

      {/* Gradient overlay subtil */}
      <div className="fixed inset-0 -z-5 pointer-events-none bg-gradient-to-b from-[#0a0500]/60 via-transparent to-[#0a0500]/80" />

      <Navbar />

      <main className="relative z-10">
        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section
          id="hero-section"
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
        >
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              100% Natural · Produs în România
            </div>

            <h1 className="text-7xl md:text-[9rem] font-black text-white leading-[0.9] tracking-tighter">
              ALL
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                NUTS
              </span>
            </h1>

            <p className="text-white/55 text-xl md:text-2xl max-w-xl mx-auto leading-relaxed">
              Semințe și nuci de cea mai înaltă calitate, selectate cu grijă pentru tine și familia ta.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#products"
                className="px-8 py-4 bg-amber-400 text-black font-black uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/30 text-sm"
              >
                Descoperă Produsele
              </a>
              <a
                href="#about"
                className="px-8 py-4 bg-white/10 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/15 transition-all border border-white/10 text-sm"
              >
                Află Mai Mult
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-14 bg-gradient-to-b from-amber-400/40 to-transparent" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SPACER (pungile se rotesc pe toată înălțimea)
        ══════════════════════════════════════════════ */}
        <section className="h-[100vh]" aria-hidden="true" />

        {/* ══════════════════════════════════════════════
            PRODUCT REVEAL (animația exploziei)
        ══════════════════════════════════════════════ */}
        <section
          id="product-reveal"
          className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-32 text-center"
        >
          <div className="max-w-3xl space-y-6">
            <span className="text-amber-400/70 text-xs uppercase tracking-[0.4em] font-semibold">
              Plin de viață
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
              Natura în{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
                fiecare bob
              </span>
            </h2>
            <p className="text-white/45 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Fiecare pungă conține energia pură a naturii. Recoltate la momentul potrivit, ambalate cu grijă pentru a păstra prospețimea maximă.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FEATURES
        ══════════════════════════════════════════════ */}
        <section id="about" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-400/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                  <Icon size={22} className="text-amber-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            GRID PRODUSE
        ══════════════════════════════════════════════ */}
        <section id="products" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-amber-400/70 text-xs uppercase tracking-[0.4em] font-semibold">
              Magazin Online
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Toate Produsele
            </h2>
            <p className="text-white/40 text-base max-w-md mx-auto">
              Selecție premium de semințe și nuci, disponibile direct la ușa ta.
            </p>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            /* Demo cards când Supabase nu e conectat */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { name: 'Semințe Floarea Soarelui', price: 12.99, compare: 15.99, tags: ['raw', 'bestseller'], weight: 500 },
                { name: 'Mix Energie Total', price: 24.99, compare: null, tags: ['mix', 'popular'], weight: 300 },
                { name: 'Nuci Caju Premium', price: 34.99, compare: 39.99, tags: ['premium', 'vegan'], weight: 400 },
                { name: 'Semințe Dovleac Bio', price: 18.50, compare: null, tags: ['bio', 'raw'], weight: 250 },
              ].map((demo, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="h-52 bg-gradient-to-br from-amber-900/20 to-black/60 flex flex-col items-center justify-center gap-2">
                    <span className="text-6xl">{['🌻', '🌰', '🥜', '🎃'][i]}</span>
                    <span className="text-white/20 text-xs uppercase tracking-widest">AllNuts</span>
                  </div>
                  <div className="p-5">
                    <div className="flex gap-1.5 mb-2">
                      {demo.tags.map(t => (
                        <span key={t} className="text-xs text-amber-400/60 uppercase tracking-wider">#{t}</span>
                      ))}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">{demo.name}</h3>
                    <p className="text-white/30 text-xs mb-4">{demo.weight}g / pungă</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-amber-400 text-xl font-black">{demo.price.toFixed(2)} RON</span>
                        {demo.compare && (
                          <span className="ml-2 text-white/25 text-sm line-through">{demo.compare.toFixed(2)} RON</span>
                        )}
                      </div>
                      <button className="px-4 py-2.5 bg-amber-400 text-black text-sm font-bold rounded-full hover:bg-amber-300 transition-all">
                        Adaugă
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/shop"
              className="inline-flex px-8 py-4 border border-amber-400/40 text-amber-400 font-bold uppercase tracking-widest rounded-full hover:bg-amber-400/10 transition-all text-sm"
            >
              Vezi Toate Produsele →
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════ */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-amber-900/30 to-amber-800/10 border border-amber-400/20 rounded-3xl p-12 md:p-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Prima comandă?
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Beneficiezi de <span className="text-amber-400 font-bold">transport gratuit</span> la prima comandă de peste 100 RON.
            </p>
            <a
              href="/shop"
              className="inline-flex px-10 py-4 bg-amber-400 text-black font-black uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-900/30 text-sm"
            >
              Comandă Acum
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════ */}
        <footer id="contact" className="border-t border-white/8 py-16 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <p className="text-white font-black text-2xl mb-3">
                ALL<span className="text-amber-400">NUTS</span>
              </p>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                Semințe și nuci premium, direct de la producători selectați cu grijă.
              </p>
            </div>
            <div>
              <h4 className="text-white/50 text-xs uppercase tracking-widest mb-4">Navigare</h4>
              <ul className="space-y-2">
                {['Acasă', 'Produse', 'Despre Noi', 'Contact'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/50 text-xs uppercase tracking-widest mb-4">Contact</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li>office@allnuts.ro</li>
                <li>+40 700 000 000</li>
                <li>România</li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} AllNuts. Toate drepturile rezervate.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
