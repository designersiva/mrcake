export type CakeSize = '0.5 KG' | '1 KG' | '1.5 KG' | '2 KG' | 'Custom';

export interface Product {
  id: string;
  name: string;
  slug?: string;
  category: string;
  description: string;
  basePrice: number; // Base price for 0.5kg or standard unit
  discountPrice?: number;
  availableSizes: { size: CakeSize; price: number }[];
  flavours: string[];
  isEggless: boolean;
  isVeg?: boolean;
  isAvailable: boolean;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  ingredients?: string[];
  preparationTime?: string;
  badge?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedSize: CakeSize;
  unitPrice: number;
  quantity: number;
  selectedFlavour?: string;
  customMessage?: string;
  isEggless: boolean;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  count: number;
}

export interface CustomCakeRequest {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  cakeType: 'Birthday' | 'Wedding' | 'Anniversary' | 'Baby Shower' | 'Custom';
  flavour: string;
  size: CakeSize;
  cakeMessage: string;
  referenceImage?: string;
  preferredDate: string;
  preferredTime: string;
  deliveryOption: 'Home Delivery' | 'Store Pickup';
  deliveryAddress?: string;
  additionalNotes?: string;
  estimatedPrice: number;
  status: 'New' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export type OrderStatus = 'New' | 'Confirmed' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Delivered' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  deliveryType: 'Delivery' | 'Pickup';
  deliverySlot?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'UPI on WhatsApp' | 'Card at Pickup';
  status: OrderStatus;
  notes?: string;
  isWhatsAppGenerated: boolean;
  createdAt: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  source: 'Google Review' | 'Direct Customer';
  avatar?: string;
  cakeOrdered?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  couponCode: string;
  discountPercent: number;
  description: string;
  active: boolean;
  image: string;
  minOrder?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cakes' | 'Bakery' | 'Store' | 'Celebrations' | 'Festival' | 'Customers';
  image: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  isPublished: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied';
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  openingHours: string;
  googleMapsUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroAnnouncement: string;
  announcementBanner?: string;
  deliveryNotice: string;
  primaryColor: string; // e.g. '#8B4513'
  accentColor: string;  // e.g. '#D4A373'
}
