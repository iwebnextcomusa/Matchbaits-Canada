import { Heart, ShieldCheck, Compass, Users } from "lucide-react";

export default function About() {
  return (
    <section className="py-16 bg-slate-950 text-white font-sans" id="about-story-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🍁 Canadian Angling Heritage 🍁</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            The Story of <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">Matchbaits Canada</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light">
            Founded by dedicated specimen anglers to bring premium-grade, scientifically tested, and highly attractive fishing baits to Ontario and beyond.
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" id="about-split">
          
          {/* Left: Text */}
          <div className="space-y-6">
            <h3 className="font-sans font-extrabold text-2xl text-white">
              Born Out of Passion on the River Bank
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              At Matchbaits Canada, our journey began not in a boardroom, but on the misty banks of the Grand River and the expansive waters of the St. Lawrence. We were frustrated by the lack of fresh, highly active, and premium specimen baits tailored specifically to the unique habits of wild Canadian freshwater fish.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Most commercial baits are mass-produced with cheap fillers and synthetic scents that quickly lose potency in the water. We knew Canadian anglers deserved better. We set out to formulate custom blends utilizing premium birdfood, high-protein marine fishmeals, pure cold-pressed salmon oils, and authentic natural triggers (such as the legendary Haith’s Robin Red®).
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Today, Matchbaits Canada is proud to serve anglers across Ontario and all of Canada from our headquarters in North York. Whether you are a beginner looking to land your first wild carp or a veteran tournament angler demanding critically balanced rigs and maximum oil leakage, we support your passion with premium products and expert advice.
            </p>
          </div>

          {/* Right: Immersive graphic row */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col justify-between h-full relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl" />

            <div className="space-y-8 relative z-10">
              <h4 className="font-sans font-extrabold text-lg text-emerald-400 border-b border-slate-800 pb-3">
                Our Core Pillars
              </h4>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                  <Heart size={18} />
                </div>
                <div>
                  <h5 className="font-sans font-semibold text-white text-sm">Genuine Angling Passion</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    We live and breathe fishing. Our team is constantly on the bank, testing and refining formulas in real conditions to guarantee success.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h5 className="font-sans font-semibold text-white text-sm">Uncompromising Quality</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    We only use high-grade, organic, water-soluble ingredients and feed triggers. No chemical binders, no artificial fillers, and zero toxic waste.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                  <Users size={18} />
                </div>
                <div>
                  <h5 className="font-sans font-semibold text-white text-sm">Customer-First Advice</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Our relationship doesn't end with a sale. We offer free tips, active chat assistance, and setup guides to help you land bigger fish.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Local Business Stats Block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800/80 text-center backdrop-blur-sm" id="about-stats">
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-emerald-400">100%</span>
            <span className="block text-xs text-slate-400 mt-1 font-sans font-medium uppercase tracking-wider">Canadian Owned</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-white">15+</span>
            <span className="block text-xs text-slate-400 mt-1 font-sans font-medium uppercase tracking-wider">Unique Formulations</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-emerald-400">10k+</span>
            <span className="block text-xs text-slate-400 mt-1 font-sans font-medium uppercase tracking-wider">Anglers Served</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-white">4.9★</span>
            <span className="block text-xs text-slate-400 mt-1 font-sans font-medium uppercase tracking-wider">Customer Rating</span>
          </div>
        </div>

      </div>
    </section>
  );
}
