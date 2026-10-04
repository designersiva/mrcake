import React from 'react';
import { Star, MapPin, Sparkles, Clock, Truck, ChefHat, ArrowRight, MessageCircle } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  const { settings, setSelectedProductForModal, products } = useBakery();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCustomCake = () => {
    const el = document.getElementById('custom-cake-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const directWhatsAppUrl = formatWhatsAppUrl(
    settings.whatsappNumber,
    "Hello Mr. Cake! I'm looking to order a celebration cake in Dharavi today."
  );

  const featuredHeroCake = products[0];

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#FAF7F2] via-[#F5ECE1] to-[#FAF7F2]"
    >
      {/* Decorative background warm glow circles */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, Trust & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Dharavi Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADDD0] text-[#3D2314] text-xs sm:text-sm font-semibold tracking-wide shadow-xs mx-auto lg:mx-0">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Dharavi, Mumbai’s Favourite Bakery</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2C1810] tracking-tight leading-[1.12] font-['Playfair_Display',serif]">
                It’s Not a Cake, <br />
                <span className="italic text-[#8B3E14] relative inline-block">
                  It’s a Celebration!
                  <svg className="absolute left-0 -bottom-2 w-full h-3 text-amber-500/60" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                    <path d="M1 5.5C40 2 160 2 199 5.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#5A4033] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {settings.heroSubheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-order-now-btn"
                onClick={scrollToMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#4A2810] text-[#FFF6ED] hover:bg-[#34180A] font-bold text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-view-menu-btn"
                onClick={scrollToMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white text-[#4A2810] hover:bg-[#F3E9DC] font-bold text-sm tracking-wider uppercase border border-[#D5C2B1] shadow-xs transition-colors"
              >
                VIEW MENU
              </button>

              <a
                id="hero-whatsapp-btn"
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-emerald-700/10 text-emerald-800 hover:bg-emerald-700/20 font-semibold text-sm border border-emerald-300 flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Trust Badges & Indicators */}
            <div className="pt-4 border-t border-[#E8DACB] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              {/* Rating */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 text-amber-600 fill-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-stone-900">4.8 / 5</span>
                  </div>
                  <span className="text-[11px] text-stone-500">Google Reviews</span>
                </div>
              </div>

              {/* Freshly Baked */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <ChefHat className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Freshly Baked</span>
                  <span className="text-[11px] text-stone-500">Every morning</span>
                </div>
              </div>

              {/* Custom Cakes */}
              <div className="flex items-center gap-2.5 cursor-pointer" onClick={scrollToCustomCake}>
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Custom Cakes</span>
                  <span className="text-[11px] text-amber-800 underline">Design yours →</span>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Dharavi Delivery</span>
                  <span className="text-[11px] text-stone-500">Within 2 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Cake Visual with interactive badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Outer decorative halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/30 to-orange-500/20 rounded-3xl transform rotate-2 scale-105 filter blur-lg" />

              {/* Main Cake Showcase Card */}
              <div className="relative bg-white/90 backdrop-blur-xs p-4 sm:p-5 rounded-3xl shadow-2xl border border-stone-200/80 group">
                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                    alt="Signature Chocolate Truffle Cake at Mr. Cake Dharavi"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay Tag */}
                  <div className="absolute top-3 left-3 bg-[#4A2810]/90 text-amber-300 backdrop-blur-xs text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Signature Truffle • ₹649
                  </div>

                  {/* Eggless 100% Veg Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    100% Pure Veg / Eggless
                  </div>

                  {/* Quick Order Action on hover */}
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    <button
                      onClick={() => featuredHeroCake && setSelectedProductForModal(featuredHeroCake)}
                      className="flex-1 bg-white/95 hover:bg-white text-stone-900 text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <span>Quick View & Select Size</span>
                    </button>
                  </div>
                </div>

                {/* Card Sub-info */}
                <div className="mt-4 flex items-center justify-between px-1">
                  <div>
                    <h3 className="font-bold text-[#3A1E0E] text-base sm:text-lg">
                      Belgian Dark Ganache Delight
                    </h3>
                    <p className="text-xs text-stone-500">Multi-layered moist cocoa with gold dusting</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 line-through mr-1.5">₹699</span>
                    <span className="text-lg font-extrabold text-[#4A2810]">₹649</span>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200/80 max-w-[240px] hidden sm:block">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 italic font-medium">
                  “Best truffle cake in Dharavi! Soft, super rich and delivered right on time.”
                </p>
                <span className="text-[10px] text-stone-500 mt-1 block font-semibold">— Priya K. (Google Review)</span>
              </div>

              {/* Floating Rush Delivery Badge */}
              <div className="absolute -top-4 -right-4 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5 animate-pulse">
                <Clock className="w-3.5 h-3.5" />
                <span>2-Hour Rush Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
