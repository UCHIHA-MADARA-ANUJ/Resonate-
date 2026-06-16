

import { motion } from "framer-motion";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export default function FeaturesPage() {
  const handleClick = () => { try { AcousticResonator.getInstance().playDeepThud(); } catch(e){} };

  return (
    <div className="bg-void min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-outline-reso">
          THE <br/> ECOSYSTEM.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {[
            { id: "resoquests", name: "RESOQUESTS", desc: "Active daily challenges to rebuild resilience." },
            { id: "echo-studio", name: "ECHO STUDIO", desc: "Voice-first cognitive reframing via Whisper AI." },
            { id: "mood-genome", name: "MOOD GENOME", desc: "Long-term emotional pattern dashboard." },
            { id: "empathy-coach", name: "EMPATHY COACH", desc: "Real-time CBT/DBT LLM companion." },
            { id: "safe-circles", name: "SAFE CIRCLES", desc: "Encrypted P2P moderated peer groups." },
            { id: "heritage-echoes", name: "HERITAGE ECHOES", desc: "Cross-generational voice transcriptions." }
          ].map((feat, i) => (
            <Link 
              key={feat.id} 
              href={`/features/${feat.id}`}
              onClick={handleClick}
              className="bg-black p-12 hover:bg-[#050505] transition-colors relative group block"
            >
              <div className="absolute inset-0 bg-reso/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-xs font-mono text-white/30 tracking-widest uppercase mb-4 block">MODULE_0{i+1}</div>
              <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-4">{feat.name}</h2>
              <p className="text-text-secondary font-mono text-sm mb-8">{feat.desc}</p>
              <div className="inline-flex items-center gap-2 text-reso font-mono text-xs tracking-widest uppercase group-hover:text-white transition-colors">
                Initialize <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
