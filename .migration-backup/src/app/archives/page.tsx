"use client";

import { motion } from "framer-motion";
import { DNAHelixCanvas } from "@/presentation/canvas/archives/DNAHelixCanvas";

export default function ArchivesPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <DNAHelixCanvas />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <h1 className="text-6xl md:text-[9rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-12 drop-shadow-[0_0_30px_rgba(255,0,85,0.4)]">
          HERITAGE <br/> ECHOES.
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl text-text-primary font-mono leading-relaxed max-w-3xl mx-auto"
        >
          Bridging the generational disconnect.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg text-text-secondary font-mono leading-relaxed max-w-2xl mx-auto mt-8 p-8 border border-white/10 bg-white/5 backdrop-blur-md"
        >
          Record interviews with parents or grandparents. The AI translates regional languages (Hindi, Tamil, Marathi) into structured English text, preserving emotional history and fostering empathy across generational lines.
        </motion.p>
      </div>
    </div>
  );
}
