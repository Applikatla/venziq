import { motion } from 'framer-motion';
import { AlertTriangle, Lock, Users, Network, FileText, Database } from 'lucide-react';

export default function Problem() {
  const stats = [
    { icon: AlertTriangle, text: "AI systems act without accountability.", color: "text-red-400" },
    { icon: FileText, text: "Compliance requirements are increasing.", color: "text-orange-400" },
    { icon: Network, text: "Agent-driven workflows lack verification.", color: "text-yellow-400" },
    { icon: Lock, text: "Traditional security was built for human users.", color: "text-primary" },
    { icon: Users, text: "Identity systems were not designed for AI agents.", color: "text-secondary" },
    { icon: Database, text: "Data privacy risks continue to grow.", color: "text-accent" },
  ];

  return (
    <section className="w-full py-24 px-6 relative bg-surface/30">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">The AI Trust Gap</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            The transition to autonomous systems exposes critical vulnerabilities in legacy enterprise architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 flex items-start space-x-4 hover:border-border/80 transition-colors"
            >
              <div className={`p-3 rounded-lg bg-background border border-border ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <p className="text-white font-medium mt-2">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
