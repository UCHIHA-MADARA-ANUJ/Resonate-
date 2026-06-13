"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";

export default function EchoStudioPage() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState<{ distortion?: string, reframe?: string } | null>(null);

  const simulateTranscription = () => {
    if (recording) return;
    try { AcousticResonator.getInstance().playDeepThud(); } catch(e){}
    setRecording(true);
    setTranscript("");
    setAnalysis(null);

    const fullText = "I feel like I'm going to fail this exam and my entire life is completely ruined.";
    let i = 0;
    
    // Typewriter effect to simulate whisper stream
    const typeInterval = setInterval(() => {
      setTranscript(prev => prev + fullText.charAt(i));
      i++;
      if (i >= fullText.length) {
        clearInterval(typeInterval);
        setRecording(false);
        try { AcousticResonator.getInstance().playDataTick(); } catch(e){}
        setTimeout(() => {
          setAnalysis({
            distortion: "Catastrophizing / Fortune Telling",
            reframe: "I am stressed about this exam, but one test does not determine my entire future. I will focus on studying the next chapter."
          });
        }, 800);
      }
    }, 50);
  };

  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h1 className="text-6xl md:text-[10rem] font-display font-bold uppercase tracking-tighter text-outline-reso leading-[0.85] mb-20">
          ECHO <br/> STUDIO.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="p-12 border border-white/10 bg-[#050505] crosshair-tl crosshair-tr crosshair-bl crosshair-br"
          >
            <span className="text-shock font-mono text-sm tracking-widest uppercase mb-8 block border border-shock/30 px-3 py-1 w-max bg-shock/5">Cryptographic Voice Journal</span>
            <p className="text-2xl text-white font-mono leading-relaxed mb-8">
              Sometimes typing is too slow for racing thoughts. The Echo Studio is a secure acoustic chamber.
            </p>
            <p className="text-text-secondary font-mono leading-relaxed">
              Speak your mind. The local Whisper AI protocol transcribes your audio instantaneously on-device. No audio files are ever transmitted to the cloud. Your voice remains yours. The AI analyzes your lexical choices to identify cognitive distortions and suggests healthier reframes.
            </p>
            
            <button 
              onClick={simulateTranscription}
              disabled={recording}
              className={`mt-12 px-8 py-4 font-mono font-bold uppercase tracking-widest w-full transition-colors border ${recording ? 'border-shock text-shock bg-shock/10' : 'border-white text-white hover:bg-white hover:text-black'}`}
            >
              {recording ? "RECORDING..." : "INITIALIZE MICROPHONE"}
            </button>
          </motion.div>

          <div className="flex flex-col justify-center border-l border-white/10 pl-12 font-mono">
            <div className="space-y-8">
              <div className="p-6 border border-white/20 bg-white/5 min-h-[120px]">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-4">RAW TRANSCRIPT</p>
                <p className="text-white italic text-lg">{transcript || "Awaiting input stream..."}</p>
                {recording && <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1" />}
              </div>
              
              {analysis && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="p-6 border border-shock/30 bg-shock/5 mb-8">
                    <p className="text-shock text-xs uppercase tracking-widest mb-2">DISTORTION DETECTED</p>
                    <p className="text-white text-lg font-bold">{analysis.distortion}</p>
                  </div>
                  <div className="p-6 border border-reso/50 bg-reso/10">
                    <p className="text-reso text-xs uppercase tracking-widest mb-2">SUGGESTED REFRAME</p>
                    <p className="text-white text-lg leading-relaxed">{analysis.reframe}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
