import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import FishingTips from "./components/FishingTips";
import About from "./components/About";
import Contact from "./components/Contact";
import Chatbot from "./components/Chatbot";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import { PRODUCTS } from "./data";
import { Product, CartItem } from "./types";
import { ArrowUp, ShoppingBag, Sparkles } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("matchbaits_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("matchbaits_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Synchronize shopping cart to local storage
  useEffect(() => {
    localStorage.setItem("matchbaits_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Synchronize wishlist to local storage
  useEffect(() => {
    localStorage.setItem("matchbaits_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Handle Scroll to Top tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SEO: Dynamic Document Title & Meta Description on Navigation
  useEffect(() => {
    let title = "Matchbaits Canada | Premium Fishing Baits";
    let description = "Matchbaits Canada is North York's premier supplier of premium, high-protein fishing baits including groundbaits, pellets, boilies, wafters, and feeding liquid boosters.";
    
    if (currentTab === "products") {
      title = "Shop Premium Fishing Baits & Tackle | Matchbaits Canada";
      description = "Browse our elite baits catalog: custom-blended method mix, Robin Red amino pellets, strawberry pop-ups, and squid boosters. Handcrafted in North York, ON.";
    } else if (currentTab === "tips") {
      title = "Freshwater Angler Academy & Tips | Matchbaits Canada";
      description = "Explore professional carp fishing guides, winter ice angling advice, and seasonal bait selection tips compiled by veteran Ontario fishing experts.";
    } else if (currentTab === "about") {
      title = "Our Brand Story & Quality Pillars | Matchbaits Canada";
      description = "Discover the passion, field-testing, and high-protein organic ingredients that define Matchbaits Canada's customer-first angling mission.";
    } else if (currentTab === "contact") {
      title = "Contact Matchbaits Canada | Custom Orders & Advice";
      description = "Need bulk baits or custom rig assistance? Reach out to our North York base. Phone: 647-703-8309, Email: caladonuno01@gmail.com. Open Mon-Sat.";
    }

    document.title = title;

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [currentTab]);

  // Shopping Cart Operations
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true); // Open drawer on addition
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Wishlist Operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Schema.org Structured Data Generation for SEO
  const renderSchemaMarkup = () => {
    // 1. Local Business Schema Markup
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Matchbaits Canada",
      "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
      "telephone": "647-703-8309",
      "email": "caladonuno01@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "North York Region",
        "addressLocality": "North York",
        "addressRegion": "Ontario",
        "postalCode": "M2N 5T5",
        "addressCountry": "Canada"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.7615,
        "longitude": -79.4111
      },
      "url": "https://iwebnext.com",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "07:00",
          "closes": "16:00"
        }
      ]
    };

    // 2. Product List Schema Markup
    const productSchemaList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": PRODUCTS.map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": p.name,
          "image": p.image,
          "description": p.description,
          "brand": {
            "@type": "Brand",
            "name": "Matchbaits Canada"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "CAD",
            "price": p.price,
            "availability": p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }
      }))
    };

    return (
      <>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productSchemaList)}
        </script>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      
      {/* Schema.org markup injected directly into render tree for SEO engines */}
      {renderSchemaMarkup()}

      {/* Dynamic Breadcrumbs row for sub-views */}
      {currentTab !== "home" && (
        <div className="bg-slate-900 border-b border-slate-850/80 py-3 px-4 sm:px-8 text-xs text-slate-500 font-sans">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 uppercase font-semibold tracking-wider">
            <button onClick={() => setCurrentTab("home")} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-emerald-400">
              {currentTab === "products" && "Bait Catalogue"}
              {currentTab === "tips" && "Angler Academy"}
              {currentTab === "about" && "Brand Story"}
              {currentTab === "contact" && "Contact Us"}
            </span>
          </div>
        </div>
      )}

      {/* Header element */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        openCart={() => setIsCartOpen(true)}
        openWishlist={() => {
          setIsCartOpen(true);
          // Set internal drawer tab to saved items
          const triggerWishlistTab = document.querySelector("#cart-drawer-backdrop");
          if (triggerWishlistTab) {
            // Simulated behavior through trigger state inside Cart
          }
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Primary Section Renderer */}
      <main className="flex-grow z-10 relative">
        {currentTab === "home" && (
          <Home
            setCurrentTab={setCurrentTab}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        )}
        {currentTab === "products" && (
          <Products
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {currentTab === "tips" && (
          <FishingTips
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {currentTab === "about" && <About />}
        {currentTab === "contact" && <Contact />}
      </main>

      {/* Footer element */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Shopping Cart and Wishlist Drawer overlay */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        wishlist={wishlist}
        PRODUCTS={PRODUCTS}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
      />

      {/* Floating AI Chatbot Expert */}
      <Chatbot />

      {/* Scroll to Top floating circle button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 w-11 h-11 bg-slate-900 hover:bg-slate-800 border border-slate-700/60 rounded-full flex items-center justify-center text-emerald-400 hover:text-emerald-300 shadow-xl z-30 transition-all hover:-translate-y-1 hover:scale-102 cursor-pointer"
          title="Scroll back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

    </div>
  );
}
