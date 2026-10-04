import React from 'react';
import { MessageCircle, Cake, Sparkles, Truck, Coffee, ArrowRight } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export const OrderCTA: React.FC = () => {
  const { settings, setActiveCategoryFilter } = useBakery();

  const directWhatsAppUrl = formatWhatsAppUrl(
    settings.whatsappNumber,
    "Hello Mr. Cake! I'm ready to place an order. What cakes are fresh out of the oven today?"
  );

  const scrollToMenuWithCategory = (cat: string) => {
    setActiveCategoryFilter(cat);
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustomCake = () => {
    const el = document.getElementById('custom-cake-builder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="order-cta" className="py-16 md:py-20 bg-gradient-to-r from-[#3D200E] via-[#4A2810] to-[#34180A] text-[#FFF6ED] relative overflow-hidden">
      {/* Decorative background swirls */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            FAST ORDERING • DHARAVI, MUMBAI
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-['Playfair_Display',serif]">
            What Would You Like Today?
          </h2>
          <p className="text-amber-200/80 text-sm sm:text-base">
            Satisfy your cravings in seconds. Choose an option below or chat directly with our bakery counter on WhatsApp!
          </p>
        </div>

        {/* 5 High-Impact Quick Nav Cards as described in blueprint */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => scrollToMenuWithCategory('birthday-cakes')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/15 transition-all transform hover:-translate-y-1 text-center group"
          >
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🎂</span>
            <span className="font-bold text-sm text-white block">Order Cake</span>
            <span className="text-[11px] text-amber-200/70">From ₹499</span>
          </button>

          <button
            onClick={() => scrollToMenuWithCategory('bakery-items')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/15 transition-all transform hover:-translate-y-1 text-center group"
          >
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🥐</span>
            <span className="font-bold text-sm text-white block">Bakery Bakes</span>
            <span className="text-[11px] text-amber-200/70">Warm Croissants</span>
          </button>

          <button
            onClick={scrollToCustomCake}
            className="p-5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 backdrop-blur-xs border border-amber-400/30 transition-all transform hover:-translate-y-1 text-center group"
          >
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🎁</span>
            <span className="font-bold text-sm text-amber-300 block">Custom Cake</span>
            <span className="text-[11px] text-amber-200/80">Design Yours</span>
          </button>

          <button
            onClick={() => scrollToMenuWithCategory('all')}
            className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/15 transition-all transform hover:-translate-y-1 text-center group"
          >
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">🚚</span>
            <span className="font-bold text-sm text-white block">Fast Delivery</span>
            <span className="text-[11px] text-amber-200/70">2-Hour Rush</span>
          </button>

          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-xs border border-emerald-400/30 transition-all transform hover:-translate-y-1 text-center group col-span-2 sm:col-span-1"
          >
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">📲</span>
            <span className="font-bold text-sm text-emerald-300 block">WhatsApp</span>
            <span className="text-[11px] text-emerald-200/80">Instant Help</span>
          </a>
        </div>

        {/* Main WhatsApp Banner Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>ORDER ON WHATSAPP NOW</span>
          </a>

          <button
            onClick={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm tracking-wider uppercase border border-white/20 transition-colors"
          >
            VIEW FULL MENU
          </button>
        </div>
      </div>
    </section>
  );
};
