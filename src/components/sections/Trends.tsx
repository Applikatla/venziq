import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export default function Trends() {
  const trends = [
    "Rise of AI Agents",
    "Enterprise Automation",
    "AI Regulation",
    "Identity Modernization",
    "Zero-Knowledge Adoption",
    "Digital Trust Requirements"
  ];

  return (
    <section className="w-full py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">The Next Infrastructure Wave</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 border-border/50 hover:border-primary/50 transition-colors flex items-center space-x-4"
            >
              <div className="p-2 rounded bg-surface border border-border">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <span className="font-medium text-white">{trend}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
