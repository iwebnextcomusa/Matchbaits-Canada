import React, { useState, useMemo, useEffect } from "react";
import { Product, Review } from "../types";
import { PRODUCTS } from "../data";
import { Star, ShoppingCart, Heart, Search, SlidersHorizontal, Check, ArrowRight, Eye, Sparkles } from "lucide-react";

interface ProductsProps {
  addToCart: (product: Product, quantity?: number) => void;
  toggleWishlist: (product: Product) => void;
  wishlist: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Beautiful skeleton loader matching the real card structure exactly
function ProductSkeleton() {
  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image placeholder with subtle gradient shimmer */}
      <div className="relative aspect-square bg-slate-950 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-slate-950 animate-pulse" />
        
        {/* Decorative spinner for perceived performance */}
        <div className="w-12 h-12 rounded-full bg-slate-900/80 border border-slate-800/50 flex items-center justify-center z-10 shadow-lg">
          <div className="w-5 h-5 rounded-full border-2 border-emerald-500/20 border-t-emerald-500/80 animate-spin" />
        </div>
        
        {/* Wishlist Button Placeholder */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800/50" />
        
        {/* Category Label Placeholder */}
        <div className="absolute bottom-4 left-4 h-5 w-20 bg-slate-900/80 border border-slate-800/50 rounded-lg" />
      </div>

      {/* Details placeholder */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating placeholder */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-slate-800/80" />
              ))}
            </div>
            <div className="h-3 w-8 bg-slate-800/80 rounded" />
          </div>

          {/* Name placeholder */}
          <div className="h-6 bg-slate-800/80 rounded-lg w-3/4 mb-3" />

          {/* Description placeholder */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-slate-800/50 rounded-md w-full" />
            <div className="h-3 bg-slate-800/50 rounded-md w-11/12" />
            <div className="h-3 bg-slate-800/50 rounded-md w-4/5" />
          </div>
        </div>

        {/* Bottom row placeholder */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-2.5 bg-slate-800/50 rounded w-10" />
            <div className="h-5 bg-slate-800 rounded w-24" />
          </div>
          
          <div className="flex gap-2">
            <div className="w-9 h-9 bg-slate-800 rounded-xl" />
            <div className="w-16 h-9 bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products({
  addToCart,
  toggleWishlist,
  wishlist,
  searchQuery,
  setSearchQuery,
}: ProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(25);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [activeTabProductModal, setActiveTabProductModal] = useState<"features" | "reviews">("features");

  // Premium loading state and debouncing to prevent excessive updates while typing or sliding
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maxPrice);

  // Debounce search input (300ms) to ensure typed filter is smooth
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Debounce max price range slider (150ms) to ensure dragging is fluid
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMaxPrice(maxPrice);
    }, 150);
    return () => clearTimeout(handler);
  }, [maxPrice]);

  // Simulate remote bait catalogue lookup on filter/sort changes (500ms)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, debouncedMaxPrice, sortBy, debouncedSearchQuery]);

  const categories = ["All", "Groundbait", "Pellets", "Boilies", "Hookbait", "Liquid Attractants", "Fishing Accessories", "Terminal Tackle"];

  // Filter and Sort Logic (Uses debounced values to perfectly sync with the skeleton loader)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price <= debouncedMaxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [selectedCategory, debouncedMaxPrice, sortBy, debouncedSearchQuery]);

  // Handle adding a review locally
  const handleAddReview = (e: React.FormEvent, productId: string) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newReview: Review = {
      id: "rev-" + Date.now(),
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split("T")[0],
    };

    // Since we're dealing with mock data, let's inject it into the local product reference
    if (selectedProduct && selectedProduct.id === productId) {
      const updatedReviews = [newReview, ...selectedProduct.reviews];
      const sumRatings = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = parseFloat((sumRatings / updatedReviews.length).toFixed(1));
      
      const updatedProduct = {
        ...selectedProduct,
        reviews: updatedReviews,
        reviewsCount: updatedReviews.length,
        rating: avgRating,
      };

      // Also update in the global/static state arrays during this session
      const prodIndex = PRODUCTS.findIndex((p) => p.id === productId);
      if (prodIndex > -1) {
        PRODUCTS[prodIndex] = updatedProduct;
      }
      setSelectedProduct(updatedProduct);
    }

    setReviewAuthor("");
    setReviewComment("");
    setReviewRating(5);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white font-sans relative" id="products-catalog-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={12} className="text-yellow-400" />
            <span>Canadian Formulation, Trusted Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Premium Bait <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">Catalogue</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light">
            Crafted specifically to trigger feeding frenzies. Choose your category, filter by budget, and lock in your tackle preparation.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 mb-10 flex flex-col lg:flex-row gap-6 items-center justify-between backdrop-blur-sm shadow-xl" id="filter-control-panel">
          
          {/* Category Chips */}
          <div className="w-full overflow-x-auto flex items-center gap-2 pb-2 lg:pb-0 scrollbar-none" id="category-scroller">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-950"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorters and Sliders */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            {/* Search Input bar inside catalogue */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search baits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 text-white placeholder-slate-400 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2 bg-slate-950 py-1 px-3 rounded-xl border border-slate-800">
              <SlidersHorizontal size={14} className="text-emerald-400" />
              <div className="flex flex-col text-[10px] pr-2">
                <span className="text-slate-500 font-bold uppercase">Max Price</span>
                <span className="text-emerald-400 font-semibold">${maxPrice.toFixed(2)} CAD</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="h-1.5 w-24 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="popular">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="products-grid-skeleton">
            {[...Array(6)].map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" id="products-grid">
            {filteredProducts.map((product) => {
              const isInWishlist = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden hover:border-emerald-500/25 transition-all duration-300 flex flex-col group hover:shadow-2xl hover:shadow-emerald-950/10 hover:-translate-y-1"
                  id={`product-card-${product.id}`}
                >
                  
                  {/* Product Image & Badges */}
                  <div className="relative aspect-square overflow-hidden bg-slate-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-4 right-4 p-2.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${
                        isInWishlist
                          ? "bg-rose-600 border-rose-500 text-white"
                          : "bg-slate-950/70 border-slate-800/50 text-slate-300 hover:text-white"
                      }`}
                      title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
                    </button>

                    {/* Category Label */}
                    <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-slate-950/90 text-emerald-400 border border-emerald-950 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating summary */}
                      <div className="flex items-center gap-1 text-yellow-400 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                              className={i < Math.floor(product.rating) ? "" : "text-slate-600"}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 font-semibold">{product.rating}</span>
                        <span className="text-[10px] text-slate-500">({product.reviewsCount})</span>
                      </div>

                      {/* Name */}
                      <h3
                        onClick={() => {
                          setSelectedProduct(product);
                          setActiveTabProductModal("features");
                        }}
                        className="font-sans font-extrabold text-lg text-white hover:text-emerald-400 cursor-pointer transition-colors leading-snug"
                      >
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs text-slate-400 line-clamp-3 font-light leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Bottom price row */}
                    <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] block text-slate-500 uppercase font-bold tracking-wider">Price</span>
                        <span className="font-sans font-extrabold text-xl text-emerald-400">${product.price.toFixed(2)} <span className="text-xs text-slate-400 font-normal">CAD</span></span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Quick View Button */}
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setActiveTabProductModal("features");
                          }}
                          className="p-2.5 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {/* Add to Cart */}
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-950/50 hover:shadow-emerald-500/10 hover:scale-[1.02] transition-all cursor-pointer"
                        >
                          <ShoppingCart size={14} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl" id="no-results">
            <SlidersHorizontal size={40} className="mx-auto text-slate-600 mb-4 animate-pulse" />
            <h3 className="font-sans font-bold text-lg">No Baits Match Your Criteria</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
              Try adjusting your search terms, changing the category, or expanding your price cap to find the perfect bait.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setMaxPrice(25);
                setSearchQuery("");
              }}
              className="mt-6 px-4 py-2 bg-emerald-950 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-900/40 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Detailed Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4" id="product-modal-backdrop">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in" id="product-modal">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800/60 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white">
                    {selectedProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Grid Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left side: Image and details */}
                <div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Highlights */}
                  <div className="mt-4 flex items-center justify-between text-xs bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <span className="text-slate-400">Availability:</span>
                    <span className={`font-bold ${selectedProduct.stock > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* Right side: Tabs, reviews, add */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* Navigation tabs inside modal */}
                    <div className="flex gap-2 border-b border-slate-800/60 pb-3 mb-4">
                      <button
                        onClick={() => setActiveTabProductModal("features")}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                          activeTabProductModal === "features"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Bait Features
                      </button>
                      <button
                        onClick={() => setActiveTabProductModal("reviews")}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                          activeTabProductModal === "reviews"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-500/20"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        Reviews ({selectedProduct.reviewsCount})
                      </button>
                    </div>

                    {/* Features Panel */}
                    {activeTabProductModal === "features" && (
                      <div className="space-y-4 animate-fade-in">
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {selectedProduct.description}
                        </p>
                        
                        <div>
                          <span className="text-[10px] block text-slate-500 uppercase font-bold tracking-wider mb-2">Key Highlights</span>
                          <ul className="space-y-1.5">
                            {selectedProduct.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Reviews Panel */}
                    {activeTabProductModal === "reviews" && (
                      <div className="space-y-4 max-h-[300px] overflow-y-auto animate-fade-in pr-2 scrollbar-thin">
                        {/* Add Review Form */}
                        <form onSubmit={(e) => handleAddReview(e, selectedProduct.id)} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 mb-4">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Share your catch result</span>
                          
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <input
                              type="text"
                              placeholder="Your Name / Location"
                              value={reviewAuthor}
                              onChange={(e) => setReviewAuthor(e.target.value)}
                              className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                              required
                            />
                            <select
                              value={reviewRating}
                              onChange={(e) => setReviewRating(parseInt(e.target.value))}
                              className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                            >
                              <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                              <option value="4">⭐⭐⭐⭐ (4/5)</option>
                              <option value="3">⭐⭐⭐ (3/5)</option>
                              <option value="2">⭐⭐ (2/5)</option>
                              <option value="1">⭐ (1/5)</option>
                            </select>
                          </div>
                          
                          <textarea
                            placeholder="How did this bait perform? Mention lakes/waters..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            rows={2}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                            required
                          />
                          
                          <button
                            type="submit"
                            className="mt-2 w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Submit Review
                          </button>
                        </form>

                        {/* List of reviews */}
                        {selectedProduct.reviews.length > 0 ? (
                          selectedProduct.reviews.map((rev) => (
                            <div key={rev.id} className="border-b border-slate-800/40 pb-3 last:border-0">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-slate-200">{rev.author}</span>
                                <span className="text-[10px] text-slate-500">{rev.date}</span>
                              </div>
                              <div className="flex text-yellow-400 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={10}
                                    fill={i < rev.rating ? "currentColor" : "none"}
                                    className={i < rev.rating ? "" : "text-slate-700"}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed font-light">{rev.comment}</p>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-slate-500 text-xs">
                            No reviews yet. Be the first to submit your angling success!
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Add to Cart and Price */}
                  <div className="pt-6 border-t border-slate-800/60 mt-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Unit Price</span>
                      <span className="text-2xl font-extrabold text-emerald-400">${selectedProduct.price.toFixed(2)} <span className="text-xs text-slate-400 font-normal">CAD</span></span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(selectedProduct, 1);
                        setSelectedProduct(null);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
                    >
                      <ShoppingCart size={16} />
                      <span>Add To Cart</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
