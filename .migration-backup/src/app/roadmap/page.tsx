"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RoadmapCanvas } from "@/presentation/canvas/roadmap/RoadmapCanvas";
import { TextReveal } from "@/presentation/components/TextReveal";

const ROADMAP = [
  {
    phase: "PHASE 01 // FOUNDATION",
    date: "Q1-Q2 2026",
    title: "The Emotional Core",
    status: "completed",
    items: ["AI Empathy Coach Core Training", "Basic Echo Studio", "Bharat Innovation Stage 1"]
  },
  {
    phase: "PHASE 02 // BETA",
    date: "Q3-Q4 2026",
    title: "The Inner Circle",
    status: "active",
    items: ["Resonance Circles Beta", "Mood Genome Dashboard", "1,000 Student Test Group"]
  },
  {
    phase: "PHASE 03 // PILOT",
    date: "Q1 2027",
    title: "Deployment",
    status: "upcoming",
    items: ["Counselor Dashboard Launch", "10 Partner Schools Integration", "SOS Intervention Protocols"]
  },
  {
    phase: "PHASE 04 // SCALE",
    date: "Q3 2027",
    title: "A Kinder Digital India",
    status: "upcoming",
    items: ["Regional Language Expansion", "Heritage Echoes Feature", "Open API for Student Developers"]
  }
];

export default function RoadmapPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We track scroll across a huge vertical space (400vh) to drive the 3D camera
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="bg-black relative" ref={containerRef}>
      
      {/* 3D Camera Flight background synced to scroll */}
      <RoadmapCanvas scrollProgress={scrollYProgress} />

      {/* The massive scroll container */}
      <div className="h-[400vh] relative z-10">
        
        {/* Intro Header pinned at top */}
        <div className="h-screen flex flex-col items-center justify-center pointer-events-none px-6 text-center">
          <h1 className="text-7xl md:text-[12rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-8 text-outline-reso">
            <TextReveal text="THE" /> <br/>
            <TextReveal text="JOURNEY." delay={0.1} />
          </h1>
          <p className="font-mono text-xl text-text-secondary tracking-[0.2em] uppercase animate-pulse">
            Scroll to Navigate Timeline
          </p>
        </div>

        {/* Milestones spaced out vertically */}
        <div className="relative w-full max-w-7xl mx-auto px-6">
          {ROADMAP.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={i} 
                className={`min-h-[80vh] flex flex-col justify-center w-full ${isEven ? 'items-start' : 'items-end'}`}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full md:w-[45%] p-10 md:p-16 border border-white/20 bg-black/50 backdrop-blur-xl group hover:border-reso transition-colors duration-500 relative crosshair-tl crosshair-tr crosshair-bl crosshair-br shadow-[0_0_50px_rgba(0,0,0,0.8)]`}
                >
                  <div className={`absolute top-0 w-2 h-full ${step.status === 'completed' ? 'bg-white/30' : step.status === 'active' ? 'bg-reso shadow-[0_0_20px_#00F0FF]' : 'bg-shock/50'} ${isEven ? 'left-0' : 'right-0'}`} />
                  
                  <span className={`text-xs font-mono tracking-widest uppercase mb-6 block w-max px-3 py-1 ${step.status === 'active' ? 'text-reso border border-reso/50 bg-reso/10' : 'text-white/50 border border-white/10'}`}>
                    {step.phase} // {step.date}
                  </span>
                  
                  <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 uppercase tracking-tighter">{step.title}</h3>
                  
                  <ul className="space-y-4 font-mono text-sm md:text-base text-text-secondary">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-4">
                        <span className="text-reso mt-1 font-bold">»</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
