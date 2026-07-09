import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    
    // Simulate contact form submission
    setIsSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white font-sans" id="contact-us-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🍁 Connect With Us 🍁</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Contact <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">Matchbaits Canada</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-light">
            Have questions about boilie flavors, bulk method feeds, local shipping, or rig setup? Our North York bait masters are ready to assist.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-grid">
          
          {/* Left Column: Coordinates & Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Info Cards */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-6">
              <h3 className="font-sans font-extrabold text-lg text-white border-b border-slate-800 pb-3">
                Contact Coordinates
              </h3>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Phone Support</span>
                  <a href="tel:6477038309" className="text-white hover:text-emerald-400 text-base font-semibold transition-colors">
                    647-703-8309
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Email Inquiry</span>
                  <a href="mailto:caladonuno01@gmail.com" className="text-white hover:text-emerald-400 text-sm font-semibold transition-colors break-all">
                    caladonuno01@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">Headquarters Location</span>
                  <span className="text-white text-sm font-semibold">
                    North York, Ontario, Canada
                  </span>
                </div>
              </div>

            </div>

            {/* Business Hours */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80">
              <h3 className="font-sans font-extrabold text-lg text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Clock size={18} className="text-emerald-400" />
                <span>Bait Room Hours</span>
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Monday - Friday</span>
                  <span className="font-semibold text-white">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Saturday</span>
                  <span className="font-semibold text-white">7:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-900">
                  <span>Sunday</span>
                  <span className="font-bold text-orange-400 flex items-center gap-1">
                    <span>Closed</span>
                    <span className="text-[10px] text-slate-500 font-normal italic">(Out Fishing!)</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form & Map (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Contact Form */}
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative">
              <h3 className="font-sans font-extrabold text-xl text-white mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-emerald-400" />
                <span>Send A Message</span>
              </h3>

              {isSubmitted ? (
                <div className="p-6 bg-emerald-950/50 border border-emerald-500/20 rounded-2xl text-center space-y-3 animate-fade-in">
                  <CheckCircle2 size={40} className="text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="font-sans font-bold text-lg text-white">Message Dispatched Successfully</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you for contacting Matchbaits Canada. One of our local bait specialists will read your inquiry and reply via email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="647-703-8309"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1.5">Your Message / Custom Order inquiry</label>
                    <textarea
                      placeholder="Type your questions about our boilies, custom method feed mix, or local bulk deliveries..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send size={14} />
                  </button>
                </form>
              )}

            </div>

            {/* Google Maps Premium Placeholder Card */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl relative aspect-video flex flex-col justify-end p-6 group" id="maps-card">
              
              {/* Premium abstract background layout imitating map grid */}
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center opacity-45 pointer-events-none group-hover:scale-102 transition-transform duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
                <svg className="w-full h-full stroke-emerald-950/20 stroke-2" fill="none">
                  <line x1="10%" y1="0%" x2="10%" y2="100%" />
                  <line x1="30%" y1="0%" x2="30%" y2="100%" />
                  <line x1="50%" y1="0%" x2="50%" y2="100%" />
                  <line x1="70%" y1="0%" x2="70%" y2="100%" />
                  <line x1="90%" y1="0%" x2="90%" y2="100%" />
                  <line x1="0%" y1="20%" x2="100%" y2="20%" />
                  <line x1="0%" y1="40%" x2="100%" y2="40%" />
                  <line x1="0%" y1="60%" x2="100%" y2="60%" />
                  <line x1="0%" y1="80%" x2="100%" y2="80%" />
                  {/* Diagonal Roads */}
                  <line x1="0" y1="0" x2="100%" y2="100%" className="stroke-orange-950/10" />
                  <line x1="100%" y1="0" x2="0" y2="100%" className="stroke-orange-950/10" />
                </svg>
              </div>

              {/* Pin point marker */}
              <div className="absolute inset-0 flex items-center justify-center pb-8 animate-pulse pointer-events-none">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/25 flex items-center justify-center animate-ping absolute -top-1 -left-1" />
                  <div className="w-8 h-8 rounded-full bg-emerald-600/60 border border-emerald-400/50 flex items-center justify-center text-white relative z-10">
                    <MapPin size={16} className="text-orange-400" />
                  </div>
                </div>
              </div>

              {/* Map detail badge */}
              <div className="relative z-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 shadow-lg max-w-sm">
                <h4 className="font-sans font-extrabold text-sm text-white">Matchbaits Canada base</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal font-light">
                  North York, Ontario, Canada. High-volume manufacturing, shipping coordinates, and regional distribution network.
                </p>
                <a
                  href="https://maps.google.com/?q=North+York,Ontario"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <Send size={10} />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
