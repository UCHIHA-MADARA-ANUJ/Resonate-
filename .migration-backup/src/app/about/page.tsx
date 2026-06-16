"use client";

import { motion } from "framer-motion";
import { NeuralNetworkCanvas } from "@/presentation/canvas/NeuralNetworkCanvas";
import { TextReveal } from "@/presentation/components/TextReveal";

export default function AboutPage() {
  return (
    <div className="bg-void min-h-screen pt-40 pb-40 relative overflow-hidden">
      <NeuralNetworkCanvas />
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h1 className="text-6xl md:text-[9rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-center drop-shadow-[0_0_50px_rgba(0,240,255,0.3)]">
          <TextReveal text="ABOUT US." />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12 font-mono text-lg text-text-secondary leading-relaxed border-l border-white/10 pl-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display text-white mb-4 uppercase">Our Story</h2>
              <p>We are a group of Indian students who looked around and saw a generation drowning. Rising loneliness, crushing exam anxiety (JEE, NEET, Boards), and the shallow, performative connections of legacy social media were destroying our peers.</p>
              <p className="mt-4">We stopped waiting for adults to fix it. We built an algorithmic sanctuary that fosters actual emotional growth.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display text-reso mb-4 uppercase">Mission</h2>
              <p>To create a safe, voice-first space where every Indian student aged 13-18 feels heard, understood, and structurally supported by empathetic computation.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-display text-white mb-4 uppercase">Vision</h2>
              <p>A national movement where emotional intelligence is quantified and prioritized exactly as highly as academic success.</p>
            </motion.div>
          </div>

          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 border border-white/20 bg-black/80 backdrop-blur-md">
              <h2 className="text-3xl font-display text-white mb-6 uppercase">Core Values</h2>
              <ul className="space-y-4 font-mono text-sm tracking-widest text-text-secondary">
                <li className="flex gap-4"><span className="text-reso">01.</span> EMPATHY FIRST</li>
                <li className="flex gap-4"><span className="text-reso">02.</span> RADICAL CRYPTOGRAPHIC PRIVACY</li>
                <li className="flex gap-4"><span className="text-reso">03.</span> CULTURAL SENSITIVITY (HINDI + REGIONAL)</li>
                <li className="flex gap-4"><span className="text-reso">04.</span> STRICTLY TEEN-CENTRIC DESIGN</li>
                <li className="flex gap-4"><span className="text-reso">05.</span> AI FOR OFFENSIVE GOOD</li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 border border-white/20 bg-black/80 backdrop-blur-md">
              <h2 className="text-3xl font-display text-white mb-6 uppercase">The Timeline</h2>
              <div className="space-y-6 font-mono text-sm text-text-secondary border-l border-white/10 pl-6 relative">
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 bg-white/20 rounded-full" />
                  <p className="text-white">Q1 2026 - Idea Validation</p>
                  <p>Noticed the crisis. Drafted the architecture.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 bg-reso rounded-full shadow-[0_0_10px_#00F0FF]" />
                  <p className="text-white">Q2 2026 - Current Prototype</p>
                  <p>Bharat Innovation Challenge Stage-1 Submission.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 bg-shock/50 rounded-full" />
                  <p className="text-white">Q4 2026 - Closed Beta</p>
                  <p>Deployment to 10 partner schools.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
