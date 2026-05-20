import { SceneClient } from '@/components/scene/SceneClient'
import { Navbar } from '@/components/ui/Navbar'
import Image from 'next/image'
import { Award, Shield, Leaf, Star, ChevronRight, Phone, Mail, MapPin } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* Canvas 3D — transparent pe fundalul alb */}
      <SceneClient />

      <Navbar />

      <main className="relative bg-white">

        {/* ══════════════════════════════════════════
            HERO — fundal alb, text roșu+negru
        ══════════════════════════════════════════ */}
        <section
          id="hero-section"
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-28 pb-20"
          style={{ zIndex: 10 }}
        >
          {/* Logo mare */}
          <div className="mb-8">
            <Image
              src="/logo-allnuts.svg"
              alt="AllNuts"
              width={380}
              height={152}
              priority
              className="w-64 md:w-96 h-auto mx-auto drop-shadow-2xl"
            />
          </div>

          <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-8 font-light">
            Produse sănătoase, naturale și gustoase.
            <br />
            <span className="text-[#EC1C24] font-semibold">Producător român</span> certificat BRC & IFS.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#products"
              className="px-8 py-3.5 bg-[#EC1C24] text-white font-bold uppercase tracking-widest rounded-full hover:bg-[#c01018] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-red-200 text-sm"
            >
              Descoperă Produsele
            </a>
            <a
              href="#about"
              className="px-8 py-3.5 border-2 border-gray-200 text-gray-600 font-bold uppercase tracking-widest rounded-full hover:border-[#EC1C24] hover:text-[#EC1C24] transition-all text-sm"
            >
              Povestea Noastră
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: '2018', label: 'Fondați' },
              { value: '15+', label: 'Produse' },
              { value: '100%', label: 'Natural' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-[#EC1C24]">{value}</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce opacity-40">
            <span className="text-gray-400 text-[10px] uppercase tracking-[0.4em]">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#EC1C24] to-transparent" />
          </div>
        </section>

        {/* Spacer 3D scroll */}
        <section className="h-[120vh]" aria-hidden="true" style={{ zIndex: 1 }} />

        {/* ══════════════════════════════════════════
            PRODUCT REVEAL — semințele explodează
        ══════════════════════════════════════════ */}
        <section
          id="product-reveal"
          className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-32 text-center bg-gradient-to-b from-white via-red-50/30 to-white"
          style={{ zIndex: 10 }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 bg-[#EC1C24]/8 text-[#EC1C24] text-xs uppercase tracking-[0.4em] font-bold rounded-full border border-[#EC1C24]/20">
            Plin de viață
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
            Natura în{' '}
            <span className="text-[#EC1C24]">fiecare bob</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Semințe pestrite, coapte și sărate la perfecție. Recoltate la momentul optim, ambalate cu grijă.
          </p>
        </section>

        {/* ══════════════════════════════════════════
            SORTIMENT PUNGI GOLD — descriere produse
        ══════════════════════════════════════════ */}
        <section id="products" className="relative py-24 px-4 md:px-8 bg-white" style={{ zIndex: 10 }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#EC1C24]/70 text-xs uppercase tracking-[0.4em] font-bold">Sortiment Premium</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
                Pungile AllNuts
              </h2>
              <p className="text-gray-400 mt-4 max-w-lg mx-auto">
                Trei sortimente pentru orice gust — extrasărate, ușor sărate sau varianta gold premium.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pungă Mov — Extrasărate */}
              <div className="group relative bg-white rounded-3xl border border-gray-100 hover:border-[#EC1C24]/30 shadow-sm hover:shadow-xl hover:shadow-red-100/50 transition-all duration-500 overflow-hidden hover:-translate-y-2">
                <div className="absolute top-4 right-4 bg-[#EC1C24] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Best Seller
                </div>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-purple-100/50 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="/products/bag-mov.png"
                    alt="Semințe Floarea Soarelui Extrasărate"
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-purple-500" />
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Sortiment Mov</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Semințe Extrasărate</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Semințe pestrite, sărate la perfecție. Gust intens, crocant, irezistibil. Ideale ca gustare sau la petreceri. 130g, 15 bucăți/cutie.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-[#EC1C24]">5.99 RON</span>
                      <span className="ml-2 text-gray-300 text-sm line-through">7.99 RON</span>
                    </div>
                    <a href="#contact" className="flex items-center gap-1 text-[#EC1C24] text-sm font-bold hover:gap-2 transition-all">
                      Comandă <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Pungă Roșie — Ușor Sărate */}
              <div className="group relative bg-white rounded-3xl border border-gray-100 hover:border-[#EC1C24]/30 shadow-sm hover:shadow-xl hover:shadow-red-100/50 transition-all duration-500 overflow-hidden hover:-translate-y-2">
                <div className="h-64 bg-gradient-to-br from-red-50 to-red-100/50 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="/products/bag-rosu.png"
                    alt="Semințe Floarea Soarelui Ușor Sărate"
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Sortiment Roșu</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Semințe Ușor Sărate</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Semințe pestrite, coapte la perfecție. Gust delicat și echilibrat, perfect pentru cei care preferă o variantă blândă. 130g, 15 bucăți/cutie.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-[#EC1C24]">5.99 RON</span>
                    </div>
                    <a href="#contact" className="flex items-center gap-1 text-[#EC1C24] text-sm font-bold hover:gap-2 transition-all">
                      Comandă <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Pungi Transparente */}
              <div className="group relative bg-white rounded-3xl border border-gray-100 hover:border-[#EC1C24]/30 shadow-sm hover:shadow-xl hover:shadow-red-100/50 transition-all duration-500 overflow-hidden hover:-translate-y-2">
                <div className="absolute top-4 right-4 bg-[#D4A017] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Premium
                </div>
                <div className="h-64 bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="/products/pungi-transparente.webp"
                    alt="Pungi Transparente AllNuts"
                    fill
                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-gray-400 text-xs uppercase tracking-widest">Gold Edition</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Pungi Transparente Premium</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    Linia premium AllNuts — semințe selectate vizibile prin ambalaj transparent. Design elegant, calitate superioară. Perfecte pentru cadouri sau evenimente speciale.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-[#D4A017]">Premium</span>
                    </div>
                    <a href="#contact" className="flex items-center gap-1 text-[#EC1C24] text-sm font-bold hover:gap-2 transition-all">
                      Comandă <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PAHARE — secțiunea cu pahare 3D
        ══════════════════════════════════════════ */}
        <section
          id="pahare-section"
          className="relative py-32 px-4 md:px-8 bg-gradient-to-b from-white to-red-50/40"
          style={{ zIndex: 10 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text stânga */}
              <div className="space-y-6">
                <span className="text-[#EC1C24]/70 text-xs uppercase tracking-[0.4em] font-bold">Gustare perfectă</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                  Arahide Roșii
                  <br />
                  <span className="text-[#EC1C24]">în Pahare</span>
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  Arahidele noastre roșii coapte și sărate sunt ambalate și în pahare practice, perfecte pentru orice ocazie. Sănătoase, gustoase și pline de proteine.
                </p>
                <ul className="space-y-3">
                  {[
                    'Bogate în proteine și grăsimi sănătoase',
                    'Coapte la perfecție, crocante',
                    'Fără conservanți, 100% naturale',
                    'Ambalaj practic, ușor de transportat',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EC1C24] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 pt-2">
                  <div>
                    <span className="text-3xl font-black text-[#EC1C24]">8.99 RON</span>
                    <span className="ml-2 text-gray-300 line-through text-sm">10.99 RON</span>
                  </div>
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-[#EC1C24] text-white font-bold rounded-full text-sm uppercase tracking-widest hover:bg-[#c01018] transition-all hover:scale-105 shadow-lg shadow-red-200"
                  >
                    Comandă
                  </a>
                </div>
              </div>

              {/* Imagine dreapta */}
              <div className="relative">
                <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden bg-gradient-to-br from-red-50 to-red-100/60 shadow-2xl shadow-red-200/40">
                  <Image
                    src="/products/pahare.webp"
                    alt="Arahide Roșii în Pahare AllNuts"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-gray-100">
                  <span className="text-3xl">🥜</span>
                  <div>
                    <p className="text-gray-900 font-bold text-sm">250g / pungă</p>
                    <p className="text-gray-400 text-xs">12 bucăți / cutie</p>
                  </div>
                </div>
                {/* Stars */}
                <div className="absolute -top-4 -right-4 bg-[#EC1C24] rounded-2xl shadow-xl px-4 py-3 text-white">
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="white" />)}
                  </div>
                  <p className="text-xs font-bold">Top calitate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer pentru animația 3D a paharelor */}
          <div className="h-[60vh]" aria-hidden="true" />
        </section>

        {/* ══════════════════════════════════════════
            ISTORIA ALLNUTS
        ══════════════════════════════════════════ */}
        <section id="about" className="py-24 px-4 md:px-8 bg-white" style={{ zIndex: 10 }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[#EC1C24]/70 text-xs uppercase tracking-[0.4em] font-bold">Povestea noastră</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3">
                Istoria AllNuts
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Linie verticală */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EC1C24] to-[#EC1C24]/10 -translate-x-1/2 hidden md:block" />

              <div className="space-y-12">
                {[
                  {
                    year: '2018',
                    title: 'Fondarea AllNuts',
                    text: 'AllNuts a luat naștere din pasiunea pentru produse naturale de calitate. Am început cu o singură rețetă de semințe de floarea soarelui și un angajament ferm față de naturalețe și gust.',
                    side: 'left',
                    icon: '🌱',
                  },
                  {
                    year: '2019',
                    title: 'Prima Certificare BRC',
                    text: 'Am obținut certificarea BRC (British Retail Consortium), unul dintre cele mai riguroase standarde internaționale de siguranță alimentară. Un pas esențial în confirmarea calității produselor noastre.',
                    side: 'right',
                    icon: '🏅',
                  },
                  {
                    year: '2020',
                    title: 'Certificare IFS Food',
                    text: 'Am adăugat certificarea IFS (International Featured Standards) portofoliului nostru de calitate. Dubla certificare ne plasează printre furnizorii de top din industria alimentară.',
                    side: 'left',
                    icon: '✅',
                  },
                  {
                    year: '2021',
                    title: 'Extinderea Gamei',
                    text: 'Am lansat sortimentul de arahide roșii coapte și sărate, urmat de linia premium de pungi transparente. Gama AllNuts s-a extins pentru a satisface toate gusturile.',
                    side: 'right',
                    icon: '🥜',
                  },
                  {
                    year: '2023',
                    title: 'Distribuție Națională',
                    text: 'Produsele AllNuts sunt acum disponibile în toată România, cu o rețea de distribuție solidă și parteneriate cu retaileri de top. Misiunea noastră: un produs AllNuts la fiecare gustare.',
                    side: 'left',
                    icon: '🚚',
                  },
                  {
                    year: 'Azi',
                    title: 'Continuăm să Creștem',
                    text: 'AllNuts continuă să inoveze și să caute cele mai bune materii prime din România și din lume. Fiecare pungă este o promisiune de calitate, naturalețe și gust autentic.',
                    side: 'right',
                    icon: '⭐',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`relative flex items-start gap-8 ${
                      item.side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                    } flex-col`}
                  >
                    {/* Dot central */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#EC1C24] rounded-full items-center justify-center text-xl shadow-lg shadow-red-200 z-10">
                      {item.icon}
                    </div>

                    {/* Card */}
                    <div className={`md:w-[calc(50%-40px)] w-full ${item.side === 'right' ? 'md:text-right' : ''}`}>
                      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#EC1C24]/20 transition-all">
                        <span className="inline-block mb-2 text-[#EC1C24] font-black text-2xl">{item.year}</span>
                        <h3 className="text-gray-900 font-bold text-lg mb-2">{item.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                    <div className="md:w-[calc(50%-40px)] hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CERTIFICATE BRC + IFS
        ══════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-gray-50/50" style={{ zIndex: 10 }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#EC1C24]/70 text-xs uppercase tracking-[0.4em] font-bold">Calitate certificată</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">
                Standarde Internaționale
              </h2>
              <p className="text-gray-400 mt-3 max-w-lg mx-auto text-sm">
                AllNuts deține dubla certificare BRC & IFS — cele mai exigente standarde globale de siguranță alimentară.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* BRC */}
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:border-[#EC1C24]/20 transition-all group">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#EC1C24] flex items-center justify-center shrink-0 shadow-lg shadow-red-200 group-hover:scale-110 transition-transform">
                    <Shield size={30} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900 font-black text-xl">BRC Food Safety</h3>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Activ</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">British Retail Consortium</p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Standardul BRC Global Food Safety este recunoscut internațional și garantează că produsele AllNuts respectă cele mai stricte cerințe de siguranță, calitate și autenticitate. Auditat anual de organisme independente.
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {['Siguranță alimentară maximă', 'Trasabilitate completă', 'Audit anual independent'].map(p => (
                        <li key={p} className="flex items-center gap-2 text-gray-500 text-xs">
                          <span className="w-1 h-1 rounded-full bg-[#EC1C24]" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* IFS */}
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:border-[#EC1C24]/20 transition-all group">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#EC1C24] flex items-center justify-center shrink-0 shadow-lg shadow-red-200 group-hover:scale-110 transition-transform">
                    <Award size={30} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-gray-900 font-black text-xl">IFS Food Standard</h3>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Activ</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">International Featured Standards</p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Certificarea IFS Food este standardul european de referință pentru furnizorii de produse alimentare. Garantează conformitatea cu reglementările UE și asigură parteneri de retail din toată Europa.
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {['Conformitate normative UE', 'Sistem HACCP implementat', 'Calitate constantă, lot cu lot'].map(p => (
                        <li key={p} className="flex items-center gap-2 text-gray-500 text-xs">
                          <span className="w-1 h-1 rounded-full bg-[#EC1C24]" />{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge combinat */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-2xl border border-gray-100 shadow-md">
                <Image src="/logo-allnuts.svg" alt="AllNuts" width={80} height={32} className="h-8 w-auto" />
                <div className="w-px h-8 bg-gray-200" />
                <div className="flex gap-3">
                  <span className="px-3 py-1.5 bg-[#EC1C24] text-white text-xs font-black rounded-full">BRC Certified</span>
                  <span className="px-3 py-1.5 bg-[#EC1C24] text-white text-xs font-black rounded-full">IFS Certified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            DE CE ALLNUTS
        ══════════════════════════════════════════ */}
        <section className="py-20 px-4 bg-white" style={{ zIndex: 10 }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">De ce AllNuts?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Leaf, title: '100% Natural', desc: 'Fără conservanți, fără aditivi artificiali. Doar natură.', color: 'green' },
                { icon: Award, title: 'BRC & IFS', desc: 'Dubla certificare internațională de siguranță alimentară.', color: 'red' },
                { icon: Star, title: 'Gust Premium', desc: 'Rețete perfectionate în ani de experiență. Gust autentic.', color: 'amber' },
                { icon: Shield, title: 'Made in Romania', desc: 'Producție locală, controlată end-to-end. Sprijin pentru economie.', color: 'blue' },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="p-6 bg-gray-50/70 rounded-2xl hover:bg-[#EC1C24]/5 hover:border hover:border-[#EC1C24]/10 transition-all group border border-transparent">
                  <div className="w-11 h-11 rounded-xl bg-[#EC1C24]/10 flex items-center justify-center mb-4 group-hover:bg-[#EC1C24]/20 transition-colors">
                    <Icon size={20} className="text-[#EC1C24]" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-base mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA ROȘU
        ══════════════════════════════════════════ */}
        <section className="py-20 px-4" style={{ zIndex: 10 }}>
          <div className="max-w-4xl mx-auto text-center bg-[#EC1C24] rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl shadow-red-300/40">
            {/* Decorații fundal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <Image src="/logo-allnuts.svg" alt="AllNuts" width={180} height={72} className="h-14 w-auto mx-auto mb-6 brightness-0 invert" />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Gata să guști diferența?
              </h2>
              <p className="text-white/75 text-base mb-8 max-w-xl mx-auto">
                Contactează-ne pentru comenzi sau mai multe informații. Transport gratuit la comenzi peste 100 RON.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:0751165383"
                  className="flex items-center gap-2 px-8 py-3.5 bg-white text-[#EC1C24] font-black rounded-full text-sm uppercase tracking-widest hover:bg-gray-50 transition-all hover:scale-105 shadow-lg"
                >
                  <Phone size={16} /> 0751 165 383
                </a>
                <a
                  href="mailto:office@allnuts.ro"
                  className="flex items-center gap-2 px-8 py-3.5 bg-white/15 text-white font-bold rounded-full text-sm uppercase tracking-widest hover:bg-white/25 transition-all border border-white/30"
                >
                  <Mail size={16} /> office@allnuts.ro
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════ */}
        <footer id="contact" className="bg-gray-950 py-16 px-8" style={{ zIndex: 10 }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <Image src="/logo-allnuts.svg" alt="AllNuts" width={140} height={56} className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Produse sănătoase, naturale și gustoase. Producător român certificat BRC & IFS.
              </p>
              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 bg-[#EC1C24] text-white text-xs rounded-full font-bold">BRC</span>
                <span className="px-3 py-1 bg-[#EC1C24] text-white text-xs rounded-full font-bold">IFS</span>
              </div>
            </div>
            <div>
              <h4 className="text-white/50 text-xs uppercase tracking-widest mb-5">Navigare</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Acasă', href: '/' },
                  { label: 'Produse', href: '/#products' },
                  { label: 'Pahare', href: '/#pahare-section' },
                  { label: 'Despre Noi', href: '/#about' },
                  { label: 'Contact', href: '/#contact' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-gray-400 hover:text-white text-sm transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/50 text-xs uppercase tracking-widest mb-5">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail size={14} className="text-[#EC1C24] shrink-0" />office@allnuts.ro
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone size={14} className="text-[#EC1C24] shrink-0" />0751 165 383
                </li>
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin size={14} className="text-[#EC1C24] shrink-0 mt-0.5" />România
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">© {new Date().getFullYear()} AllNuts. Toate drepturile rezervate.</p>
            <p className="text-gray-600 text-xs">Producător autorizat · BRC & IFS Certified · Made in Romania</p>
          </div>
        </footer>
      </main>
    </>
  )
}
