import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Send, Check, Mail, ExternalLink, Navigation } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export const LocationContact: React.FC = () => {
  const { settings } = useBakery();
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const directWhatsAppUrl = formatWhatsAppUrl(
    settings.whatsappNumber,
    "Hello Mr. Cake, I'm reaching out from your website contact page regarding an inquiry."
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setContactName('');
      setContactPhone('');
      setContactMsg('');
    }, 2500);
  };

  return (
    <section id="location-contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>FIND US IN DHARAVI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
            Visit Mr. Cake
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Drop by our patisserie for a warm pastry and artisan coffee, or reach out to us directly for cake delivery across Mumbai.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Map Container */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-lg border border-[#EADBCC] bg-[#FAF7F2] p-2">
            <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-stone-200">
              <iframe
                title="Mr. Cake Dharavi Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.937775510657!2d72.8522336!3d19.0424564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8da12b9ef73%3A0xb3e648c66e4a2c5!2sDharavi%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-25"
              />

              {/* Floating Pin Card */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200 max-w-xs text-xs text-stone-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                  MR. CAKE STOREFRONT
                </div>
                <p className="text-[11px] text-stone-600">
                  90 Feet Road, Near Dharavi Bus Depot, Mumbai - 400017
                </p>
                <a
                  href="https://maps.google.com/?q=Dharavi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:underline pt-1"
                >
                  <Navigation className="w-3 h-3" /> Get Driving Directions →
                </a>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs text-stone-600">
              <span>📍 Landmarks: Near Dharavi Bus Depot & Sion Station West</span>
              <a
                href="https://maps.google.com/?q=Dharavi+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-800 flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right: Contact Information & Direct Message */}
          <div className="lg:col-span-6 space-y-6">
            {/* Contact Details Card */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EADBCC] space-y-6">
              <h3 className="text-xl font-bold font-['Playfair_Display',serif] text-[#34180A]">
                Get in Touch
              </h3>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-stone-900">Store Address</span>
                    <span className="text-stone-600 text-xs sm:text-sm">
                      {settings.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-stone-900">Phone Support</span>
                    <a href={`tel:${settings.phone}`} className="text-amber-800 font-semibold hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-800 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-stone-900">WhatsApp Orders</span>
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      {settings.whatsappNumber} (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-stone-900">Opening Hours</span>
                    <span className="text-stone-600 text-xs sm:text-sm">
                      {settings.openingHours} (Open All 7 Days)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Dharavi+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#4A2810] text-amber-100 hover:bg-[#34180A] font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  GET DIRECTIONS
                </a>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  CHAT ON WHATSAPP
                </a>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADBCC] shadow-xs">
              <h4 className="font-bold text-base text-[#34180A] font-['Playfair_Display',serif] mb-3">
                Send a Quick Message
              </h4>

              {isSent ? (
                <div className="p-4 bg-emerald-50 rounded-2xl text-center text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Message sent! Our manager will call you back shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your Name *"
                      className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Phone (WhatsApp) *"
                      className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Inquiry or catering question..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
