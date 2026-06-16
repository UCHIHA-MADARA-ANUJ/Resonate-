"use client";

import { useState } from "react";
import { CinematicLoader } from "@/presentation/components/animations/CinematicLoader";
import { AnimatePresence } from "framer-motion";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <CinematicLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {!loading && children}
      </div>
    </>
  );
}
