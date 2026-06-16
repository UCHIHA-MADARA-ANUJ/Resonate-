

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference hidden md:block"
      animate={{
        x: position.x,
        y: position.y,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.5 }}
    >
      <motion.div
        className="w-4 h-4 bg-reso rounded-full absolute -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: isHovering ? 3 : 1, backgroundColor: isHovering ? "#FFFFFF" : "#00F0FF" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}
