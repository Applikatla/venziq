import { motion } from 'framer-motion';
import { ShieldAlert, Bot, Fingerprint, EyeOff, Link } from 'lucide-react';

export default function Platform() {
  const layers = [
    {
      title: "AI Security Platform",
      icon: ShieldAlert,
      items: ["Governance", "Monitoring", "Risk Management", "Compliance"],
      color: "border-secondary/50 hover:shadow-[0_0_30px_rgba(108,99,255,0.15)]"
    },
    {
      title: "AI Agent Platform",
      icon: Bot,
      items: ["Enterprise Agents", "Workflow Automation", "Multi-Agent Systems", "Agent Governance"],
      color: "border-primary/50 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] glow-border"
    },
    {
      title: "Identity & Verification",
      icon: Fingerprint,
      items: ["Passwordless Auth", "Authorization", "Digital Identity", "Credential Verification"],
      color: "border-accent/50 hover:shadow-[0_0_30px_rgba(0,255,179,0.15)]"
    },
    {
      title: "Zero Knowledge Infrastructure",
      icon: EyeOff,
      items: ["Privacy Preservation", "Selective Disclosure", "ZK Compliance", "ZK Verification"],
      color: "border-white/20 hover:border-white/50"
    },
    {
      title: "Blockchain Trust Layer",
      icon: Link,
      items: ["Immutable Audit Trails", "Verification Records", "Compliance Logs", "Trust Registries"],
      color: "border-primary/30 hover:border-primary/70"
    }
  ];

  return (
    <section id="platform" className="w-full py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">One Platform.<br />Five Trust Layers.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {layers.map((layer, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-panel p-6 flex flex-col items-center text-center transition-all cursor-pointer ${layer.color}`}
            >
              <div className="p-4 rounded-2xl bg-surface mb-6 border border-border">
                <layer.icon size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-6 h-12 flex items-center justify-center">{layer.title}</h3>
              <ul className="space-y-3 text-sm text-muted w-full">
                {layer.items.map((item, i) => (
                  <li key={i} className="bg-background/50 rounded p-2 border border-transparent hover:border-border transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
