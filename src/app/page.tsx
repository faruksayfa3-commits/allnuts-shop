import { SceneClient } from '@/components/scene/SceneClient'
import { Navbar } from '@/components/ui/Navbar'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      {/* Scenă 3D full-screen — mereu în spate */}
      <SceneClient />
      <Navbar />

      <main className="relative" style={{ fontFamily: 'var(--font-syne), sans-serif' }}>

        {/* ═══════════════════════════════════════════
            01 — HERO
            Text minimal flotant pe scena dark
        ═══════════════════════════════════════════ */}
        <section
          id="hero-section"
          className="relative h-screen flex flex-col justify-end px-8 md:px-16 pb-20"
          style={{ zIndex: 10 }}
        >
          {/* Tag stânga sus */}
          <div className="absolute top-28 left-8 md:left-16">
            <span className="text-white/20 text-[10px] uppercase tracking-[0.5em]">
              BRC &amp; IFS Certified · Made in Romania
            </span>
          </div>

          {/* Număr secțiune */}
          <div className="absolute top-28 right-8 md:right-16">
            <span className="text-white/15 text-[10px] uppercase tracking-widest">01 / 05</span>
          </div>

          {/* Titlu principal — mare, cinematic */}
          <div className="max-w-4xl">
            <p className="text-white/30 text-xs uppercase tracking-[0.4em] mb-6">
              Semințe &amp; Arahide Premium
            </p>
            <h1 className="text-[13vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter text-white">
              ALL
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(236,28,36,0.8)',
                  textShadow: '0 0 80px rgba(236,28,36,0.15)',
                }}
              >
                NUTS
              </span>
            </h1>
            <p className="text-white/35 text-base md:text-lg mt-6 max-w-sm leading-relaxed font-light">
              Produse sănătoase, naturale și gustoase. Gust autentic românesc.
            </p>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-3">
            <span
              className="text-white/20 text-[9px] uppercase tracking-[0.4em]"
              style={{ writingMode: 'vertical-rl' }}
            >
              Scroll to explore
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-[#EC1C24]/50" />
          </div>
        </section>

        {/* Spacer — pungile se rotesc */}
        <section className="h-[140vh]" aria-hidden="true" style={{ zIndex: 1 }} />

        {/* ═══════════════════════════════════════════
            02 — SEMINȚELE EXPLODEAZĂ
        ═══════════════════════════════════════════ */}
        <section
          id="product-reveal"
          className="relative h-screen flex flex-col justify-center px-8 md:px-16"
          style={{ zIndex: 10 }}
        >
          <div className="absolute top-8 right-8 md:right-16">
            <span className="text-white/15 text-[10px] uppercase tracking-widest">02 / 05</span>
          </div>

          <div className="max-w-2xl">
            <p className="text-[#EC1C24]/60 text-[10px] uppercase tracking-[0.5em] mb-5">
              Natura în fiecare bob
            </p>
            <h2 className="text-[8vw] md:text-[6vw] font-black leading-[0.9] tracking-tight text-white">
              Coapte la
              <br />
              <em className="not-italic text-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>
                perfecție
              </em>
            </h2>
            <p className="text-white/30 text-sm mt-6 max-w-xs leading-relaxed">
              Semințe pestrite, selectate manual și coapte la temperatura exactă pentru gustul perfect.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            03 — SORTIMENT PUNGI (detalii produse)
        ═══════════════════════════════════════════ */}
        <section id="products" className="relative min-h-screen py-24 px-8 md:px-16" style={{ zIndex: 10 }}>
          <div className="absolute top-8 right-8 md:right-16">
            <span className="text-white/15 text-[10px] uppercase tracking-widest">03 / 05</span>
          </div>

          <p className="text-[#EC1C24]/60 text-[10px] uppercase tracking-[0.5em] mb-4">Sortiment</p>
          <h2 className="text-[6vw] md:text-[4.5vw] font-black text-white leading-tight mb-20 tracking-tight">
            Pungile AllNuts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                img: '/products/bag-mov.png',
                color: 'mov',
                hex: '#7B3B8C',
                name: 'Extrasărate',
                weight: '130g',
                units: '15 buc/cutie',
                price: '5.99 RON',
                old: '7.99',
                tag: 'BEST SELLER',
                desc: 'Seminte pestrite, sarate la perfectie. Gust intens, crocant.',
              },
              {
                img: '/products/bag-rosu.png',
                color: 'roșu',
                hex: '#C0392B',
                name: 'Ușor Sărate',
                weight: '130g',
                units: '15 buc/cutie',
                price: '5.99 RON',
                old: null,
                tag: 'NATURAL',
                desc: 'Seminte pestrite, coapte la perfectie. Gust delicat, echilibrat.',
              },
              {
                img: '/products/pungi-transparente.webp',
                color: 'gold',
                hex: '#D4A017',
                name: 'Premium Gold',
                weight: '150g',
                units: 'Ediție limitată',
                price: 'Premium',
                old: null,
                tag: 'GOLD EDITION',
                desc: 'Linia premium AllNuts. Design transparent, calitate superioară.',
              },
            ].map((p, i) => (
              <div
                key={i}
                className="group relative bg-[#0d0d0d] p-8 flex flex-col gap-5 hover:bg-[#111] transition-colors"
                data-cursor
              >
                {/* Tag */}
                <span
                  className="text-[9px] font-black uppercase tracking-[0.3em]"
                  style={{ color: p.hex }}
                >
                  {p.tag}
                </span>

                {/* Imagine */}
                <div className="relative h-52 flex items-center justify-center overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Glow sub pungă */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-8 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
                    style={{ background: p.hex }}
                  />
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-white font-black text-xl mb-1">{p.name}</h3>
                  <p className="text-white/30 text-xs mb-3 leading-relaxed">{p.desc}</p>

                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest mb-4">
                    <span className="text-white/20">{p.weight}</span>
                    <span className="text-white/10">·</span>
                    <span className="text-white/20">{p.units}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                      <span className="text-lg font-black" style={{ color: p.hex }}>{p.price}</span>
                      {p.old && (
                        <span className="ml-2 text-white/15 text-xs line-through">{p.old} RON</span>
                      )}
                    </div>
                    <a
                      href="#contact"
                      className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors flex items-center gap-1"
                    >
                      Comandă →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            04 — PAHARE (arahide 3D sar la scroll)
        ═══════════════════════════════════════════ */}
        <section
          id="pahare-section"
          className="relative min-h-screen py-24 px-8 md:px-16"
          style={{ zIndex: 10 }}
        >
          <div className="absolute top-8 right-8 md:right-16">
            <span className="text-white/15 text-[10px] uppercase tracking-widest">04 / 05</span>
          </div>

          {/* Spacer sus — pahare 3D sunt vizibile în background */}
          <div className="h-[50vh] flex items-end">
            <div>
              <p className="text-[#EC1C24]/60 text-[10px] uppercase tracking-[0.5em] mb-5">Arahide Roșii</p>
              <h2 className="text-[7vw] md:text-[5vw] font-black text-white leading-[0.9] tracking-tight">
                Din pahare,
                <br />
                <em className="not-italic text-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                  în suflet
                </em>
              </h2>
            </div>
          </div>

          {/* Grid detalii */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-3xl">
            {/* Imagine reală */}
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image
                src="/products/pahare.webp"
                alt="Arahide Roșii AllNuts"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
            </div>

            {/* Specs */}
            <div className="flex flex-col justify-center gap-6">
              <div>
                <p className="text-[#EC1C24]/60 text-[10px] uppercase tracking-[0.4em] mb-2">Produs</p>
                <h3 className="text-white font-black text-2xl">Arahide Roșii Coapte și Sărate</h3>
              </div>
              <p className="text-white/30 text-sm leading-relaxed">
                Sănătos și gustos, special pentru orice ocazie. Bogate în proteine, crocante, irezistibile.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Greutate', val: '250g' },
                  { label: 'Bucăți/cutie', val: '12' },
                  { label: 'Preț', val: '8.99 RON' },
                  { label: 'Tip', val: 'Coapte & Sărate' },
                ].map(({ label, val }) => (
                  <div key={label} className="border-t border-white/5 pt-3">
                    <p className="text-white/20 text-[9px] uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-white font-bold text-sm">{val}</p>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                data-cursor
                className="inline-flex items-center gap-2 text-[#EC1C24] text-xs uppercase tracking-widest hover:gap-4 transition-all"
              >
                Comandă acum →
              </a>
            </div>
          </div>

          {/* Spacer pentru animația 3D */}
          <div className="h-[80vh]" aria-hidden="true" />
        </section>

        {/* ═══════════════════════════════════════════
            05 — DESPRE / ISTORIE / CERTIFICATE
        ═══════════════════════════════════════════ */}
        <section id="about" className="relative py-32 px-8 md:px-16" style={{ zIndex: 10 }}>
          <div className="absolute top-8 right-8 md:right-16">
            <span className="text-white/15 text-[10px] uppercase tracking-widest">05 / 05</span>
          </div>

          {/* Header */}
          <p className="text-[#EC1C24]/60 text-[10px] uppercase tracking-[0.5em] mb-5">Povestea noastră</p>
          <h2 className="text-[7vw] md:text-[5vw] font-black text-white leading-[0.9] tracking-tight mb-24">
            Din 2018,<br />cu pasiune
          </h2>

          {/* Timeline minimal */}
          <div className="max-w-3xl space-y-0">
            {[
              { year: '2018', title: 'Fondarea AllNuts', text: 'Lansăm prima rețetă — seminte de floarea soarelui, naturale, fără aditivi.' },
              { year: '2019', title: 'Certificare BRC', text: 'British Retail Consortium — unul dintre cele mai riguroase standarde internaționale.' },
              { year: '2020', title: 'Certificare IFS', text: 'International Featured Standards — dubla certificare europeană confirmă calitatea.' },
              { year: '2021', title: 'Gama Extinsă', text: 'Lansăm arahide roșii coapte și linia premium de pungi transparente.' },
              { year: '2023', title: 'Distribuție Națională', text: 'Produsele AllNuts ajung în toată România prin rețeaua noastră de parteneri.' },
              { year: 'Azi', title: 'Continuăm', text: 'Inovăm constant, căutând cele mai bune materii prime pentru gustul autentic AllNuts.' },
            ].map((item, i) => (
              <div
                key={i}
                className="group grid grid-cols-[80px_1fr] gap-8 py-8 border-t border-white/5 hover:border-[#EC1C24]/20 transition-colors"
              >
                <span className="text-[#EC1C24]/50 font-black text-lg group-hover:text-[#EC1C24] transition-colors">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-white font-bold text-base mb-1">{item.title}</h3>
                  <p className="text-white/25 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {[
              {
                code: 'BRC',
                name: 'BRC Food Safety',
                body: 'British Retail Consortium',
                desc: 'Standardul global de siguranță alimentară — auditat anual de organisme independente. Garantează trasabilitate completă și procese HACCP impecabile.',
              },
              {
                code: 'IFS',
                name: 'IFS Food Standard',
                body: 'International Featured Standards',
                desc: 'Standardul european de referință pentru furnizorii alimentari. Asigură conformitatea cu normativele UE și permite distribuția în marile rețele europene.',
              },
            ].map(cert => (
              <div key={cert.code} className="bg-[#0d0d0d] p-10 group hover:bg-[#111] transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[#EC1C24] font-black text-4xl mb-1">{cert.code}</p>
                    <p className="text-white/20 text-[9px] uppercase tracking-[0.3em]">{cert.body}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-900/30 text-green-400 text-[9px] font-bold rounded uppercase tracking-wider border border-green-800/30">
                    Activ
                  </span>
                </div>
                <h3 className="text-white font-black text-lg mb-3">{cert.name}</h3>
                <p className="text-white/25 text-sm leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CONTACT / FOOTER
        ═══════════════════════════════════════════ */}
        <section id="contact" className="relative py-32 px-8 md:px-16 border-t border-white/5" style={{ zIndex: 10 }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <p className="text-[#EC1C24]/60 text-[10px] uppercase tracking-[0.5em] mb-5">Hai să vorbim</p>
              <h2 className="text-[7vw] md:text-[4.5vw] font-black text-white leading-[0.9] tracking-tight mb-8">
                Gata să<br />Comandezi?
              </h2>
              <p className="text-white/25 text-sm max-w-xs leading-relaxed">
                Transport gratuit la comenzi peste 100 RON. Livrare în 24–48h în toată România.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {[
                { label: 'Email', val: 'office@allnuts.ro', href: 'mailto:office@allnuts.ro' },
                { label: 'Telefon', val: '0751 165 383', href: 'tel:0751165383' },
              ].map(({ label, val, href }) => (
                <a
                  key={label}
                  href={href}
                  data-cursor
                  className="group flex items-center justify-between py-5 border-t border-white/5 hover:border-[#EC1C24]/30 transition-colors"
                >
                  <div>
                    <p className="text-white/20 text-[9px] uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-white font-bold text-base group-hover:text-[#EC1C24] transition-colors">{val}</p>
                  </div>
                  <span className="text-white/15 group-hover:text-[#EC1C24] transition-colors text-xl">→</span>
                </a>
              ))}

              <div className="pt-8">
                <Image
                  src="/logo-allnuts.svg"
                  alt="AllNuts"
                  width={100}
                  height={40}
                  className="h-8 w-auto opacity-20"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <p className="text-white/10 text-[10px] mt-4 leading-relaxed">
                  © {new Date().getFullYear()} AllNuts · BRC &amp; IFS Certified · Made in Romania
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
