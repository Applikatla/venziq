import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Architecture() {
  const steps = [
    "Enterprise Applications",
    "Venziq AI Agent Layer",
    "Security & Governance Layer",
    "Identity Layer",
    "Zero-Knowledge Verification",
    "Blockchain Trust Layer",
    "External Systems"
  ];

  return (
    <section id="architecture" className="w-full py-24 px-6 relative bg-surface/30">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Trust by Design</h2>
          <p className="text-xl text-muted">A mathematically verifiable flow of trust from application to execution.</p>
        </div>

        <div className="relative p-8 glass-panel border-primary/20 flex flex-col items-center">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 -translate-x-1/2 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 w-full flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="w-full max-w-sm p-4 bg-background border border-border rounded-lg text-center font-medium text-white shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">{step}</span>
              </motion.div>
              
              {idx < steps.length - 1 && (
                <div className="h-12 flex items-center justify-center text-primary/50">
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowDown size={20} />
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
