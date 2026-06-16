

import { motion } from "framer-motion";

export function TextReveal({ 
  text, 
  delay = 0, 
  className = "" 
}: { 
  text: string; 
  delay?: number; 
  className?: string;
}) {
  const words = text.split(" ");
  
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex mr-[0.25em] mb-[-0.1em] pb-[0.1em]">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
