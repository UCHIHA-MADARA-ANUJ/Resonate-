"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NeuralNetworkCanvas } from "@/presentation/canvas/NeuralNetworkCanvas";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { MagneticElement } from "@/presentation/components/MagneticElement";

gsap.registerPlugin(ScrollTrigger);

function useMemoryTicker() {
  const [mem, setMem] = useState("0.00");
  useEffect(() => {
    let frame: number;
    const tick = () => {
      setMem((Math.random() * 2 + 12).toFixed(2));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return mem;
}

export default function Home() {
  const manifestoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const memTicker = useMemoryTicker();

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 150, opacity: 0, rotateX: -90, skewY: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          skewY: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      <div className="bg-noise" />
      <div className="scanline" />

      {/* Extreme Navigation */}

      {/* GOD-TIER HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <NeuralNetworkCanvas />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none mix-blend-multiply opacity-80" />

        <div className="absolute inset-6 border border-white/10 pointer-events-none z-10 flex flex-col justify-between p-6">
          <div className="flex justify-between items-start font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">
            <div className="flex flex-col gap-2">
              <span className="text-reso animate-pulse">SYS.OPERATIONAL</span>
              <span>LAT: 28.6139° N</span>
              <span>LON: 77.2090° E</span>
            </div>
            <div className="flex flex-col gap-2 text-right">
              <span>MEM_ALLOC: {memTicker} GB</span>
              <span>NODE: ALPHA_PRIME</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase">
            <span>SCROLL TO INITIATE SEQUENCE</span>
            <div className="flex flex-col items-end gap-2">
              <span>ALGORITHMIC EMPATHY V2.0</span>
              <div className="w-16 h-px bg-white/20" />
            </div>
          </div>
        </div>

        <div className="absolute top-1/3 left-1/3 w-4 h-4 border-l border-t border-reso/40 pointer-events-none z-10" />
        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 border-r border-b border-reso/40 pointer-events-none z-10" />

        <div className="relative z-20 text-center px-6 w-full flex flex-col items-center mix-blend-screen pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-[12rem] lg:text-[18rem] font-display font-bold tracking-tighter leading-[0.75] uppercase text-white relative">
              <span className="block text-outline-reso">WE KILL</span>
              <span className="block" style={{ textShadow: "0 0 100px rgba(0, 240, 255, 0.5)" }}>THE NOISE.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Preview */}
      <section ref={manifestoRef} className="py-40 bg-void relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-[90rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 ref={textRef} className="text-7xl md:text-[9rem] font-display font-bold tracking-tighter uppercase leading-[0.8] text-white perspective-[1000px]">
                <div style={{ transformStyle: "preserve-3d" }}>THE OLD</div>
                <div style={{ transformStyle: "preserve-3d" }}>WEB IS</div>
                <div style={{ transformStyle: "preserve-3d" }} className="text-shock drop-shadow-[0_0_30px_rgba(255,0,85,0.5)]">DEAD.</div>
              </h2>
            </div>
            <div className="flex flex-col justify-center border-l border-white/10 pl-12">
              <p className="text-3xl text-text-primary font-mono leading-relaxed mb-10">
                Instagram breeds vanity. TikTok destroys attention spans. The legacy systems were built to farm dopamine. 
              </p>
              <p className="text-xl text-text-secondary font-mono leading-relaxed mb-16 max-w-2xl">
                RESONATE is the antithesis. A zero-lag, algorithmic sanctuary designed solely to intercept emotional decline and forge absolute peer connections.
              </p>
              <MagneticElement className="w-max">
                <Link href="/manifesto" className="block border border-reso text-reso px-10 py-5 font-mono text-sm tracking-[0.2em] uppercase hover:bg-reso hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.15)] hover:shadow-[0_0_60px_rgba(0,240,255,0.8)] relative group overflow-hidden">
                  <span className="relative z-10">Read the Manifesto</span>
                  <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)" />
                </Link>
              </MagneticElement>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Engine Teaser */}
      <section className="py-40 bg-black relative border-t border-white/10">
        <div className="container mx-auto px-6 max-w-[90rem]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            
            <div className="bg-[#05000A] p-20 hover:bg-[#0A0014] transition-colors relative group overflow-hidden">
              <div className="absolute inset-0 bg-reso/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-shock to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="text-7xl font-display font-bold text-white mb-6 tracking-tighter">42%</div>
              <div className="text-shock font-mono text-sm tracking-[0.2em] uppercase mb-6">CRITICAL THREAT</div>
              <p className="text-text-secondary text-lg">Of Indian teens report persistent anxiety due to academic and digital pressure.</p>
            </div>

            <div className="bg-[#05000A] p-20 hover:bg-[#0A0014] transition-colors relative group overflow-hidden">
              <div className="absolute inset-0 bg-reso/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-reso to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-100" />
              <div className="text-7xl font-display font-bold text-white mb-6 tracking-tighter">0 MS</div>
              <div className="text-reso font-mono text-sm tracking-[0.2em] uppercase mb-6">SYSTEM LATENCY</div>
              <p className="text-text-secondary text-lg">Real-time Whisper AI transcription and cognitive reframing via Echo Studio.</p>
            </div>

            <div className="bg-[#05000A] p-20 hover:bg-[#0A0014] transition-colors relative group overflow-hidden">
              <div className="absolute inset-0 bg-reso/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-reso to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-200" />
              <div className="text-7xl font-display font-bold text-white mb-6 tracking-tighter">85%</div>
              <div className="text-reso font-mono text-sm tracking-[0.2em] uppercase mb-6">RECOVERY RATE</div>
              <p className="text-text-secondary text-lg">Improvement in cohort mood regulation after engaging Resonance Circles.</p>
            </div>

          </div>

          <div className="mt-32 text-center flex justify-center">
            <MagneticElement>
              <Link href="/engine" className="inline-block border-b border-reso text-reso pb-2 font-mono text-sm tracking-[0.3em] uppercase hover:text-white hover:border-white transition-colors duration-300 p-4">
                Explore The Architecture
              </Link>
            </MagneticElement>
          </div>
        </div>
      </section>

      {/* Extreme CTA */}
      <section className="py-60 bg-void relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center">
          <h2 className="text-8xl md:text-[16rem] font-display font-bold tracking-tighter uppercase leading-[0.75] mb-20 text-outline-reso hover:text-white transition-colors duration-700 cursor-default">
            DEPLOY.
          </h2>
          <MagneticElement strength={0.6}>
            <Link href="/terminal" className="group inline-flex items-center gap-8 bg-reso text-black font-display font-bold text-4xl px-16 py-8 uppercase tracking-tighter hover:bg-white transition-all duration-500 shadow-[0_0_80px_rgba(0,240,255,0.5)] hover:shadow-[0_0_120px_rgba(255,255,255,1)] hover:scale-105">
              Initialize Access
              <ArrowUpRight className="w-10 h-10 group-hover:rotate-45 transition-transform duration-500" />
            </Link>
          </MagneticElement>
        </div>
      </section>
    </div>
  );
}
