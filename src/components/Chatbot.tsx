import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, Minimize2, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "🍁 Welcome to Matchbaits Canada! I am your AI Angling Expert. Ask me anything about our premium baits, terminal tackle, or fishing guides in Ontario. How can I help you land more fish today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Suggestion chip prompts
  const suggestions = [
    "Recommend a big carp bait",
    "What is Groundbait?",
    "Do you deliver to Quebec?",
    "Where is the bait room?",
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setShowNotification(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Format message history for the backend
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI server");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "I couldn't generate a reply. Please try again." },
      ]);
    } catch (err: any) {
      console.error("Chatbot Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ I apologize, but I am experiencing trouble reaching our North York bait servers right now. Please ensure your GEMINI_API_KEY is configured in the Secrets panel, or contact us directly at caladonuno01@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "🍁 Welcome to Matchbaits Canada! I am your AI Angling Expert. Ask me anything about our premium baits, terminal tackle, or fishing guides in Ontario. How can I help you land more fish today?",
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="ai-chatbot-widget">
      
      {/* Tiny Notification Alert Balloon */}
      {showNotification && !isOpen && (
        <div className="absolute bottom-16 right-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] py-1.5 px-3.5 rounded-full shadow-lg border border-emerald-500/20 whitespace-nowrap animate-bounce flex items-center gap-1.5 z-40">
          <Bot size={12} />
          <span>Ask our Fishing Assistant!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNotification(false);
            }}
            className="text-white/80 hover:text-white ml-1 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Action Circle Button */}
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowNotification(false);
          }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 flex items-center justify-center text-white shadow-xl shadow-emerald-900/30 border border-emerald-500/20 hover:scale-105 transition-all cursor-pointer z-30"
          id="chat-toggle-open"
          title="Open AI Assistant"
        >
          <MessageSquare size={24} className="animate-pulse" />
        </button>
      ) : (
        /* Chat Window Panel */
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden animate-slide-up" id="chatbot-window">
          
          {/* Header Row */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 py-4 px-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center border border-emerald-500/20">
                <Bot size={16} className="text-emerald-400" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white tracking-wide">Matchbaits AI Expert</span>
                <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Online Advice</span>
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {/* Reset Thread Button */}
              <button
                onClick={resetChat}
                className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Restart Chat"
              >
                <RefreshCw size={12} />
              </button>
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Minimize Window"
              >
                <Minimize2 size={12} />
              </button>
            </div>
          </div>

          {/* Messages Log Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40 scrollbar-thin scrollbar-thumb-slate-800">
            {messages.map((msg, idx) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div key={idx} className={`flex gap-2 ${isAssistant ? "justify-start" : "justify-end"}`}>
                  
                  {isAssistant && (
                    <div className="w-6 h-6 rounded-md bg-emerald-950 flex items-center justify-center border border-emerald-500/20 shrink-0">
                      <Bot size={12} className="text-emerald-400" />
                    </div>
                  )}

                  <div className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                    isAssistant
                      ? "bg-slate-900 text-slate-200 rounded-tl-none border border-slate-850"
                      : "bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-950/20"
                  }`}>
                    {msg.content}
                  </div>

                  {!isAssistant && (
                    <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center shrink-0">
                      <User size={12} className="text-slate-300" />
                    </div>
                  )}

                </div>
              );
            })}

            {/* Simulated typing indicator */}
            {isLoading && (
              <div className="flex gap-2 justify-start items-center">
                <div className="w-6 h-6 rounded-md bg-emerald-950 flex items-center justify-center border border-emerald-500/20">
                  <Bot size={12} className="text-emerald-400" />
                </div>
                <div className="bg-slate-900 text-slate-400 p-3 rounded-2xl rounded-tl-none text-xs flex gap-1 items-center border border-slate-850">
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions list */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-800/50 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-[10px] bg-slate-900 text-emerald-400 border border-emerald-950 hover:bg-emerald-950 px-2 py-1 rounded-lg transition-colors text-left font-sans font-medium cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Panel */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/90 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Type your fishing question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(input);
              }}
              className="flex-1 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition-colors cursor-pointer shadow-md shadow-emerald-950"
              title="Send Message"
            >
              <Send size={14} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
