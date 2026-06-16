

import { motion } from "framer-motion";
import { useLocation } from "wouter";

// The Awwwards-style multi-column shutter transition
export function TransitionShutter({ children }: { children: React.ReactNode }) {
  const [pathname] = useLocation();

  const anim = (variants: any) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants
    };
  };

  const columns = 5;

  const columnVariants = {
    initial: { top: 0 },
    enter: (i: number) => ({
      top: "100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
    }),
    exit: (i: number) => ({
      top: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
    })
  };

  return (
    <div key={pathname} className="relative bg-black min-h-screen">
      {/* The 5-column shutter blind effect */}
      <div className="fixed inset-0 pointer-events-none z-[9999] flex w-full h-full">
        {Array.from({ length: columns }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            {...anim(columnVariants)}
            className="h-full w-full bg-void border-r border-white/5 last:border-r-0 relative"
          >
            {/* Subtle glow edge on the shutter */}
            <div className="absolute bottom-0 w-full h-1 bg-reso opacity-20" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
