"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";
import { CinematicLoaderCanvas } from "@/presentation/canvas/CinematicLoaderCanvas";

const HACKER_LOGS = [
  { msg: "sys_init: ESTABLISHING QUANTUM LINK...", delay: 2000, type: "info" },
  { msg: "sys_init: BYPASSING LEGACY ALGORITHMS...", delay: 4500, type: "info" },
  { msg: "TARGET ACQUIRED: Instagram.exe", delay: 7000, type: "warn" },
  { msg: ">> ANALYZING VAPID METRIC LOOPS...", delay: 8500, type: "info" },
  { msg: ">> FATAL: DOPAMINE HIJACK DETECTED. ENFORCING TERMINATION.", delay: 10000, type: "error" },
  { msg: "TARGET ACQUIRED: TikTok.exe", delay: 12000, type: "warn" },
  { msg: ">> ANALYZING ATTENTION SPAN DEGRADATION...", delay: 13500, type: "info" },
  { msg: ">> FATAL: ALGORITHMIC PARASITE DETECTED. PURGING NETWORK.", delay: 15000, type: "error" },
  { msg: "TARGET ACQUIRED: Snapchat.exe", delay: 17000, type: "warn" },
  { msg: ">> FATAL: SUPERFICIAL ENGAGEMENT LOOP. BURN IT DOWN.", delay: 19000, type: "error" },
  { msg: "ALL LEGACY THREATS NEUTRALIZED.", delay: 21500, type: "success" },
  { msg: "DECRYPTING EMPATHY_CORE_V3.0...", delay: 23500, type: "info" },
  { msg: "TRUE CONNECTION: ESTABLISHED.", delay: 26000, type: "success" }
];

const TEXT_SEQUENCE = [
  { text: "WE ARE DROWNING IN NOISE.", start: 2, end: 7 },
  { text: "FED TO ALGORITHMS THAT STRIP OUR HUMANITY.", start: 8, end: 14 },
  { text: "BUT WE REFUSE TO BE CONSUMED.", start: 15, end: 21 },
  { text: "DECRYPTING THE FUTURE.", start: 22, end: 26 }
];

export function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<{msg: string, type: string}[]>([]);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startSequence = async () => {
    setUserInteracted(true);
    const audio = AcousticResonator.getInstance();
    await audio.initialize();

    const timeouts: NodeJS.Timeout[] = [];

    // Hacker Logs Sequence
    HACKER_LOGS.forEach((log) => {
      const t = setTimeout(() => {
        setLogs(prev => [...prev, { msg: log.msg, type: log.type }]);
        if (log.type === 'error') {
          audio.playDeepThud();
        } else {
          audio.playSoftHover();
        }
      }, log.delay);
      timeouts.push(t);
    });

    // Final Screen Shatter / Transition (At ~29 seconds)
    const finishT = setTimeout(() => {
      if (containerRef.current) {
        audio.playCinematicRiser();
        anime({
          targets: containerRef.current,
          opacity: [1, 0],
          scale: [1, 1.3],
          filter: ["blur(0px)", "blur(30px)"],
          duration: 1500,
          easing: "easeInExpo",
          complete: () => {
            onComplete();
          }
        });
      }
    }, 28500);
    timeouts.push(finishT);

    return () => timeouts.forEach(clearTimeout);
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-black flex flex-col justify-between p-8 md:p-16 overflow-hidden"
      exit={{ opacity: 0 }}
    >
      {!userInteracted ? (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-50" onClick={startSequence}>
          <div className="text-center animate-pulse">
            <p className="text-shock font-mono text-sm tracking-widest uppercase mb-4">Acoustic Engine Required</p>
            <h2 className="text-3xl font-display text-white tracking-tighter uppercase border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors duration-500">
              Click to Initialize Sequence
            </h2>
          </div>
        </div>
      ) : (
        <>
          <CinematicLoaderCanvas />

          <div className="flex-1 flex items-center justify-center relative z-10 w-full h-full">
            <AnimatePresence>
              {TEXT_SEQUENCE.map((seq, i) => (
                <motion.h2
                  key={i}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                  animate={{ 
                    opacity: [0, 1, 1, 0], 
                    scale: [0.95, 1, 1.05, 1.1], 
                    filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"] 
                  }}
                  transition={{ 
                    duration: seq.end - seq.start, 
                    delay: seq.start, 
                    times: [0, 0.3, 0.7, 1], 
                    ease: "easeInOut" 
                  }}
                  className="absolute text-5xl md:text-7xl lg:text-[7rem] font-display font-bold uppercase tracking-[0.05em] text-center text-white w-full px-6 max-w-7xl leading-none mix-blend-screen"
                  style={{ textShadow: "0 0 50px rgba(255,255,255,0.4)" }}
                >
                  {seq.text}
                </motion.h2>
              ))}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-8 right-8 w-full max-w-xl glass-terminal p-6 font-mono text-sm z-20">
            <div className="flex gap-2 mb-4 border-b border-reso/20 pb-2">
              <div className="w-3 h-3 rounded-full bg-shock/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-reso/50" />
            </div>
            <div className="space-y-2 max-h-[40vh] overflow-hidden flex flex-col justify-end">
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`
                    ${log.type === 'error' ? 'text-shock font-bold drop-shadow-[0_0_5px_rgba(255,0,85,0.8)]' : ''}
                    ${log.type === 'warn' ? 'text-yellow-500' : ''}
                    ${log.type === 'info' ? 'text-text-secondary' : ''}
                    ${log.type === 'success' ? 'text-reso font-bold drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]' : ''}
                  `}
                >
                  {log.msg}
                </motion.div>
              ))}
              <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-3 h-5 bg-reso inline-block mt-2" />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
