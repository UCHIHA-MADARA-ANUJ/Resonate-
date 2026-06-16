"use client";

import { motion } from "framer-motion";
import { DNAHelixCanvas } from "@/presentation/canvas/archives/DNAHelixCanvas";
import { TextReveal } from "@/presentation/components/TextReveal";

export default function HeritageEchoesPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <DNAHelixCanvas />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        <h1 className="text-6xl md:text-[9rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-12 drop-shadow-[0_0_30px_rgba(255,0,85,0.4)]">
          <TextReveal text="HERITAGE" /> <br/>
          <TextReveal text="ECHOES." delay={0.1} />
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl text-text-primary font-mono leading-relaxed max-w-3xl mx-auto"
        >
          Bridging the generational disconnect.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg text-text-secondary font-mono leading-relaxed max-w-3xl mx-auto mt-12 p-12 border border-white/10 bg-white/5 backdrop-blur-md text-left"
        >
          <p className="mb-6">Indian youth often struggle to communicate emotional vulnerability with older generations due to linguistic and cultural barriers.</p>
          <p className="mb-6">Heritage Echoes allows teens to record interviews and stories with their parents or grandparents. The system uses localized LLMs to transcribe and translate regional languages (Hindi, Tamil, Marathi, Gujarati) into structured, emotionally-tagged English text.</p>
          <div className="bg-black/50 p-6 border-l-2 border-shock">
            <span className="text-shock text-xs tracking-widest uppercase block mb-2">DUAL IMPACT</span>
            Provides emotional release for the teen while mathematically preserving family history and cultural heritage for future generations.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
