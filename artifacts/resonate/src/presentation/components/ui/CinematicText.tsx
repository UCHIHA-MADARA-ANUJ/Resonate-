

import { motion } from "framer-motion";

export function CinematicText({ 
  text, 
  className = "",
  delay = 0 
}: { 
  text: string; 
  className?: string;
  delay?: number;
}) {
  // Advanced character-level splitting for true cinematic reveals
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden mr-[0.25em] pb-[0.1em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ y: "150%", rotateX: -90, opacity: 0 }}
              whileInView={{ y: "0%", rotateX: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1.2,
                delay: delay + (wordIndex * 0.1) + (charIndex * 0.03),
                ease: [0.16, 1, 0.3, 1], // The "Apple" curve
              }}
              style={{ transformOrigin: "50% 100%", display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
