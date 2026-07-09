import { Anchor, Facebook, Youtube, Instagram, MapPin, Mail, Phone, Calendar } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Bio Column */}
          <div className="space-y-4">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavClick("home")}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white">
                <Anchor size={18} />
              </div>
              <div>
                <span className="font-sans font-extrabold text-base tracking-tight text-white">
                  MATCHBAITS
                </span>
                <span className="text-[9px] block font-mono text-emerald-400 tracking-widest uppercase font-bold -mt-1">
                  CANADA
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Ontario's trusted source for professional, protein-rich, and eco-safe freshwater baits. Engineered to perform in wild Canadian rivers and specimen lakes.
            </p>

            {/* Social channels (Mock placeholders) */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="Matchbaits Facebook"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="Matchbaits YouTube"
              >
                <Youtube size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="Matchbaits Instagram"
              >
                <Instagram size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-slate-900 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNavClick("home")} className="hover:text-white transition-colors cursor-pointer">
                  Home Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("products")} className="hover:text-white transition-colors cursor-pointer">
                  Bait Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("tips")} className="hover:text-white transition-colors cursor-pointer">
                  Fishing Academy & Tips
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("about")} className="hover:text-white transition-colors cursor-pointer">
                  Our Brand Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("contact")} className="hover:text-white transition-colors cursor-pointer">
                  Support & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories Column */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-slate-900 pb-2">
              Bait Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNavClick("products")} className="hover:text-white transition-colors cursor-pointer">
                  Premium Groundbait
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("products")} className="hover:text-white transition-colors cursor-pointer">
                  High-Protein Pellets
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("products")} className="hover:text-white transition-colors cursor-pointer">
                  High-Leakage Boilies
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("products")} className="hover:text-white transition-colors cursor-pointer">
                  High-Visibility Hookbaits
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("products")} className="hover:text-white transition-colors cursor-pointer">
                  Amino Attractant Liquids
                </button>
              </li>
            </ul>
          </div>

          {/* Contact coordinates footer column */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 border-b border-slate-900 pb-2">
              Get In Touch
            </h4>
            
            <div className="flex gap-2.5 items-start text-xs">
              <Phone size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>647-703-8309</span>
            </div>

            <div className="flex gap-2.5 items-start text-xs">
              <Mail size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <span className="break-all">caladonuno01@gmail.com</span>
            </div>

            <div className="flex gap-2.5 items-start text-xs">
              <MapPin size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>North York, Ontario, Canada</span>
            </div>

            <div className="flex gap-2.5 items-start text-xs text-slate-500 pt-1">
              <Calendar size={14} className="shrink-0" />
              <span>Mon-Fri: 8AM-6PM | Sat: 7AM-4PM</span>
            </div>
          </div>

        </div>

        {/* Bottom bar with copyright & required attribution link */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 space-y-4 md:space-y-0">
          <div>
            <span>© {new Date().getFullYear()} Matchbaits Canada. All rights reserved. </span>
            <span className="hover:text-slate-400 cursor-pointer ml-2">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer ml-2">Terms of Service</span>
          </div>
          
          {/* Centered target attribution strictly matching user specifications */}
          <div className="font-medium text-slate-400 uppercase tracking-widest">
            Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold hover:underline">iWebNext</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
