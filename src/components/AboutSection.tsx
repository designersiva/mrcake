import React from 'react';
import { Heart, Sparkles, Award, UtensilsCrossed, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-y border-[#EDE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Bakery Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Bakery Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2] aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=85"
                  alt="Artisanal Bakery & Patisserie at Mr. Cake Dharavi"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Inset Second Image (Pastry Chef / Cake Decorating) */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-56 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80"
                  alt="Freshly Decorated Cake"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Experience Badge */}
              <div className="absolute top-6 -left-4 sm:-left-6 bg-[#4A2810] text-[#FFF6ED] p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-lg font-extrabold text-amber-300">100% Veg</span>
                  <span className="text-[11px] text-stone-300 font-medium">Eggless Mastery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story and Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>OUR STORY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
              Made Fresh. Made With Love.
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Mr. Cake brings freshly baked cakes, bakery favourites, snacks and beverages to the Dharavi community.
              From birthday celebrations to everyday sweet cravings, every creation is prepared with care and attention to quality.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Located right on 90 Feet Road, our ovens start early every morning using grade-A cocoa, pure farm butter,
              fresh cream, and seasonal fruits. Whether you need a whimsical 3-tier wedding cake or warm evening snacks with coffee,
              we ensure memorable sweetness in every bite.
            </p>

            {/* Core Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] space-y-1">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
                  <Heart className="w-4 h-4 fill-amber-500 text-amber-600" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm">Fresh Ingredients</h3>
                <p className="text-xs text-stone-500">Pure butter, imported cocoa, zero preservatives.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] space-y-1">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm">Custom Designs</h3>
                <p className="text-xs text-stone-500">Photo cakes, fondant art, bespoke color palettes.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] space-y-1">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm">Celebration Cakes</h3>
                <p className="text-xs text-stone-500">Designed to be the centerpiece of your celebration.</p>
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="pt-2 space-y-2 text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Extensive selection of 100% vegetarian / eggless cakes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom cake orders accepted with same-day confirmation on WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fast home delivery across Dharavi, Sion, Mahim & Dadar</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('location-contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-[#4A2810] text-amber-100 hover:bg-[#34180A] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all"
              >
                VISIT OUR STORE
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors"
              >
                EXPLORE MENU →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
