import { ArrowRight, Trophy, Sparkles, MapPin, Compass } from "lucide-react";
import heroBgImage from "../assets/images/premium_fishing_baits_and_tackle_1783635927992.jpg";

interface HeroProps {
  setCurrentTab: (tab: string) => void;
}

export default function Hero({ setCurrentTab }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-10 pb-20">
      
      {/* Majestic Canadian Fishing Baits & Tackle Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
        <img
          src={heroBgImage}
          alt="Premium Fishing Baits and Tackle"
          className="w-full h-full object-cover opacity-55 scale-100 select-none pointer-events-none filter brightness-75 contrast-105 saturate-[0.95]"
          referrerPolicy="no-referrer"
        />
        {/* Deep, rich cinematic overlay matching the sophisticated dark branding */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
      </div>

      {/* Decorative ambient gradients */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-sky-500/10 rounded-full blur-[140px] mix-blend-screen" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner animate-bounce">
          <Sparkles size={12} className="text-orange-400" />
          <span>Premium Coarse & Specimen Fishing Baits</span>
        </div>

        {/* Headline */}
        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-none">
          Premium Fishing Baits for{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-orange-400 bg-clip-text text-transparent">
            Canadian Anglers
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-sans font-light leading-relaxed">
          Helping anglers catch more fish with quality bait, trusted products, and expert fishing advice. Handcrafted and formulated specifically for Canadian freshwater rivers and lakes.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentTab("products");
              window.scrollTo({ top: 500, behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 group cursor-pointer"
            id="hero-cta-shop"
          >
            <span>Shop Products</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => {
              setCurrentTab("tips");
              window.scrollTo({ top: 500, behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-xl flex items-center justify-center gap-2 border border-slate-700/60 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            id="hero-cta-tips"
          >
            <Compass size={16} className="text-orange-400" />
            <span>Read Fishing Tips</span>
          </button>
        </div>

        {/* Features / Spec Points (Bento Row) */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-6xl mx-auto" id="hero-bento-grid">
          
          {/* Item 1 */}
          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/30 transition-all group hover:bg-slate-900/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/50 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Trophy size={20} />
            </div>
            <h3 className="font-sans font-semibold text-white text-base">Canadian Formulations</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Custom-crafted to match the specific water chemistry, depths, and wild fish species of Ontario lakes.
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/30 transition-all group hover:bg-slate-900/80">
            <div className="w-10 h-10 rounded-xl bg-orange-950/50 flex items-center justify-center text-orange-400 mb-4 border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <Sparkles size={20} />
            </div>
            <h3 className="font-sans font-semibold text-white text-base">Elite Food Attraction</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Loaded with water-soluble amino acids, natural proteins, and intense feeding triggers for instant bites.
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/30 transition-all group hover:bg-slate-900/80">
            <div className="w-10 h-10 rounded-xl bg-sky-950/50 flex items-center justify-center text-sky-400 mb-4 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-colors">
              <Compass size={20} />
            </div>
            <h3 className="font-sans font-semibold text-white text-base">Expert Angling Advice</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              We provide free seasonal fishing guides and rigging tips to help beginners and experts catch bigger specimens.
            </p>
          </div>

          {/* Item 4 */}
          <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/30 transition-all group hover:bg-slate-900/80">
            <div className="w-10 h-10 rounded-xl bg-teal-950/50 flex items-center justify-center text-teal-400 mb-4 border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <MapPin size={20} />
            </div>
            <h3 className="font-sans font-semibold text-white text-base">Located in Ontario</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Proudly operating out of North York, supplying fast shipping to anglers from Cornwall to Thunder Bay.
            </p>
          </div>

        </div>

      </div>
      
      {/* Wave transition bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 text-slate-950 fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,53.05,22,101.42,35.58,162.77,52.84,230,68.13,321.39,56.44Z"></path>
        </svg>
      </div>

    </section>
  );
}
