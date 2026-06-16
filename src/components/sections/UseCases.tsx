import { motion } from 'framer-motion';

export default function UseCases() {
  const industries = [
    { name: "Financial Services", problem: "Fraud in automated trading", solution: "ZK verification", outcome: "Zero fraudulent trades" },
    { name: "Healthcare", problem: "Patient data privacy in AI diagnosis", solution: "Selective disclosure", outcome: "HIPAA compliant AI" },
    { name: "Government", problem: "Unverified citizen requests", solution: "Identity layer", outcome: "Automated secure services" },
    { name: "Insurance", problem: "Fake claims via AI agents", solution: "Blockchain trust trail", outcome: "Immutable claim records" },
    { name: "Telecommunications", problem: "Network automation risks", solution: "Security governance", outcome: "Resilient infrastructure" },
    { name: "Enterprise SaaS", problem: "Third-party AI integrations", solution: "Trust infrastructure", outcome: "Secure API economy" },
    { name: "Manufacturing", problem: "IoT machine tampering", solution: "Machine identity", outcome: "Trusted supply chain" },
    { name: "Supply Chain", problem: "Counterfeit verification", solution: "Trust registries", outcome: "End-to-end provenance" },
  ];

  return (
    <section id="use-cases" className="w-full py-24 px-6 relative bg-surface/30">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Enterprise Use Cases</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-6 flex flex-col h-full hover:border-secondary/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-white mb-4 pb-4 border-b border-border">{ind.name}</h3>
              <div className="space-y-4 text-sm flex-grow">
                <div>
                  <span className="text-muted block text-xs uppercase tracking-wider mb-1">Problem</span>
                  <span className="text-white">{ind.problem}</span>
                </div>
                <div>
                  <span className="text-muted block text-xs uppercase tracking-wider mb-1">Solution</span>
                  <span className="text-secondary font-medium">{ind.solution}</span>
                </div>
                <div>
                  <span className="text-muted block text-xs uppercase tracking-wider mb-1">Outcome</span>
                  <span className="text-primary font-medium">{ind.outcome}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
