
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="w-full py-32 px-6 relative">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10 glass-panel p-12 md:p-20 border-primary/30 glow-box">
        <h2 className="text-5xl font-bold text-white tracking-tight">
          Build Trusted AI Systems
        </h2>
        
        <p className="text-xl text-muted">
          Deploy AI with security, governance, verification, and trust built into every action.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
          <a href="mailto:reachus@venziq.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-4 bg-primary hover:bg-primary/90 text-background font-bold text-lg rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center space-x-2">
            <span>Let's Connect</span>
            <ArrowRight size={20} />
          </a>
          
          <button className="w-full sm:w-auto px-10 py-4 bg-transparent hover:bg-surface text-white border border-border font-medium text-lg rounded-lg transition-all">
            Talk to Our Team
          </button>
        </div>
      </div>
    </section>
  );
}
