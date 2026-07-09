import React, { useState } from "react";
import { CartItem, Product } from "../types";
import { X, Plus, Minus, Trash2, ShoppingCart, Heart, Sparkles, CheckCircle2 } from "lucide-react";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  PRODUCTS: Product[];
  addToCart: (product: Product, qty: number) => void;
  toggleWishlist: (product: Product) => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  wishlist,
  PRODUCTS,
  addToCart,
  toggleWishlist,
}: CartProps) {
  const [activeTab, setActiveTab] = useState<"cart" | "wishlist">("cart");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  // Financial calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const promoDiscount = promoApplied ? subtotal * 0.15 : 0; // 15% discount
  const hstTax = (subtotal - promoDiscount) * 0.13; // Ontario 13% HST tax
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 8.99; // Free shipping over $50 CAD
  const total = subtotal - promoDiscount + hstTax + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "CARP15" || promoCode.trim().toUpperCase() === "ONTARIO") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code! Try 'CARP15' for 15% off.");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 2000);
  };

  // Extract products in wishlist
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex justify-end" id="cart-drawer-backdrop">
      {/* Tap close zone */}
      <div className="absolute inset-0 z-1 cursor-pointer" onClick={onClose} />

      {/* Main Drawer container */}
      <div className="relative z-10 bg-slate-900 w-full max-w-md h-full shadow-2xl border-l border-slate-800 flex flex-col justify-between animate-slide-left" id="cart-drawer">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-850 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sans font-extrabold text-xl text-white">
              Bait Room Order
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tab switches */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "cart"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShoppingCart size={14} />
              <span>Basket ({cartItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "wishlist"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Heart size={14} />
              <span>Saved Items ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {/* Checkout Success Feedback */}
        {checkoutSuccess ? (
          <div className="flex-1 p-8 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
            <CheckCircle2 size={54} className="text-emerald-400 animate-bounce" />
            <h4 className="font-sans font-extrabold text-xl text-white">Order Placed Successfully!</h4>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed font-light">
              Your fishing bait prep has been processed by our North York manufacturing line. A custom delivery tracker will be sent to your email. Tight lines on the water!
            </p>
            <button
              onClick={() => {
                setCheckoutSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Awesome, Thanks!
            </button>
          </div>
        ) : (
          /* Main Tab Log Content */
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            
            {/* Basket View Tab */}
            {activeTab === "cart" && (
              <>
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-850 items-center justify-between"
                      >
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                        
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{item.product.name}</h4>
                          <span className="text-xs font-semibold text-emerald-400 block mt-1">${item.product.price.toFixed(2)} CAD</span>
                          
                          {/* Counter controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateCartQuantity(item.product.id, item.quantity - 1);
                                } else {
                                  removeFromCart(item.product.id);
                                }
                              }}
                              className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="text-xs font-bold text-slate-200">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-500 space-y-3">
                    <ShoppingCart size={32} className="mx-auto text-slate-700" />
                    <p className="text-xs">Your bait basket is currently empty.</p>
                  </div>
                )}
              </>
            )}

            {/* Wishlist View Tab */}
            {activeTab === "wishlist" && (
              <>
                {wishlistProducts.length > 0 ? (
                  <div className="space-y-4">
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        className="flex gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-850 items-center justify-between"
                      >
                        <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                        
                        <div className="flex-1">
                          <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                          <span className="text-xs font-semibold text-emerald-400 block mt-1">${p.price.toFixed(2)} CAD</span>
                          
                          <button
                            onClick={() => {
                              addToCart(p, 1);
                              toggleWishlist(p); // Remove from saved
                            }}
                            className="mt-2 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Move to Basket</span>
                            <Plus size={10} />
                          </button>
                        </div>

                        <button
                          onClick={() => toggleWishlist(p)}
                          className="p-2 text-rose-500 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
                          title="Remove from saved"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-500 space-y-3">
                    <Heart size={32} className="mx-auto text-slate-700 animate-pulse" />
                    <p className="text-xs">No saved products. Click the heart icon on any bait to save it here.</p>
                  </div>
                )}
              </>
            )}

          </div>
        )}

        {/* Drawer Financial Summary Footer */}
        {!checkoutSuccess && cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-850 bg-slate-950/80 space-y-4">
            
            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. CARP15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="flex-1 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={promoApplied}
                className="px-4 py-2 bg-emerald-750 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <Sparkles size={10} />
                <span>Success: Code 'CARP15' applied! 15% discount activated.</span>
              </span>
            )}

            {/* Financial break down */}
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)} CAD</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount (15%)</span>
                  <span>-${promoDiscount.toFixed(2)} CAD</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>HST (13% Tax)</span>
                <span className="text-white">${hstTax.toFixed(2)} CAD</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-white">
                  {shipping === 0 ? <span className="text-emerald-400 font-bold uppercase text-[10px]">FREE</span> : `$${shipping.toFixed(2)} CAD`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[9px] text-slate-500 italic">Add ${(50 - subtotal).toFixed(2)} more for free delivery across Canada.</p>
              )}
              <div className="flex justify-between text-sm text-white font-extrabold pt-2 border-t border-slate-900">
                <span>Total Due</span>
                <span className="text-emerald-400 font-extrabold text-base">${total.toFixed(2)} CAD</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-extrabold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
            >
              {isCheckingOut ? (
                <span>Securing Checkout connection...</span>
              ) : (
                <>
                  <span>Proceed to Safe Checkout</span>
                  <ShoppingCart size={14} />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
