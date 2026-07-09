import { useState, useMemo } from "react";
import { BlogPost } from "../types";
import { BLOG_POSTS } from "../data";
import { Search, Calendar, User, Clock, Share2, Facebook, Twitter, Link, Check, Compass, Eye } from "lucide-react";

interface FishingTipsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function FishingTips({ searchQuery, setSearchQuery }: FishingTipsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ["All", "Tips", "Guides", "Tactics"];

  // Filtering
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, searchQuery]);

  // Related posts recommender
  const relatedPosts = useMemo(() => {
    if (!activePost) return [];
    return BLOG_POSTS.filter(
      (post) => post.id !== activePost.id && (post.category === activePost.category || post.tags.some((t) => activePost.tags.includes(t)))
    ).slice(0, 2);
  }, [activePost]);

  const handleShare = (platform: string) => {
    if (platform === "copy") {
      setCopiedLink(true);
      navigator.clipboard.writeText(window.location.href);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      // Simulate external social navigation
      alert(`Sharing "${activePost?.title}" to ${platform}!`);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white font-sans relative" id="blog-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass size={12} className="text-orange-400" />
            <span>Matchbaits Angler Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Fishing Tips & <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">Advice</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light">
            Stay ahead of the game with deep-dive tactics, seasonal water temperature guides, and bait rigging breakdowns compiled by veteran Canadian carp guides.
          </p>
        </div>

        {/* Search and Category Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
          
          {/* Category Selector */}
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 border-emerald-500 text-white"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat === "All" ? "All Articles" : cat}
              </button>
            ))}
          </div>

          {/* Search bar inside blog */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides/articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-white placeholder-slate-400 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-grid">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden hover:border-emerald-500/20 transition-all flex flex-col justify-between group"
              >
                
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase bg-emerald-600 text-white border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-orange-400" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setActivePost(post)}
                      className="font-sans font-extrabold text-lg text-white hover:text-emerald-400 cursor-pointer transition-colors line-clamp-2 leading-snug"
                    >
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="mt-3 text-xs text-slate-400 line-clamp-3 font-light leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  {/* Read More link button */}
                  <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      By {post.author.split(",")[0]}
                    </span>
                    <button
                      onClick={() => setActivePost(post)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 group/btn cursor-pointer"
                    >
                      <span>Read Full Article</span>
                      <Eye size={12} className="transform group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-950/20 border border-dashed border-slate-800 rounded-3xl" id="no-blog-results">
            <Clock size={40} className="mx-auto text-slate-600 mb-4 animate-pulse" />
            <h3 className="font-sans font-bold text-lg">No Articles Found</h3>
            <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
              We couldn't find any tips or guides matching your query. Try searching for "carp", "winter", "rigs", or "boilies"!
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 px-4 py-2 bg-emerald-950 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-900/40 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Detailed Article Reader Overlay */}
        {activePost && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4" id="reader-overlay">
            <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-zoom-in" id="reader-container">
              
              {/* Header Image Cover */}
              <div className="relative h-60 sm:h-80 bg-slate-950">
                <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-950/40" />
                
                {/* Close Button */}
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-950 text-white p-3 rounded-full border border-slate-800 transition-colors z-25 cursor-pointer"
                >
                  ✕
                </button>

                {/* Article Header info overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-bold uppercase bg-emerald-600 text-white px-2.5 py-1 rounded-lg">
                    {activePost.category}
                  </span>
                  <h1 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-white mt-3 leading-tight drop-shadow-md">
                    {activePost.title}
                  </h1>
                </div>
              </div>

              {/* Reader Body content */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side: Article markup content */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Metadata info row */}
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 border-b border-slate-800/60 pb-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-emerald-400" />
                      <span className="font-semibold">{activePost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-orange-400" />
                      <span>{activePost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{activePost.readTime}</span>
                    </div>
                  </div>

                  {/* Main text content (Formatted markdown layout manually) */}
                  <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 font-light">
                    {activePost.content.split("\n\n").map((para, idx) => {
                      // Simple manual Markdown formatting helper
                      if (para.startsWith("###")) {
                        return (
                          <h3 key={idx} className="font-sans font-extrabold text-lg sm:text-xl text-white pt-4 pb-1 border-l-4 border-emerald-500 pl-3">
                            {para.replace("###", "").trim()}
                          </h3>
                        );
                      }
                      if (para.startsWith("-")) {
                        return (
                          <ul key={idx} className="list-disc list-inside space-y-1 pl-4 text-slate-300">
                            {para.split("\n").map((li, lIdx) => (
                              <li key={lIdx}>{li.replace("-", "").trim()}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={idx} className="whitespace-pre-wrap">
                          {para}
                        </p>
                      );
                    })}
                  </div>

                  {/* Tags */}
                  <div className="pt-6 border-t border-slate-800/40 flex flex-wrap gap-2">
                    {activePost.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold bg-slate-950 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-800/60">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Right Side: Sidebar (Social, Related) */}
                <div className="space-y-6">
                  
                  {/* Share widget */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                      <Share2 size={14} className="text-emerald-400" />
                      <span>Share This Strategy</span>
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleShare("Facebook")}
                        className="py-2.5 bg-blue-900/40 border border-blue-500/25 hover:bg-blue-900/60 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                      >
                        <Facebook size={16} />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare("Twitter")}
                        className="py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                      >
                        <Twitter size={16} />
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className={`py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all border cursor-pointer ${
                          copiedLink
                            ? "bg-emerald-950 border-emerald-500 text-emerald-400"
                            : "bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300 hover:text-white"
                        }`}
                      >
                        {copiedLink ? <Check size={16} /> : <Link size={16} />}
                        <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Related Articles list */}
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                      Related Articles
                    </h4>
                    
                    <div className="space-y-4">
                      {relatedPosts.map((rPost) => (
                        <div
                          key={rPost.id}
                          className="flex gap-3 group cursor-pointer border-b border-slate-900 pb-3 last:border-0 last:pb-0"
                          onClick={() => {
                            setActivePost(rPost);
                            const modal = document.getElementById("reader-container");
                            if (modal) modal.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <img src={rPost.image} alt={rPost.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                          <div>
                            <h5 className="text-xs font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                              {rPost.title}
                            </h5>
                            <span className="text-[10px] text-slate-500 mt-1 block">
                              {rPost.readTime}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
