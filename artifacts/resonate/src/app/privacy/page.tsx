

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen pt-40 pb-40">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl md:text-[6rem] font-display font-bold uppercase tracking-tighter text-white leading-[0.85] mb-12">
          PRIVACY <br/><span className="text-shock">PROTOCOL.</span>
        </h1>
        
        <div className="space-y-12 font-mono text-text-secondary leading-relaxed">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            LAST UPDATED: JUNE 2026. <br/>
            CLEARANCE: PUBLIC.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl text-white mb-4 uppercase">1. Zero-Knowledge Architecture</h2>
            <p>Your emotional data, audio recordings in Echo Studio, and chat logs are encrypted on your local device before transmission. We do not have the keys. We cannot read your journals. We do not want to.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl text-white mb-4 uppercase">2. Telemetry and Analytics</h2>
            <p>We log system performance and aggregate cohort metadata (e.g., "Class 10 is experiencing high stress"). This data is strictly anonymized. Personally Identifiable Information (PII) is stripped at the node level.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl text-shock mb-4 uppercase">3. Emergency Override (SOS)</h2>
            <p>If the local neural net detects immediate intent for self-harm or violence, anonymity protocols are suspended. The system will forcibly connect the node to verified Indian emergency helplines and designated emergency contacts. This is hardcoded into the system to protect human life.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
