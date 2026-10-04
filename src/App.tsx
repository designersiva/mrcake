import React from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CategorySection } from './components/CategorySection';
import { PopularCakes } from './components/PopularCakes';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { SpecialOffers } from './components/SpecialOffers';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { CustomerReviews } from './components/CustomerReviews';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReservationSection } from './components/ReservationSection';
import { LocationContact } from './components/LocationContact';
import { OrderCTA } from './components/OrderCTA';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanel } from './components/AdminPanel';
import { MessageCircle, Sparkles } from 'lucide-react';
import { formatWhatsAppUrl } from './utils/whatsapp';

const MainLayout: React.FC = () => {
  const { settings, isAdminViewOpen } = useBakery();

  const floatingWhatsAppUrl = formatWhatsAppUrl(
    settings.whatsappNumber,
    "Hello Mr. Cake! I'm visiting your website and would like to order a fresh cake."
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1810] flex flex-col selection:bg-amber-800 selection:text-white relative">
      {/* Top Announcement Bar */}
      {settings.announcementBanner && (
        <div className="bg-[#3D200E] text-[#FFF6ED] py-2 px-4 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2 border-b border-[#4A2810]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{settings.announcementBanner}</span>
          <span className="hidden sm:inline-block text-amber-400 font-bold">• 100% Pure Veg Available</span>
        </div>
      )}

      {/* Website Navigation Header */}
      <Header />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Section 1 & 2: Hero & Immediate Trust */}
        <Hero />

        {/* Section 3: Value Pillars & Dharavi Heritage */}
        <AboutSection />

        {/* Section 4: 8-Grid Categories */}
        <CategorySection />

        {/* Section 5: Featured Popular Cakes */}
        <PopularCakes />

        {/* Section 8: Dream Custom Cake Builder (5-Steps) */}
        <CustomCakeBuilder />

        {/* Section 9: Special Offers, Combos & Coupons */}
        <SpecialOffers />

        {/* Section 10: Complete Artisanal Menu with Filters & Search */}
        <MenuSection />

        {/* Section 11: Photo Gallery & Fullscreen Lightbox */}
        <GallerySection />

        {/* Section 12: Customer Wall & Google Reviews */}
        <CustomerReviews />

        {/* Section 13: Why Choose Us (6 Feature Pillars) */}
        <WhyChooseUs />

        {/* Section 14: Dine-in Table Reservations */}
        <ReservationSection />

        {/* Section 15: Google Map, Directions & Hours */}
        <LocationContact />

        {/* Section 16: High-Conversion Order Launchpad */}
        <OrderCTA />
      </main>

      {/* Section 18: Master Footer */}
      <Footer />

      {/* Interactive Overlays */}
      <ProductDetailModal />
      <CartDrawer />

      {/* CMS Admin Panel (Sections 19-28) */}
      {isAdminViewOpen && <AdminPanel />}

      {/* Floating WhatsApp Action Button */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 group"
        aria-label="Order on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full" />
        </div>
        <span className="hidden sm:inline-block font-bold text-xs uppercase tracking-wider">
          Order on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default function App() {
  return (
    <BakeryProvider>
      <MainLayout />
    </BakeryProvider>
  );
}
