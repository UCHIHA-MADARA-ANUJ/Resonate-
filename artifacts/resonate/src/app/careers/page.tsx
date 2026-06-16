

import { motion } from "framer-motion";
import { TextReveal } from "@/presentation/components/TextReveal";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-outline-reso">
          <TextReveal text="BUILD" /> <br/>
          <TextReveal text="THE SYSTEM." delay={0.1} />
        </h1>

        <p className="font-mono text-xl text-text-secondary mb-16 max-w-2xl">
          We are recruiting elite nodes to help us expand the algorithmic sanctuary. If you build to destroy the old web, you belong here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { role: "Rust / WebAssembly Engineer", type: "SYSTEMS", desc: "Optimize local tensor operations for our client-side models." },
            { role: "Clinical Psychologist (Advisor)", type: "MENTAL HEALTH", desc: "Guide the CBT/DBT frameworks used by the Empathy Engine." },
            { role: "React / WebGL Architect", type: "FRONTEND", desc: "Build cinematic UI/UX. No standard dashboards allowed." },
            { role: "Student Ambassador", type: "COMMUNITY", desc: "Deploy Resonate to your local high school." }
          ].map((job, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-white/20 bg-[#050505] hover:bg-white/5 transition-colors group relative crosshair-tl crosshair-tr crosshair-bl crosshair-br"
            >
              <span className="text-xs font-mono text-reso tracking-widest uppercase mb-4 block border border-reso/30 bg-reso/5 w-max px-2 py-1">{job.type}</span>
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tighter mb-4">{job.role}</h3>
              <p className="text-sm font-mono text-text-secondary mb-8">{job.desc}</p>
              <Link href="/terminal" className="inline-flex items-center gap-2 text-reso font-mono text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                Apply via Terminal <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
