"use client";

import { TransitionShutter } from "@/presentation/components/transitions/TransitionShutter";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return <TransitionShutter>{children}</TransitionShutter>;
}
