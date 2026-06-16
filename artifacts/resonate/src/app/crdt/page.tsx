

import { motion } from "framer-motion";
import { VectorFieldCanvas } from "@/presentation/canvas/vector/VectorFieldCanvas";

export default function CRDTPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative overflow-hidden">
      <VectorFieldCanvas />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h1 className="text-5xl md:text-[7rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-outline-reso">
          CRDT <br/> STATE SYNC.
        </h1>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 p-12 bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
            <div className="text-shock font-mono text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-shock animate-pulse" /> OFFLINE MODE
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-4">No Network. No Problem.</h3>
            <p className="text-text-secondary font-mono leading-relaxed">
              When Indian teens lose network connectivity, the protocol doesn't fail. They can continue journaling and completing Reso-Quests completely offline.
            </p>
          </div>

          <div className="w-full md:w-1/2 p-12 bg-reso/5 border border-reso/20 backdrop-blur-md relative overflow-hidden">
            <div className="text-reso font-mono text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-reso animate-pulse" /> MERGE RESOLUTION
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-4">Vector Clocks</h3>
            <p className="text-text-secondary font-mono leading-relaxed">
              Using mathematical Conflict-Free Replicated Data Types (CRDTs), the exact millisecond a connection is re-established, the local state merges flawlessly with the global state without data loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
