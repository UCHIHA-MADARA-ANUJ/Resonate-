

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl md:text-[6rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-12">
          TERMS OF <br/><span className="text-reso">SERVICE.</span>
        </h1>
        
        <div className="space-y-12 font-mono text-text-secondary leading-relaxed border-l border-white/10 pl-6">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl text-white mb-4 uppercase">1. Acceptance of Protocol</h2>
            <p>By initializing a connection to the RESONATE network, you agree to these operational parameters. If you do not agree, disconnect immediately.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl text-white mb-4 uppercase">2. Rules of Engagement</h2>
            <p>You will not deploy hate speech, bullying, or manipulation within Resonance Circles. The AI moderator operates with zero tolerance. Violators are permanently purged from the network.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl text-white mb-4 uppercase">3. Medical Disclaimer</h2>
            <p>RESONATE is an algorithmic empathy and resilience tool. It is NOT a replacement for professional psychiatric or medical treatment. In a medical emergency, contact local authorities immediately.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
