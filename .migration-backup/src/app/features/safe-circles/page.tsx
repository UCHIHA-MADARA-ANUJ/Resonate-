"use client";

import { motion } from "framer-motion";
import { MeshTopologyCanvas } from "@/presentation/canvas/MeshTopologyCanvas";
import { TextReveal } from "@/presentation/components/TextReveal";

export default function SafeCirclesPage() {
  return (
    <div className="bg-void min-h-screen pt-40 pb-40 relative overflow-hidden">
      <MeshTopologyCanvas />
      <div className="absolute inset-0 bg-grid-full opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-center drop-shadow-[0_0_50px_rgba(0,240,255,0.3)]">
          <TextReveal text="SAFE" /> <br/>
          <TextReveal text="CIRCLES." delay={0.1} />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 border border-white/20 bg-black/80 backdrop-blur-md text-center">
            <div className="text-4xl font-display font-bold text-reso mb-4">4-8</div>
            <div className="text-sm font-mono text-white/50 tracking-widest uppercase mb-4">Node Capacity</div>
            <p className="text-text-secondary font-mono text-sm">Hyper-intimate micro-communities. No endless scrolling feeds. Just you and a few peers who actually understand.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 border border-white/20 bg-black/80 backdrop-blur-md text-center">
            <div className="text-4xl font-display font-bold text-shock mb-4">E2E</div>
            <div className="text-sm font-mono text-white/50 tracking-widest uppercase mb-4">Encryption</div>
            <p className="text-text-secondary font-mono text-sm">Peer-to-Peer WebRTC DataChannels. Messages never touch a central database. Absolute anonymity.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-8 border border-white/20 bg-black/80 backdrop-blur-md text-center">
            <div className="text-4xl font-display font-bold text-reso mb-4">AI</div>
            <div className="text-sm font-mono text-white/50 tracking-widest uppercase mb-4">Moderator</div>
            <p className="text-text-secondary font-mono text-sm">A localized neural net scans text for severe distress or toxicity, instantly terminating abusive connections.</p>
          </motion.div>
        </div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="border border-white/10 bg-black/50 p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-display text-white uppercase mb-4">Smart Matching Protocol</h3>
          <p className="font-mono text-text-secondary">Circles are dynamically assembled based on shared immediate challenges (e.g., "Class 10 Board Exam Stress", "Academic Burnout"). Faculty and mentors have high-level aggregate oversight without violating individual cryptographic privacy.</p>
        </motion.div>
      </div>
    </div>
  );
}
