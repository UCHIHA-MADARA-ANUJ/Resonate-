

import { motion } from "framer-motion";
import { MeshTopologyCanvas } from "@/presentation/canvas/MeshTopologyCanvas";
import { TextReveal } from "@/presentation/components/TextReveal";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

export default function SchoolsPage() {
  return (
    <div className="bg-void min-h-screen pt-40 pb-40 relative overflow-hidden">
      <MeshTopologyCanvas />
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-outline-reso">
          <TextReveal text="FOR" /> <br/>
          <TextReveal text="EDUCATORS." delay={0.1} />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8 font-mono text-lg text-text-secondary leading-relaxed">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              We equip forward-thinking schools with anonymized emotional insights to proactively support student well-being, while maintaining zero-knowledge privacy protocols for individual users.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <strong className="text-white">Macro Trends, Not Micro Surveillance:</strong> You see when the 10th grade is collectively burning out before boards, without ever seeing an individual student's journal.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="p-6 border-l-2 border-shock bg-shock/5 text-sm">
              <span className="text-shock font-bold block mb-2">SOS PROTOCOLS</span>
              If our AI detects severe self-harm intent, it follows a strict escalation protocol, alerting designated school counselors immediately via explicit consent workflows.
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <Link href="/join" className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-reso transition-colors mt-8">
                Request Pilot Access <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="bg-[#050505] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative"
          >
            <div className="h-10 border-b border-white/10 bg-white/[0.02] flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] text-text-secondary tracking-widest uppercase font-mono">Resonate OS / Admin Dashboard</div>
              <div className="w-12 h-4 rounded-full bg-white/5" />
            </div>
            
            <div className="p-8">
              <h4 className="text-2xl font-display font-bold text-white mb-2 uppercase">Cohort Trajectory</h4>
              <p className="text-text-secondary font-mono text-xs tracking-widest mb-8">CLASS 12 - PAST 30 DAYS</p>

              {/* Chart Simulation */}
              <div className="h-48 flex items-end justify-between gap-1 mb-8 border-b border-white/10 pb-4">
                {[60, 65, 55, 40, 30, 25, 45, 70, 80, 75, 65, 85].map((h, i) => (
                  <div key={i} className={`w-full ${h < 35 ? 'bg-shock/80' : 'bg-reso/80'}`} style={{ height: `${h}%` }} />
                ))}
              </div>

              <div className="p-4 bg-shock/10 border border-shock/20">
                <p className="text-xs text-shock mb-1 uppercase tracking-widest font-mono font-bold">Intervention Recommended</p>
                <p className="text-white font-mono text-sm leading-tight">Schedule Group Counseling for Physics Cohort. Stress levels critical.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
