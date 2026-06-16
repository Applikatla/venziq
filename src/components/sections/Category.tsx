

export default function Category() {
  return (
    <section className="w-full py-24 px-6 border-b border-border/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex px-3 py-1 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-sm font-medium">
          A New Enterprise Category
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          AI-Native Trust Infrastructure
        </h2>
        
        <div className="text-xl text-muted space-y-4 text-left md:text-center">
          <p>Every major technology shift creates a new infrastructure layer.</p>
          <p>Cloud created cloud infrastructure. Mobile created mobile platforms.</p>
          <p className="text-white font-medium">AI creates a new requirement: Trust Infrastructure.</p>
          <p>Venziq enables organizations to govern, secure, verify, and automate AI systems at enterprise scale.</p>
        </div>

        <div className="mt-16 p-8 glass-panel border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 text-lg font-medium text-muted">
            <span>AI</span>
            <span className="text-primary">+</span>
            <span>Security</span>
            <span className="text-primary">+</span>
            <span>Identity</span>
            <span className="text-primary">+</span>
            <span>Verification</span>
            <span className="text-primary">+</span>
            <span>Blockchain</span>
          </div>
          <div className="my-8 border-t border-border w-full flex justify-center items-center">
            <div className="w-8 h-1 bg-primary transform -translate-y-1/2 rounded-full glow-box" />
          </div>
          <div className="text-2xl font-bold text-white glow-text">
            Trust Infrastructure
          </div>
        </div>
      </div>
    </section>
  );
}
