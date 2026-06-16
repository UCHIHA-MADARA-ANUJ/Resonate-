import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";

// ── Types ─────────────────────────────────────────────────────────────────────

type LogEntry = {
  id: number;
  text: string;
  color: "reso" | "shock" | "white" | "dim" | "gold" | "green";
  prompt?: string;
};

type Phase =
  | "idle"
  | "join_name"
  | "join_email"
  | "join_role"
  | "join_done"
  | "scan_running";

const ROLES = ["ARCHITECT", "BUILDER", "EDUCATOR", "STUDENT", "INVESTOR"];

// ── File System ───────────────────────────────────────────────────────────────

const FS: Record<string, any> = {
  home: {
    "README.txt":
      "RESONATE OS v2.0.4\nAlgorithmic Sanctuary — Access by merit only.\nRun 'help' or 'join' to begin.",
    "manifesto.txt":
      "THE OLD WEB IS DEAD.\nInstagram breeds vanity. TikTok destroys attention spans.\nThe legacy systems were built to farm dopamine.\nRESONATE is the antithesis — a zero-lag, algorithmic sanctuary\ndesigned solely to intercept emotional decline and forge\nabsolute peer connections.",
    "targets.log":
      "TARGET: Instagram.exe   [STATUS: TERMINATED]\nTARGET: TikTok.exe      [STATUS: PURGED]\nTARGET: Snapchat.exe    [STATUS: NEUTRALIZED]\nTARGET: BeReal.exe      [STATUS: QUARANTINED]\nALL LEGACY THREATS NEUTRALIZED.",
    architecture: {
      "crypto.md":
        "AES-GCM 256-bit E2E Encryption.\nZero-knowledge proof authentication.\nNo central key escrow. No surveillance.",
      "mesh.md":
        "WebRTC P2P DataChannels.\nDecentralized Resonance Circles.\nNo single point of failure. No corporate servers.",
      "crdt.md":
        "LWW-Element-Set Vector Clocks.\nOffline-first state resolution.\nReal-time conflict-free sync.",
      "neural.md":
        "Whisper AI: Real-time emotional transcription.\nMood Genome: 147-dimension empathy profiling.\nEmpathy Coach: Sub-200ms cognitive reframing.",
    },
    "init_protocol.sh": "executable — run to join the waitlist",
  },
};

function getDir(path: string[]): Record<string, any> {
  let curr: any = FS;
  for (const p of path) {
    curr = curr[p];
    if (!curr) return {};
  }
  return curr;
}

// ── Typewriter hook ───────────────────────────────────────────────────────────

let _id = 0;
const uid = () => ++_id;

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}";

// ── Main Component ─────────────────────────────────────────────────────────────

export default function TerminalPage() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: uid(), text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", color: "reso" },
    { id: uid(), text: "  RESONATE OS v2.0.4 — ALGORITHMIC SANCTUARY", color: "reso" },
    { id: uid(), text: "  SECURE CHANNEL ESTABLISHED. ENCRYPTION: AES-GCM-256", color: "dim" },
    { id: uid(), text: "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", color: "reso" },
    { id: uid(), text: "", color: "dim" },
    { id: uid(), text: "Type 'help' for available commands.", color: "dim" },
    { id: uid(), text: "Type 'join' to request access to the Resonate network.", color: "reso" },
    { id: uid(), text: "", color: "dim" },
  ]);
  const [cwd, setCwd] = useState<string[]>(["home"]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [joinData, setJoinData] = useState({ name: "", email: "", role: "" });
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [scanProgress, setScanProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const audio = () => {
    try { return AcousticResonator.getInstance(); } catch { return null; }
  };

  // Add log with optional scramble-then-reveal typing effect
  const addLog = useCallback(
    (entry: Omit<LogEntry, "id">, delay = 0) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, { ...entry, id: uid() }]);
      }, delay);
    },
    []
  );

  const addLogs = useCallback(
    (entries: Omit<LogEntry, "id">[], baseDelay = 0, step = 60) => {
      entries.forEach((e, i) => addLog(e, baseDelay + i * step));
    },
    [addLog]
  );

  // ── Commands ──────────────────────────────────────────────────────────────

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const args = trimmed.split(/\s+/);
      const cmd = args[0].toLowerCase();

      // Echo the prompt
      addLog({
        text: `root@resonate:~/${cwd.join("/")}$ ${raw}`,
        color: "dim",
        prompt: "echo",
      });

      audio()?.playDeepThud();

      // ── Waitlist flow handlers ─────────────────────────────────────────

      if (phase === "join_name") {
        if (trimmed.length < 2) {
          addLog({ text: "ERR: Invalid codename. Minimum 2 characters.", color: "shock" });
          return;
        }
        setJoinData((d) => ({ ...d, name: trimmed.toUpperCase() }));
        setPhase("join_email");
        addLogs([
          { text: `CODENAME ACCEPTED: [${trimmed.toUpperCase()}]`, color: "reso" },
          { text: "", color: "dim" },
          { text: "STEP 2/3 — COMM-LINK VERIFICATION", color: "gold" },
          { text: "Enter your email address to receive your access token:", color: "white" },
        ], 0, 80);
        return;
      }

      if (phase === "join_email") {
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRx.test(trimmed)) {
          addLog({ text: "ERR: Invalid comm-link format. Expected: user@domain.tld", color: "shock" });
          return;
        }
        setJoinData((d) => ({ ...d, email: trimmed.toLowerCase() }));
        setPhase("join_role");
        addLogs([
          { text: `COMM-LINK VERIFIED: [${trimmed.toLowerCase()}]`, color: "reso" },
          { text: "", color: "dim" },
          { text: "STEP 3/3 — CLASSIFICATION PROTOCOL", color: "gold" },
          { text: "Select your role:", color: "white" },
          { text: "  [1] ARCHITECT    — System designer / engineer", color: "dim" },
          { text: "  [2] BUILDER      — Product developer", color: "dim" },
          { text: "  [3] EDUCATOR     — Academic / researcher", color: "dim" },
          { text: "  [4] STUDENT      — Next-gen mind", color: "dim" },
          { text: "  [5] INVESTOR     — Capital allocator", color: "dim" },
          { text: "Enter number (1-5):", color: "white" },
        ], 0, 70);
        return;
      }

      if (phase === "join_role") {
        const n = parseInt(trimmed, 10);
        if (isNaN(n) || n < 1 || n > 5) {
          addLog({ text: "ERR: Enter a number between 1 and 5.", color: "shock" });
          return;
        }
        const role = ROLES[n - 1];
        const finalData = { ...joinData, role };
        setJoinData(finalData);

        // Generate a fake queue position
        const queuePos = Math.floor(Math.random() * 800) + 200;
        const accessCode = Math.random().toString(36).substring(2, 10).toUpperCase();

        // Persist to localStorage
        try {
          const existing = JSON.parse(localStorage.getItem("resonate_waitlist") || "[]");
          existing.push({ ...finalData, role, ts: Date.now(), pos: queuePos });
          localStorage.setItem("resonate_waitlist", JSON.stringify(existing));
        } catch {}

        setPhase("join_done");

        addLogs([
          { text: `ROLE ASSIGNED: [${role}]`, color: "reso" },
          { text: "", color: "dim" },
          { text: "▶ PROCESSING ACCESS REQUEST...", color: "reso" },
          { text: "  Encrypting identity package...      [OK]", color: "dim" },
          { text: "  Validating comm-link...             [OK]", color: "dim" },
          { text: "  Assigning P2P node address...       [OK]", color: "dim" },
          { text: "  Writing to distributed ledger...    [OK]", color: "dim" },
          { text: "  Broadcasting to mesh network...     [OK]", color: "dim" },
          { text: "", color: "dim" },
          { text: "╔══════════════════════════════════════╗", color: "reso" },
          { text: "║   ACCESS REQUEST CONFIRMED           ║", color: "reso" },
          { text: `║   CODENAME:    ${finalData.name.padEnd(20)}  ║`, color: "white" },
          { text: `║   ROLE:        ${role.padEnd(20)}  ║`, color: "white" },
          { text: `║   QUEUE POS:   #${String(queuePos).padEnd(19)}  ║`, color: "gold" },
          { text: `║   ACCESS CODE: ${accessCode.padEnd(20)}  ║`, color: "gold" },
          { text: "╚══════════════════════════════════════╝", color: "reso" },
          { text: "", color: "dim" },
          { text: "Your access token has been dispatched to your comm-link.", color: "reso" },
          { text: "You will be contacted when your node slot opens.", color: "dim" },
          { text: "", color: "dim" },
          { text: "Welcome to the resistance.", color: "reso" },
          { text: "", color: "dim" },
        ], 0, 90);
        return;
      }

      // ── Normal commands ────────────────────────────────────────────────

      switch (cmd) {

        case "help":
          addLogs([
            { text: "AVAILABLE COMMANDS:", color: "reso" },
            { text: "", color: "dim" },
            { text: "  join          Request access to the Resonate network", color: "white" },
            { text: "  ls            List files in current directory", color: "white" },
            { text: "  cd <dir>      Navigate to directory", color: "white" },
            { text: "  cat <file>    Read file contents", color: "white" },
            { text: "  scan          Run network threat scan", color: "white" },
            { text: "  status        Show system status", color: "white" },
            { text: "  decrypt <f>   Decrypt and read a file", color: "white" },
            { text: "  ping          Ping the Resonate mesh network", color: "white" },
            { text: "  whoami        Identify yourself", color: "white" },
            { text: "  clear         Clear the terminal", color: "white" },
            { text: "  history       Show command history", color: "white" },
            { text: "", color: "dim" },
            { text: "TIP: cd architecture && cat neural.md", color: "dim" },
          ], 0, 50);
          break;

        case "join":
          setPhase("join_name");
          addLogs([
            { text: "", color: "dim" },
            { text: "██ INITIATING ACCESS REQUEST PROTOCOL ██", color: "reso" },
            { text: "", color: "dim" },
            { text: "RESONATE operates by invitation and merit.", color: "dim" },
            { text: "Complete the 3-step verification to join the waitlist.", color: "dim" },
            { text: "", color: "dim" },
            { text: "STEP 1/3 — IDENTITY ASSIGNMENT", color: "gold" },
            { text: "Enter your codename (first name or alias):", color: "white" },
          ], 0, 80);
          break;

        case "ls": {
          const dir = getDir(cwd);
          if (!dir) { addLog({ text: "ls: cannot access directory", color: "shock" }); break; }
          const entries = Object.entries(dir).map(([k, v]) =>
            typeof v === "object" ? `\x1b[36m${k}/\x1b[0m` : k
          );
          const files = Object.entries(dir).filter(([, v]) => typeof v === "string").map(([k]) => k);
          const dirs = Object.entries(dir).filter(([, v]) => typeof v === "object").map(([k]) => `${k}/`);
          addLogs([
            ...(dirs.length ? [{ text: "DIRECTORIES:", color: "dim" as const }] : []),
            ...(dirs.length ? [{ text: `  ${dirs.join("  ")}`, color: "reso" as const }] : []),
            ...(files.length ? [{ text: "FILES:", color: "dim" as const }] : []),
            ...(files.length ? [{ text: `  ${files.join("  ")}`, color: "white" as const }] : []),
          ], 0, 30);
          break;
        }

        case "cd": {
          if (!args[1] || args[1] === "~") {
            setCwd(["home"]);
            addLog({ text: "→ /home", color: "reso" });
          } else if (args[1] === "..") {
            if (cwd.length > 1) {
              const next = cwd.slice(0, -1);
              setCwd(next);
              addLog({ text: `→ /${next.join("/")}`, color: "reso" });
            } else {
              addLog({ text: "cd: already at root", color: "dim" });
            }
          } else {
            const currentDir = getDir(cwd);
            if (currentDir[args[1]] && typeof currentDir[args[1]] === "object") {
              setCwd([...cwd, args[1]]);
              addLog({ text: `→ /${[...cwd, args[1]].join("/")}`, color: "reso" });
            } else {
              addLog({ text: `cd: ${args[1]}: No such directory`, color: "shock" });
            }
          }
          break;
        }

        case "cat": {
          if (!args[1]) { addLog({ text: "cat: missing file operand", color: "shock" }); break; }
          const currentDir = getDir(cwd);
          const file = currentDir[args[1]];
          if (!file) {
            addLog({ text: `cat: ${args[1]}: No such file`, color: "shock" });
          } else if (typeof file === "object") {
            addLog({ text: `cat: ${args[1]}: Is a directory. Use 'cd ${args[1]}' instead.`, color: "shock" });
          } else if (file === "executable — run to join the waitlist") {
            setPhase("join_name");
            addLogs([
              { text: "Executing init_protocol.sh...", color: "dim" },
              { text: "", color: "dim" },
              { text: "██ INITIATING ACCESS REQUEST PROTOCOL ██", color: "reso" },
              { text: "", color: "dim" },
              { text: "STEP 1/3 — IDENTITY ASSIGNMENT", color: "gold" },
              { text: "Enter your codename (first name or alias):", color: "white" },
            ], 0, 80);
          } else {
            addLogs(
              (file as string).split("\n").map((line) => ({
                text: line,
                color: "white" as const,
              })),
              0,
              30
            );
          }
          break;
        }

        case "scan": {
          if (phase === "scan_running") {
            addLog({ text: "Scan already in progress...", color: "dim" });
            break;
          }
          setPhase("scan_running");
          const threats = [
            { name: "Instagram.exe", lat: "37.7749° N, 122.4194° W", status: "TERMINATED" },
            { name: "TikTok.exe", lat: "39.9042° N, 116.4074° E", status: "PURGED" },
            { name: "Snapchat.exe", lat: "34.0195° N, 118.4912° W", status: "NEUTRALIZED" },
            { name: "BeReal.exe", lat: "48.8566° N, 2.3522° E", status: "QUARANTINED" },
          ];
          addLogs([
            { text: "INITIATING GLOBAL NETWORK SCAN...", color: "reso" },
            { text: "Scanning 47,291 nodes across 6 continents...", color: "dim" },
            { text: "", color: "dim" },
          ], 0, 60);
          threats.forEach((t, i) => {
            const base = 600 + i * 900;
            addLog({ text: `SCANNING: ${t.name}`, color: "dim" }, base);
            addLog({ text: `  ORIGIN: ${t.lat}`, color: "dim" }, base + 200);
            addLog({ text: `  STATUS: ${t.status} ✓`, color: "shock" }, base + 400);
          });
          const finalBase = 600 + threats.length * 900 + 300;
          addLogs([
            { text: "", color: "dim" },
            { text: "SCAN COMPLETE.", color: "reso" },
            { text: `${threats.length} threats detected. ${threats.length} neutralized.`, color: "dim" },
            { text: "Network is clean. RESONATE protocol active.", color: "reso" },
            { text: "", color: "dim" },
          ], finalBase, 80);
          setTimeout(() => setPhase("idle"), finalBase + 500);
          break;
        }

        case "status":
          addLogs([
            { text: "SYSTEM STATUS:", color: "reso" },
            { text: "", color: "dim" },
            { text: `  NODE STATUS:       ONLINE`, color: "green" },
            { text: `  ENCRYPTION:        AES-GCM-256 [ACTIVE]`, color: "green" },
            { text: `  MESH PEERS:        ${Math.floor(Math.random() * 800) + 200} nodes`, color: "white" },
            { text: `  P2P LATENCY:       ${Math.floor(Math.random() * 20) + 1}ms`, color: "white" },
            { text: `  WAITLIST:          ${Math.floor(Math.random() * 800) + 800} in queue`, color: "gold" },
            { text: `  UPTIME:            99.97%`, color: "green" },
            { text: `  THREAT LEVEL:      0 (CLEAR)`, color: "green" },
            { text: "", color: "dim" },
          ], 0, 60);
          break;

        case "decrypt": {
          if (!args[1]) { addLog({ text: "decrypt: missing file operand", color: "shock" }); break; }
          const currentDir2 = getDir(cwd);
          const file2 = currentDir2[args[1]];
          if (!file2 || typeof file2 === "object") {
            addLog({ text: `decrypt: ${args[1]}: File not found or not decryptable`, color: "shock" });
            break;
          }
          addLogs([
            { text: `Decrypting ${args[1]}...`, color: "dim" },
            { text: "Loading AES-GCM-256 key...", color: "dim" },
            { text: "Verifying signature...     [OK]", color: "reso" },
            { text: "Decryption successful.", color: "reso" },
            { text: "", color: "dim" },
            ...(file2 as string).split("\n").map((l: string) => ({ text: l, color: "white" as const })),
            { text: "", color: "dim" },
          ], 0, 60);
          break;
        }

        case "ping":
          addLogs([
            { text: "PINGING RESONATE MESH NETWORK...", color: "dim" },
            { text: "Establishing P2P tunnel...", color: "dim" },
            { text: `PONG from node.alpha-prime    [${Math.floor(Math.random() * 10) + 1}ms]`, color: "reso" },
            { text: `PONG from node.beta-sentinel  [${Math.floor(Math.random() * 10) + 1}ms]`, color: "reso" },
            { text: `PONG from node.gamma-echo     [${Math.floor(Math.random() * 10) + 1}ms]`, color: "reso" },
            { text: "", color: "dim" },
            { text: "3 packets transmitted, 3 received, 0% packet loss", color: "green" },
            { text: "", color: "dim" },
          ], 0, 70);
          break;

        case "whoami":
          addLogs([
            { text: "IDENTITY SCAN...", color: "dim" },
            { text: "UID: UNCLASSIFIED", color: "shock" },
            { text: "ACCESS LEVEL: OBSERVER", color: "dim" },
            { text: "CLEARANCE: PENDING VERIFICATION", color: "gold" },
            { text: "", color: "dim" },
            { text: "Run 'join' to elevate your clearance.", color: "reso" },
            { text: "", color: "dim" },
          ], 0, 80);
          break;

        case "clear":
          setLogs([]);
          break;

        case "history":
          if (history.length === 0) {
            addLog({ text: "No command history.", color: "dim" });
          } else {
            addLogs(
              history.map((h, i) => ({
                text: `  ${String(i + 1).padStart(3, " ")}  ${h}`,
                color: "dim" as const,
              })),
              0,
              20
            );
          }
          break;

        case "matrix":
          addLogs([
            { text: "01001000 01100001 01101100 01101100 01101111", color: "reso" },
            { text: "WAKE UP, NEO.", color: "shock" },
            { text: "THE MATRIX HAS YOU.", color: "shock" },
            { text: "...wrong movie.", color: "dim" },
            { text: "Run 'join' to enter the right one.", color: "reso" },
            { text: "", color: "dim" },
          ], 0, 200);
          break;

        default:
          addLog({ text: `Command not found: ${cmd}. Type 'help' for commands.`, color: "shock" });
      }

      // ── History bookkeeping ──────────────────────────────────────────────
      if (trimmed && trimmed !== "clear") {
        setHistory((prev) => [...prev.slice(-49), trimmed]);
      }
      setHistIdx(-1);
    },
    [addLog, addLogs, cwd, phase, joinData, history]
  );

  // ── Key handler ────────────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    audio()?.playSoftHover?.();

    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[history.length - 1 - next] ?? "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : (history[history.length - 1 - next] ?? ""));
      return;
    }
  };

  // ── Prompt label ───────────────────────────────────────────────────────────

  const promptLabel = () => {
    if (phase === "join_name") return "name";
    if (phase === "join_email") return "email";
    if (phase === "join_role") return "role";
    return `root@resonate:~/${cwd.join("/")}$`;
  };

  const phaseColor = () => {
    if (phase === "join_name" || phase === "join_email" || phase === "join_role") return "text-[#FFD700]";
    return "text-reso";
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="bg-black min-h-screen flex flex-col p-4 md:p-8 pt-28 pb-8 relative overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT scanline */}
      <div className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.04) 0%, transparent 70%)" }}
      />

      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col relative z-10"
        style={{ filter: "drop-shadow(0 0 60px rgba(0,240,255,0.08))" }}>

        {/* Header bar */}
        <div className="bg-black border border-reso/30 border-b-0 h-11 flex items-center px-5 justify-between shrink-0 rounded-t-sm">
          <div className="flex gap-2.5">
            <button className="w-3 h-3 rounded-full bg-shock/80 hover:bg-shock transition-colors" />
            <button className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-400 transition-colors" />
            <button className="w-3 h-3 rounded-full bg-reso/80 hover:bg-reso transition-colors" />
          </div>
          <span className="text-[10px] font-mono text-white/40 tracking-[0.25em] uppercase">
            root@resonate-os — ~/{cwd.join("/")}
          </span>
          <div className="flex items-center gap-2">
            {phase !== "idle" && phase !== "join_done" && phase !== "scan_running" && (
              <span className="text-[10px] font-mono text-[#FFD700] tracking-widest animate-pulse uppercase">
                ● INPUT EXPECTED
              </span>
            )}
            <div className="w-2 h-2 rounded-full bg-reso animate-pulse" />
          </div>
        </div>

        {/* Terminal body */}
        <div className="border border-reso/30 border-t-reso/10 bg-black/90 flex-1 flex flex-col overflow-hidden"
          style={{ minHeight: "70vh", backdropFilter: "blur(10px)" }}>

          {/* Log area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-0.5 font-mono text-sm leading-relaxed">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`whitespace-pre-wrap break-all ${
                    log.color === "reso" ? "text-[#00F0FF]" :
                    log.color === "shock" ? "text-[#FF0055]" :
                    log.color === "gold" ? "text-[#FFD700]" :
                    log.color === "green" ? "text-[#00FF88]" :
                    log.color === "white" ? "text-[#E2E8F0]" :
                    "text-white/40"
                  }`}
                >
                  {log.text}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <div className="border-t border-reso/20 px-6 md:px-8 py-4 flex items-center gap-3 shrink-0 bg-black/50">
            <span className={`font-mono text-sm whitespace-nowrap ${phaseColor()}`}>
              {promptLabel()}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 font-mono text-sm text-white caret-[#00F0FF] placeholder-white/20"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              placeholder={
                phase === "join_name" ? "your codename..." :
                phase === "join_email" ? "your@email.com..." :
                phase === "join_role" ? "enter 1-5..." :
                "type a command..."
              }
            />
            {/* Blinking cursor indicator */}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "steps(1)" }}
              className="w-2 h-4 bg-[#00F0FF] shrink-0"
            />
          </div>
        </div>

        {/* Bottom status bar */}
        <div className="border border-reso/30 border-t-0 bg-[#00F0FF]/5 px-5 py-2 flex justify-between items-center text-[10px] font-mono text-white/30 tracking-widest uppercase rounded-b-sm">
          <span>RESONATE OS v2.0.4</span>
          <span>ENC: AES-GCM-256</span>
          <span>MESH: ONLINE</span>
          <span>CMDS: {history.length}</span>
        </div>
      </div>
    </div>
  );
}
