
import { Globe } from 'lucide-react';

export default function Vision() {
  return (
    <section className="w-full py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          Powering the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Autonomous Economy
          </span>
        </h2>
        
        <div className="text-2xl text-muted leading-relaxed font-light">
          <p>The future economy will be driven by autonomous systems.</p>
          <p className="mt-4 text-white font-medium">Every action will require:</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-lg font-medium text-white">
          <span className="px-6 py-3 rounded-full border border-border bg-surface/50">Identity</span>
          <span className="px-6 py-3 rounded-full border border-border bg-surface/50">Verification</span>
          <span className="px-6 py-3 rounded-full border border-border bg-surface/50">Security</span>
          <span className="px-6 py-3 rounded-full border border-border bg-surface/50">Compliance</span>
          <span className="px-6 py-3 rounded-full border border-primary/50 bg-primary/10 text-primary glow-text">Trust</span>
        </div>

        <p className="text-xl text-muted max-w-2xl mx-auto mt-12">
          Venziq becomes the foundational trust layer enabling this future.
        </p>
      </div>

      {/* Abstract Globe/Network effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1000px] h-[1000px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-primary/30" />
        <div className="absolute inset-10 rounded-full border border-primary/20" />
        <div className="absolute inset-20 rounded-full border border-primary/10" />
        <Globe size={1000} strokeWidth={0.5} className="text-primary animate-[spin_120s_linear_infinite]" />
      </div>
    </section>
  );
}
