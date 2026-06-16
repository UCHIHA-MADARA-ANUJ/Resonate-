

import { motion } from "framer-motion";
import { GlobeCanvas } from "@/presentation/canvas/impact/GlobeCanvas";
import { TextReveal } from "@/presentation/components/TextReveal";

export default function ImpactPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <GlobeCanvas />
      
      {/* Heavy vignette to focus the globe */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)] z-0 pointer-events-none mix-blend-multiply opacity-90" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <h1 className="text-6xl md:text-[10rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-32 text-center drop-shadow-[0_0_50px_rgba(0,240,255,0.2)]">
          <TextReveal text="THE IMPACT." />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-40">
          {[
            { metric: "10K+", label: "Initial Beta Nodes" },
            { metric: "85%", label: "Anxiety Reduction" },
            { metric: "4.8", label: "Empathy Score" },
            { metric: "1.2M", label: "2027 Projections" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-12 bg-black/80 backdrop-blur-xl hover:bg-[#050505] transition-colors text-center relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-reso opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">{stat.metric}</div>
              <div className="text-xs font-mono text-text-secondary tracking-[0.2em] uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-12 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-reso tracking-[0.3em] uppercase mb-4">Encrypted Transmissions</h2>
            <div className="w-px h-16 bg-white/20 mx-auto" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            className="p-12 border border-white/10 bg-black/50 backdrop-blur-md relative crosshair-tl crosshair-tr crosshair-bl crosshair-br"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-shock" />
            <p className="font-mono text-xl text-text-secondary leading-relaxed mb-8">
              "I used to doomscroll for 4 hours a night before my JEE prep to numb the panic. The ResoQuests broke the algorithmic loop. It didn't just tell me to 'study harder'; it gave me a 2-minute physiological grounding protocol that actually reset my nervous system."
            </p>
            <div className="text-xs text-white/40 tracking-widest uppercase font-mono">
              [ NODE 84A // MUMBAI // DECRYPTED LOG ]
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            className="p-12 border border-white/10 bg-black/50 backdrop-blur-md relative crosshair-tl crosshair-tr crosshair-bl crosshair-br ml-auto"
          >
            <div className="absolute top-0 right-0 w-1 h-full bg-reso" />
            <p className="font-mono text-xl text-text-secondary leading-relaxed mb-8 text-right">
              "Echo Studio showed me how violently critical my internal monologue was. Seeing the cognitive distortions highlighted in stark red on my own transcript changed everything. I stopped fighting myself."
            </p>
            <div className="text-xs text-white/40 tracking-widest uppercase font-mono text-right">
              [ NODE 12C // BANGALORE // DECRYPTED LOG ]
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
