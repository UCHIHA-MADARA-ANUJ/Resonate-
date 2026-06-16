"use client";

import { motion } from "framer-motion";
import { FluidCanvas } from "@/presentation/canvas/fluid/FluidCanvas";
import { TextReveal } from "@/presentation/components/TextReveal";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";

export default function ResoQuestsPage() {
  const handleClick = () => { try { AcousticResonator.getInstance().playDeepThud(); } catch(e){} };

  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <FluidCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)] z-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-display font-bold uppercase tracking-tighter text-reso leading-[0.85] mb-20 text-outline-reso">
          <TextReveal text="RESOQUESTS." />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 font-mono text-lg text-text-secondary leading-relaxed border-l border-white/10 pl-10">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              Scrolling is passive. Healing requires action. ResoQuests are aggressive, highly personalized emotional micro-challenges injected directly into your daily routine.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-6 bg-white/5 border border-white/10">
              <strong className="text-white block mb-4">ALGORITHMIC LOGIC:</strong> 
              The engine continually analyzes your cryptographic Mood Genome. It cross-references your school schedule (e.g., upcoming Board Exams) and deploys localized Reinforcement Learning to select interventions with the highest statistical probability of baseline recovery.
            </motion.div>
            <motion.ul initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6 border-l border-reso/30 pl-6 text-white text-sm">
              <li>&gt; TASK: Record a 30-second voice note letting out your frustration about physics.</li>
              <li>&gt; TASK: Write down one thing you can control about tomorrow's family dinner.</li>
            </motion.ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateY: -15 }} 
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="border border-white/20 bg-[#050505]/80 backdrop-blur-2xl p-10 relative overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.15)] transform-gpu"
          >
            <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 bg-reso text-black font-bold font-mono text-xs px-4 py-2 uppercase tracking-widest">Active Node</div>
            <h3 className="text-4xl font-display font-bold text-white uppercase mb-2 mt-4 tracking-tighter">Today's Protocol</h3>
            <p className="text-reso font-mono text-xs tracking-[0.2em] mb-12 uppercase">DIFFICULTY: NOVICE // EST. TIME: 2 MIN</p>
            
            <div className="bg-black/50 border border-white/10 p-8 mb-12 font-mono text-sm text-white/90 leading-relaxed relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-reso" />
              "Telemetry indicates elevated cortisol markers yesterday evening. Let's ground the system. Name 5 objects around you, 4 things you can physically feel, and 3 things you can hear."
            </div>

            <button onClick={handleClick} className="w-full bg-white text-black font-bold font-mono py-5 uppercase tracking-[0.2em] hover:bg-reso transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)]">
              Accept Quest
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
