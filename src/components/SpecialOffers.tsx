import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export const SpecialOffers: React.FC = () => {
  const { offers, settings } = useBakery();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = offers.filter((o) => o.active);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleOrderOfferWhatsApp = (offerTitle: string, code: string) => {
    const msg = `Hello Mr. Cake! I would like to claim the special offer: "${offerTitle}" using coupon code [${code}]. Please share details!`;
    const url = formatWhatsAppUrl(settings.whatsappNumber, msg);
    window.open(url, '_blank');
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (activeOffers.length === 0) return null;

  return (
    <section id="offers" className="py-16 md:py-24 bg-white border-b border-[#EDE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-amber-600" />
            <span>SPECIAL OFFERS & DEALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
            Sweet Deals. Special Moments.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Celebrate more and spend less with our curated party packages, first-order discounts and weekend bundles.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              id={`offer-card-${offer.id}`}
              className="rounded-3xl bg-[#FAF7F2] border border-[#EADBCC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-[#4A2810] text-amber-200 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {offer.badge}
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md">
                  {offer.discountPercent}% OFF
                </span>
              </div>

              {/* Offer Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-[#2C1810] font-['Playfair_Display',serif]">
                    {offer.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-800">
                    {offer.subtitle}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Coupon Code & Actions */}
                <div className="space-y-3 pt-3 border-t border-[#EDE3D8]">
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-dashed border-stone-300">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Coupon Code</span>
                      <span className="font-mono text-sm font-bold text-stone-900">{offer.couponCode}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.couponCode)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 transition-colors"
                    >
                      {copiedCode === offer.couponCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={scrollToMenu}
                      className="py-2.5 px-3 rounded-xl bg-[#4A2810] text-amber-100 text-xs font-bold uppercase tracking-wider hover:bg-[#34180A] transition-colors flex items-center justify-center gap-1"
                    >
                      <span>ORDER NOW</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOrderOfferWhatsApp(offer.title, offer.couponCode)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WHATSAPP</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
