import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, MessageCircle, Clock, ShieldCheck, Heart, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { CakeSize } from '../types';
import { formatWhatsAppUrl, generateProductWhatsAppMessage } from '../utils/whatsapp';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForModal, setSelectedProductForModal, addToCart, settings } = useBakery();

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  const [selectedSize, setSelectedSize] = useState<CakeSize>(
    product.availableSizes[0]?.size || '0.5 KG'
  );
  const [selectedFlavour, setSelectedFlavour] = useState<string>(
    product.flavours[0] || 'Default'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isEggless, setIsEggless] = useState<boolean>(product.isEggless);
  const [customMessage, setCustomMessage] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('6:00 PM');
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  useEffect(() => {
    if (product.availableSizes.length > 0) {
      setSelectedSize(product.availableSizes[0].size);
    }
    if (product.flavours.length > 0) {
      setSelectedFlavour(product.flavours[0]);
    }
    setQuantity(1);
    setIsEggless(product.isEggless);
    setCustomMessage('');
    setAddedNotice(false);
  }, [product]);

  const currentSizeObj = product.availableSizes.find((s) => s.size === selectedSize);
  const unitPrice = currentSizeObj ? currentSizeObj.price : product.discountPrice || product.basePrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}-${Date.now()}`,
      productId: product.id,
      product,
      selectedSize,
      unitPrice,
      quantity,
      selectedFlavour,
      customMessage: customMessage.trim(),
      isEggless,
    });
    setAddedNotice(true);
    setTimeout(() => {
      setSelectedProductForModal(null);
    }, 900);
  };

  const handleWhatsAppOrder = () => {
    const message = generateProductWhatsAppMessage({
      productName: product.name,
      size: selectedSize,
      quantity,
      price: unitPrice,
      isEggless,
      customMessage: customMessage.trim() || undefined,
      date: deliveryDate || 'Earliest available today',
      time: deliveryTime,
    });

    const url = formatWhatsAppUrl(settings.whatsappNumber, message);
    window.open(url, '_blank');
  };

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={() => setSelectedProductForModal(null)}
    >
      <div
        className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 text-[#2C1810] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 shadow-md flex items-center justify-center transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Big Food Image and badges */}
          <div className="relative bg-stone-100 min-h-[300px] md:min-h-[480px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />

            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#4A2810] text-amber-200 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {product.badge}
              </span>
            )}

            {/* Preparation time badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-xl border border-stone-200 text-xs flex items-center justify-between text-stone-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-amber-600" />
                {product.preparationTime || 'Freshly Baked in 2 Hours'}
              </span>
              <span className="text-emerald-700 font-bold">Dharavi Bakery</span>
            </div>
          </div>

          {/* Right: Customization & Ordering Form */}
          <div className="p-5 sm:p-7 flex flex-col justify-between space-y-5 max-h-[85vh] overflow-y-auto">
            <div>
              {/* Rating & Veg Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-600">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span className="text-stone-500">({product.reviewsCount} reviews)</span>
                </div>

                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 bg-emerald-50 text-emerald-800 border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  100% Eggless / Veg
                </span>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-[#34180A]">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {product.description}
              </p>

              {/* Price Banner */}
              <div className="mt-4 p-3 bg-white rounded-2xl border border-[#EADBCC] flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500">Price for {selectedSize}:</span>
                  <div className="text-2xl font-extrabold text-[#4A2810]">
                    ₹{unitPrice}
                  </div>
                </div>
                {product.discountPrice && (
                  <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-1 rounded-full">
                    Special Offer
                  </span>
                )}
              </div>

              {/* Step 1: Size Selector */}
              <div className="mt-4 space-y-1.5">
                <label className="text-xs font-bold text-stone-700 tracking-wider uppercase block">
                  Select Cake Weight / Size
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {product.availableSizes.map((s) => (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                        selectedSize === s.size
                          ? 'bg-[#4A2810] text-amber-100 border-[#4A2810] shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-amber-700'
                      }`}
                    >
                      <div>{s.size}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">₹{s.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Flavours */}
              {product.flavours.length > 1 && (
                <div className="mt-4 space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 tracking-wider uppercase block">
                    Choose Flavour
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.flavours.map((flv) => (
                      <button
                        key={flv}
                        type="button"
                        onClick={() => setSelectedFlavour(flv)}
                        className={`py-1.5 px-3 rounded-full text-xs font-semibold border transition-all ${
                          selectedFlavour === flv
                            ? 'bg-amber-800 text-white border-amber-800'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {flv}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Message on Cake */}
              <div className="mt-4 space-y-1.5">
                <label className="text-xs font-bold text-stone-700 tracking-wider uppercase flex items-center justify-between">
                  <span>Message on Cake (Optional)</span>
                  <span className="text-[11px] font-normal text-stone-400">Piped in chocolate</span>
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder='e.g., "Happy 25th Birthday Priya!"'
                  maxLength={40}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>

              {/* Quantity */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#EDE3D8]">
                <span className="text-xs font-bold text-stone-700 tracking-wider uppercase">
                  Quantity
                </span>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-stone-300">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 font-bold text-stone-800 flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-stone-900 w-5 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 font-bold text-stone-800 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Ingredients preview */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#EDE3D8]">
                  <span className="text-[11px] font-bold text-stone-500 uppercase block mb-1">
                    Ingredients:
                  </span>
                  <p className="text-xs text-stone-500">
                    {product.ingredients.join(' • ')}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-[#EADBCC]">
              {addedNotice && (
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-pulse">
                  <Check className="w-4 h-4" /> Added to your cart! Opening drawer...
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3.5 px-4 rounded-xl bg-[#4A2810] hover:bg-[#34180A] text-amber-100 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART (₹{totalPrice})</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WHATSAPP ORDER</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Freshness guaranteed. Delivered with care across Dharavi & Mumbai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
