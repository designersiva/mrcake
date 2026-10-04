import React from 'react';
import { Cake, Heart, MapPin, Phone, MessageCircle, Clock, ShieldCheck, Lock } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const { settings, setActiveCategoryFilter, setIsAdminViewOpen } = useBakery();

  const directWhatsAppUrl = formatWhatsAppUrl(
    settings.whatsappNumber,
    'Hello Mr. Cake, I visited your website and would like to ask a question.'
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategoryFilter(cat);
    scrollToSection('menu');
  };

  return (
    <footer className="bg-[#24130A] text-[#EDE3D8] border-t border-[#3D2214]">
      {/* Top Value Banner */}
      <div className="border-b border-[#3D2214] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs">
          <div className="space-y-1">
            <span className="text-xl">🎂</span>
            <div className="font-bold text-white">100% Freshly Baked</div>
            <div className="text-stone-400">Baked fresh daily in Dharavi</div>
          </div>
          <div className="space-y-1">
            <span className="text-xl">🌿</span>
            <div className="font-bold text-white">Pure Veg / Eggless</div>
            <div className="text-stone-400">Dedicated vegetarian prep</div>
          </div>
          <div className="space-y-1">
            <span className="text-xl">⚡</span>
            <div className="font-bold text-white">2-Hour Express Delivery</div>
            <div className="text-stone-400">Rush orders across Mumbai</div>
          </div>
          <div className="space-y-1">
            <span className="text-xl">💬</span>
            <div className="font-bold text-white">Instant WhatsApp Order</div>
            <div className="text-stone-400">Direct baker communication</div>
          </div>
        </div>
      </div>

      {/* Main 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-wider uppercase font-['Playfair_Display',serif] text-white">
                  MR. CAKE
                </span>
                <span className="block text-[10px] text-amber-400 tracking-widest uppercase">
                  DHARAVI • MUMBAI
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Modern artisanal bakery, cake studio and dining cafe in the heart of Dharavi, Mumbai.
              Crafting joy for birthdays, weddings, anniversaries, and everyday sweet moments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="w-9 h-9 rounded-full bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors"
                title="Call Us"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://maps.google.com/?q=Dharavi+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-colors"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-white font-['Playfair_Display',serif]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-amber-300 transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('menu')} className="hover:text-amber-300 transition-colors">
                  Artisanal Menu
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('custom-cake-builder')} className="hover:text-amber-300 transition-colors">
                  Custom Cake Builder
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('offers')} className="hover:text-amber-300 transition-colors">
                  Special Offers & Coupons
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="hover:text-amber-300 transition-colors">
                  Bakery Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('reviews')} className="hover:text-amber-300 transition-colors">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('reservations')} className="hover:text-amber-300 transition-colors">
                  Reserve Cafe Table
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Cake Categories */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-white font-['Playfair_Display',serif]">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => handleCategoryClick('birthday-cakes')} className="hover:text-amber-300 transition-colors">
                  Birthday Celebration Cakes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('designer-cakes')} className="hover:text-amber-300 transition-colors">
                  Designer & Theme Cakes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('chocolate-cakes')} className="hover:text-amber-300 transition-colors">
                  Pure Chocolate Truffle Series
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('cupcakes')} className="hover:text-amber-300 transition-colors">
                  Gourmet Cupcakes & Bento Cakes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('bakery-items')} className="hover:text-amber-300 transition-colors">
                  Artisan Bakery & Croissants
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('snacks')} className="hover:text-amber-300 transition-colors">
                  Hot Savouries & Puffs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Store & Hours */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-white font-['Playfair_Display',serif]">
              Store & Delivery Hub
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300 font-semibold">{settings.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{settings.openingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsAdminViewOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-[11px] font-semibold transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Store Manager / Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Love Bar */}
      <div className="border-t border-[#341A0E] py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Mr. Cake. All rights reserved.</p>
          <p className="flex items-center gap-1 text-stone-400">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> in Dharavi, Mumbai
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Eggless Certified</span>
            <span>•</span>
            <span>FSSAI Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
