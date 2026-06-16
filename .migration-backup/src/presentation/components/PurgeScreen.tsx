"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";

const HACKER_LOGS = [
  { msg: "sys_init: CONNECTING TO GLOBAL INFRASTRUCTURE...", delay: 500, type: "info" },
  { msg: "sys_init: BYPASSING LEGACY FIREWALLS...", delay: 1500, type: "info" },
  { msg: "TARGET ACQUIRED: Instagram.exe", delay: 3000, type: "warn" },
  { msg: ">> ANALYZING VAPID METRIC LOOPS...", delay: 4000, type: "info" },
  { msg: ">> FATAL: DOPAMINE HIJACK DETECTED. ENFORCING TERMINATION.", delay: 5500, type: "error" },
  { msg: "TARGET ACQUIRED: TikTok.exe", delay: 7000, type: "warn" },
  { msg: ">> ANALYZING ATTENTION SPAN DEGRADATION...", delay: 8000, type: "info" },
  { msg: ">> FATAL: ALGORITHMIC PARASITE DETECTED. PURGING NETWORK.", delay: 9500, type: "error" },
  { msg: "TARGET ACQUIRED: Snapchat.exe", delay: 11000, type: "warn" },
  { msg: ">> FATAL: SUPERFICIAL ENGAGEMENT LOOP. BURN IT DOWN.", delay: 12500, type: "error" },
  { msg: "ALL LEGACY THREATS NEUTRALIZED.", delay: 14500, type: "success" },
  { msg: "DEPLOYING RESONATE_PROTOCOL_V2.0...", delay: 16000, type: "info" },
  { msg: "TRUE CONNECTION: ESTABLISHED.", delay: 18000, type: "success" }
];

export function PurgeScreen({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<{msg: string, type: string}[]>([]);
  const [userInteracted, setUserInteracted] = useState(false);
  
  const startSequence = async () => {
    setUserInteracted(true);
    const audio = AcousticResonator.getInstance();
    await audio.initialize();

    HACKER_LOGS.forEach((log) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { msg: log.msg, type: log.type }]);
        if (log.type === 'error') {
          audio.playDeepThud();
        } else {
          audio.playDataTick();
        }
      }, log.delay);
    });

    setTimeout(() => {
      audio.playCinematicRiser();
      onComplete();
    }, 20000); // 20s cinematic loader
  };

  return (
    <motion.div className="fixed inset-0 z-[99999] bg-black flex flex-col justify-between p-8 md:p-16 overflow-hidden" exit={{ opacity: 0, filter: "blur(20px)" }}>
      {!userInteracted ? (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-50" onClick={startSequence}>
          <div className="text-center animate-pulse">
            <h2 className="text-3xl font-display text-white tracking-tighter uppercase border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors duration-500">
              CLICK TO INITIALIZE SEQUENCE
            </h2>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center z-10 w-full h-full">
          {/* We would embed the CinematicLoaderCanvas here, omitted for brevity in this edit chunk to save tokens */}
          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-bold uppercase tracking-[0.05em] text-center text-white w-full px-6 max-w-7xl leading-none mix-blend-screen" style={{ textShadow: "0 0 50px rgba(255,255,255,0.4)" }}>
            WE ARE DROWNING IN NOISE.
          </h2>
          <div className="absolute bottom-8 right-8 w-full max-w-xl p-6 font-mono text-sm z-20">
            <div className="space-y-2 max-h-[40vh] overflow-hidden flex flex-col justify-end">
              {logs.map((log, i) => (
                <div key={i} className={`
                  ${log.type === 'error' ? 'text-shock font-bold' : ''}
                  ${log.type === 'warn' ? 'text-yellow-500' : ''}
                  ${log.type === 'info' ? 'text-text-secondary' : ''}
                  ${log.type === 'success' ? 'text-reso font-bold' : ''}
                `}>{log.msg}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
