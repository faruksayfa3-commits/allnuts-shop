import { SceneClient } from '@/components/scene/SceneClient'
import { Navbar } from '@/components/ui/Navbar'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { Leaf, Truck, Shield, Award, Phone, Mail, MapPin, Star } from 'lucide-react'

export default async function HomePage() {
  let products: any[] = []
  let featuredProducts: any[] = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
    products = data ?? []
    featuredProducts = products.filter((p) => p.is_featured).slice(0, 3)
  } catch {
    products = []
    featuredProducts = []
  }

  const features = [
    {
      icon: Leaf,
      title: '100% Natural',
      desc: 'Fără conservanți, fără aditivi. Doar produse naturale selectate cu grijă.',
    },
    {
      icon: Award,
      title: 'Certificat BRC & IFS',
      desc: 'Calitate garantată prin certificările internaționale BRC și IFS Food.',
    },
    {
      icon: Truck,
      title: 'Livrare Rapidă',
      desc: 'Comanda ta ajunge în 24–48h în toată România.',
    },
    {
      icon: Shield,
      title: 'Garanție Totală',
      desc: 'Satisfacție garantată sau banii înapoi, fără întrebări.',
    },
  ]

  return (
    <>
      <SceneClient />

      {/* Gradient overlay */}
      <div className="fixed inset-0 -z-5 pointer-events-none bg-gradient-to-b from-[#0a0500]/70 via-[#0a0500]/20 to-[#0a0500]/90" />

      <Navbar />

      <main className="relative z-10">

        {/* ══════════════════════════════════════
            HERO — branding AllNuts real
        ══════════════════════════════════════ */}
        <section
          id="hero-section"
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
        >
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Badge certificări */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                BRC Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                IFS Certified
              </span>
            </div>

            {/* Logo text */}
            <div className="space-y-2">
              <h1 className="text-8xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter">
                ALL
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                  NUTS
                </span>
              </h1>
            </div>

            {/* Tagline reală de pe allnuts.ro */}
            <p className="text-white/60 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              Produse sănătoase, naturale și gustoase
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="#products"
                className="px-8 py-4 bg-amber-400 text-black font-black uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-900/30 text-sm"
              >
                Vezi Produsele
              </a>
              <a
                href="#about"
                className="px-8 py-4 bg-white/8 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/15 transition-all border border-white/10 text-sm backdrop-blur-sm"
              >
                Despre Noi
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.4em]">Scroll</span>
            <div className="w-px h-14 bg-gradient-to-b from-amber-400/50 to-transparent" />
          </div>
        </section>

        {/* Spacer — pungile se rotesc */}
        <section className="h-screen" aria-hidden="true" />

        {/* ══════════════════════════════════════
            PRODUCT REVEAL
        ══════════════════════════════════════ */}
        <section
          id="product-reveal"
          className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-32 text-center"
        >
          <div className="max-w-3xl space-y-5">
            <span className="text-amber-400/60 text-xs uppercase tracking-[0.4em] font-semibold">
              Plin de viață
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
              Natura în{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                fiecare bob
              </span>
            </h2>
            <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Semințe pestrite, coapte și sărate la perfecție. Arahide roșii gustoase. Produse în România, cu drag.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PRODUSE FEATURED (din allnuts.ro)
        ══════════════════════════════════════ */}
        {featuredProducts.length > 0 && (
          <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-2">
              <span className="text-amber-400/60 text-xs uppercase tracking-[0.4em] font-semibold">
                Cele mai iubite
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Produse de Top
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-900/20"
                >
                  {product.tags?.includes('bestseller') && (
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-amber-400 text-black text-xs font-black px-3 py-1.5 rounded-full">
                      <Star size={10} fill="currentColor" /> Best Seller
                    </div>
                  )}
                  <div className="relative h-64 bg-gradient-to-br from-amber-950/30 to-black/60 flex items-center justify-center overflow-hidden">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                      />
                    ) : (
                      <span className="text-7xl">🌻</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-2 leading-tight">{product.name}</h3>
                    <p className="text-white/40 text-sm mb-4 line-clamp-2">{product.short_description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-amber-400 text-2xl font-black">{product.price?.toFixed(2)} RON</span>
                        {product.compare_at_price && (
                          <span className="ml-2 text-white/25 text-sm line-through">{product.compare_at_price?.toFixed(2)} RON</span>
                        )}
                      </div>
                      <span className="text-white/30 text-xs">{product.weight_grams}g</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══════════════════════════════════════
            FEATURES — cu certificate reale
        ══════════════════════════════════════ */}
        <section id="about" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-amber-400/60 text-xs uppercase tracking-[0.4em] font-semibold">
              De ce AllNuts
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Calitate la fiecare pas
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 bg-white/5 border border-white/8 rounded-2xl hover:border-amber-400/30 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                  <Icon size={22} className="text-amber-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Certificate badges reale */}
          <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center">
                <Award size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">BRC Certificate</p>
                <p className="text-white/30 text-xs">British Retail Consortium</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center">
                <Shield size={20} className="text-amber-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">IFS Certificate</p>
                <p className="text-white/30 text-xs">International Featured Standards</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TOATE PRODUSELE
        ══════════════════════════════════════ */}
        <section id="products" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-amber-400/60 text-xs uppercase tracking-[0.4em] font-semibold">
              Magazin Online
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Toate Produsele
            </h2>
            <p className="text-white/35 text-base max-w-md mx-auto">
              Semințe și arahide premium, disponibile cu livrare rapidă în toată România.
            </p>
          </div>
          <ProductGrid products={products} />
          {products.length === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEMO_PRODUCTS.map((p, i) => (
                <DemoCard key={i} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════ */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-amber-950/40 to-amber-900/10 border border-amber-400/15 rounded-3xl p-12 md:p-20">
            <p className="text-amber-400/70 text-xs uppercase tracking-[0.3em] font-semibold mb-3">Ofertă specială</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Transport gratuit
            </h2>
            <p className="text-white/45 text-lg mb-8 max-w-xl mx-auto">
              La orice comandă de peste <span className="text-amber-400 font-bold">100 RON</span>. Livrare în 24–48h în toată România.
            </p>
            <a
              href="#products"
              className="inline-flex px-10 py-4 bg-amber-400 text-black font-black uppercase tracking-widest rounded-full hover:bg-amber-300 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amber-900/30 text-sm"
            >
              Comandă Acum
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER — contact real allnuts.ro
        ══════════════════════════════════════ */}
        <footer id="contact" className="border-t border-white/8 py-16 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-white font-black text-2xl mb-3 tracking-widest">
                ALL<span className="text-amber-400">NUTS</span>
              </p>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">
                Produse sănătoase, naturale și gustoase. Producător român certificat BRC & IFS.
              </p>
              <div className="flex gap-3">
                <span className="px-3 py-1 bg-amber-400/10 text-amber-400/80 text-xs rounded-full border border-amber-400/20">BRC</span>
                <span className="px-3 py-1 bg-amber-400/10 text-amber-400/80 text-xs rounded-full border border-amber-400/20">IFS</span>
              </div>
            </div>
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-widest mb-5">Navigare</h4>
              <ul className="space-y-3">
                {['Acasă', 'Despre Noi', 'Produse', 'Contact'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/35 hover:text-white text-sm transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/40 text-xs uppercase tracking-widest mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white/40 text-sm">
                  <Mail size={14} className="text-amber-400 shrink-0" />
                  office@allnuts.ro
                </li>
                <li className="flex items-center gap-3 text-white/40 text-sm">
                  <Phone size={14} className="text-amber-400 shrink-0" />
                  0751 165 383
                </li>
                <li className="flex items-start gap-3 text-white/40 text-sm">
                  <MapPin size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  România
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/15 text-xs">
              © {new Date().getFullYear()} AllNuts. Toate drepturile rezervate.
            </p>
            <p className="text-white/15 text-xs">
              Producător autorizat · BRC & IFS Certified
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}

// Demo products — vizibile dacă Supabase nu e conectat
const DEMO_PRODUCTS = [
  {
    name: 'Semințe Floarea Soarelui Extrasărate',
    short_description: 'Seminte pestrite, sarate la perfectie',
    price: 5.99,
    compare_at_price: 7.99,
    image: 'https://allnuts.ro/images/mov130g.png',
    weight: 130,
    tags: ['extrasarat', 'bestseller'],
    emoji: '🌻',
  },
  {
    name: 'Semințe Floarea Soarelui Ușor Sărate',
    short_description: 'Seminte pestrite, coapte la perfectie',
    price: 5.99,
    compare_at_price: null,
    image: 'https://allnuts.ro/images/rosu130g.png',
    weight: 130,
    tags: ['usor-sarat', 'natural'],
    emoji: '🌻',
  },
  {
    name: 'Arahide Roșii Coapte și Sărate',
    short_description: 'Sanatos si gustos, special pentru orice ocazie',
    price: 8.99,
    compare_at_price: 10.99,
    image: 'https://allnuts.ro/images/arahiderosii.png',
    weight: 250,
    tags: ['coapte', 'proteic'],
    emoji: '🥜',
  },
]

function DemoCard({ product }: { product: (typeof DEMO_PRODUCTS)[0] }) {
  const disc = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : 0

  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-2">
      {disc > 0 && (
        <span className="absolute top-3 right-3 z-10 bg-amber-400 text-black text-xs font-bold px-2 py-1 rounded-full">
          -{disc}%
        </span>
      )}
      <div className="relative h-52 bg-gradient-to-br from-amber-950/20 to-black/60 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex gap-1.5 mb-2">
          {product.tags.map((t) => (
            <span key={t} className="text-xs text-amber-400/60 uppercase tracking-wider">#{t}</span>
          ))}
        </div>
        <h3 className="text-white font-bold text-base mb-1 leading-tight">{product.name}</h3>
        <p className="text-white/40 text-xs mb-4">{product.short_description}</p>
        <p className="text-white/25 text-xs mb-3">{product.weight}g / pungă</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-amber-400 text-xl font-black">{product.price.toFixed(2)} RON</span>
            {product.compare_at_price && (
              <span className="ml-2 text-white/25 text-sm line-through">{product.compare_at_price.toFixed(2)} RON</span>
            )}
          </div>
          <button className="px-4 py-2.5 bg-amber-400 text-black text-xs font-black rounded-full hover:bg-amber-300 transition-all uppercase tracking-wider">
            Adaugă
          </button>
        </div>
      </div>
    </div>
  )
}
