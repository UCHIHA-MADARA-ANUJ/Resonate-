"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";

// Simulated File System
const fileSystem: Record<string, string | Record<string, any>> = {
  "home": {
    "manifesto.txt": "The old web is dead. We are building the algorithmic sanctuary.",
    "architecture": {
      "crypto.md": "AES-GCM 256-bit E2E Encryption. No central logging.",
      "mesh.md": "WebRTC P2P DataChannels. Decentralized Resonance Circles.",
      "crdt.md": "LWW-Element-Set Vector Clocks for offline-first state resolution."
    },
    "targets.log": "Instagram.exe [TERMINATED]\nTikTok.exe [PURGED]\nSnapchat.exe [NEUTRALIZED]",
    "init_protocol.sh": "executable"
  }
};

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "RESONATE OS v2.0.4 - Awaiting secure handshake.",
    "Type 'help' for available commands."
  ]);
  const [cwd, setCwd] = useState<string[]>(["home"]);
  const inputRef = useRef<HTMLInputElement>(null);

  const getDir = (path: string[]) => {
    let curr: any = fileSystem;
    for (const p of path) { curr = curr[p]; }
    return curr;
  };

  const playKeystroke = () => {
    try { AcousticResonator.getInstance().playDeepThud(); } catch(e) {}
  };

  const executeCommand = (cmdStr: string) => {
    const args = cmdStr.trim().split(" ");
    const cmd = args[0].toLowerCase();
    
    if (cmd === "") return;

    let output = "";

    switch (cmd) {
      case "help":
        output = "Commands: ls, cd, cat, clear, connect, whoami";
        break;
      case "clear":
        setLogs([]);
        return;
      case "whoami":
        output = "Architect Level 4.";
        break;
      case "ls":
        const dir = getDir(cwd);
        output = Object.keys(dir).join("  ");
        break;
      case "cd":
        if (!args[1] || args[1] === "~") {
          setCwd(["home"]);
        } else if (args[1] === "..") {
          if (cwd.length > 1) setCwd(cwd.slice(0, -1));
        } else {
          const currentDir = getDir(cwd);
          if (currentDir[args[1]] && typeof currentDir[args[1]] === 'object') {
            setCwd([...cwd, args[1]]);
          } else {
            output = `cd: ${args[1]}: No such directory`;
          }
        }
        break;
      case "cat":
        if (!args[1]) {
          output = "cat: missing file operand";
        } else {
          const currentDir = getDir(cwd);
          if (currentDir[args[1]] && typeof currentDir[args[1]] === 'string') {
            if (currentDir[args[1]] === 'executable') {
              output = "Initiating protocol... Waitlist sequence triggered.\n> ENTER COMM-LINK (EMAIL):";
            } else {
              output = currentDir[args[1]];
            }
          } else {
            output = `cat: ${args[1]}: No such file`;
          }
        }
        break;
      case "connect":
        output = "Connecting to P2P Mesh... ERROR: Encryption keys missing. Run init_protocol.sh";
        break;
      default:
        // Handle email entry for waitlist
        if (logs[logs.length - 1]?.includes("ENTER COMM-LINK")) {
          if (cmdStr.includes("@")) {
            output = "COMM-LINK VERIFIED. Access granted. You are in the queue.";
          } else {
            output = "ERR: Invalid Comm-Link. Try again.";
          }
        } else {
          output = `Command not found: ${cmd}`;
        }
    }

    if (output) {
      setLogs(prev => [...prev, output]);
    }
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeystroke();
    if (e.key === 'Enter') {
      setLogs(prev => [...prev, `root@resonate:~/${cwd.join('/')}$ ${input}`]);
      executeCommand(input);
      setInput("");
      setTimeout(() => {
        if (inputRef.current) inputRef.current.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col p-6 pt-32 pb-12 relative overflow-hidden" onClick={() => inputRef.current?.focus()}>
      
      {/* Glitch Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] mix-blend-overlay" />

      <div className="w-full max-w-5xl mx-auto flex-1 border border-reso/30 glass-terminal shadow-[0_0_80px_rgba(0,240,255,0.05)] p-1 flex flex-col relative z-10">
        
        {/* Terminal Header */}
        <div className="bg-white/5 border-b border-reso/20 h-12 flex items-center px-6 justify-between shrink-0">
          <div className="flex gap-3">
            <div className="w-3 h-3 rounded-full bg-shock/80 hover:bg-shock cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer hover:bg-yellow-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-reso/80 cursor-pointer hover:bg-reso transition-colors" />
          </div>
          <span className="text-xs font-mono text-white/50 tracking-widest uppercase">root@resonate-os-v2</span>
          <div className="w-12 h-4" />
        </div>

        {/* Terminal Body */}
        <div className="p-8 font-mono text-lg flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="space-y-2 mb-4">
            {logs.map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className={`${log.includes('root@') ? 'text-white/40' : log.includes('ERR') || log.includes('FATAL') ? 'text-shock' : 'text-reso'} whitespace-pre-wrap break-words`}
              >
                {log}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-reso mt-2 shrink-0">
            <span className="whitespace-nowrap">root@resonate:~/{cwd.join('/')}$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none flex-1 text-white caret-reso"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
