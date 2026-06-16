

import { motion } from "framer-motion";
import { TextReveal } from "@/presentation/components/TextReveal";
import { AdvancedChat } from "@/presentation/components/chat/AdvancedChat";

export default function EmpathyCoachPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none mix-blend-overlay" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20">
          <TextReveal text="EMPATHY" /> <br/>
          <TextReveal text="COACH." className="text-outline-reso" delay={0.1} />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="font-mono text-xl text-text-secondary leading-relaxed space-y-12 border-l border-white/10 pl-8">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              An always-available, highly secure chat companion powered by advanced LLMs fine-tuned exclusively on <span className="text-white">Cognitive Behavioral Therapy (CBT)</span> and <span className="text-white">Dialectical Behavior Therapy (DBT)</span> frameworks.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white">
              Culturally attuned to the Indian teen experience. It understands the extreme nuances of academic pressure (JEE/NEET), parental expectations, and joint family dynamics without generic western platitudes.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-8 border border-shock/30 bg-shock/5 text-sm text-shock relative crosshair-tl crosshair-tr crosshair-bl crosshair-br">
              <span className="font-bold block mb-4 tracking-widest uppercase">CRITICAL OVERRIDE PROTOCOL:</span> 
              If algorithmic intent to self-harm is detected, the AI instantly locks the chat interface, bypassing anonymity protocols to open direct, unblockable lines to certified Indian helplines (iCall, AASRA) and designated guardians.
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AdvancedChat />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
