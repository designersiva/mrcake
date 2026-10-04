import React, { useState, useEffect } from 'react';
import { Cake, ShoppingBag, MessageCircle, Menu as MenuIcon, X, Shield, Phone, Sparkles } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export const Header: React.FC = () => {
  const { settings, cartItemCount, setIsCartOpen, setIsAdminOpen } = useBakery();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const directWhatsAppUrl = formatWhatsAppUrl(
    settings.whatsappNumber,
    "Hello Mr. Cake! I'm browsing your website and would like to check today's freshly baked cakes."
  );

  return (
    <>
      {/* Top Announcement Bar */}
      <div id="announcement-bar" className="bg-[#3D2314] text-[#F3E9DC] text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 bg-[#D97706]/30 text-[#FBBF24] px-2 py-0.5 rounded-full text-[11px] font-semibold">
              <Sparkles className="w-3 h-3" /> Live Bakery
            </span>
            <span className="hidden md:inline">{settings.heroAnnouncement}</span>
            <span className="md:hidden">Fresh cakes in Dharavi • Same-Day Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-[12px] mx-auto sm:mx-0">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1 hover:text-amber-300 transition-colors">
              <Phone className="w-3 h-3" /> {settings.phone}
            </a>
            <span className="text-stone-500 hidden sm:inline">|</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors text-xs font-semibold px-2 py-0.5 bg-amber-950/60 rounded"
              title="Open Staff CMS Admin Panel"
            >
              <Shield className="w-3 h-3" /> Admin CMS
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#EADDD0] py-3'
            : 'bg-[#FAF7F2] border-b border-[#F0E6DA] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#4A2810] text-[#FAF7F2] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Cake className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold tracking-tight text-[#3A1E0E]">
                  MR. CAKE
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded">
                  Dharavi
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide">
                Bakery • Patisserie • Cafe
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7 text-[15px] font-medium text-stone-700">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#4A2810] hover:font-semibold transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-[#4A2810] hover:font-semibold transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('categories')}
              className="hover:text-[#4A2810] hover:font-semibold transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection('popular-cakes')}
              className="hover:text-[#4A2810] hover:font-semibold transition-colors"
            >
              Cakes
            </button>
            <button
              onClick={() => scrollToSection('custom-cake-builder')}
              className="hover:text-[#4A2810] text-amber-800 font-semibold transition-colors flex items-center gap-1"
            >
              <span>Custom Cake</span>
              <span className="text-[10px] bg-amber-500 text-white font-bold px-1.5 py-0.2 rounded-full">New</span>
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="hover:text-[#4A2810] hover:font-semibold transition-colors"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('offers')}
              className="hover:text-[#4A2810] hover:font-semibold transition-colors"
            >
              Offers
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="hover:text-[#4A2810] hover:font-semibold transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('location-contact')}
              className="hover:text-[#4A2810] hover:font-semibold transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Link */}
            <a
              id="header-whatsapp-btn"
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-100/90 hover:bg-emerald-200 transition-colors border border-emerald-300/60 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-500" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Icon Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#4A2810]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D97706] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Main Order Now CTA */}
            <button
              id="header-order-now-btn"
              onClick={() => scrollToSection('menu')}
              className="px-5 py-2.5 rounded-full bg-[#4A2810] text-amber-100 hover:bg-[#34180A] text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              ORDER NOW
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full text-stone-700 bg-stone-100"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#4A2810]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D97706] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-stone-800 hover:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu-drawer" className="lg:hidden bg-[#FAF7F2] border-b border-[#EADDD0] px-4 pt-3 pb-6 shadow-xl space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium pt-2 pb-3 border-b border-[#EADDD0]">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                🏠 Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                📖 About Us
              </button>
              <button
                onClick={() => scrollToSection('categories')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                🍰 Categories
              </button>
              <button
                onClick={() => scrollToSection('popular-cakes')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                🎂 Cakes
              </button>
              <button
                onClick={() => scrollToSection('custom-cake-builder')}
                className="text-left px-3 py-2 rounded-lg bg-amber-100/70 text-amber-900 font-semibold"
              >
                ✨ Custom Cake
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                📜 Menu
              </button>
              <button
                onClick={() => scrollToSection('offers')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                🏷️ Offers
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                🖼️ Gallery
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                ⭐ Reviews
              </button>
              <button
                onClick={() => scrollToSection('reservations')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
              >
                🍽️ Reservation
              </button>
              <button
                onClick={() => scrollToSection('location-contact')}
                className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800 col-span-2"
              >
                📍 Location & Contact
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Chat on WhatsApp
              </a>
              <button
                onClick={() => scrollToSection('menu')}
                className="w-full py-2.5 rounded-xl bg-[#4A2810] text-amber-100 font-bold text-sm tracking-wide shadow-md"
              >
                ORDER NOW
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full py-2 text-xs text-stone-600 hover:text-stone-900 flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" /> Staff / Admin CMS Login
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Mobile Bottom CTA Bar (as mandated in Section 2) */}
      <div
        id="mobile-bottom-cta"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E0D2C3] p-2.5 sm:hidden flex items-center gap-2 shadow-2xl"
      >
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md active:scale-98 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          WhatsApp
        </a>
        <button
          onClick={() => scrollToSection('menu')}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#4A2810] text-amber-100 font-bold text-sm shadow-md active:scale-98 transition-transform"
        >
          <ShoppingBag className="w-4 h-4" />
          Order Now
        </button>
      </div>
    </>
  );
};
