"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";

export function CustomContextMenu() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      try { AcousticResonator.getInstance().playSoftHover(); } catch(e) {}
    };

    const handleClick = () => {
      if (isVisible) setIsVisible(false);
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ top: position.y, left: position.x }}
          className="fixed z-[999999] bg-black/90 backdrop-blur-xl border border-white/20 p-2 min-w-[200px] shadow-[0_0_30px_rgba(0,240,255,0.1)]"
        >
          <div className="text-[10px] text-reso font-mono tracking-widest uppercase border-b border-white/10 pb-2 mb-2 px-2">
            Resonate OS
          </div>
          <div className="flex flex-col gap-1 font-mono text-xs uppercase tracking-widest">
            <button className="text-left px-2 py-2 hover:bg-white hover:text-black transition-colors" onClick={() => window.location.href='/manifesto'}>Read Manifesto</button>
            <button className="text-left px-2 py-2 hover:bg-white hover:text-black transition-colors" onClick={() => window.location.href='/engine'}>View Source</button>
            <button className="text-left px-2 py-2 text-shock hover:bg-shock hover:text-white transition-colors" onClick={() => window.location.href='/terminal'}>Bypass Security</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
