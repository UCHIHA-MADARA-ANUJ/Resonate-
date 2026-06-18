import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Color = "reso" | "shock" | "white" | "dim" | "gold" | "green" | "purple";

type LogEntry = {
  id: number;
  text: string;
  color: Color;
  scramble?: boolean;
  instant?: boolean;
};

type Phase =
  | "idle"
  | "join_name"
  | "join_email"
  | "join_role"
  | "join_done"
  | "busy";

const ROLES = ["ARCHITECT", "BUILDER", "EDUCATOR", "STUDENT", "INVESTOR"];
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*!<>[]{}|/\\";
const ALL_COMMANDS = [
  "help","join","ls","cd","cat","scan","status","decrypt",
  "ping","whoami","clear","history","hack","reboot","motd",
  "nmap","trace","matrix","exec",
];

// ─────────────────────────────────────────────────────────────────────────────
// File System
// ─────────────────────────────────────────────────────────────────────────────

const FS: Record<string, any> = {
  home: {
    "README.txt": "RESONATE OS v2.0.4\nAlgorithmic Sanctuary — Access by merit only.\nType 'motd' for the message of the day.\nType 'join' to request access.",
    "manifesto.txt":
      "THE OLD WEB IS DEAD.\n\nInstagram breeds vanity.\nTikTok destroys attention spans.\nSnapchat atomises memory.\nBeReal sells authenticity as a product.\n\nThe legacy systems were built to farm dopamine.\nRESONATE is the antithesis:\n\nA zero-lag, algorithmic sanctuary\ndesigned solely to intercept emotional decline\nand forge absolute peer connections.",
    "targets.log":
      "╔══════════════════════════════════════════════╗\n║         THREAT ELIMINATION LOG v4.1          ║\n╠══════════════════════════════════════════════╣\n║  Instagram.exe    → TERMINATED  [2024.03.01] ║\n║  TikTok.exe       → PURGED      [2024.03.15] ║\n║  Snapchat.exe     → NEUTRALIZED [2024.04.02] ║\n║  BeReal.exe       → QUARANTINED [2024.04.19] ║\n║  Twitter.exe      → CONTAINED   [2024.05.07] ║\n╠══════════════════════════════════════════════╣\n║  ALL LEGACY THREATS NEUTRALIZED.             ║\n║  RESONATE PROTOCOL: ACTIVE                   ║\n╚══════════════════════════════════════════════╝",
    architecture: {
      "crypto.md":
        "AES-GCM 256-bit E2E Encryption.\nZero-knowledge proof authentication.\nNo central key escrow. No surveillance.\nEvery packet signed. Every identity sovereign.",
      "mesh.md":
        "WebRTC P2P DataChannels.\nDecentralized Resonance Circles.\nNo single point of failure.\nNo corporate servers. No data brokers.",
      "crdt.md":
        "LWW-Element-Set Vector Clocks.\nOffline-first state resolution.\nReal-time conflict-free sync.\nYour data exists on your device first.",
      "neural.md":
        "Whisper AI: Real-time emotional transcription.\nMood Genome: 147-dimension empathy profiling.\nEmpathy Coach: Sub-200ms cognitive reframing.\nResonance Score: 0.0 – 1.0 connection index.",
    },
    founders: {
      "anuj.txt":
        "ANUJ PHULERA // ID: 001\nRole: DEVELOPER · AI · BACKEND\n\nThe builder. Architects the engine that powers RESONATE\nfrom zero-latency backend systems to the AI models\nthat make empathy computable.\n\nHe writes the code that makes the revolution operational.",
      "aarav.txt":
        "AARAV CHOUDHARY // ID: 002\nRole: VISION · MARKETING · IDEAS\n\nThe strategist. Saw the decay of modern social platforms\nand decided to burn it down by imagining something better.\n\nHe engineers the narrative. Refuses to compromise on the idea.",
    },
    "init_protocol.sh": "__EXECUTABLE__",
  },
};

function getDir(path: string[]): Record<string, any> {
  let curr: any = FS;
  for (const p of path) {
    curr = curr?.[p];
    if (!curr) return {};
  }
  return curr;
}

// ─────────────────────────────────────────────────────────────────────────────
// UID
// ─────────────────────────────────────────────────────────────────────────────

let _id = 0;
const uid = () => ++_id;

// ─────────────────────────────────────────────────────────────────────────────
// ScrambleLine component — each line decodes from noise to text
// ─────────────────────────────────────────────────────────────────────────────

function ScrambleLine({
  text,
  colorClass,
  skip,
}: {
  text: string;
  colorClass: string;
  skip?: boolean;
}) {
  const [displayed, setDisplayed] = useState<string>(
    skip || !text.trim() ? text : text.replace(/[^\s\n]/g, () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
  );
  const done = useRef(false);

  useEffect(() => {
    if (skip || !text.trim() || done.current) return;
    done.current = true;
    let frame = 0;
    const total = Math.max(text.length * 1.5, 10);
    const id = setInterval(() => {
      frame++;
      const progress = frame / total;
      setDisplayed(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " " || ch === "\n") return ch;
            if (i / text.length < progress * 1.3) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (progress >= 1) {
        setDisplayed(text);
        clearInterval(id);
      }
    }, 18);
    return () => clearInterval(id);
  }, [text, skip]);

  return (
    <span className={`${colorClass} font-mono whitespace-pre-wrap break-all`}>
      {displayed}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Color helper
// ─────────────────────────────────────────────────────────────────────────────

function colorClass(c: Color): string {
  switch (c) {
    case "reso":   return "text-[#00F0FF]";
    case "shock":  return "text-[#FF0055]";
    case "gold":   return "text-[#FFD700]";
    case "green":  return "text-[#00FF88]";
    case "purple": return "text-[#BF00FF]";
    case "white":  return "text-[#E2E8F0]";
    default:       return "text-white/35";
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

const BOOT_LINES: Omit<LogEntry, "id">[] = [
  { text: "██████████████████████████████████████████████████████", color: "reso", instant: true },
  { text: "██                                                  ██", color: "reso", instant: true },
  { text: "██   ██████╗ ███████╗███████╗ ██████╗ ███╗  ██╗   ██", color: "reso", instant: true },
  { text: "██   ██╔══██╗██╔════╝██╔════╝██╔═══██╗████╗ ██║   ██", color: "reso", instant: true },
  { text: "██   ██████╔╝█████╗  ███████╗██║   ██║██╔██╗██║   ██", color: "reso", instant: true },
  { text: "██   ██╔══██╗██╔══╝  ╚════██║██║   ██║██║╚████║   ██", color: "reso", instant: true },
  { text: "██   ██║  ██║███████╗███████║╚██████╔╝██║ ╚███║   ██", color: "reso", instant: true },
  { text: "██   ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚══╝   ██", color: "reso", instant: true },
  { text: "██                                                  ██", color: "reso", instant: true },
  { text: "██████████████████████████████████████████████████████", color: "reso", instant: true },
  { text: "", color: "dim", instant: true },
  { text: "  RESONATE OS v2.0.4 — ALGORITHMIC SANCTUARY", color: "reso" },
  { text: "  SECURE CHANNEL ESTABLISHED  ·  ENC: AES-GCM-256", color: "dim" },
  { text: "  MESH PEERS: 1,247  ·  LATENCY: 4ms  ·  UPTIME: 99.97%", color: "dim" },
  { text: "", color: "dim", instant: true },
  { text: "  [BOOT] Initialising kernel modules...      [OK]", color: "dim" },
  { text: "  [BOOT] Loading empathy engine...           [OK]", color: "dim" },
  { text: "  [BOOT] Mounting encrypted filesystem...    [OK]", color: "dim" },
  { text: "  [BOOT] Establishing P2P mesh tunnel...     [OK]", color: "dim" },
  { text: "  [BOOT] Neural inference runtime ready...   [OK]", color: "green" },
  { text: "", color: "dim", instant: true },
  { text: "  Type 'help' for commands.  Type 'join' to request access.", color: "reso" },
  { text: "", color: "dim", instant: true },
];

export default function TerminalPage() {
  const [input, setInput]       = useState("");
  const [logs, setLogs]         = useState<LogEntry[]>(() =>
    BOOT_LINES.map((l) => ({ ...l, id: uid() }))
  );
  const [cwd, setCwd]           = useState<string[]>(["home"]);
  const [phase, setPhase]       = useState<Phase>("idle");
  const [joinData, setJoinData] = useState({ name: "", email: "", role: "" });
  const [history, setHistory]   = useState<string[]>([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [tabCycle, setTabCycle] = useState<string[]>([]);
  const [tabIdx, setTabIdx]     = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const audio = useCallback(() => {
    try { return AcousticResonator.getInstance(); } catch { return null; }
  }, []);

  const addLog = useCallback((entry: Omit<LogEntry, "id">, delay = 0) => {
    setTimeout(() => {
      setLogs((prev) => [...prev, { ...entry, id: uid() }]);
    }, delay);
  }, []);

  const addLogs = useCallback(
    (entries: Omit<LogEntry, "id">[], baseDelay = 0, step = 55) => {
      entries.forEach((e, i) => addLog(e, baseDelay + i * step));
    },
    [addLog]
  );

  // ── Tab completion ──────────────────────────────────────────────────────────

  const handleTab = useCallback(() => {
    const word = input.trim().split(/\s+/)[0].toLowerCase();
    if (!word) return;
    const matches = ALL_COMMANDS.filter((c) => c.startsWith(word));
    if (!matches.length) return;
    if (matches.length === 1) {
      setInput(matches[0] + " ");
      return;
    }
    if (tabCycle.join() !== matches.join()) {
      setTabCycle(matches);
      setTabIdx(0);
      setInput(matches[0] + " ");
    } else {
      const next = (tabIdx + 1) % matches.length;
      setTabIdx(next);
      setInput(matches[next] + " ");
    }
  }, [input, tabCycle, tabIdx]);

  // ── Commands ────────────────────────────────────────────────────────────────

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const args = trimmed.split(/\s+/);
      const cmd  = args[0].toLowerCase();

      addLog({ text: `root@resonate:~/${cwd.join("/")}$ ${raw}`, color: "dim", instant: true });
      audio()?.playDeepThud?.();

      // ── Waitlist flow ──────────────────────────────────────────────────────

      if (phase === "join_name") {
        if (trimmed.length < 2) {
          addLog({ text: "ERR: Invalid codename. Minimum 2 characters.", color: "shock" });
          return;
        }
        const name = trimmed.toUpperCase();
        setJoinData((d) => ({ ...d, name }));
        setPhase("join_email");
        addLogs([
          { text: `✓  CODENAME ACCEPTED → [ ${name} ]`, color: "reso" },
          { text: "", color: "dim", instant: true },
          { text: "─── STEP 2 / 3 ── COMM-LINK VERIFICATION ───────────────", color: "gold" },
          { text: "Enter your email address:", color: "white" },
        ], 0, 70);
        return;
      }

      if (phase === "join_email") {
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRx.test(trimmed)) {
          addLog({ text: "ERR: Invalid format. Expected → user@domain.tld", color: "shock" });
          return;
        }
        const email = trimmed.toLowerCase();
        setJoinData((d) => ({ ...d, email }));
        setPhase("join_role");
        addLogs([
          { text: `✓  COMM-LINK VERIFIED → [ ${email} ]`, color: "reso" },
          { text: "", color: "dim", instant: true },
          { text: "─── STEP 3 / 3 ── CLASSIFICATION PROTOCOL ──────────────", color: "gold" },
          { text: "Select your role:", color: "white" },
          { text: "", color: "dim", instant: true },
          { text: "  [1]  ARCHITECT   — System designer / engineer", color: "dim" },
          { text: "  [2]  BUILDER     — Product developer", color: "dim" },
          { text: "  [3]  EDUCATOR    — Academic / researcher", color: "dim" },
          { text: "  [4]  STUDENT     — Next-gen mind", color: "dim" },
          { text: "  [5]  INVESTOR    — Capital allocator", color: "dim" },
          { text: "", color: "dim", instant: true },
          { text: "Enter 1–5:", color: "white" },
        ], 0, 60);
        return;
      }

      if (phase === "join_role") {
        const n = parseInt(trimmed, 10);
        if (isNaN(n) || n < 1 || n > 5) {
          addLog({ text: "ERR: Enter a number between 1 and 5.", color: "shock" });
          return;
        }
        const role     = ROLES[n - 1];
        const queuePos = Math.floor(Math.random() * 600) + 300;
        const nodeAddr = Array.from({ length: 4 }, () =>
          Math.floor(Math.random() * 256)
        ).join(".");
        const accessCode = (
          Math.random().toString(36).substring(2, 6) +
          "-" +
          Math.random().toString(36).substring(2, 6) +
          "-" +
          Math.random().toString(36).substring(2, 6)
        ).toUpperCase();

        const final = { ...joinData, role };
        setJoinData(final);

        try {
          const prev = JSON.parse(localStorage.getItem("resonate_waitlist") || "[]");
          prev.push({ ...final, ts: Date.now(), pos: queuePos, node: nodeAddr });
          localStorage.setItem("resonate_waitlist", JSON.stringify(prev));
        } catch {}

        setPhase("join_done");
        audio()?.playCinematicRiser?.();

        addLogs([
          { text: `✓  ROLE ASSIGNED → [ ${role} ]`, color: "reso" },
          { text: "", color: "dim", instant: true },
          { text: "▶  PROCESSING ACCESS REQUEST...", color: "reso" },
          { text: "", color: "dim", instant: true },
          { text: "  ► Hashing identity package.................  [OK]", color: "dim" },
          { text: "  ► Signing with Ed25519 key pair............  [OK]", color: "dim" },
          { text: "  ► Validating comm-link.....................  [OK]", color: "dim" },
          { text: "  ► Assigning P2P node address...............  [OK]", color: "dim" },
          { text: "  ► Writing to distributed ledger............  [OK]", color: "dim" },
          { text: "  ► Propagating to 1,247 mesh nodes..........  [OK]", color: "dim" },
          { text: "  ► Generating access token..................  [OK]", color: "green" },
          { text: "", color: "dim", instant: true },
          { text: "╔══════════════════════════════════════════════════╗", color: "reso" },
          { text: "║                                                  ║", color: "reso" },
          { text: "║   ✦  ACCESS REQUEST CONFIRMED  ✦                 ║", color: "reso" },
          { text: "║                                                  ║", color: "reso" },
          { text: `║   CODENAME   :  ${final.name.substring(0, 18).padEnd(18)}              ║`, color: "white" },
          { text: `║   ROLE       :  ${role.padEnd(18)}              ║`, color: "white" },
          { text: `║   NODE ADDR  :  ${nodeAddr.padEnd(18)}              ║`, color: "dim" },
          { text: `║   QUEUE POS  :  #${String(queuePos).padEnd(17)}              ║`, color: "gold" },
          { text: `║   TOKEN      :  ${accessCode.padEnd(18)}              ║`, color: "gold" },
          { text: "║                                                  ║", color: "reso" },
          { text: "╚══════════════════════════════════════════════════╝", color: "reso" },
          { text: "", color: "dim", instant: true },
          { text: "  Your access token has been dispatched to your comm-link.", color: "reso" },
          { text: "  You will be notified when your node slot opens.", color: "dim" },
          { text: "", color: "dim", instant: true },
          { text: "  ┌─────────────────────────────────────────────┐", color: "reso" },
          { text: "  │   W E L C O M E   T O   T H E              │", color: "reso" },
          { text: "  │   R E S I S T A N C E .                    │", color: "reso" },
          { text: "  └─────────────────────────────────────────────┘", color: "reso" },
          { text: "", color: "dim", instant: true },
        ], 0, 80);
        return;
      }

      // ── Normal commands ────────────────────────────────────────────────────

      switch (cmd) {

        // ── HELP ────────────────────────────────────────────────────────────
        case "help":
          addLogs([
            { text: "┌──────────────────────────────────────────────────────┐", color: "reso" },
            { text: "│  RESONATE OS — AVAILABLE COMMANDS                    │", color: "reso" },
            { text: "├──────────────────────────────────────────────────────┤", color: "dim" },
            { text: "│  join          Start waitlist registration           │", color: "white" },
            { text: "│  motd          Message of the day                    │", color: "white" },
            { text: "│  ls            List directory contents               │", color: "white" },
            { text: "│  cd <dir>      Navigate directories                  │", color: "white" },
            { text: "│  cat <file>    Read file contents                    │", color: "white" },
            { text: "│  decrypt <f>   Decrypt a file                        │", color: "white" },
            { text: "│  scan          Global threat scan                    │", color: "white" },
            { text: "│  nmap          Network port scan                     │", color: "white" },
            { text: "│  hack          Initiate system breach                │", color: "white" },
            { text: "│  trace         Trace a network route                 │", color: "white" },
            { text: "│  ping          Ping the mesh network                 │", color: "white" },
            { text: "│  status        System status report                  │", color: "white" },
            { text: "│  whoami        Identify your clearance level         │", color: "white" },
            { text: "│  history       Show command history                  │", color: "white" },
            { text: "│  reboot        Restart the terminal                  │", color: "white" },
            { text: "│  clear         Clear the screen                      │", color: "white" },
            { text: "├──────────────────────────────────────────────────────┤", color: "dim" },
            { text: "│  TAB — autocomplete  ·  ↑↓ — command history        │", color: "dim" },
            { text: "└──────────────────────────────────────────────────────┘", color: "reso" },
          ], 0, 35);
          break;

        // ── MOTD ─────────────────────────────────────────────────────────────
        case "motd":
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: "  ┌─ MESSAGE OF THE DAY ──────────────────────────────┐", color: "reso" },
            { text: "  │                                                    │", color: "reso" },
            { text: "  │  The old web farmed your attention.                │", color: "white" },
            { text: "  │  RESONATE returns it.                              │", color: "white" },
            { text: "  │                                                    │", color: "reso" },
            { text: "  │  147 dimensions of empathy.                        │", color: "dim" },
            { text: "  │  Sub-200ms emotional response.                     │", color: "dim" },
            { text: "  │  Zero corporate surveillance.                      │", color: "dim" },
            { text: "  │                                                    │", color: "reso" },
            { text: "  │  Built by Anuj Phulera + Aarav Choudhary           │", color: "gold" },
            { text: "  │  Architects of the algorithmic sanctuary.          │", color: "gold" },
            { text: "  │                                                    │", color: "reso" },
            { text: "  └────────────────────────────────────────────────────┘", color: "reso" },
            { text: "", color: "dim", instant: true },
          ], 0, 50);
          break;

        // ── JOIN ─────────────────────────────────────────────────────────────
        case "join":
          if (phase === "join_done") {
            addLog({ text: "You are already registered. Welcome back.", color: "reso" });
            break;
          }
          setPhase("join_name");
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: "  ██ INITIATING ACCESS REQUEST PROTOCOL v2 ██", color: "reso" },
            { text: "", color: "dim", instant: true },
            { text: "  RESONATE operates by invitation and merit.", color: "dim" },
            { text: "  Complete 3-step verification to join the waitlist.", color: "dim" },
            { text: "", color: "dim", instant: true },
            { text: "─── STEP 1 / 3 ── IDENTITY ASSIGNMENT ──────────────────", color: "gold" },
            { text: "Enter your codename (first name or alias):", color: "white" },
          ], 0, 70);
          break;

        // ── LS ───────────────────────────────────────────────────────────────
        case "ls": {
          const dir = getDir(cwd);
          const subdirs = Object.entries(dir).filter(([, v]) => typeof v === "object").map(([k]) => k);
          const files   = Object.entries(dir).filter(([, v]) => typeof v === "string").map(([k]) => k);
          const rows: Omit<LogEntry, "id">[] = [];
          if (subdirs.length) {
            rows.push({ text: "  DIRECTORIES:", color: "dim" });
            subdirs.forEach((d) => rows.push({ text: `    ▶  ${d}/`, color: "reso" }));
          }
          if (files.length) {
            rows.push({ text: "  FILES:", color: "dim" });
            files.forEach((f) => rows.push({ text: `    ·  ${f}`, color: "white" }));
          }
          addLogs(rows, 0, 30);
          break;
        }

        // ── CD ───────────────────────────────────────────────────────────────
        case "cd": {
          if (!args[1] || args[1] === "~") {
            setCwd(["home"]);
            addLog({ text: "  → /home", color: "reso" });
          } else if (args[1] === "..") {
            if (cwd.length > 1) {
              const next = cwd.slice(0, -1);
              setCwd(next);
              addLog({ text: `  → /${next.join("/")}`, color: "reso" });
            } else {
              addLog({ text: "  cd: already at root", color: "dim" });
            }
          } else {
            const d = getDir(cwd);
            if (d[args[1]] && typeof d[args[1]] === "object") {
              setCwd([...cwd, args[1]]);
              addLog({ text: `  → /${[...cwd, args[1]].join("/")}`, color: "reso" });
            } else {
              addLog({ text: `  cd: ${args[1]}: No such directory`, color: "shock" });
            }
          }
          break;
        }

        // ── CAT ──────────────────────────────────────────────────────────────
        case "cat": {
          if (!args[1]) { addLog({ text: "  cat: missing file operand", color: "shock" }); break; }
          const d = getDir(cwd);
          const f = d[args[1]];
          if (!f) {
            addLog({ text: `  cat: ${args[1]}: No such file`, color: "shock" });
          } else if (typeof f === "object") {
            addLog({ text: `  cat: ${args[1]}: Is a directory. Use 'cd ${args[1]}'`, color: "shock" });
          } else if (f === "__EXECUTABLE__") {
            setPhase("join_name");
            addLogs([
              { text: "  Executing init_protocol.sh...", color: "dim" },
              { text: "", color: "dim", instant: true },
              { text: "  ██ INITIATING ACCESS REQUEST PROTOCOL v2 ██", color: "reso" },
              { text: "", color: "dim", instant: true },
              { text: "─── STEP 1 / 3 ── IDENTITY ASSIGNMENT ──────────────────", color: "gold" },
              { text: "Enter your codename:", color: "white" },
            ], 0, 80);
          } else {
            const lines = (f as string).split("\n");
            addLogs(
              [
                { text: `  ── ${args[1]} ─────────────────────────────────────────`, color: "dim" },
                ...lines.map((l) => ({ text: `  ${l}`, color: "white" as Color })),
                { text: `  ────────────────────────────────────────────────────────`, color: "dim" },
              ],
              0, 25
            );
          }
          break;
        }

        // ── DECRYPT ──────────────────────────────────────────────────────────
        case "decrypt": {
          if (!args[1]) { addLog({ text: "  decrypt: missing file operand", color: "shock" }); break; }
          const d = getDir(cwd);
          const f = d[args[1]];
          if (!f || typeof f === "object") {
            addLog({ text: `  decrypt: ${args[1]}: Not decryptable`, color: "shock" });
            break;
          }
          addLogs([
            { text: `  Decrypting ${args[1]}...`, color: "dim" },
            { text: "  Loading AES-GCM-256 private key...........  [OK]", color: "dim" },
            { text: "  Verifying HMAC-SHA-256 signature..........  [OK]", color: "dim" },
            { text: "  Decryption complete.", color: "reso" },
            { text: "", color: "dim", instant: true },
            ...(f as string).split("\n").map((l) => ({ text: `  ${l}`, color: "white" as Color })),
            { text: "", color: "dim", instant: true },
          ], 0, 55);
          break;
        }

        // ── SCAN ─────────────────────────────────────────────────────────────
        case "scan": {
          if (phase === "busy") { addLog({ text: "  Process already running.", color: "dim" }); break; }
          setPhase("busy");
          const threats = [
            { name: "Instagram.exe",  loc: "Menlo Park, CA, US",   ms: 12 },
            { name: "TikTok.exe",     loc: "Beijing, CN",           ms: 47 },
            { name: "Snapchat.exe",   loc: "Santa Monica, CA, US",  ms: 8  },
            { name: "BeReal.exe",     loc: "Paris, FR",             ms: 29 },
            { name: "Twitter.exe",    loc: "San Francisco, CA, US", ms: 6  },
          ];
          const bar = (n: number, max = 20) =>
            "█".repeat(Math.round((n / 100) * max)) + "░".repeat(max - Math.round((n / 100) * max));

          addLogs([
            { text: "", color: "dim", instant: true },
            { text: "  ▶ INITIATING GLOBAL NETWORK THREAT SCAN", color: "reso" },
            { text: `  Targeting ${threats.length} known legacy nodes...`, color: "dim" },
            { text: "", color: "dim", instant: true },
          ], 0, 60);

          let base = 350;
          threats.forEach((t, i) => {
            const pct = Math.round(((i + 1) / threats.length) * 100);
            addLog({ text: `  [${String(i + 1).padStart(2)}/${threats.length}]  SCANNING: ${t.name.padEnd(20)} ${t.loc}`, color: "dim" }, base);
            addLog({ text: `         PROBE RTT: ${t.ms}ms  →  THREAT CONFIRMED`, color: "shock" }, base + 250);
            addLog({ text: `         PROGRESS: [${bar(pct)}] ${pct}%`, color: "reso" }, base + 400);
            base += 800;
          });

          addLogs([
            { text: "", color: "dim", instant: true },
            { text: "  ┌──────────────────────────────────────────┐", color: "reso" },
            { text: `  │  SCAN COMPLETE — ${threats.length} threats neutralized   │`, color: "reso" },
            { text: "  │  Network integrity: VERIFIED             │", color: "green" },
            { text: "  │  RESONATE protocol: ACTIVE               │", color: "green" },
            { text: "  └──────────────────────────────────────────┘", color: "reso" },
            { text: "", color: "dim", instant: true },
          ], base, 60);
          setTimeout(() => setPhase("idle"), base + 500);
          break;
        }

        // ── NMAP ─────────────────────────────────────────────────────────────
        case "nmap": {
          if (phase === "busy") { addLog({ text: "  Process already running.", color: "dim" }); break; }
          setPhase("busy");
          const target = args[1] || "resonate.mesh";
          const ports = [
            { port: 22,   service: "ssh",     state: "closed" },
            { port: 80,   service: "http",    state: "filtered" },
            { port: 443,  service: "https",   state: "filtered" },
            { port: 4433, service: "p2p-mesh",state: "open" },
            { port: 8443, service: "empathy-engine", state: "open" },
            { port: 9000, service: "neural-inference", state: "open" },
            { port: 51820,service: "wireguard", state: "open" },
          ];
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: `  Starting NMAP scan of ${target}...`, color: "reso" },
            { text: `  Scan initiated at ${new Date().toISOString()}`, color: "dim" },
            { text: "", color: "dim", instant: true },
            { text: "  PORT     STATE     SERVICE", color: "gold" },
            { text: "  ─────────────────────────────────────────", color: "dim" },
            ...ports.map((p) => ({
              text: `  ${String(p.port).padEnd(8)} ${
                p.state === "open" ? "open     " : p.state === "filtered" ? "filtered " : "closed   "
              } ${p.service}`,
              color: (p.state === "open" ? "green" : p.state === "filtered" ? "dim" : "shock") as Color,
            })),
            { text: "", color: "dim", instant: true },
            { text: `  ${ports.filter(p=>p.state==="open").length} open / ${ports.filter(p=>p.state==="filtered").length} filtered / ${ports.filter(p=>p.state==="closed").length} closed`, color: "white" },
            { text: "", color: "dim", instant: true },
          ], 0, 60);
          setTimeout(() => setPhase("idle"), 2000);
          break;
        }

        // ── HACK ─────────────────────────────────────────────────────────────
        case "hack": {
          if (phase === "busy") { addLog({ text: "  Process already running.", color: "dim" }); break; }
          const tgt = args[1] || "legacy_social.net";
          setPhase("busy");
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: `  ▶ TARGETING: ${tgt}`, color: "shock" },
            { text: "  Scanning for vulnerabilities...", color: "dim" },
            { text: "  CVE-2024-0001: Buffer overflow in auth module     [FOUND]", color: "shock" },
            { text: "  CVE-2024-0017: Exposed admin panel                [FOUND]", color: "shock" },
            { text: "  CVE-2024-0089: Unsalted SHA-1 password hashes     [FOUND]", color: "shock" },
            { text: "", color: "dim", instant: true },
            { text: "  Crafting exploit payload...", color: "dim" },
            { text: "  Injecting shellcode via overflow vector...", color: "dim" },
            { text: "  Escalating privileges...", color: "dim" },
            { text: "  Extracting user data...", color: "dim" },
            { text: "", color: "dim", instant: true },
            { text: "  ✗ BREACH ABORTED.", color: "reso" },
            { text: "", color: "dim", instant: true },
            { text: "  RESONATE does not attack. We build alternatives.", color: "reso" },
            { text: "  The old web will collapse under its own weight.", color: "dim" },
            { text: "  Run 'join' to be part of what comes next.", color: "gold" },
            { text: "", color: "dim", instant: true },
          ], 0, 160);
          setTimeout(() => setPhase("idle"), 3500);
          break;
        }

        // ── TRACE ────────────────────────────────────────────────────────────
        case "trace": {
          const dest = args[1] || "resonate.mesh";
          const hops = [
            { n: 1,  addr: "192.168.1.1",    ms: 1,  name: "local-gateway" },
            { n: 2,  addr: "10.0.0.1",       ms: 4,  name: "isp-edge" },
            { n: 3,  addr: "72.14.203.99",   ms: 9,  name: "backbone-01" },
            { n: 4,  addr: "108.170.252.1",  ms: 14, name: "transit-node" },
            { n: 5,  addr: "216.239.35.8",   ms: 19, name: "cdn-edge" },
            { n: 6,  addr: "172.16.0.1",     ms: 22, name: "resonate.gateway" },
            { n: 7,  addr: "10.8.0.1",       ms: 24, name: "resonate.mesh-entry" },
          ];
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: `  traceroute to ${dest}`, color: "reso" },
            { text: "  HOP   ADDRESS           MS     NODE", color: "gold" },
            { text: "  ────────────────────────────────────────────────────", color: "dim" },
            ...hops.map((h) => ({
              text: `  ${String(h.n).padEnd(5)} ${h.addr.padEnd(17)} ${String(h.ms + "ms").padEnd(7)} ${h.name}`,
              color: (h.n < 6 ? "dim" : h.n === 6 ? "gold" : "reso") as Color,
            })),
            { text: "", color: "dim", instant: true },
            { text: `  Route complete. ${hops.length} hops. Destination: SECURE.`, color: "reso" },
            { text: "", color: "dim", instant: true },
          ], 0, 90);
          break;
        }

        // ── PING ─────────────────────────────────────────────────────────────
        case "ping": {
          const nodes = [
            { name: "node.alpha-prime",      ms: Math.floor(Math.random()*8)+1 },
            { name: "node.beta-sentinel",    ms: Math.floor(Math.random()*8)+1 },
            { name: "node.gamma-echo",       ms: Math.floor(Math.random()*8)+1 },
            { name: "node.delta-nexus",      ms: Math.floor(Math.random()*8)+1 },
          ];
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: "  PINGING RESONATE MESH NETWORK...", color: "dim" },
            ...nodes.map((n) => ({
              text: `  PONG  ${n.name.padEnd(26)} ${n.ms}ms  TTL=64`,
              color: "reso" as Color,
            })),
            { text: "", color: "dim", instant: true },
            { text: `  ${nodes.length} packets transmitted, ${nodes.length} received, 0% packet loss`, color: "green" },
            { text: `  avg rtt: ${Math.round(nodes.reduce((a,n)=>a+n.ms,0)/nodes.length)}ms`, color: "dim" },
            { text: "", color: "dim", instant: true },
          ], 0, 70);
          break;
        }

        // ── STATUS ───────────────────────────────────────────────────────────
        case "status":
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: "  ┌── RESONATE OS — SYSTEM STATUS ───────────────────┐", color: "reso" },
            { text: "  │                                                   │", color: "reso" },
            { text: `  │  NODE STATUS       ●  ONLINE                     │`, color: "green" },
            { text: `  │  ENCRYPTION        ●  AES-GCM-256 ACTIVE         │`, color: "green" },
            { text: `  │  MESH PEERS           ${(Math.floor(Math.random()*800)+400).toString().padEnd(26)}│`, color: "white" },
            { text: `  │  P2P LATENCY          ${(Math.floor(Math.random()*8)+1)+"ms avg".padEnd(26)}│`, color: "white" },
            { text: `  │  NEURAL ENGINE     ●  INFERENCE READY            │`, color: "green" },
            { text: `  │  WAITLIST             ${(Math.floor(Math.random()*500)+700)+" in queue".padEnd(26)}│`, color: "gold" },
            { text: `  │  UPTIME               99.97%                     │`, color: "green" },
            { text: `  │  THREAT LEVEL      ●  0  (CLEAR)                 │`, color: "green" },
            { text: "  │                                                   │", color: "reso" },
            { text: "  └───────────────────────────────────────────────────┘", color: "reso" },
            { text: "", color: "dim", instant: true },
          ], 0, 50);
          break;

        // ── WHOAMI ───────────────────────────────────────────────────────────
        case "whoami":
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: "  IDENTITY SCAN IN PROGRESS...", color: "dim" },
            { text: "  UID:          UNCLASSIFIED", color: "shock" },
            { text: "  ACCESS:       OBSERVER", color: "dim" },
            { text: "  CLEARANCE:    LEVEL 0 — PENDING VERIFICATION", color: "gold" },
            { text: "  NODE:         UNASSIGNED", color: "dim" },
            { text: "", color: "dim", instant: true },
            { text: "  Run 'join' to elevate your clearance to LEVEL 5.", color: "reso" },
            { text: "", color: "dim", instant: true },
          ], 0, 90);
          break;

        // ── CLEAR ────────────────────────────────────────────────────────────
        case "clear":
          setLogs([]);
          break;

        // ── REBOOT ───────────────────────────────────────────────────────────
        case "reboot":
          setPhase("busy");
          addLogs([
            { text: "  Sending SIGTERM to all processes...", color: "shock" },
            { text: "  Unmounting filesystem...", color: "dim" },
            { text: "  Flushing kernel buffers...", color: "dim" },
            { text: "  System rebooting...", color: "shock" },
          ], 0, 200);
          setTimeout(() => {
            setLogs(BOOT_LINES.map((l) => ({ ...l, id: uid() })));
            setPhase("idle");
            setCwd(["home"]);
            setHistory([]);
          }, 1200);
          break;

        // ── HISTORY ──────────────────────────────────────────────────────────
        case "history":
          if (!history.length) {
            addLog({ text: "  No command history.", color: "dim" });
          } else {
            addLogs(
              history.map((h, i) => ({
                text: `  ${String(i + 1).padStart(3)}  ${h}`,
                color: "dim" as Color,
              })),
              0, 15
            );
          }
          break;

        // ── EXEC ─────────────────────────────────────────────────────────────
        case "exec":
          addLogs([
            { text: "  Permission denied.", color: "shock" },
            { text: "  Direct execution is disabled on this node.", color: "dim" },
            { text: "  Use 'join' to request elevated access.", color: "reso" },
          ], 0, 80);
          break;

        // ── MATRIX ───────────────────────────────────────────────────────────
        case "matrix":
          addLogs([
            { text: "", color: "dim", instant: true },
            { text: "  01001000 01100001 01101100 01101100 01101111", color: "reso" },
            { text: "  WAKE UP, NEO.", color: "shock" },
            { text: "  THE MATRIX HAS YOU.", color: "shock" },
            { text: "  ...wrong movie.", color: "dim" },
            { text: "  But the idea is the same.", color: "dim" },
            { text: "  Run 'join' to enter the right one.", color: "reso" },
            { text: "", color: "dim", instant: true },
          ], 0, 200);
          break;

        // ── DEFAULT ──────────────────────────────────────────────────────────
        default:
          addLog({ text: `  command not found: ${cmd}  (type 'help')`, color: "shock" });
      }

      if (trimmed !== "clear") {
        setHistory((p) => [...p.slice(-49), trimmed]);
      }
      setHistIdx(-1);
    },
    [addLog, addLogs, cwd, phase, joinData, history, audio]
  );

  // ── Keyboard ───────────────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
      return;
    }
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setTabCycle([]);
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
    // Reset tab state on other keys
    if (e.key !== "Tab") setTabCycle([]);
  };

  // ── Prompt ─────────────────────────────────────────────────────────────────

  const promptStr = useMemo(() => {
    if (phase === "join_name")  return "codename ›";
    if (phase === "join_email") return "email    ›";
    if (phase === "join_role")  return "role     ›";
    return `root@resonate:~/${cwd.join("/")} $`;
  }, [phase, cwd]);

  const promptColor = (phase === "join_name" || phase === "join_email" || phase === "join_role")
    ? "text-[#FFD700]" : "text-[#00F0FF]";

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="bg-black min-h-screen flex flex-col p-3 md:p-6 pt-24 pb-6 relative overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Moving scanline */}
      <div
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 right-0 h-24 z-50"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,240,255,0.025), transparent)" }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,240,255,0.03) 0%, transparent 70%)" }}
      />

      <div
        className="w-full max-w-5xl mx-auto flex-1 flex flex-col relative z-10"
        style={{ filter: "drop-shadow(0 0 80px rgba(0,240,255,0.06))" }}
      >
        {/* Title bar */}
        <div className="bg-[#050505] border border-[#00F0FF]/25 border-b-0 h-10 flex items-center px-4 justify-between shrink-0 rounded-t-sm">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF0055]/80 hover:bg-[#FF0055] transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-400 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#00F0FF]/80 hover:bg-[#00F0FF] transition-colors cursor-pointer" />
          </div>
          <span className="text-[10px] font-mono text-white/30 tracking-[0.25em] uppercase">
            root@resonate-os — ~/{cwd.join("/")}
          </span>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {(phase === "join_name" || phase === "join_email" || phase === "join_role") && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="text-[10px] font-mono text-[#FFD700] tracking-widest uppercase"
                >
                  ● INPUT REQUIRED
                </motion.span>
              )}
            </AnimatePresence>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-[#00F0FF]"
            />
          </div>
        </div>

        {/* Log area */}
        <div
          className="border border-[#00F0FF]/20 border-t-0 border-b-0 bg-[#020202] flex-1 overflow-y-auto px-5 md:px-8 pt-5 pb-2 space-y-[2px]"
          style={{ minHeight: "65vh" }}
        >
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                className="leading-[1.65]"
              >
                {log.text === "" ? (
                  <div className="h-2" />
                ) : (
                  <ScrambleLine
                    text={log.text}
                    colorClass={colorClass(log.color)}
                    skip={log.instant || log.color === "dim"}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="border border-[#00F0FF]/20 border-t-[#00F0FF]/30 bg-[#030303] px-5 md:px-8 py-3.5 flex items-center gap-3 shrink-0">
          <span className={`font-mono text-sm whitespace-nowrap select-none ${promptColor}`}>
            {promptStr}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setTabCycle([]); }}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 font-mono text-sm text-[#E2E8F0] caret-transparent"
            placeholder={
              phase === "join_name"  ? "enter your codename..." :
              phase === "join_email" ? "enter your email..." :
              phase === "join_role"  ? "enter 1–5..." :
              "type a command..."
            }
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
          />
          {/* Fake blinking block cursor */}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.55, ease: "steps(1)" }}
            className="font-mono text-sm text-[#00F0FF] select-none"
          >▋</motion.span>
        </div>

        {/* Status bar */}
        <div className="bg-[#00F0FF]/5 border border-[#00F0FF]/25 border-t-0 px-5 py-1.5 flex justify-between items-center font-mono text-[9px] text-white/25 tracking-widest uppercase rounded-b-sm">
          <span>RESONATE OS v2.0.4</span>
          <span>ENC: AES-GCM-256</span>
          <span>MESH: ONLINE · 1,247 PEERS</span>
          <span>CMDS: {history.length}  ·  TAB: AUTOCOMPLETE</span>
        </div>
      </div>
    </div>
  );
}
