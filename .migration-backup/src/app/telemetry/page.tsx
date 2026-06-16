"use client";

import { motion } from "framer-motion";
import { MatrixRain } from "@/presentation/components/MatrixRain";

export default function TelemetryPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <MatrixRain />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 drop-shadow-[0_0_50px_rgba(0,240,255,0.4)]">
          SYS.<br/>METRICS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-sm">
          {[
            { label: "ANONYMIZED_NODES", val: "14,024" },
            { label: "TOTAL_REFRAMES", val: "892,104" },
            { label: "ACTIVE_CIRCLES", val: "3,102" },
            { label: "NETWORK_UPTIME", val: "99.999%" },
            { label: "AI_LATENCY", val: "12ms" },
            { label: "E2E_ENCRYPTION", val: "AES-GCM" },
            { label: "SOS_INTERVENTIONS", val: "41" },
            { label: "THREATS_PURGED", val: "100%" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border border-reso/20 bg-black/50 backdrop-blur-sm hover:bg-reso/10 transition-colors"
            >
              <div className="text-white/50 mb-2">{stat.label}</div>
              <div className="text-2xl text-reso font-bold">{stat.val}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
