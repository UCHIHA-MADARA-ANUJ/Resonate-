"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/presentation/components/TextReveal";
import { MagneticElement } from "@/presentation/components/MagneticElement";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function TechnologyPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <div className="bg-grid-full absolute inset-0 opacity-20 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <h1 className="text-6xl md:text-[9rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-outline-reso">
          <TextReveal text="SYSTEM" /> <br/>
          <TextReveal text="ARCHITECTURE." delay={0.1} />
        </h1>

        <div className="max-w-4xl mb-32">
          <p className="text-2xl md:text-4xl text-text-secondary font-mono leading-relaxed font-light">
            We don't use boilerplate templates. We don't just wrap OpenAI APIs. We are building a monolithic, edge-deployed ecosystem capable of handling extreme emotional telemetry with absolute zero-knowledge privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/20 border border-white/20">
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-12 md:p-16 bg-[#050505] hover:bg-[#0A0A0A] transition-colors relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/10 transition-colors" />
            <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tighter">I. Edge Computing (Next.js 15)</h3>
            <p className="text-text-secondary font-mono text-lg leading-relaxed">
              Vercel Edge Network deployment ensures sub-50ms latency across the entire Indian subcontinent. Server-side rendering guarantees performance on low-end mobile devices prevalent in rural areas.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-12 md:p-16 bg-[#050505] hover:bg-[#0A0A0A] transition-colors relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-reso/10 rounded-full blur-[50px] group-hover:bg-reso/20 transition-colors" />
            <h3 className="text-3xl font-display font-bold text-reso mb-6 uppercase tracking-tighter">II. Local WebGPU Tensors</h3>
            <p className="text-text-secondary font-mono text-lg leading-relaxed">
              We bypass the CPU. Emotional semantic analysis runs through raw WGSL (WebGPU Shading Language) compute shaders directly on the user's graphics card. Zero server transmission means zero privacy leaks.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-12 md:p-16 bg-[#050505] hover:bg-[#0A0A0A] transition-colors relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-shock/10 rounded-full blur-[50px] group-hover:bg-shock/20 transition-colors" />
            <h3 className="text-3xl font-display font-bold text-shock mb-6 uppercase tracking-tighter">III. P2P WebRTC Mesh</h3>
            <p className="text-text-secondary font-mono text-lg leading-relaxed">
              Resonance Circles operate without central chat servers. The entire network is a decentralized WebRTC DataChannel mesh. We physically cannot read the group chats even if subpoenaed.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-12 md:p-16 bg-[#050505] hover:bg-[#0A0A0A] transition-colors relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/10 transition-colors" />
            <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-tighter">IV. CRDT Vector Clocks</h3>
            <p className="text-text-secondary font-mono text-lg leading-relaxed">
              Offline-first resilience. When network connectivity drops, the system uses Last-Writer-Wins (LWW) Vector Clock algorithms to cache journaling locally and mathematically resolve state merges upon reconnection.
            </p>
          </motion.div>

        </div>

        <div className="mt-32 flex justify-center">
          <MagneticElement strength={0.4}>
            <Link href="/terminal" className="group flex items-center gap-6 border border-reso px-12 py-6 text-reso font-mono tracking-[0.2em] uppercase hover:bg-reso hover:text-black transition-colors shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              <span>Inspect Raw Logs</span>
              <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
            </Link>
          </MagneticElement>
        </div>
      </div>
    </div>
  );
}
