"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/presentation/components/TextReveal";

export default function JoinPage() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-lg relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#050505] p-10 border border-white/20 relative crosshair-tl crosshair-tr crosshair-bl crosshair-br"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-display font-bold uppercase tracking-tighter text-white mb-2">
              <TextReveal text="INITIALIZE" />
            </h1>
            <p className="font-mono text-sm text-text-secondary uppercase tracking-widest">Early Access Protocol</p>
          </div>

          <form className="space-y-6 font-mono text-sm">
            <div>
              <label className="block text-white/50 mb-2 tracking-widest uppercase text-xs">Identification (Name)</label>
              <input type="text" required className="w-full bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-reso transition-colors" />
            </div>
            <div>
              <label className="block text-white/50 mb-2 tracking-widest uppercase text-xs">Comm-Link (Email)</label>
              <input type="email" required className="w-full bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-reso transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-white/50 mb-2 tracking-widest uppercase text-xs">Age</label>
                <input type="number" min="13" max="18" required className="w-full bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-reso transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 mb-2 tracking-widest uppercase text-xs">School / Node</label>
                <input type="text" required className="w-full bg-transparent border-b border-white/20 p-2 text-white focus:outline-none focus:border-reso transition-colors" />
              </div>
            </div>

            <button type="submit" className="w-full py-4 mt-8 bg-reso text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Secure Access
            </button>
            
            <p className="text-center text-[10px] text-white/30 tracking-widest uppercase mt-6">
              Zero spam. End-to-end encrypted queue.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
