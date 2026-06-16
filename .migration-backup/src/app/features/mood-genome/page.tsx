"use client";

import { motion } from "framer-motion";
import { MeshTopologyCanvas } from "@/presentation/canvas/MeshTopologyCanvas";
import { TextReveal } from "@/presentation/components/TextReveal";

export default function MoodGenomePage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <MeshTopologyCanvas />
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-outline-reso">
          <TextReveal text="MOOD" /> <br/>
          <TextReveal text="GENOME." delay={0.1} />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 font-mono text-lg text-text-secondary leading-relaxed"
          >
            <p>Your long-term emotional intelligence dashboard. We map the DNA of your feelings.</p>
            <p className="text-white">Tracks patterns, identifies triggers (exams, family conflicts, social media), and predicts difficult days before they happen.</p>
            <div className="p-6 border border-shock/30 bg-shock/5">
              <span className="text-shock text-xs tracking-widest uppercase mb-2 block">AI Insight Generated</span>
              "You consistently exhibit 40% higher cognitive distortion markers on Sunday nights. Recommending proactive grounding quests."
            </div>
          </motion.div>

          {/* Fake Heatmap Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-white/20 bg-[#050505] p-8"
          >
            <h3 className="text-xl font-display font-bold text-white uppercase mb-8">Emotional Heatmap (Last 30 Days)</h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({length: 35}).map((_, i) => {
                const isHighStress = Math.random() > 0.8;
                const isCalm = Math.random() > 0.6 && !isHighStress;
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                    className={`aspect-square rounded-sm border border-white/5 ${
                      isHighStress ? 'bg-shock/80' : isCalm ? 'bg-reso/80' : 'bg-white/10'
                    }`}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-4 font-mono text-[10px] text-white/50">
              <span>CALM</span>
              <span>STRESS / ANXIETY</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
