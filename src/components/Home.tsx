import React, { useState } from "react";
import { Product, BlogPost, Testimonial, FAQItem } from "../types";
import { PRODUCTS, BLOG_POSTS, TESTIMONIALS, FAQS } from "../data";
import { Star, ArrowRight, CheckCircle2, Award, Users, Shield, Zap, Sparkles, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import Hero from "./Hero";

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  toggleWishlist: (product: Product) => void;
  wishlist: string[];
}

export default function Home({
  setCurrentTab,
  addToCart,
  toggleWishlist,
  wishlist,
}: HomeProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Take top 3 popular products
  const featuredProducts = PRODUCTS.slice(0, 3);
  
  // Take top 3 latest blog posts
  const latestTips = BLOG_POSTS.slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  // Instagram Mockup list
  const instagramPhotos = [
    { id: 1, url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=300", likes: "142" },
    { id: 2, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=300", likes: "321" },
    { id: 3, url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=300", likes: "98" },
    { id: 4, url: "https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&q=80&w=300", likes: "214" },
    { id: 5, url: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=300", likes: "411" },
    { id: 6, url: "https://images.unsplash.com/photo-1611095790444-1dfa4825a5a2?auto=format&fit=crop&q=80&w=300", likes: "189" }
  ];

  return (
    <div id="home-view-wrapper">
      
      {/* 1. Hero Showcase */}
      <Hero setCurrentTab={setCurrentTab} />

      {/* 2. Why Choose Matchbaits Section */}
      <section className="py-20 bg-slate-950 text-white relative font-sans" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full">
              Quality Above All
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              Why Matchbaits Canada Stands Out
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
              We don't manufacture generic groundbait. We engineer premium, nutritionally sound feeds that stimulate sensory receptors in wild specimen fish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/20 transition-all">
              <div>
                <Award className="text-emerald-400 group-hover:scale-110 transition-transform mb-4" size={28} />
                <h4 className="font-sans font-bold text-base text-white">Haith's Licensed Attractants</h4>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed font-light">
                We use genuine, licensed ingredients like Robin Red® inside our recipes to guarantee authentic spice leakages.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/20 transition-all">
              <div>
                <Users className="text-orange-400 group-hover:scale-110 transition-transform mb-4" size={28} />
                <h4 className="font-sans font-bold text-base text-white">Local Ontario Field Testing</h4>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed font-light">
                Every batch is field-tested by local carp guides on the Grand River and Lake Simcoe to prove its capability before release.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/20 transition-all">
              <div>
                <Shield className="text-sky-400 group-hover:scale-110 transition-transform mb-4" size={28} />
                <h4 className="font-sans font-bold text-base text-white">100% Eco-Friendly formulas</h4>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed font-light">
                Fully digestible, natural organic grains and birdfood. Our products protect the ecosystem and ensure fish long-term safety.
              </p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl flex flex-col justify-between group hover:border-emerald-500/20 transition-all">
              <div>
                <Zap className="text-emerald-400 group-hover:scale-110 transition-transform mb-4" size={28} />
                <h4 className="font-sans font-bold text-base text-white">Instant Water Soluble Leakage</h4>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed font-light">
                Our boilies and wafters feature micro-porous crusts that release dense clouds of amino acids instantly upon hitting the water.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="py-20 bg-slate-900 text-white font-sans relative" id="featured-products-row">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-2">Selected Gear</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Featured Specimen <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">Baits</span>
              </h2>
            </div>
            
            <button
              onClick={() => {
                setCurrentTab("products");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="mt-4 sm:mt-0 text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 group cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => {
              const isInWishlist = wishlist.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-slate-950 rounded-2xl border border-slate-850/80 overflow-hidden hover:border-emerald-500/20 transition-all group flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 text-[9px] font-bold uppercase bg-slate-900 text-emerald-400 px-2 py-0.5 rounded-lg">
                      {prod.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans font-extrabold text-base text-white line-clamp-1">{prod.name}</h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 font-light leading-relaxed">{prod.description}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-850/60 flex items-center justify-between">
                      <span className="font-extrabold text-base text-emerald-400">${prod.price.toFixed(2)} CAD</span>
                      
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Add to basket
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Latest Fishing tips */}
      <section className="py-20 bg-slate-950 text-white font-sans relative" id="latest-blog-highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-2">Angler Academy</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Latest Angler <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">Tips & Guides</span>
              </h2>
            </div>
            
            <button
              onClick={() => {
                setCurrentTab("tips");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="mt-4 sm:mt-0 text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 group cursor-pointer"
            >
              <span>View All Articles</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestTips.map((post) => (
              <div
                key={post.id}
                className="bg-slate-900/50 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-between group"
              >
                <div className="aspect-video bg-slate-950 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90" />
                  <span className="absolute bottom-3 left-3 text-[9px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block mb-2">{post.date} • {post.readTime}</span>
                    <h4
                      onClick={() => {
                        setCurrentTab("tips");
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      className="font-sans font-extrabold text-base text-white hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer leading-tight"
                    >
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 font-light leading-relaxed">{post.summary}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-850/60 text-right">
                    <button
                      onClick={() => {
                        setCurrentTab("tips");
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      Read full tips →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="py-20 bg-slate-900 text-white font-sans relative" id="testimonials-block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full">
              Community Voices
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
              What Real Canadian Anglers Are Saying
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
              From competitive tournament champions to weekend warriors, our baits deliver record-breaking carp and specimen counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between group hover:border-emerald-500/15 transition-all relative"
              >
                {/* Quote details */}
                <div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic font-light leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                {/* Author profile */}
                <div className="mt-6 pt-4 border-t border-slate-900 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 object-cover rounded-full border border-slate-800" />
                  <div>
                    <h5 className="text-xs font-bold text-white">{t.name}</h5>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">{t.role} • {t.location}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="py-20 bg-slate-950 text-white font-sans relative" id="faqs-accordion-block">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bait & Order <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">FAQs</span>
            </h2>
            <p className="text-xs text-slate-400 mt-2 font-light">
              Everything you need to know about our Southern Ontario manufacturing line and shipping logistics.
            </p>
          </div>

          <div className="space-y-4" id="faq-accordions">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center font-sans font-bold text-xs sm:text-sm text-slate-200 hover:text-white cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="text-emerald-400 text-lg font-bold">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed font-light border-t border-slate-900/40 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. Instagram Mock Grid */}
      <section className="py-16 bg-slate-900 text-white font-sans relative" id="instagram-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <Instagram size={24} className="text-pink-500 mx-auto mb-3 animate-pulse" />
            <h3 className="font-sans font-extrabold text-xl text-white">Join the Community</h3>
            <p className="text-xs text-slate-400 mt-1 font-light">
              Tag <span className="text-emerald-400 font-bold">@MatchbaitsCanada</span> in your mirror and common carp catch photos.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" id="instagram-grid">
            {instagramPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800/80 group cursor-pointer"
              >
                <img src={photo.url} alt="Catch on Matchbaits" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white flex items-center gap-1">
                    ❤️ {photo.likes} Likes
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Newsletter Signup */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 text-white font-sans relative border-t border-slate-850" id="newsletter-signup">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-900/70 p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6">
              
              <div className="w-12 h-12 bg-emerald-950 rounded-2xl flex items-center justify-center border border-emerald-500/20 text-emerald-400 mx-auto">
                <Mail size={22} />
              </div>

              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-white">Join the Matchbaits Newsletter</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                Receive exclusive southern Ontario baiting strategy booklets, active coupon codes, and notices on fresh bait-room drops.
              </p>

              {newsletterSubscribed ? (
                <div className="p-4 bg-emerald-950/50 border border-emerald-500/20 rounded-2xl max-w-sm mx-auto flex items-center justify-center gap-2 text-xs text-white">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span>Welcome aboard! Check your inbox for 15% off.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}

              <p className="text-[10px] text-slate-500">We respect your privacy. Unsubscribe anytime in one click.</p>
            </div>

          </div>

        </div>
      </section>

      {/* 9. Bottom Call to Action banner */}
      <section className="py-12 bg-slate-950 text-white font-sans text-center border-t border-slate-850" id="bottom-call-to-action">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white">
            Ready to Catch Your Personal Best?
          </h3>
          <p className="text-xs text-slate-400 mt-2 font-light max-w-md mx-auto leading-relaxed">
            Get premium, high-leakage, protein-loaded baits delivered straight to your door or pick up in Southern Ontario.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrentTab("products");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-950 cursor-pointer"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => {
                setCurrentTab("contact");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="px-6 py-3 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Get Custom Bait Advice
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
