

import { motion } from "framer-motion";
import { TextReveal } from "@/presentation/components/TextReveal";

const ARTICLES = [
  { id: 1, title: "Surviving the Board Exams Matrix", tag: "ACADEMICS", date: "12.06.2026" },
  { id: 2, title: "Building Algorithmic Emotional Intelligence", tag: "SYSTEMS", date: "05.06.2026" },
  { id: 3, title: "Why We Refuse to Build Another Social Feed", tag: "MANIFESTO", date: "28.05.2026" },
  { id: 4, title: "The P2P WebRTC Security Model", tag: "ENGINEERING", date: "15.05.2026" },
];

export default function BlogPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-20 text-outline-reso">
          <TextReveal text="DATA" /> <br/>
          <TextReveal text="LOGS." delay={0.1} />
        </h1>

        <div className="flex flex-col border-t border-white/20">
          {ARTICLES.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 border-b border-white/20 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-8 mb-4 md:mb-0">
                <span className="font-mono text-xs text-reso tracking-widest uppercase border border-reso/30 bg-reso/5 px-2 py-1">
                  {article.tag}
                </span>
                <h2 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-tighter group-hover:text-reso transition-colors">
                  {article.title}
                </h2>
              </div>
              <span className="font-mono text-sm text-text-secondary">{article.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
