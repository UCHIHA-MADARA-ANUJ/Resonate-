"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/animations/LoadingScreen";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {!isLoading && children}
      </div>
    </>
  );
}
