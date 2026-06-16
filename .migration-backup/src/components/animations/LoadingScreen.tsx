"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";

const TERMINAL_LINES = [
  { text: "> Scanning global network...", delay: 500, color: "text-text-secondary" },
  { text: "> TARGET DETECTED: Instagram.exe", delay: 1500, color: "text-white" },
  { text: "> STATUS: Vapid metric loop detected. ENFORCING TERMINATION.", delay: 2500, color: "text-shock" },
  { text: "> TARGET DETECTED: Snapchat.exe", delay: 3500, color: "text-white" },
  { text: "> STATUS: Attention span degradation detected. BYPASSING.", delay: 4500, color: "text-shock" },
  { text: "> TARGET DETECTED: TikTok.exe", delay: 5500, color: "text-white" },
  { text: "> STATUS: Dopamine receptor hijack found. PURGING.", delay: 6500, color: "text-shock" },
  { text: "> ALL THREATS NEUTRALIZED.", delay: 8000, color: "text-reso font-bold" },
  { text: "> Booting RESONATE Protocol...", delay: 9000, color: "text-white" },
  { text: "> True Connection: ESTABLISHED.", delay: 10000, color: "text-reso font-bold" },
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<{text: string, color: string}[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    TERMINAL_LINES.forEach((line) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, { text: line.text, color: line.color }]);
      }, line.delay);
      timeouts.push(timeout);
    });

    const finalTimeout = setTimeout(() => {
      // Glitch out sequence
      if (containerRef.current) {
        anime({
          targets: containerRef.current,
          opacity: [1, 0, 1, 0, 1, 0],
          scale: [1, 1.1, 0.9, 1.05, 1, 1.5],
          filter: ["blur(0px)", "blur(10px)", "blur(0px)", "blur(20px)"],
          duration: 800,
          easing: "easeInOutQuad",
          complete: () => {
            setIsComplete(true);
            setTimeout(onComplete, 100);
          }
        });
      }
    }, 11500);
    timeouts.push(finalTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[99999] bg-black flex flex-col justify-between p-8 md:p-16 overflow-hidden"
          exit={{ opacity: 0 }}
        >
          {/* Main Typography */}
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-6xl md:text-[10rem] font-display font-bold uppercase tracking-tighter text-white/5 opacity-50 select-none">
              Resonate
            </h1>
          </div>

          {/* Hacker Terminal */}
          <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 w-full max-w-lg glass-terminal p-6 font-mono text-sm md:text-base">
            <div className="flex gap-2 mb-4 border-b border-reso/20 pb-2">
              <div className="w-3 h-3 rounded-full bg-shock/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-reso/50" />
            </div>
            <div className="space-y-2">
              {lines.map((line, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={line.color}
                >
                  {line.text}
                </motion.div>
              ))}
              <motion.div 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-5 bg-reso inline-block ml-2 align-middle"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
