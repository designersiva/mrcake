import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, Star, ShoppingBag, MessageCircle, SlidersHorizontal, Eye } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { Product, CakeSize } from '../types';
import { formatWhatsAppUrl, generateProductWhatsAppMessage } from '../utils/whatsapp';

export const MenuSection: React.FC = () => {
  const {
    products,
    categories,
    activeCategoryFilter,
    setActiveCategoryFilter,
    setSelectedProductForModal,
    addToCart,
    settings,
  } = useBakery();

  const [searchQuery, setSearchQuery] = useState('');
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, CakeSize>>({});

  // Tab definitions
  const menuTabs = [
    { id: 'all', label: 'All Items' },
    { id: 'birthday-cakes', label: 'Birthday Cakes' },
    { id: 'designer-cakes', label: 'Designer Cakes' },
    { id: 'chocolate-cakes', label: 'Chocolate Cakes' },
    { id: 'cupcakes', label: 'Cupcakes' },
    { id: 'bakery-items', label: 'Bakery' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'beverages', label: 'Beverages' },
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Availability check
      if (!p.isAvailable) return false;

      // Category check
      if (activeCategoryFilter !== 'all') {
        if (p.category !== activeCategoryFilter) return false;
      }

      // Eggless filter
      if (egglessOnly && !p.isEggless) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchFlv = p.flavours.some((f) => f.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchFlv) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceA = a.discountPrice || a.basePrice;
        const priceB = b.discountPrice || b.basePrice;
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = a.discountPrice || a.basePrice;
        const priceB = b.discountPrice || b.basePrice;
        return priceB - priceA;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // Recommended: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategoryFilter, egglessOnly, searchQuery, sortBy]);

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

  const handleWhatsAppOrder = (product: Product, e: React.MouseEvent) => {
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
    <section id="menu" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>FULL ARTISANAL MENU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
            Explore Our Daily Creations
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Every item is handcrafted with premium ingredients, baked in hygienic ovens and ready for fast delivery in Dharavi.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-[#EADBCC] mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, truffle, croissants, paneer puff, beverages..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 bg-stone-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Toggles: Eggless & Sort */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <label className="flex items-center gap-2 text-xs font-bold text-stone-700 cursor-pointer bg-stone-100 px-3 py-2 rounded-2xl hover:bg-stone-200 transition-colors">
                <input
                  type="checkbox"
                  checked={egglessOnly}
                  onChange={(e) => setEgglessOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  100% Eggless Only
                </span>
              </label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-2 rounded-2xl border-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
              >
                <option value="recommended">Featured / Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            {menuTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategoryFilter === tab.id
                    ? 'bg-[#4A2810] text-amber-100 shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count Display */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 px-1">
          <span>
            Showing <strong>{filteredProducts.length}</strong> items
            {activeCategoryFilter !== 'all' && ` in "${menuTabs.find((t) => t.id === activeCategoryFilter)?.label}"`}
          </span>
          {egglessOnly && <span className="text-emerald-700 font-bold">✓ Filtered by Eggless</span>}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <p className="text-lg font-bold text-stone-700">No matching items found</p>
            <p className="text-sm text-stone-500">
              Try modifying your search keywords or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setEgglessOnly(false);
                setActiveCategoryFilter('all');
              }}
              className="px-4 py-2 rounded-full bg-amber-800 text-white text-xs font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const currentSize = selectedSizes[product.id] || product.availableSizes[0]?.size || '0.5 KG';
              const currentPrice = getPriceForSize(product, currentSize);

              return (
                <div
                  key={product.id}
                  id={`menu-item-${product.id}`}
                  onClick={() => setSelectedProductForModal(product)}
                  className="group cursor-pointer rounded-2xl bg-white border border-[#EADBCC] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#4A2810] text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {product.badge}
                      </span>
                    )}

                    {product.isEggless && (
                      <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Eggless
                      </span>
                    )}

                    {/* Quick View */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/95 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold text-stone-800">{product.rating}</span>
                        </div>
                        <span className="capitalize text-[11px] font-medium text-stone-400">
                          {product.category.replace('-', ' ')}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-[#2C1810] group-hover:text-amber-800 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Weight / Size selection pills */}
                    <div className="pt-2 border-t border-[#EDE3D8]" onClick={(e) => e.stopPropagation()}>
                      {product.availableSizes.length > 1 && (
                        <div className="flex items-center justify-between mb-2 text-xs">
                          <span className="text-stone-500 text-[11px]">Size:</span>
                          <div className="flex items-center gap-1 font-semibold">
                            {product.availableSizes.map((s) => (
                              <button
                                key={s.size}
                                onClick={() => handleSizeChange(product.id, s.size)}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                                  currentSize === s.size
                                    ? 'bg-[#4A2810] text-amber-200 border-[#4A2810]'
                                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400'
                                }`}
                              >
                                {s.size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pricing and Action row */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <div className="text-lg font-extrabold text-[#4A2810]">
                            ₹{currentPrice}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleWhatsAppOrder(product, e)}
                            title="Order directly on WhatsApp"
                            className="p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                          </button>

                          <button
                            onClick={(e) => handleQuickAdd(product, e)}
                            className="px-3 py-2 rounded-xl bg-[#4A2810] hover:bg-[#34180A] text-amber-100 text-xs font-bold flex items-center gap-1 shadow-xs transition-transform active:scale-95"
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
        )}
      </div>
    </section>
  );
};
