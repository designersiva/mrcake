import React, { useState } from 'react';
import { UtensilsCrossed, Sparkles, MessageCircle, Check, Users, Calendar, Clock } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { Reservation } from '../types';
import { formatWhatsAppUrl, generateReservationWhatsAppMessage } from '../utils/whatsapp';

export const ReservationSection: React.FC = () => {
  const { addReservation, settings } = useBakery();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('7:00 PM');
  const [guests, setGuests] = useState(2);
  const [specialRequest, setSpecialRequest] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastReservation, setLastReservation] = useState<Reservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) {
      alert('Please enter your name, phone number, and preferred date.');
      return;
    }

    const newRes: Reservation = {
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      customerName: name,
      phone,
      email,
      date,
      time,
      guests,
      specialRequest,
      status: 'Pending',
      createdAt: 'Just now',
    };

    addReservation(newRes);
    setLastReservation(newRes);
    setIsSubmitted(true);
  };

  const handleWhatsAppConfirm = () => {
    if (lastReservation) {
      const msg = generateReservationWhatsAppMessage({
        name: lastReservation.customerName,
        phone: lastReservation.phone,
        date: lastReservation.date,
        time: lastReservation.time,
        guests: lastReservation.guests,
        specialRequest: lastReservation.specialRequest,
      });
      const url = formatWhatsAppUrl(settings.whatsappNumber, msg);
      window.open(url, '_blank');
    }
  };

  return (
    <section id="reservations" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-[#EDE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Cafe Atmosphere & Ambiance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
              <span>DINE-IN & CAFE SEATING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
              Reserve Your Table
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Planning a birthday gathering, dessert date, or family get-together in Dharavi?
              Reserve a cozy table at our restaurant cafe to enjoy freshly baked pastries, artisanal coffees, and sizzling hot savouries right off the stove.
            </p>

            {/* Inset Photo */}
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-16/10">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                alt="Mr. Cake Cafe Seating Area"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-stone-700">
              <div className="p-3 bg-white rounded-2xl border border-stone-200">
                ☕ Freshly brewed espresso & shakes
              </div>
              <div className="p-3 bg-white rounded-2xl border border-stone-200">
                🎉 Birthday party table decorations available
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7">
            {isSubmitted && lastReservation ? (
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#E0D2C3] text-center space-y-6 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-['Playfair_Display',serif] text-[#34180A]">
                    Reservation Received!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Thank you, <span className="font-bold text-stone-900">{lastReservation.customerName}</span>.
                    Our team will confirm your table shortly for <strong>{lastReservation.guests} guests</strong> on{' '}
                    <strong>{lastReservation.date} at {lastReservation.time}</strong>.
                  </p>
                </div>

                <div className="pt-2 space-y-3 max-w-sm mx-auto">
                  <button
                    type="button"
                    onClick={handleWhatsAppConfirm}
                    className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wider uppercase shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>WHATSAPP US TO CONFIRM</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-stone-500 hover:text-stone-800 underline"
                  >
                    Make another table reservation
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E0D2C3] space-y-4"
              >
                <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-[#34180A]">
                  Table Booking Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Zainab Qureshi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9820123456"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Number of Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, '10+ Group'].map((num) => (
                        <option key={num} value={typeof num === 'number' ? num : 10}>
                          {num} {typeof num === 'number' && num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Time Slot *</label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none bg-white"
                    >
                      <option value="11:30 AM">11:30 AM (Lunch)</option>
                      <option value="1:00 PM">1:00 PM (Lunch)</option>
                      <option value="4:00 PM">4:00 PM (Afternoon Tea/Snacks)</option>
                      <option value="6:00 PM">6:00 PM (Evening)</option>
                      <option value="7:30 PM">7:30 PM (Dinner)</option>
                      <option value="9:00 PM">9:00 PM (Late Dessert)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Special Request (Optional)</label>
                  <textarea
                    rows={2}
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Birthday decoration, quiet corner table, high chair for toddler..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#4A2810] text-amber-100 hover:bg-[#34180A] font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-98"
                >
                  REQUEST RESERVATION
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
