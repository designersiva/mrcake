import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, MessageCircle, ArrowRight, Check, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBakery } from '../context/BakeryContext';
import { Order } from '../types';
import { formatWhatsAppUrl, generateCartOrderWhatsAppMessage } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    addOrder,
    settings,
    offers,
  } = useBakery();

  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'Delivery' | 'Pickup'>('Delivery');
  const [address, setAddress] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('Today, 6:00 PM - 7:00 PM');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI on WhatsApp');
  const [notes, setNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [orderPlaced, setOrderPlaced] = useState<Order | null>(null);

  if (!isCartOpen) return null;

  // Delivery fee logic: Free delivery over ₹499
  const deliveryFee = deliveryType === 'Pickup' ? 0 : cartTotal >= 499 ? 0 : 40;
  const discountAmount = appliedCoupon ? Math.round((cartTotal * appliedCoupon.discount) / 100) : 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount + deliveryFee);

  const handleApplyCoupon = () => {
    const trimmed = couponCode.trim().toUpperCase();
    const found = offers.find((o) => o.couponCode === trimmed && o.active);
    if (found) {
      setAppliedCoupon({ code: found.couponCode, discount: found.discountPercent });
    } else {
      alert('Invalid coupon code. Try FIRSTCAKE or BDAYBASH.');
    }
  };

  const handleCreateOrder = (sendWhatsApp: boolean) => {
    if (!customerName || !phone) {
      alert('Please enter your Name and WhatsApp phone number.');
      return;
    }
    if (deliveryType === 'Delivery' && !address) {
      alert('Please provide your delivery address in Dharavi / Mumbai.');
      return;
    }

    const orderId = `MC${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      customerName,
      phone,
      address: deliveryType === 'Delivery' ? address : 'Store Pickup (90 Feet Road)',
      deliveryType,
      deliverySlot,
      items: [...cart],
      subtotal: cartTotal,
      discount: discountAmount,
      deliveryFee,
      total: finalTotal,
      paymentMethod,
      status: 'New',
      notes,
      isWhatsAppGenerated: sendWhatsApp,
      createdAt: 'Just now',
    };

    addOrder(newOrder);
    setOrderPlaced(newOrder);
    clearCart();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // safe fallback
    }

    if (sendWhatsApp) {
      const msg = generateCartOrderWhatsAppMessage(newOrder);
      const url = formatWhatsAppUrl(settings.whatsappNumber, msg);
      window.open(url, '_blank');
    }
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-stone-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EADBCC] flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#4A2810]" />
            <h2 className="font-bold text-lg font-['Playfair_Display',serif] text-[#2C1810]">
              Your Cart
            </h2>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
            aria-label="Close Cart Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 flex-1 space-y-6">
          {orderPlaced ? (
            /* Order Success View */
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-bold font-['Playfair_Display',serif] text-[#34180A]">
                Order Confirmed! 🎉
              </h3>
              <p className="text-sm text-stone-600">
                Order <strong>#{orderPlaced.id}</strong> has been logged for{' '}
                <strong>{orderPlaced.customerName}</strong>. Total: <strong>₹{orderPlaced.total}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#EADBCC] text-xs text-left space-y-1.5 text-stone-700">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-bold">{orderPlaced.deliveryType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Slot:</span>
                  <span className="font-bold">{orderPlaced.deliverySlot}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span className="font-bold">{orderPlaced.paymentMethod}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    const msg = generateCartOrderWhatsAppMessage(orderPlaced);
                    const url = formatWhatsAppUrl(settings.whatsappNumber, msg);
                    window.open(url, '_blank');
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>OPEN ON WHATSAPP</span>
                </button>

                <button
                  onClick={() => {
                    setOrderPlaced(null);
                    setIsCartOpen(false);
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 underline"
                >
                  Continue Browsing Bakery
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-stone-700">Your cart is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our customer favourite chocolate truffle cakes, croissants or customized birthday treats.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#4A2810] text-amber-100 text-xs font-bold uppercase tracking-wider"
              >
                BROWSE CAKES
              </button>
            </div>
          ) : (
            /* Active Cart Items & Checkout */
            <div className="space-y-6">
              {/* Item List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-2xl border border-[#EADBCC] flex gap-3 shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-[#2C1810] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-stone-500">
                            Size: <strong>{item.selectedSize}</strong> • ₹{item.unitPrice}
                          </span>
                          {item.customMessage && (
                            <p className="text-[10px] text-amber-800 italic mt-0.5">
                              Msg: "{item.customMessage}"
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-500 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quantity row */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                        <div className="flex items-center gap-2 bg-stone-100 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="text-xs font-bold text-stone-600 hover:text-stone-900"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold text-stone-800 px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="text-xs font-bold text-stone-600 hover:text-stone-900"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#4A2810]">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Applicator */}
              <div className="p-3 bg-white rounded-2xl border border-stone-200 flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon (e.g. FIRSTCAKE)"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-mono uppercase focus:ring-1 focus:ring-amber-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 bg-stone-800 text-white text-xs font-bold rounded-lg hover:bg-stone-900"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <span>Coupon {appliedCoupon.code} applied ({appliedCoupon.discount}% OFF)</span>
                  <button onClick={() => setAppliedCoupon(null)} className="text-stone-500 font-bold">✕</button>
                </div>
              )}

              {/* Checkout Form */}
              <div className="p-4 bg-white rounded-2xl border border-[#EADBCC] space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#34180A]">
                  Delivery & Contact Info
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name *"
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp Phone *"
                    className="px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-none"
                  />
                </div>

                {/* Fulfillment option */}
                <div className="flex gap-4 pt-1 text-xs">
                  <label className="flex items-center gap-1.5 font-semibold text-stone-700 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'Delivery'}
                      onChange={() => setDeliveryType('Delivery')}
                      className="text-amber-700"
                    />
                    <span>Home Delivery</span>
                  </label>
                  <label className="flex items-center gap-1.5 font-semibold text-stone-700 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'Pickup'}
                      onChange={() => setDeliveryType('Pickup')}
                      className="text-amber-700"
                    />
                    <span>Store Pickup</span>
                  </label>
                </div>

                {deliveryType === 'Delivery' && (
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat/House no., building, street, Dharavi/Mumbai address..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-1 focus:ring-amber-600 focus:outline-none"
                  />
                )}

                <div>
                  <label className="text-[11px] font-bold text-stone-500 block mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none"
                  >
                    <option value="Today, 3:00 PM - 5:00 PM">Today, 3:00 PM - 5:00 PM</option>
                    <option value="Today, 6:00 PM - 7:30 PM (Evening Celebration)">Today, 6:00 PM - 7:30 PM</option>
                    <option value="Today, 8:00 PM - 9:30 PM">Today, 8:00 PM - 9:30 PM</option>
                    <option value="Tomorrow Morning (9:00 AM - 11:00 AM)">Tomorrow Morning (9:00 AM - 11:00 AM)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-500 block mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none"
                  >
                    <option value="UPI on WhatsApp">UPI (GPay / PhonePe / Paytm via WhatsApp)</option>
                    <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                    <option value="Card at Pickup">Card / UPI at Store Counter</option>
                  </select>
                </div>
              </div>

              {/* Bill Details */}
              <div className="p-3.5 bg-white rounded-2xl border border-[#EADBCC] text-xs space-y-1.5 text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-800">₹{cartTotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-extrabold text-[#34180A]">
                  <span>Total Amount:</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Buttons */}
        {!orderPlaced && cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#EADBCC] bg-white sticky bottom-0 z-10 space-y-2">
            <button
              onClick={() => handleCreateOrder(true)}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>CONFIRM & ORDER ON WHATSAPP (₹{finalTotal})</span>
            </button>

            <button
              onClick={() => handleCreateOrder(false)}
              className="w-full py-3 px-4 rounded-2xl bg-[#4A2810] hover:bg-[#34180A] text-amber-100 font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              <span>DIRECT ORDER (PAY CASH / UPI LATER)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
