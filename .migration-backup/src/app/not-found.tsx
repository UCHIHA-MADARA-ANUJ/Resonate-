"use client";

import { motion } from "framer-motion";
import { VectorFieldCanvas } from "@/presentation/canvas/vector/VectorFieldCanvas";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <VectorFieldCanvas />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)] pointer-events-none mix-blend-multiply opacity-80" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-shock font-mono text-sm tracking-widest uppercase mb-8 block border border-shock/30 w-max mx-auto px-4 py-2 bg-shock/10">
            ERR 404 // NODE NOT FOUND
          </span>
          <h1 className="text-8xl md:text-[14rem] font-display font-bold uppercase tracking-tighter leading-[0.8] mb-8 text-outline-reso">
            LOST IN <br/> THE NOISE.
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary font-mono mb-12 max-w-2xl mx-auto">
            The neural pathway you are searching for does not exist or has been purged from the system.
          </p>

          <Link href="/" className="inline-flex items-center gap-4 border border-reso text-reso px-8 py-4 font-mono tracking-widest uppercase hover:bg-reso hover:text-black transition-all duration-300">
            <span>Re-establish Connection</span>
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
