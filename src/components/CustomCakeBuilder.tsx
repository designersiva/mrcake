import React, { useState } from 'react';
import { Sparkles, Upload, CheckCircle2, MessageCircle, Calendar, Clock, MapPin, Cake, Image as ImageIcon, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBakery } from '../context/BakeryContext';
import { CustomCakeRequest, CakeSize } from '../types';
import { formatWhatsAppUrl, generateCustomCakeWhatsAppMessage } from '../utils/whatsapp';

export const CustomCakeBuilder: React.FC = () => {
  const { addCustomCakeRequest, settings } = useBakery();

  // Form State
  const [cakeType, setCakeType] = useState<CustomCakeRequest['cakeType']>('Birthday');
  const [flavour, setFlavour] = useState<string>('Chocolate Fudge');
  const [customFlavour, setCustomFlavour] = useState<string>('');
  const [size, setSize] = useState<CakeSize>('1 KG');
  const [customSize, setCustomSize] = useState<string>('');
  const [cakeMessage, setCakeMessage] = useState<string>('Happy Birthday!');
  const [referenceImage, setReferenceImage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  // Customer Details
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('6:00 PM');
  const [deliveryOption, setDeliveryOption] = useState<'Home Delivery' | 'Store Pickup'>('Home Delivery');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastSubmittedRequest, setLastSubmittedRequest] = useState<CustomCakeRequest | null>(null);

  // Suggested references customers can pick or upload their own
  const sampleDesigns = [
    {
      title: 'Pastel Lambeth Vintage',
      url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Chocolate Drip & Macarons',
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Floral Tiered Romantic',
      url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Minimalist Bento Cake',
      url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Dynamic Price Estimator
  const calculateEstimatedPrice = (): number => {
    let base = 650; // 0.5kg base
    if (size === '1 KG') base = 1250;
    if (size === '1.5 KG') base = 1750;
    if (size === '2 KG') base = 2300;
    if (size === 'Custom') base = 3000;

    // Type surcharge for tiered/fondant
    if (cakeType === 'Wedding') base += 500;
    if (cakeType === 'Custom') base += 300;
    if (flavour.includes('Red Velvet') || flavour.includes('Hazelnut')) base += 150;

    return base;
  };

  const estimatedPrice = calculateEstimatedPrice();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setReferenceImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !preferredDate) {
      alert('Please fill in your Name, Phone Number, and Preferred Date.');
      return;
    }

    const finalFlavour = flavour === 'Custom' && customFlavour ? customFlavour : flavour;
    const finalSize = size === 'Custom' && customSize ? (customSize as CakeSize) : size;

    const newRequest: CustomCakeRequest = {
      id: `CC-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      phone,
      cakeType,
      flavour: finalFlavour,
      size: finalSize,
      cakeMessage,
      referenceImage: referenceImage || (imagePreview ? 'Uploaded Reference' : undefined),
      preferredDate,
      preferredTime,
      deliveryOption,
      deliveryAddress: deliveryOption === 'Home Delivery' ? deliveryAddress : undefined,
      additionalNotes,
      estimatedPrice,
      status: 'New',
      createdAt: 'Just now',
    };

    addCustomCakeRequest(newRequest);
    setLastSubmittedRequest(newRequest);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  const handleOpenWhatsApp = () => {
    if (lastSubmittedRequest) {
      const msg = generateCustomCakeWhatsAppMessage(lastSubmittedRequest);
      const url = formatWhatsAppUrl(settings.whatsappNumber, msg);
      window.open(url, '_blank');
    }
  };

  return (
    <section id="custom-cake-builder" className="py-16 md:py-24 bg-[#F5ECE1] border-b border-[#E3D4C4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-200/80 text-amber-950 text-xs font-bold uppercase tracking-wider">
            <Cake className="w-3.5 h-3.5 text-amber-700" />
            <span>HIGHEST CUSTOMIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C1810] tracking-tight font-['Playfair_Display',serif]">
            Create Your Dream Cake 🎂
          </h2>
          <p className="text-stone-700 text-sm sm:text-base">
            From theme birthdays to luxury tiered wedding cakes. Pick your preferences, upload a Pinterest reference,
            and our Dharavi master pastry chefs will bring your celebration to life.
          </p>
        </div>

        {isSubmitted && lastSubmittedRequest ? (
          /* Submission Success View */
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-stone-200 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl font-bold font-['Playfair_Display',serif] text-[#34180A]">
              Dream Cake Request Received! 🎉
            </h3>

            <p className="text-sm text-stone-600">
              Thank you, <span className="font-bold text-stone-900">{lastSubmittedRequest.customerName}</span>!
              Your custom request <strong>#{lastSubmittedRequest.id}</strong> has been logged with our head pastry chef.
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] text-left text-xs space-y-2 text-stone-700">
              <div className="flex justify-between">
                <span className="font-medium text-stone-500">Cake Type:</span>
                <span className="font-bold">{lastSubmittedRequest.cakeType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-stone-500">Flavour & Weight:</span>
                <span className="font-bold">{lastSubmittedRequest.flavour} • {lastSubmittedRequest.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-stone-500">Preferred Date:</span>
                <span className="font-bold">{lastSubmittedRequest.preferredDate} at {lastSubmittedRequest.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-stone-500">Est. Price:</span>
                <span className="font-extrabold text-amber-900">₹{lastSubmittedRequest.estimatedPrice}</span>
              </div>
              {lastSubmittedRequest.cakeMessage && (
                <div className="pt-2 border-t border-stone-200">
                  <span className="font-medium text-stone-500 block">Piped Inscription:</span>
                  <span className="font-bold italic text-[#4A2810]">"{lastSubmittedRequest.cakeMessage}"</span>
                </div>
              )}
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>CONFIRM DETAILS ON WHATSAPP</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-stone-500 hover:text-stone-800 font-semibold underline"
              >
                Submit another custom cake request
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step Dream Cake Builder Form */
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#E0D2C3] space-y-10"
          >
            {/* STEP 1: Choose Cake Type */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#4A2810]">
                <span className="w-7 h-7 rounded-full bg-[#4A2810] text-amber-200 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-lg text-[#34180A]">Choose Cake Type</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {(['Birthday', 'Wedding', 'Anniversary', 'Baby Shower', 'Custom'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCakeType(type)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${
                      cakeType === type
                        ? 'bg-[#4A2810] text-amber-100 border-[#4A2810] shadow-md ring-2 ring-amber-400/40'
                        : 'bg-[#FAF7F2] text-stone-700 border-stone-200 hover:border-amber-700'
                    }`}
                  >
                    <div className="text-xl mb-1">
                      {type === 'Birthday' && '🎂'}
                      {type === 'Wedding' && '💍'}
                      {type === 'Anniversary' && '🥂'}
                      {type === 'Baby Shower' && '🧸'}
                      {type === 'Custom' && '🎨'}
                    </div>
                    <div className="text-xs font-bold">{type}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: Choose Flavour */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#4A2810]">
                <span className="w-7 h-7 rounded-full bg-[#4A2810] text-amber-200 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-bold text-lg text-[#34180A]">Choose Flavour</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {[
                  'Chocolate Fudge',
                  'Vanilla Bean',
                  'Red Velvet',
                  'Butterscotch Crunch',
                  'Black Forest',
                  'Custom',
                ].map((flv) => (
                  <button
                    key={flv}
                    type="button"
                    onClick={() => setFlavour(flv)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      flavour === flv
                        ? 'bg-[#4A2810] text-amber-100 border-[#4A2810] shadow-sm'
                        : 'bg-[#FAF7F2] text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {flv}
                  </button>
                ))}
              </div>

              {flavour === 'Custom' && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={customFlavour}
                    onChange={(e) => setCustomFlavour(e.target.value)}
                    placeholder="Enter your custom flavour (e.g. Lotus Biscoff, Rasmalai, Mango Passionfruit)"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* STEP 3: Choose Size */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#4A2810]">
                <span className="w-7 h-7 rounded-full bg-[#4A2810] text-amber-200 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-lg text-[#34180A]">Choose Size</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { weight: '0.5 KG', desc: '4-6 Slices' },
                  { weight: '1 KG', desc: '8-12 Slices' },
                  { weight: '1.5 KG', desc: '14-16 Slices' },
                  { weight: '2 KG', desc: '18-24 Slices' },
                  { weight: 'Custom', desc: 'Multi-tiered 3KG+' },
                ].map((item) => (
                  <button
                    key={item.weight}
                    type="button"
                    onClick={() => setSize(item.weight as CakeSize)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      size === item.weight
                        ? 'bg-[#4A2810] text-amber-100 border-[#4A2810] shadow-sm ring-2 ring-amber-400/40'
                        : 'bg-[#FAF7F2] text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="text-sm font-bold">{item.weight}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 4: Upload Reference or Pick Sample */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[#4A2810]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#4A2810] text-amber-200 text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-bold text-lg text-[#34180A]">Upload Reference / Inspiration</h3>
                </div>
                <span className="text-xs text-stone-500">Optional</span>
              </div>

              {/* Sample inspiration cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {sampleDesigns.map((sample) => (
                  <div
                    key={sample.title}
                    onClick={() => {
                      setImagePreview(sample.url);
                      setReferenceImage(sample.url);
                    }}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 relative transition-all ${
                      referenceImage === sample.url ? 'border-amber-700 shadow-md ring-2 ring-amber-500' : 'border-stone-200 opacity-85 hover:opacity-100'
                    }`}
                  >
                    <img src={sample.url} alt={sample.title} className="h-20 w-full object-cover" referrerPolicy="no-referrer" />
                    <div className="p-1.5 bg-white text-[10px] font-semibold text-stone-800 truncate">
                      {sample.title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload file box */}
              <div className="relative border-2 border-dashed border-stone-300 hover:border-amber-600 rounded-2xl p-4 sm:p-6 text-center bg-[#FAF7F2] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="w-6 h-6 text-amber-800" />
                  <span className="text-xs sm:text-sm font-bold text-stone-800">
                    {imagePreview ? 'Change Reference Photo' : '+ UPLOAD PHOTO / SCREENSHOT'}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    PNG, JPG, Pinterest screenshots up to 10MB
                  </span>
                </div>
              </div>

              {imagePreview && (
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <img src={imagePreview} alt="Selected reference" className="w-12 h-12 object-cover rounded-lg border border-amber-300" referrerPolicy="no-referrer" />
                  <div>
                    <span className="font-bold block">Design reference selected!</span>
                    <span className="text-[11px] text-amber-800">Our baker will replicate this aesthetic for you.</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 5: Cake Message */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#4A2810]">
                <span className="w-7 h-7 rounded-full bg-[#4A2810] text-amber-200 text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <h3 className="font-bold text-lg text-[#34180A]">Cake Inscription / Message</h3>
              </div>

              <input
                type="text"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                placeholder='e.g., "Happy 1st Anniversary Riya & Vikram ❤️"'
                maxLength={50}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
              />
            </div>

            {/* CUSTOM REQUEST DETAILS */}
            <div className="pt-6 border-t border-[#EDE3D8] space-y-4">
              <h4 className="font-bold text-base text-[#34180A] uppercase tracking-wider text-xs">
                Customer & Delivery Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">WhatsApp Phone Number *</label>
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
                  <label className="text-xs font-bold text-stone-700 block mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Preferred Time *</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none bg-white"
                  >
                    <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                    <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                    <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM (Evening Rush)</option>
                    <option value="8:00 PM - 10:00 PM">8:00 PM - 10:00 PM (Party Time)</option>
                  </select>
                </div>
              </div>

              {/* Delivery / Pickup Choice */}
              <div className="pt-2">
                <label className="text-xs font-bold text-stone-700 block mb-2">Order Fulfillment</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'Home Delivery'}
                      onChange={() => setDeliveryOption('Home Delivery')}
                      className="text-amber-700 focus:ring-amber-600"
                    />
                    <span>Home Delivery in Dharavi & Mumbai</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'Store Pickup'}
                      onChange={() => setDeliveryOption('Store Pickup')}
                      className="text-amber-700 focus:ring-amber-600"
                    />
                    <span>Store Pickup (90 Feet Road)</span>
                  </label>
                </div>
              </div>

              {deliveryOption === 'Home Delivery' && (
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Delivery Address *</label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Building name, flat number, street, landmark in Dharavi / Mumbai..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Additional Chef Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Special dietary requests, color theme preferences, fondant figures..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Price Preview & Submit Button */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EADBCC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500 font-medium">Estimated Custom Price:</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#4A2810]">
                  ₹{estimatedPrice}
                  <span className="text-xs font-normal text-stone-500 ml-1.5">(Subject to final design quote)</span>
                </div>
              </div>

              <button
                type="submit"
                id="submit-custom-cake-btn"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#4A2810] hover:bg-[#34180A] text-amber-100 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>REQUEST CUSTOM CAKE</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
