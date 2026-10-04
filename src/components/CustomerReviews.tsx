import React, { useState } from 'react';
import { Star, MessageSquare, Plus, Check, ShieldCheck } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { Review } from '../types';

export const CustomerReviews: React.FC = () => {
  const { reviews, addReview } = useBakery();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [cakeOrdered, setCakeOrdered] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author,
      rating,
      comment,
      date: 'Just now',
      source: 'Direct Customer',
      cakeOrdered: cakeOrdered || 'Celebration Cake',
    };

    addReview(newRev);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsWriteModalOpen(false);
      setAuthor('');
      setComment('');
      setCakeOrdered('');
      setRating(5);
    }, 1200);
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Rating Summary Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-[#EADBCC] mb-12 text-center max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-1.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400" />
            ))}
          </div>

          <div className="text-4xl sm:text-5xl font-extrabold text-[#2C1810] font-['Playfair_Display',serif]">
            4.8 / 5
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#34180A]">
              Loved by Our Customers ❤️
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Based on 450+ verified ratings & reviews across Dharavi, Mumbai
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4A2810] text-amber-100 hover:bg-[#34180A] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>WRITE A REVIEW</span>
            </button>

            <a
              href="https://maps.google.com/?q=Dharavi+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm transition-colors"
            >
              <span>View Google Maps Profile</span>
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white border border-[#EADBCC] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                    {rev.source}
                  </span>
                </div>

                {/* Comment quote */}
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Order tag */}
              <div className="pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#34180A]">
                      {rev.author}
                    </h4>
                    {rev.cakeOrdered && (
                      <span className="text-[11px] text-amber-800 font-medium block">
                        Ordered: {rev.cakeOrdered}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write a Review Modal */}
        {isWriteModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setIsWriteModalOpen(false)}
          >
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 text-[#2C1810] space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-['Playfair_Display',serif]">
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-stone-500">Your feedback means the world to our Dharavi bakery!</p>
                </div>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {submittedMessage ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-emerald-900">Thank you for your review!</h4>
                  <p className="text-xs text-emerald-700">Your feedback has been added to our customer wall.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Aditi Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Which cake / item did you try?</label>
                    <input
                      type="text"
                      value={cakeOrdered}
                      onChange={(e) => setCakeOrdered(e.target.value)}
                      placeholder="e.g. Chocolate Truffle Cake 1KG"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRating(num)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              num <= rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Your Review *</label>
                    <textarea
                      rows={3}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us about the cake texture, flavor, delivery timing, or celebration..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#4A2810] text-amber-100 hover:bg-[#34180A] font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                  >
                    SUBMIT REVIEW
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
