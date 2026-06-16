

import { motion } from "framer-motion";
import { ScrambleText } from "@/presentation/components/ScrambleText";

export default function ManifestoPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <span className="text-shock font-mono text-sm tracking-widest uppercase mb-8 block border border-shock/30 w-max px-4 py-2 bg-shock/10">
            Internal Document // Level 4 Clearance
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-12">
            The World is <br/>
            <span className="text-shock">Bleeding.</span>
          </h1>
        </motion.div>

        <div className="space-y-12 font-mono text-xl text-text-secondary leading-relaxed border-l border-white/10 pl-8">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <ScrambleText text="We looked at the digital ecosystem provided to our generation and saw a slaughterhouse. Platforms engineered by billionaires to strip-mine our dopamine, fracture our attention spans, and monetize our insecurities." />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white">
            <ScrambleText text="They call it 'Social Media.' We call it psychological warfare." />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <ScrambleText text="Indian teenagers are suffocating. Crushed between relentless academic expectations, cultural pressures, and a digital world that only values superficial perfection. The traditional systems failed us. Therapy is stigmatized. Parents don't understand." />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-8 border border-reso bg-reso/5 text-reso font-bold text-2xl">
            <ScrambleText text="We decided to stop waiting for a savior and build the goddamn infrastructure ourselves." />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <ScrambleText text="RESONATE is not a social network. It is a defense mechanism. It is an algorithmic sanctuary. By combining zero-knowledge privacy protocols with reinforcement learning, we are delivering real-time, unfiltered empathetic computing to every student, 24/7." />
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white">
            <ScrambleText text="We are replacing vapid vanity metrics with genuine resonance. We are destroying the old web." />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
