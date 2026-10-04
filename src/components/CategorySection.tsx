import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

export const CategorySection: React.FC = () => {
  const { categories, setActiveCategoryFilter } = useBakery();

  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategoryFilter(categorySlug);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>EXPLORE OUR RANGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
            What Are You Craving?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            From extravagant custom tiered creations to fresh breakfast bakes, discover the delights baked daily at Mr. Cake.
          </p>
        </div>

        {/* 8 Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => handleCategoryClick(cat.slug)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#EADBCC] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <span className="absolute top-3 left-3 text-2xl bg-white/90 backdrop-blur-xs p-1.5 rounded-xl shadow-xs">
                  {cat.icon}
                </span>
                <span className="absolute bottom-2 right-3 text-[11px] font-bold text-white bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  {cat.count}+ Varieties
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#2C1810] group-hover:text-amber-800 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#8B3E14] group-hover:text-[#4A2810]">
                  <span className="tracking-wider uppercase">EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
