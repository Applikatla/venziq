import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
            <Shield size={14} />
            <span>The Future of Enterprise AI Security</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Trust Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              for the AI Economy
            </span>
          </h1>
          
          <div className="space-y-4 text-lg md:text-xl text-muted max-w-xl">
            <p className="font-medium text-white">
              The foundational platform that enables enterprises to deploy AI systems securely, privately, compliantly, and with verifiable trust.
            </p>
            <p className="text-base leading-relaxed">
              AI is becoming autonomous. Existing infrastructure was built for humans. 
              Venziq is building the trust layer required for AI agents, machine-to-machine 
              transactions, and autonomous enterprise operations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <a href="mailto:reachus@venziq.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-background font-semibold rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center space-x-2">
              <span>Let's Connect</span>
              <ArrowRight size={18} />
            </a>
            <button className="w-full sm:w-auto px-8 py-4 bg-surface hover:bg-surface-hover text-white border border-border font-medium rounded-lg transition-all flex items-center justify-center space-x-2">
              <Zap size={18} className="text-accent" />
              <span>View Architecture</span>
            </button>
          </div>
        </motion.div>

        {/* Hero Visual: Architecture Stack */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] w-full perspective-1000"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 transform-gpu rotate-x-12 rotate-y-[-10deg]">
            {[
              { name: "Applications", color: "border-white/20 text-white" },
              { name: "AI Agents", color: "border-primary/40 text-primary glow-box" },
              { name: "AI Security", color: "border-secondary/40 text-secondary" },
              { name: "Identity & Verification", color: "border-accent/40 text-accent" },
              { name: "Zero Knowledge Infrastructure", color: "border-white/20 text-white" },
              { name: "Blockchain Trust Layer", color: "border-primary/20 text-primary" },
              { name: "Enterprise Systems", color: "border-white/10 text-muted" },
            ].map((layer, idx) => (
              <motion.div
                key={layer.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                className={`w-full max-w-sm p-4 backdrop-blur-md bg-surface/50 border rounded-xl flex items-center justify-between transition-transform hover:-translate-y-1 hover:scale-105 cursor-pointer ${layer.color}`}
              >
                <span className="font-medium">{layer.name}</span>
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full ${layer.color.includes('text-primary') ? 'bg-primary' : 'bg-current'} animate-pulse`} />
                  <div className={`w-2 h-2 rounded-full ${layer.color.includes('text-primary') ? 'bg-primary' : 'bg-current'} animate-pulse delay-75`} />
                  <div className={`w-2 h-2 rounded-full ${layer.color.includes('text-primary') ? 'bg-primary' : 'bg-current'} animate-pulse delay-150`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
