import { motion } from 'framer-motion';
import { Cpu, Fingerprint, ShieldCheck, FileCheck, Network } from 'lucide-react';

export default function TrustNetwork() {
  const nodes = [
    { icon: Cpu, name: "AI Agents", color: "text-primary border-primary" },
    { icon: FileCheck, name: "Verification Layer", color: "text-secondary border-secondary" },
    { icon: ShieldCheck, name: "Security Layer", color: "text-accent border-accent" },
    { icon: FileCheck, name: "Compliance Layer", color: "text-white border-white/50" },
    { icon: Fingerprint, name: "Identity Layer", color: "text-primary border-primary" },
    { icon: Network, name: "Blockchain Layer", color: "text-secondary border-secondary" },
  ];

  return (
    <section className="w-full py-24 px-6 relative bg-surface/30 border-y border-border overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Built for Autonomous Systems</h2>
          <p className="text-xl text-muted">A dynamic trust architecture that propagates verification through every layer.</p>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 max-w-4xl mx-auto border border-border/50 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none border-dashed" />
          <div className="absolute inset-8 max-w-3xl mx-auto border border-border/30 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />
          
          <div className="relative w-full max-w-3xl aspect-square">
            {nodes.map((node, idx) => {
              const angle = (idx / nodes.length) * Math.PI * 2;
              const radius = 250;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 glass-panel rounded-full flex flex-col items-center justify-center space-y-2 border-2 ${node.color} shadow-[0_0_30px_rgba(0,0,0,0.5)]`}
                  style={{ x, y }}
                >
                  <node.icon size={24} className={node.color.split(' ')[0]} />
                  <span className="text-xs font-medium text-center leading-tight text-white">{node.name}</span>
                </motion.div>
              );
            })}
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-background border border-primary/50 rounded-full flex items-center justify-center z-20 glow-box"
            >
              <div className="text-center">
                <div className="text-xl font-bold text-white tracking-wider">VENZIQ</div>
                <div className="text-xs text-primary mt-1">TRUST CORE</div>
              </div>
            </motion.div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.3))' }}>
              {nodes.map((_, idx) => {
                const angle = (idx / nodes.length) * Math.PI * 2;
                const radius = 250;
                const x2 = 50 + (Math.cos(angle) * radius) / 7.5; // roughly matching percentages
                const y2 = 50 + (Math.sin(angle) * radius) / 7.5;
                return (
                  <line 
                    key={idx} 
                    x1="50%" 
                    y1="50%" 
                    x2={`${x2}%`} 
                    y2={`${y2}%`} 
                    stroke="rgba(0,229,255,0.2)" 
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-[dash_20s_linear_infinite]"
                  />
                )
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
