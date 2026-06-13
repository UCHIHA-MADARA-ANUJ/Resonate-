"use client";

import { motion } from "framer-motion";

export default function ProtocolPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-6xl md:text-[8rem] font-display font-bold uppercase tracking-tighter text-shock leading-[0.85] mb-20 text-outline-reso">
          THE RULES OF <br/> ENGAGEMENT.
        </h1>

        <div className="space-y-16 font-mono">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl text-white mb-4">I. Zero Data Harvesting</h3>
            <p className="text-text-secondary text-lg">We do not sell data. We do not run ads. If an entity requests access to user emotional states, the system self-terminates the request.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl text-white mb-4">II. Absolute Anonymity</h3>
            <p className="text-text-secondary text-lg">Identity is a construct we do not need. Users interact via cryptographic hashes. Peer circles rely on shared emotional states, not profiles.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl text-white mb-4">III. Forced Ejection for Toxicity</h3>
            <p className="text-text-secondary text-lg">Bullying, manipulation, and toxicity are legacy web diseases. The local AI moderator permanently bans any node exhibiting these traits. No appeals.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl text-shock mb-4">IV. SOS Override</h3>
            <p className="text-text-secondary text-lg">If self-harm intent is detected, anonymity protocols are overridden to engage emergency services and designated guardians. Life supersedes code.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
