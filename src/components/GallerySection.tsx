import React, { useState } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const { gallery } = useBakery();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs = ['All', 'Cakes', 'Bakery', 'Store', 'Celebrations', 'Festival', 'Customers'];

  const filteredItems = gallery.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white border-b border-[#EDE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>OUR VISUAL SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
            Moments Made Sweeter
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Take a look inside Mr. Cake — our kitchen, our live counter, artisanal pastries, and genuine birthday celebrations across Dharavi.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeFilter === tab
                  ? 'bg-[#4A2810] text-amber-100 shadow-md'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-stone-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <span className="absolute top-4 left-4 bg-white/90 text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs">
                {item.category}
              </span>

              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h3 className="font-bold text-base sm:text-lg drop-shadow-sm font-['Playfair_Display',serif]">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-stone-200 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevLightbox}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextLightbox}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content */}
            <div
              className="max-w-4xl max-h-[85vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 bg-black flex items-center justify-center max-h-[70vh]">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[70vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 sm:p-5 text-white bg-stone-900 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-amber-400 uppercase tracking-wider font-bold block">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h4 className="font-bold text-lg font-['Playfair_Display',serif]">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                  {filteredItems[lightboxIndex].description && (
                    <p className="text-xs text-stone-300 mt-0.5">
                      {filteredItems[lightboxIndex].description}
                    </p>
                  )}
                </div>
                <span className="text-xs text-stone-400 font-mono">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
