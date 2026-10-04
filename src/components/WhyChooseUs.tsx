import React from 'react';
import { Cake, Milk, Palette, BadgePercent, Zap, Truck, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Cake,
      emoji: '🎂',
      title: 'Freshly Baked',
      description: 'Fresh products prepared regularly in our hygienic ovens every morning.',
    },
    {
      icon: Milk,
      emoji: '🥛',
      title: 'Quality Ingredients',
      description: 'Carefully selected dairy butter, Belgian cocoa & zero synthetic preservatives.',
    },
    {
      icon: Palette,
      emoji: '🎨',
      title: 'Custom Designs',
      description: 'Create bespoke cakes tailored to your theme, color palette & characters.',
    },
    {
      icon: BadgePercent,
      emoji: '💰',
      title: 'Affordable Pricing',
      description: 'Celebration cakes and gourmet desserts at accessible, honest prices.',
    },
    {
      icon: Zap,
      emoji: '⚡',
      title: 'Fast Service',
      description: 'Quick WhatsApp order processing and 2-hour rush baking when you need it.',
    },
    {
      icon: Truck,
      emoji: '🚚',
      title: 'Local Delivery',
      description: 'Serving customers around Dharavi, Sion, Mahim, Dadar and BKC safely.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-white border-b border-[#EDE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>THE MR. CAKE PROMISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
            Why Choose Mr. Cake?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            We combine warm neighbourhood hospitality with modern European patisserie standards right in Dharavi.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EADBCC] hover:border-amber-700/50 hover:shadow-lg transition-all duration-300 group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                  <span>{feat.emoji}</span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base sm:text-lg text-[#2C1810] group-hover:text-amber-800 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
