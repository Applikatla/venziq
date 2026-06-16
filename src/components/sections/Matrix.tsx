
import { Check, X } from 'lucide-react';

export default function Matrix() {
  const layers = ["AI", "Security", "Identity", "Verification", "Blockchain"];
  const competitors = [
    { name: "Traditional Security", coverage: [false, true, false, false, false] },
    { name: "Identity Vendors", coverage: [false, false, true, false, false] },
    { name: "AI Vendors", coverage: [true, false, false, false, false] },
    { name: "Blockchain Vendors", coverage: [false, false, false, false, true] },
    { name: "Venziq", coverage: [true, true, true, true, true], isPrimary: true },
  ];

  return (
    <section className="w-full py-24 px-6 relative">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Venziq Operates at the Intersection</h2>
          <p className="text-xl text-muted">The only company covering all trust layers required for autonomous systems.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-border text-muted font-medium w-1/3">Provider</th>
                {layers.map(layer => (
                  <th key={layer} className="p-4 border-b border-border text-white font-medium text-center text-sm md:text-base">
                    {layer}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp, idx) => (
                <tr key={idx} className={comp.isPrimary ? "bg-primary/5" : ""}>
                  <td className={`p-4 border-b border-border font-medium ${comp.isPrimary ? 'text-primary glow-text text-lg' : 'text-muted'}`}>
                    {comp.name}
                  </td>
                  {comp.coverage.map((hasCoverage, i) => (
                    <td key={i} className="p-4 border-b border-border text-center">
                      {hasCoverage ? (
                        <Check size={20} className={`mx-auto ${comp.isPrimary ? 'text-primary' : 'text-white'}`} />
                      ) : (
                        <X size={20} className="mx-auto text-muted/30" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
