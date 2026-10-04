import React, { useState } from 'react';
import { Sparkles, Star, MessageCircle, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { Product, CakeSize } from '../types';
import { formatWhatsAppUrl, generateProductWhatsAppMessage } from '../utils/whatsapp';

export const PopularCakes: React.FC = () => {
  const { products, addToCart, setSelectedProductForModal, settings } = useBakery();
  // State for selected size on each card
  const [selectedSizes, setSelectedSizes] = useState<Record<string, CakeSize>>({});

  // Filter only featured popular cakes
  const popularCakes = products.filter((p) => p.isFeatured).slice(0, 8);

  const handleSizeChange = (productId: string, size: CakeSize) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const getPriceForSize = (product: Product, size: CakeSize): number => {
    const found = product.availableSizes.find((s) => s.size === size);
    return found ? found.price : product.discountPrice || product.basePrice;
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenSize = selectedSizes[product.id] || (product.availableSizes[0]?.size || '0.5 KG');
    const price = getPriceForSize(product, chosenSize);

    addToCart({
      id: `${product.id}-${chosenSize}-${Date.now()}`,
      productId: product.id,
      product,
      selectedSize: chosenSize,
      unitPrice: price,
      quantity: 1,
      isEggless: product.isEggless,
    });
  };

  const handleWhatsAppQuickOrder = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenSize = selectedSizes[product.id] || (product.availableSizes[0]?.size || '0.5 KG');
    const price = getPriceForSize(product, chosenSize);

    const message = generateProductWhatsAppMessage({
      productName: product.name,
      size: chosenSize,
      quantity: 1,
      price,
      isEggless: product.isEggless,
    });

    const url = formatWhatsAppUrl(settings.whatsappNumber, message);
    window.open(url, '_blank');
  };

  return (
    <section id="popular-cakes" className="py-16 md:py-24 bg-white border-y border-[#EDE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>POPULAR CAKES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
              Customer Favourites
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Our most celebrated, mouth-watering cakes baked fresh in Dharavi. Choose your preferred size and order directly.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="self-start md:self-auto text-xs sm:text-sm font-bold text-[#8B3E14] hover:text-[#4A2810] underline underline-offset-4 tracking-wider uppercase"
          >
            VIEW FULL MENU ({products.length}+ ITEMS) →
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCakes.map((product) => {
            const currentSize = selectedSizes[product.id] || product.availableSizes[0]?.size || '0.5 KG';
            const currentPrice = getPriceForSize(product, currentSize);

            return (
              <div
                key={product.id}
                id={`popular-cake-${product.id}`}
                onClick={() => setSelectedProductForModal(product)}
                className="group cursor-pointer rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#4A2810] text-amber-200 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Eggless indicator */}
                  {product.isEggless && (
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      Eggless
                    </span>
                  )}

                  {/* Quick View overlay */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="bg-white/95 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Details & Custom Message
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Rating & Review */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold text-stone-800">{product.rating}</span>
                        <span>({product.reviewsCount})</span>
                      </div>
                      <span className="text-[11px] text-stone-400">Fresh daily</span>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-[#2C1810] group-hover:text-amber-800 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Size Dropdown / Buttons */}
                  <div className="pt-2 border-t border-[#EDE3D8]" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-2 text-xs">
                      <span className="text-stone-500 font-medium">Select Size:</span>
                      <div className="flex items-center gap-1 font-semibold text-stone-800">
                        {product.availableSizes.map((s) => (
                          <button
                            key={s.size}
                            onClick={() => handleSizeChange(product.id, s.size)}
                            className={`px-1.5 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                              currentSize === s.size
                                ? 'bg-[#4A2810] text-amber-200 border-[#4A2810]'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            {s.size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-xs text-stone-400">Total:</span>
                        <div className="text-lg font-extrabold text-[#4A2810]">
                          ₹{currentPrice}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* WhatsApp Button */}
                        <button
                          onClick={(e) => handleWhatsAppQuickOrder(product, e)}
                          title="Order directly on WhatsApp"
                          className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                        </button>

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          className="px-3.5 py-2 rounded-xl bg-[#4A2810] hover:bg-[#34180A] text-amber-100 text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>ADD</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
