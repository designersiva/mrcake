import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  CustomCakeRequest,
  Reservation,
  Review,
  SpecialOffer,
  GalleryItem,
  SiteSettings,
  ContactMessage,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_OFFERS,
  INITIAL_REVIEWS,
  INITIAL_GALLERY,
  INITIAL_ORDERS,
  INITIAL_CUSTOM_CAKES,
  INITIAL_RESERVATIONS,
} from '../data/mockData';

interface BakeryContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (productOrId: Product | string, updated?: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  categories: Category[];
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  customCakes: CustomCakeRequest[];
  customCakeRequests: CustomCakeRequest[];
  addCustomCakeRequest: (req: CustomCakeRequest) => void;
  updateCustomCakeStatus: (id: string, status: CustomCakeRequest['status']) => void;
  reservations: Reservation[];
  addReservation: (res: Reservation) => void;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;
  reviews: Review[];
  addReview: (rev: Review) => void;
  offers: SpecialOffer[];
  toggleOfferStatus: (offerId: string) => void;
  updateOffer: (offer: SpecialOffer) => void;
  addOffer: (offer: SpecialOffer) => void;
  gallery: GalleryItem[];
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  // UI States
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminViewOpen: boolean;
  setIsAdminViewOpen: (open: boolean) => void;
  activeCategoryFilter: string;
  setActiveCategoryFilter: (cat: string) => void;
  resetAllData: () => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('mrcake_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mrcake_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Categories
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mrcake_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Custom cake requests
  const [customCakes, setCustomCakes] = useState<CustomCakeRequest[]>(() => {
    const saved = localStorage.getItem('mrcake_custom_cakes');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_CAKES;
  });

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('mrcake_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('mrcake_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Offers
  const [offers, setOffers] = useState<SpecialOffer[]>(() => {
    const saved = localStorage.getItem('mrcake_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  // Gallery
  const [gallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mrcake_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('mrcake_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('mrcake_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mrcake_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mrcake_custom_cakes', JSON.stringify(customCakes));
  }, [customCakes]);

  useEffect(() => {
    localStorage.setItem('mrcake_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('mrcake_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('mrcake_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('mrcake_cart', JSON.stringify(cart));
  }, [cart]);

  // Actions
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const updateProduct = (productOrId: Product | string, updated?: Partial<Product>) => {
    if (typeof productOrId === 'string') {
      setProducts((prev) => prev.map((p) => (p.id === productOrId ? { ...p, ...updated } : p)));
    } else {
      setProducts((prev) => prev.map((p) => (p.id === productOrId.id ? productOrId : p)));
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addOffer = (offer: SpecialOffer) => {
    setOffers((prev) => [offer, ...prev]);
  };

  const updateOffer = (offer: SpecialOffer) => {
    setOffers((prev) => prev.map((o) => (o.id === offer.id ? offer : o)));
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    try {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      }).catch(() => {});
    } catch {
      // offline fallback
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    try {
      fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }).catch(() => {});
    } catch {
      // offline fallback
    }
  };

  const addCustomCakeRequest = (req: CustomCakeRequest) => {
    setCustomCakes((prev) => [req, ...prev]);
    try {
      fetch('/api/custom-cakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      }).catch(() => {});
    } catch {
      // offline fallback
    }
  };

  const updateCustomCakeStatus = (id: string, status: CustomCakeRequest['status']) => {
    setCustomCakes((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const addReservation = (res: Reservation) => {
    setReservations((prev) => [res, ...prev]);
    try {
      fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res),
      }).catch(() => {});
    } catch {
      // offline fallback
    }
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const addReview = (rev: Review) => {
    setReviews((prev) => [rev, ...prev]);
  };

  const toggleOfferStatus = (offerId: string) => {
    setOffers((prev) => prev.map((off) => (off.id === offerId ? { ...off, active: !off.active } : off)));
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Check if item with same productId, size and message exists
      const existingIndex = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.selectedSize === item.selectedSize &&
          i.customMessage === item.customMessage &&
          i.isEggless === item.isEggless
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const resetAllData = () => {
    setSettings(INITIAL_SETTINGS);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCustomCakes(INITIAL_CUSTOM_CAKES);
    setReservations(INITIAL_RESERVATIONS);
    setReviews(INITIAL_REVIEWS);
    setOffers(INITIAL_OFFERS);
    setCart([]);
    localStorage.clear();
  };

  return (
    <BakeryContext.Provider
      value={{
        settings,
        updateSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        orders,
        addOrder,
        updateOrderStatus,
        customCakes,
        customCakeRequests: customCakes,
        addCustomCakeRequest,
        updateCustomCakeStatus,
        reservations,
        addReservation,
        updateReservationStatus,
        reviews,
        addReview,
        offers,
        toggleOfferStatus,
        updateOffer,
        addOffer,
        gallery,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        isAdminOpen,
        setIsAdminOpen,
        isAdminViewOpen: isAdminOpen,
        setIsAdminViewOpen: setIsAdminOpen,
        activeCategoryFilter,
        setActiveCategoryFilter,
        resetAllData,
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
