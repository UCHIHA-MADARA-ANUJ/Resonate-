

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  isTyping?: boolean;
}

export function AdvancedChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'ai', text: "SYSTEM DIAGNOSTIC: Heart rate metrics indicate elevated stress. You haven't completed a grounding protocol in 48 hours. What's happening?" }
  ]);
  const [input, setInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim() || isAiTyping) return;
    
    try { AcousticResonator.getInstance().playDataTick(); } catch(e){}

    const newUserMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, newUserMsg]);
    setInput("");
    setIsAiTyping(true);

    // Simulate AI processing & network delay
    setTimeout(() => {
      // Add typing indicator message
      const typingId = Date.now().toString() + '_typing';
      setMessages(prev => [...prev, { id: typingId, role: 'ai', text: "", isTyping: true }]);
      
      setTimeout(() => {
        try { AcousticResonator.getInstance().playSoftHover(); } catch(e){}
        // Replace typing with actual response
        setMessages(prev => {
          const filtered = prev.filter(m => m.id !== typingId);
          return [...filtered, { 
            id: Date.now().toString() + '_res', 
            role: 'ai', 
            text: "I hear you. The pressure of board exams is immense. Your reaction is a normal physiological response to extreme academic stress. Let's try a DBT 'TIPP' skill. Can you splash some freezing cold water on your face right now to reset your mammalian dive reflex?" 
          }];
        });
        setIsAiTyping(false);
      }, 2500); // 2.5s typing delay
    }, 500); // 0.5s network delay
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div className="border border-white/20 bg-[#0A0A0A]/90 backdrop-blur-2xl flex flex-col h-[600px] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative crosshair-tl crosshair-tr crosshair-bl crosshair-br">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-reso animate-pulse shadow-[0_0_10px_#00F0FF]" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/50">Empathy_Core_v3.0</span>
        </div>
        <span className="font-mono text-[10px] uppercase text-shock border border-shock/30 px-2 py-1">E2E Encrypted</span>
      </div>
      
      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto font-mono text-sm space-y-8 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div 
              key={m.id} 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-5 relative ${
                m.role === 'user' 
                  ? 'bg-white text-black' 
                  : 'bg-reso/10 border border-reso/30 text-white shadow-[0_0_20px_rgba(0,240,255,0.05)]'
              }`}>
                {m.isTyping ? (
                  <div className="flex gap-2 items-center h-4">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-reso" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-reso" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-reso" />
                  </div>
                ) : (
                  <p className="leading-relaxed">{m.text}</p>
                )}
                {/* Decorative tech corners */}
                {m.role === 'ai' && <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-reso" />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/10 bg-black/50">
        <div className="flex gap-4 items-end">
          <div className="flex-1 border-b border-white/20 relative group">
            <div className="absolute bottom-0 left-0 w-0 h-px bg-reso transition-all duration-300 group-focus-within:w-full" />
            <textarea 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your response..." 
              className="w-full bg-transparent text-white font-mono text-sm focus:outline-none resize-none overflow-hidden h-10 pt-2 caret-reso"
              rows={1}
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={isAiTyping || !input.trim()}
            className="bg-reso text-black px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            TRANSMIT
          </button>
        </div>
      </div>
    </div>
  );
}
