

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MeshTopologyCanvas } from "@/presentation/canvas/MeshTopologyCanvas";
import { MagneticElement } from "@/presentation/components/MagneticElement";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EnginePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.engine-panel').forEach((el: any, i) => {
        gsap.fromTo(el, 
          { y: 100, opacity: 0, scale: 0.95 },
          { 
            y: 0, opacity: 1, scale: 1, 
            duration: 1.2, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-void min-h-screen pt-40 pb-40 relative overflow-hidden">
      {/* 3D Mesh Topology Background */}
      <MeshTopologyCanvas />

      {/* Grid overlay */}
      <div className="bg-grid-full absolute inset-0 z-0 opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B001A_100%)] z-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-2 h-2 bg-reso animate-ping" />
            <span className="text-reso text-sm tracking-[0.3em] uppercase font-bold">Protocol Architecture</span>
          </motion.div>
          <h1 className="text-7xl md:text-[12rem] font-display font-bold uppercase tracking-tighter text-outline-reso leading-[0.8] mb-8 drop-shadow-[0_0_50px_rgba(0,240,255,0.2)]">
            THE ENGINE.
          </h1>
          <p className="text-2xl text-text-secondary font-mono max-w-2xl border-l-2 border-reso pl-6">
            We don't rely on centralized cloud APIs to process emotional states. We run Tensor Operations and Lexical Analysis directly on the local GPU. Zero latency. Absolute cryptographic privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div className="engine-panel bg-black/80 backdrop-blur-xl border border-white/20 p-12 md:p-16 relative crosshair-tl crosshair-tr crosshair-bl crosshair-br group hover:border-reso transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-reso/10 rounded-full blur-[50px] group-hover:bg-reso/20 transition-colors duration-500" />
            <div className="text-xs font-mono text-reso mb-8 tracking-[0.3em] uppercase border border-reso/30 w-max px-3 py-1 bg-reso/5">Module 01 // WGSL</div>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter mb-6">WebGPU Whisper Node</h3>
            <p className="text-text-secondary font-mono leading-relaxed mb-8 text-lg">
              Voice-first journaling is processed locally using a heavily quantized Whisper model. It executes sentiment analysis to detect cognitive distortions in real-time, completely bypassing the CPU thread.
            </p>
            <div className="h-1 w-full bg-white/10 relative overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "200%"] }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-reso shadow-[0_0_15px_#00F0FF]"
              />
            </div>
          </div>

          <div className="engine-panel bg-black/80 backdrop-blur-xl border border-white/20 p-12 md:p-16 relative crosshair-tl crosshair-tr crosshair-bl crosshair-br group hover:border-shock transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-shock/10 rounded-full blur-[50px] group-hover:bg-shock/20 transition-colors duration-500" />
            <div className="text-xs font-mono text-shock mb-8 tracking-[0.3em] uppercase border border-shock/30 w-max px-3 py-1 bg-shock/5">Module 02 // CRDT</div>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter mb-6">Local-First CRDT Sync</h3>
            <p className="text-text-secondary font-mono leading-relaxed mb-8 text-lg">
              Teens go offline. The system doesn't stop. Using Vector Clocks and LWW-Element-Sets, the engine stores logs offline and mathematically resolves synchronization conflicts the exact millisecond a network is detected.
            </p>
            <div className="flex gap-2">
              {[1,2,3,4,5,6].map(i => (
                <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ delay: i*0.15, duration: 1.5, repeat: Infinity }} className="w-full h-1 bg-shock" />
              ))}
            </div>
          </div>

          <div className="engine-panel bg-black/80 backdrop-blur-xl border border-white/20 p-12 md:p-16 relative crosshair-tl crosshair-tr crosshair-bl crosshair-br group md:col-span-2 hover:border-white transition-colors duration-500">
            <div className="text-xs font-mono text-white/50 mb-8 tracking-[0.3em] uppercase border border-white/20 w-max px-3 py-1">Module 03 // WebRTC</div>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter mb-6">P2P Resonance Mesh</h3>
            <p className="text-text-secondary font-mono leading-relaxed max-w-4xl text-lg mb-12">
              Anonymous, encrypted peer networks. Small clusters of 4-5 students are mathematically matched via AI based on shared emotional struggles. No central chat servers are used. Connections are strictly decentralized P2P WebRTC DataChannels. The AI moderator scans for toxicity locally and triggers SOS escalation with 99.9% accuracy.
            </p>
            <MagneticElement strength={0.2} className="w-max">
              <Link href="/terminal" className="flex items-center gap-4 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-reso transition-colors duration-300">
                <span>View Source Code</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </MagneticElement>
          </div>

        </div>
      </div>
    </div>
  );
}
