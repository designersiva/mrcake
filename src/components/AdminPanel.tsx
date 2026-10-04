import React, { useState } from 'react';
import {
  LayoutDashboard,
  Cake,
  ShoppingBag,
  Palette,
  UtensilsCrossed,
  Tag,
  Settings,
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  TrendingUp,
  Clock,
  Search,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Lock,
  ArrowLeft,
  AlertCircle,
  Server
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { Product, Order, CustomCakeRequest, Reservation, SpecialOffer, CakeSize } from '../types';
import { formatWhatsAppUrl } from '../utils/whatsapp';

export const AdminPanel: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    customCakeRequests,
    updateCustomCakeStatus,
    reservations,
    updateReservationStatus,
    offers,
    updateOffer,
    addOffer,
    settings,
    updateSettings,
    setIsAdminViewOpen,
  } = useBakery();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'orders' | 'custom-cakes' | 'reservations' | 'offers' | 'settings'
  >('dashboard');

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  // New product form
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('birthday-cakes');
  const [prodBasePrice, setProdBasePrice] = useState(549);
  const [prodDiscountPrice, setProdDiscountPrice] = useState<number | undefined>(499);
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodIsEggless, setProdIsEggless] = useState(true);
  const [prodBadge, setProdBadge] = useState('Bestseller');

  // Node.js Backend Server status
  const [nodeStatus, setNodeStatus] = useState<{
    status: string;
    nodeVersion?: string;
    uptimeSeconds?: number;
    platform?: string;
  } | null>(null);
  const [isTestingNode, setIsTestingNode] = useState(false);

  const checkNodeServer = async () => {
    setIsTestingNode(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setNodeStatus(data);
    } catch (err) {
      setNodeStatus({ status: 'offline' });
    } finally {
      setIsTestingNode(false);
    }
  };

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'New' || o.status === 'Preparing').length;
  const pendingCustomCakesCount = customCakeRequests.filter((c) => c.status === 'New').length;
  const pendingReservationsCount = reservations.filter((r) => r.status === 'Pending').length;

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        category: prodCategory,
        basePrice: prodBasePrice,
        discountPrice: prodDiscountPrice || undefined,
        description: prodDesc,
        image: prodImage || editingProduct.image,
        isEggless: prodIsEggless,
        badge: prodBadge || undefined,
      });
      setEditingProduct(null);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: prodName,
        category: prodCategory,
        basePrice: prodBasePrice,
        discountPrice: prodDiscountPrice || undefined,
        description: prodDesc,
        image:
          prodImage ||
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
        availableSizes: [
          { size: '0.5 KG', price: prodDiscountPrice || prodBasePrice },
          { size: '1 KG', price: (prodDiscountPrice || prodBasePrice) * 1.8 },
          { size: '1.5 KG', price: (prodDiscountPrice || prodBasePrice) * 2.6 },
          { size: '2 KG', price: (prodDiscountPrice || prodBasePrice) * 3.4 },
        ],
        flavours: ['Chocolate', 'Vanilla', 'Red Velvet'],
        rating: 4.8,
        reviewsCount: 12,
        isEggless: prodIsEggless,
        isFeatured: true,
        isAvailable: true,
        badge: prodBadge || 'New Arrival',
      };
      addProduct(newProd);
      setIsNewProductModalOpen(false);
    }

    // Reset
    setProdName('');
    setProdDesc('');
    setProdImage('');
  };

  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdCategory(prod.category);
    setProdBasePrice(prod.basePrice);
    setProdDiscountPrice(prod.discountPrice);
    setProdDesc(prod.description);
    setProdImage(prod.image);
    setProdIsEggless(prod.isEggless);
    setProdBadge(prod.badge || '');
  };

  return (
    <div id="admin-panel" className="fixed inset-0 z-50 bg-stone-100 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#2C1810] text-[#EDE3D8] flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                <Cake className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-white uppercase tracking-wider font-['Playfair_Display',serif]">
                  Mr. Cake CMS
                </h1>
                <span className="text-[10px] text-amber-400">Dharavi Store Admin</span>
              </div>
            </div>

            <button
              onClick={() => setIsAdminViewOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-stone-800 text-stone-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              {pendingOrdersCount > 0 && (
                <span className="bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                  {pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('custom-cakes')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'custom-cakes'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4" />
                <span>Custom Cakes</span>
              </div>
              {pendingCustomCakesCount > 0 && (
                <span className="bg-emerald-400 text-stone-950 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                  {pendingCustomCakesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'products'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Cake className="w-4 h-4" />
              <span>Menu & Inventory</span>
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'reservations'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Table Bookings</span>
              </div>
              {pendingReservationsCount > 0 && (
                <span className="bg-blue-400 text-stone-950 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold">
                  {pendingReservationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'offers'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Coupons & Deals</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Configuration</span>
            </button>
          </nav>
        </div>

        {/* Back to website button */}
        <div className="p-4 border-t border-stone-700">
          <button
            onClick={() => setIsAdminViewOpen(false)}
            className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit to Public Website</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-stone-50 p-4 sm:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200 mb-8">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
              MR. CAKE STORE MANAGEMENT SYSTEM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Playfair_Display',serif] text-stone-900 capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminViewOpen(false)}
              className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Store</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Total Revenue</span>
                <div className="text-3xl font-black text-amber-900 font-mono">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Direct & WhatsApp Orders
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Total Orders</span>
                <div className="text-3xl font-black text-stone-900 font-mono">
                  {totalOrdersCount}
                </div>
                <div className="text-[11px] text-stone-500">
                  {pendingOrdersCount} active / in-progress
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Custom Dream Cakes</span>
                <div className="text-3xl font-black text-stone-900 font-mono">
                  {customCakeRequests.length}
                </div>
                <div className="text-[11px] text-amber-700 font-bold">
                  {pendingCustomCakesCount} awaiting chef quotation
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase">Cafe Reservations</span>
                <div className="text-3xl font-black text-stone-900 font-mono">
                  {reservations.length}
                </div>
                <div className="text-[11px] text-blue-700 font-bold">
                  {pendingReservationsCount} unconfirmed bookings
                </div>
              </div>
            </div>

            {/* Recent Orders List Preview */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-stone-900 font-['Playfair_Display',serif]">
                  Recent Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-amber-800 hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-600 border-y border-stone-200">
                    <tr>
                      <th className="py-3 px-3">Order ID</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Items</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-stone-50">
                        <td className="py-3 px-3 font-mono font-bold text-stone-900">#{ord.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-stone-800">{ord.customerName}</div>
                          <div className="text-[10px] text-stone-400">{ord.phone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 font-semibold text-[10px]">
                            {ord.deliveryType}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          {ord.items.map((i) => `${i.product.name} (${i.quantity})`).join(', ')}
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-900">₹{ord.total}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'Preparing'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => {
                              const nextStatus =
                                ord.status === 'New'
                                  ? 'Confirmed'
                                  : ord.status === 'Confirmed'
                                  ? 'Preparing'
                                  : 'Delivered';
                              updateOrderStatus(ord.id, nextStatus);
                            }}
                            className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-bold"
                          >
                            Advance Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-stone-900 font-['Playfair_Display',serif]">
                All Customer Orders ({orders.length})
              </h3>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F2] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                      <div>
                        <span className="font-mono text-sm font-extrabold text-[#4A2810]">#{ord.id}</span>
                        <span className="text-xs text-stone-500 ml-2">Placed: {ord.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-600">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-lg border border-stone-300 text-xs font-bold bg-white focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing in Kitchen</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-700">
                      <div>
                        <span className="font-bold block text-stone-900">Customer</span>
                        <div>{ord.customerName}</div>
                        <div className="text-amber-800 font-mono font-semibold">{ord.phone}</div>
                        {ord.address && <div className="text-stone-500 mt-1">{ord.address}</div>}
                      </div>

                      <div>
                        <span className="font-bold block text-stone-900">Items Ordered</span>
                        <ul className="space-y-1">
                          {ord.items.map((it, idx) => (
                            <li key={idx}>
                              • {it.quantity}x {it.product.name} ({it.selectedSize}) - ₹{it.unitPrice * it.quantity}
                              {it.customMessage && (
                                <div className="text-[10px] text-amber-800 italic">
                                  Msg: "{it.customMessage}"
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold block text-stone-900">Payment & Timing</span>
                        <div>Slot: <strong>{ord.deliverySlot}</strong></div>
                        <div>Payment: <strong>{ord.paymentMethod}</strong></div>
                        <div className="text-base font-extrabold text-[#4A2810] mt-1">
                          Total: ₹{ord.total}
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Direct Chat Button */}
                    <div className="pt-2 flex justify-end">
                      <a
                        href={formatWhatsAppUrl(
                          ord.phone,
                          `Hello ${ord.customerName}, regarding your Mr. Cake order #${ord.id}...`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Chat with Customer on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM CAKES REQUESTS */}
        {activeTab === 'custom-cakes' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-stone-900 font-['Playfair_Display',serif]">
                Custom Cake Requests ({customCakeRequests.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customCakeRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F2] space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="font-mono font-bold text-amber-900">#{req.id}</span>
                      <select
                        value={req.status}
                        onChange={(e) => updateCustomCakeStatus(req.id, e.target.value as any)}
                        className="px-2 py-0.5 rounded-md border border-stone-300 text-xs font-bold bg-white"
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Quoted">Quoted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Ready">Ready</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 text-stone-700">
                      <div>
                        <strong>Customer:</strong> {req.customerName} ({req.phone})
                      </div>
                      <div>
                        <strong>Cake:</strong> {req.cakeType} • {req.flavour} • {req.size}
                      </div>
                      <div>
                        <strong>Date & Time:</strong> {req.preferredDate} at {req.preferredTime}
                      </div>
                      {req.cakeMessage && (
                        <div>
                          <strong>Inscription:</strong> "{req.cakeMessage}"
                        </div>
                      )}
                      <div>
                        <strong>Estimated:</strong> ₹{req.estimatedPrice} ({req.deliveryOption})
                      </div>
                      {req.additionalNotes && (
                        <div className="text-stone-500 italic">
                          Notes: {req.additionalNotes}
                        </div>
                      )}
                    </div>

                    {req.referenceImage && (
                      <div className="pt-2">
                        <span className="font-bold text-[11px] block mb-1">Reference Image:</span>
                        <img
                          src={req.referenceImage}
                          alt="Reference"
                          className="h-28 w-full object-cover rounded-xl border border-stone-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <a
                        href={formatWhatsAppUrl(
                          req.phone,
                          `Hello ${req.customerName}! We have reviewed your dream cake request #${req.id} for ${req.preferredDate}. Here is the quote...`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Send WhatsApp Quote</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS / MENU MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-stone-900 font-['Playfair_Display',serif]">
                Bakery Menu Items ({products.length})
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProdName('');
                  setProdDesc('');
                  setProdImage('');
                  setIsNewProductModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#4A2810] text-amber-100 hover:bg-[#34180A] text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-bold text-amber-800">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-sm text-stone-900 line-clamp-1">{prod.name}</h4>
                      <div className="text-xs font-extrabold text-[#4A2810] mt-1">
                        ₹{prod.discountPrice || prod.basePrice}
                        {prod.discountPrice && (
                          <span className="line-through text-stone-400 font-normal ml-1.5">
                            ₹{prod.basePrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                        {prod.isEggless ? '🌱 Eggless' : 'Contains Egg'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <label className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prod.isAvailable}
                        onChange={(e) => updateProduct({ ...prod, isAvailable: e.target.checked })}
                        className="rounded text-amber-700"
                      />
                      <span>In Stock</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          startEditProduct(prod);
                          setIsNewProductModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Add / Edit Modal */}
            {isNewProductModalOpen && (
              <div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
                onClick={() => setIsNewProductModalOpen(false)}
              >
                <div
                  className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-stone-200 space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg font-['Playfair_Display',serif]">
                      {editingProduct ? 'Edit Product' : 'Add New Bakery Product'}
                    </h3>
                    <button onClick={() => setIsNewProductModalOpen(false)}>
                      <X className="w-5 h-5 text-stone-400" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold block text-stone-700 mb-1">Product Name *</label>
                      <input
                        type="text"
                        required
                        value={prodName}
                        onChange={(e) => setProdName(e.target.value)}
                        placeholder="e.g. Belgian Chocolate Mousse Cake"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold block text-stone-700 mb-1">Category</label>
                        <select
                          value={prodCategory}
                          onChange={(e) => setProdCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                        >
                          <option value="birthday-cakes">Birthday Cakes</option>
                          <option value="designer-cakes">Designer Cakes</option>
                          <option value="chocolate-cakes">Chocolate Cakes</option>
                          <option value="cupcakes">Cupcakes</option>
                          <option value="bakery-items">Bakery</option>
                          <option value="snacks">Snacks</option>
                          <option value="beverages">Beverages</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-bold block text-stone-700 mb-1">Promotional Badge</label>
                        <input
                          type="text"
                          value={prodBadge}
                          onChange={(e) => setProdBadge(e.target.value)}
                          placeholder="e.g. Bestseller, 20% Off"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold block text-stone-700 mb-1">Base Price (₹) *</label>
                        <input
                          type="number"
                          required
                          value={prodBasePrice}
                          onChange={(e) => setProdBasePrice(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300"
                        />
                      </div>

                      <div>
                        <label className="font-bold block text-stone-700 mb-1">Discount Price (₹)</label>
                        <input
                          type="number"
                          value={prodDiscountPrice || ''}
                          onChange={(e) => setProdDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold block text-stone-700 mb-1">Image URL</label>
                      <input
                        type="url"
                        value={prodImage}
                        onChange={(e) => setProdImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>

                    <div>
                      <label className="font-bold block text-stone-700 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={prodDesc}
                        onChange={(e) => setProdDesc(e.target.value)}
                        placeholder="Ingredients, cake texture, chocolate origins..."
                        className="w-full px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="isEgglessCheck"
                        checked={prodIsEggless}
                        onChange={(e) => setProdIsEggless(e.target.checked)}
                        className="rounded text-emerald-600"
                      />
                      <label htmlFor="isEgglessCheck" className="font-bold text-stone-800">
                        100% Pure Veg / Eggless
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#4A2810] text-amber-100 font-bold uppercase tracking-wider hover:bg-[#34180A]"
                    >
                      {editingProduct ? 'Update Product' : 'Save Product'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: TABLE RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-stone-900 font-['Playfair_Display',serif]">
                Cafe Table Bookings ({reservations.length})
              </h3>

              <div className="space-y-3">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-900">#{res.id}</span>
                        <span className="font-bold text-sm text-stone-900">{res.customerName}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px]">
                          {res.guests} Guests
                        </span>
                      </div>
                      <div className="text-stone-600 mt-1">
                        📅 {res.date} at {res.time} • 📞 {res.phone}
                      </div>
                      {res.specialRequest && (
                        <div className="text-stone-500 italic mt-0.5">
                          Request: "{res.specialRequest}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={res.status}
                        onChange={(e) => updateReservationStatus(res.id, e.target.value as any)}
                        className="px-2.5 py-1 rounded-lg border border-stone-300 font-bold text-xs bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <a
                        href={formatWhatsAppUrl(
                          res.phone,
                          `Hello ${res.customerName}, your table reservation for ${res.guests} guests on ${res.date} at ${res.time} at Mr. Cake Dharavi is confirmed!`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
                        title="Confirm on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: OFFERS & COUPONS */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-stone-900 font-['Playfair_Display',serif]">
                Active Coupons & Promotions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {offers.map((off) => (
                  <div
                    key={off.id}
                    className="p-4 rounded-2xl border border-stone-200 bg-[#FAF7F2] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-stone-900">{off.couponCode}</span>
                      <label className="flex items-center gap-1 font-semibold text-stone-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={off.active}
                          onChange={(e) => updateOffer({ ...off, active: e.target.checked })}
                          className="rounded text-amber-700"
                        />
                        <span>Active</span>
                      </label>
                    </div>

                    <div className="font-bold text-stone-800">{off.title}</div>
                    <div className="text-stone-500">{off.subtitle}</div>
                    <div className="text-emerald-700 font-extrabold">{off.discountPercent}% Discount</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-lg text-stone-900 font-['Playfair_Display',serif]">
              Bakery Information & WhatsApp Credentials
            </h3>

            <div className="space-y-3">
              <div>
                <label className="font-bold block text-stone-700 mb-1">WhatsApp Order Number</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono"
                />
                <span className="text-[11px] text-stone-500">
                  Customers will be redirected to this number with prefilled orders.
                </span>
              </div>

              <div>
                <label className="font-bold block text-stone-700 mb-1">Store Phone</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => updateSettings({ phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="font-bold block text-stone-700 mb-1">Store Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => updateSettings({ address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="font-bold block text-stone-700 mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) => updateSettings({ openingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="font-bold block text-stone-700 mb-1">Top Announcement Banner</label>
                <input
                  type="text"
                  value={settings.announcementBanner}
                  onChange={(e) => updateSettings({ announcementBanner: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              {/* Node.js Backend Server Status */}
              <div className="p-4 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm text-white">Node.js Engine Backend</span>
                  </div>
                  <button
                    type="button"
                    onClick={checkNodeServer}
                    disabled={isTestingNode}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-[11px] rounded-lg transition"
                  >
                    {isTestingNode ? 'Checking...' : 'Ping Node Server'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-stone-800/80 p-2 rounded-xl">
                    <div className="text-stone-400">Server Target</div>
                    <div className="font-mono text-emerald-400">port 3000 (0.0.0.0)</div>
                  </div>
                  <div className="bg-stone-800/80 p-2 rounded-xl">
                    <div className="text-stone-400">Runtime Support</div>
                    <div className="font-mono text-amber-300">Node.js + Express + Vite</div>
                  </div>
                </div>

                {nodeStatus && (
                  <div className={`p-2.5 rounded-xl text-[11px] ${nodeStatus.status === 'online' ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300' : 'bg-rose-950/60 border border-rose-800 text-rose-300'}`}>
                    <div className="font-semibold flex items-center justify-between">
                      <span>Status: {nodeStatus.status.toUpperCase()}</span>
                      {nodeStatus.nodeVersion && <span>Version: {nodeStatus.nodeVersion}</span>}
                    </div>
                    {nodeStatus.uptimeSeconds !== undefined && (
                      <div className="text-[10px] text-stone-400 mt-1">Uptime: {nodeStatus.uptimeSeconds}s | Platform: {nodeStatus.platform}</div>
                    )}
                  </div>
                )}

                <div className="text-[10px] text-stone-400">
                  Active endpoints: <code className="text-stone-300">/api/health</code>, <code className="text-stone-300">/api/hello</code>, <code className="text-stone-300">/api/orders</code>, <code className="text-stone-300">/api/custom-cakes</code>, <code className="text-stone-300">/api/reservations</code>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                ✓ All configuration changes are saved automatically to local storage and sync across all visitor flows immediately.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
