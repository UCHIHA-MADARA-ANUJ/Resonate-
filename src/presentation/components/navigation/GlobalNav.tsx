"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AcousticResonator } from "@/infrastructure/audio/AcousticResonator";
import { 
  Home, Info, Cpu, Users, BarChart, Terminal, Layers, Mic, Activity, MessageSquare, Shield, Archive, Map, PlusSquare, BookOpen, Lock, FileText, Briefcase
} from "lucide-react";

export function GlobalNav() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Grouped by section for dropdowns
  const navItems = [
    { name: "Terminal", href: "/terminal", icon: Terminal, color: "text-shock" },
    { name: "Home", href: "/", icon: Home, color: "text-white" },
    { name: "Features", href: "/features", icon: Layers, color: "text-reso", sub: [
      { n: "ResoQuests", h: "/features/resoquests", i: Activity },
      { n: "Echo Studio", h: "/features/echo-studio", i: Mic },
      { n: "Mood Genome", h: "/features/mood-genome", i: BarChart },
      { n: "Empathy Coach", h: "/features/empathy-coach", i: MessageSquare },
      { n: "Safe Circles", h: "/features/safe-circles", i: Shield },
      { n: "Heritage", h: "/features/heritage-echoes", i: Archive },
    ]},
    { name: "Engine", href: "/engine", icon: Cpu, color: "text-white", sub: [
      { n: "Tech Stack", h: "/technology", i: Cpu },
      { n: "CRDT Sync", h: "/crdt", i: Activity },
      { n: "Telemetry", h: "/telemetry", i: BarChart },
    ]},
    { name: "About", href: "/about", icon: Info, color: "text-white", sub: [
      { n: "Manifesto", h: "/manifesto", i: FileText },
      { n: "Founders", h: "/founders", i: Users },
      { n: "Careers", h: "/careers", i: Briefcase },
    ]},
    { name: "Impact", href: "/impact", icon: BarChart, color: "text-white", sub: [
      { n: "For Schools", h: "/schools", i: BookOpen },
      { n: "Roadmap", h: "/roadmap", i: Map },
    ]},
    { name: "Protocol", href: "/protocol", icon: Lock, color: "text-white", sub: [
      { n: "Privacy", h: "/privacy", i: Lock },
      { n: "Terms", h: "/terms", i: FileText },
    ]},
    { name: "Join", href: "/join", icon: PlusSquare, color: "text-white" },
  ];

  const handleHover = (name: string) => {
    setHoveredItem(name);
    try { AcousticResonator.getInstance().playSoftHover(); } catch(e) {}
  };

  const handleClick = () => {
    try { AcousticResonator.getInstance().playDeepThud(); } catch(e) {}
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto">
      <div className="bg-black/90 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl flex items-center gap-2 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.sub && item.sub.some(s => pathname === s.h));
          const isHovered = hoveredItem === item.name;

          return (
            <div 
              key={item.name}
              className="relative group"
              onMouseEnter={() => handleHover(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link 
                href={item.href}
                onClick={handleClick}
                className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <item.icon className={`w-5 h-5 ${item.color} ${isActive ? 'scale-110' : ''} transition-transform duration-300`} />
                {isActive && <motion.div layoutId="nav-dot" className="absolute -bottom-1 w-1 h-1 rounded-full bg-reso" />}
              </Link>

              {/* Hover Dropdown / Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-black/95 backdrop-blur-xl border border-white/10 p-2 rounded-xl min-w-[160px] flex flex-col gap-1 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  >
                    <div className="text-[10px] text-reso font-mono tracking-widest uppercase px-3 py-2 border-b border-white/10 mb-1">
                      {item.name}
                    </div>
                    {item.sub ? (
                      item.sub.map((subItem) => (
                        <Link
                          key={subItem.n}
                          href={subItem.h}
                          onClick={handleClick}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white font-mono text-xs uppercase tracking-wider"
                        >
                          <subItem.i className="w-4 h-4 text-white/50" />
                          {subItem.n}
                        </Link>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-white/50 font-mono text-xs uppercase tracking-wider">
                        Navigate to {item.name}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
