

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Global Orchestrator to ensure GSAP contexts are clean
export function useGSAPOrchestrator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Global reveal triggers for any element with .gsap-reveal class
    const elements = document.querySelectorAll(".gsap-reveal");
    
    elements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 100, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}
