import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X, Anchor, Phone } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  openCart: () => void;
  openWishlist: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  cartCount,
  wishlistCount,
  openCart,
  openWishlist,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "tips", label: "Fishing Tips" },
    { id: "about", label: "About Story" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Banner with Contact Info */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 flex justify-between items-center border-b border-slate-800 z-50 relative font-sans">
        <div className="flex items-center gap-1">
          <Phone size={12} className="text-orange-500" />
          <span>Call Support: <a href="tel:6477038309" className="hover:text-white transition">647-703-8309</a></span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>📍 North York, Ontario</span>
          <span className="text-emerald-400 font-medium">🍁 100% Canadian Fishing Bait Specialist</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-md shadow-lg border-b border-emerald-950/30 py-3"
            : "bg-slate-950/80 backdrop-blur-sm border-b border-transparent py-5"
        }`}
        id="main-nav-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavClick("home")}
            id="header-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-900/40 border border-emerald-500/30 group-hover:scale-105 transition-transform">
              <Anchor className="text-white transform group-hover:rotate-12 transition-transform" size={20} />
            </div>
            <div>
              <span className="font-sans font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-emerald-100 to-orange-400 bg-clip-text text-transparent">
                MATCHBAITS
              </span>
              <span className="text-[10px] block font-mono text-emerald-400 tracking-widest uppercase font-bold -mt-1">
                CANADA
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-white bg-emerald-900/40 border border-emerald-500/25"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4" id="header-actions">
            
            {/* Search Toggle */}
            <div className="relative flex items-center">
              {showSearchInput && (
                <input
                  type="text"
                  placeholder="Search products/tips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 text-white placeholder-slate-400 text-xs py-1.5 px-3 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 w-32 sm:w-48 transition-all animate-fade-in"
                  onBlur={() => {
                    if (!searchQuery) setShowSearchInput(false);
                  }}
                  autoFocus
                />
              )}
              <button
                onClick={() => {
                  setShowSearchInput(!showSearchInput);
                  if (!showSearchInput) {
                    // Navigate to products or home to show filter list
                    if (currentTab !== "products" && currentTab !== "tips") {
                      setCurrentTab("products");
                    }
                  }
                }}
                className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900/50 transition-colors"
                title="Search"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900/50 transition-colors relative"
              title="View Wishlist"
              id="wishlist-btn"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900/50 transition-colors relative"
              title="View Cart"
              id="cart-btn"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900/50 transition-colors"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-950/98 border-b border-slate-800 py-4 px-4 absolute w-full top-full left-0 shadow-2xl animate-slide-down">
            <div className="space-y-2 flex flex-col">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                      isActive
                        ? "text-white bg-emerald-950/60 border-l-4 border-emerald-500 pl-3"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-4">
                <span>📍 North York, ON</span>
                <span>📞 647-703-8309</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
