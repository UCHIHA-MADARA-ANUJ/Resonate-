

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticElement } from "@/presentation/components/MagneticElement";

gsap.registerPlugin(ScrollTrigger);

export default function FoundersPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.founder-card').forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.9, filter: "grayscale(100%) blur(10px)" },
          {
            opacity: 1, scale: 1, filter: "grayscale(0%) blur(0px)",
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black min-h-screen pt-40 pb-40 relative">
      <div className="bg-grid-full absolute inset-0 opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <h1 className="text-7xl md:text-[10rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-40 text-center">
          SYSTEM <br />
          <span className="text-outline hover:text-white transition-colors duration-500">ARCHITECTS.</span>
        </h1>

        <div className="flex flex-col gap-40">
          
          {/* Founder 01: Anuj Phulera */}
          <div className="founder-card flex flex-col md:flex-row gap-16 items-center">
            <MagneticElement strength={0.1} className="w-full md:w-5/12 aspect-[3/4] relative group">
              <div className="absolute inset-0 bg-void border border-white/20 p-8 flex flex-col justify-between overflow-hidden z-10 transition-transform duration-500 group-hover:-translate-y-4 group-hover:translate-x-4">
                <div className="text-reso font-mono text-xs tracking-widest uppercase border border-reso px-2 py-1 w-max bg-reso/10">ID: 001 // LEADER</div>
                <div className="text-[15rem] font-display font-bold text-white/5 absolute -bottom-20 -right-10 select-none group-hover:text-reso/20 transition-colors duration-500">A</div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,240,255,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Fake drop shadow block */}
              <div className="absolute inset-0 bg-reso/20 border border-reso/40 z-0 translate-y-4 -translate-x-4" />
            </MagneticElement>

            <div className="w-full md:w-7/12 relative">
              <div className="absolute -left-12 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter mb-6">Anuj <br/> Phulera</h2>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-reso" />
                <p className="text-reso font-mono tracking-[0.2em] uppercase text-sm">Vision & Structural Architecture</p>
              </div>
              <p className="text-2xl text-text-secondary font-mono leading-relaxed font-light mb-8">
                The strategist. Anuj saw the decay of modern social platforms and decided to burn it down by building something better. 
              </p>
              <p className="text-xl text-text-secondary font-mono leading-relaxed font-light bg-white/5 p-6 border-l-2 border-reso">
                He engineers the structural integrity, user psychology flows, and the overarching deployment strategy of the RESONATE protocol. Refuses to compromise on vision.
              </p>
            </div>
          </div>

          {/* Founder 02: Aarav Choudhary */}
          <div className="founder-card flex flex-col md:flex-row-reverse gap-16 items-center">
            <MagneticElement strength={0.1} className="w-full md:w-5/12 aspect-[3/4] relative group">
              <div className="absolute inset-0 bg-void border border-white/20 p-8 flex flex-col justify-between overflow-hidden z-10 transition-transform duration-500 group-hover:-translate-y-4 group-hover:-translate-x-4">
                <div className="text-shock font-mono text-xs tracking-widest uppercase border border-shock px-2 py-1 w-max bg-shock/10">ID: 002 // SYSTEMS</div>
                <div className="text-[15rem] font-display font-bold text-white/5 absolute -bottom-20 -left-10 select-none group-hover:text-shock/20 transition-colors duration-500">A</div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,85,0.2),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Fake drop shadow block */}
              <div className="absolute inset-0 bg-shock/20 border border-shock/40 z-0 translate-y-4 translate-x-4" />
            </MagneticElement>

            <div className="w-full md:w-7/12 relative text-left md:text-right">
              <div className="absolute -right-12 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter mb-6">Aarav <br/> Choudhary</h2>
              <div className="flex items-center md:justify-end gap-4 mb-10">
                <p className="text-shock font-mono tracking-[0.2em] uppercase text-sm">AI Engineering & Backend Core</p>
                <div className="w-12 h-px bg-shock" />
              </div>
              <p className="text-2xl text-text-secondary font-mono leading-relaxed font-light mb-8">
                The brain behind the machine. Aarav constructs the zero-latency neural networks and local processing arrays that make the Empathy Engine function.
              </p>
              <p className="text-xl text-text-secondary font-mono leading-relaxed font-light bg-white/5 p-6 border-r-2 border-shock">
                If it requires impossible computation speeds and flawless data encryption, Aarav writes the code. He makes the revolution operational.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
