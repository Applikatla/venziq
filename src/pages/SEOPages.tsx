import { ArrowLeft } from 'lucide-react'
import { Section } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { RouteLink } from '../components/RouteLink'

function PageHeader({ title, eyebrow, description }: { title: string, eyebrow: string, description: string }) {
  return (
    <section className="relative overflow-hidden pb-12 pt-32">
      <div className="shell">
        <RouteLink to="/" className="mono-eyebrow inline-flex items-center gap-2 text-faint transition-colors hover:text-ink">
          <ArrowLeft size={13} aria-hidden="true" /> back to home
        </RouteLink>
        <p className="mono-eyebrow mb-5 mt-8">{eyebrow}</p>
        <DecodeHeadline as="h1" trigger="mount" text={title} className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-tight md:text-5xl" />
        <p className="mt-6 max-w-2xl text-lg text-muted">{description}</p>
      </div>
    </section>
  )
}

export function BlackBoxRecorderPage() {
  return (
    <main>
      <PageHeader
        eyebrow="AI Trust Infrastructure"
        title="The Black Box Recorder for AI Agents"
        description="Venziq captures AI system activity and creates verifiable records that help organizations answer: Why did my AI agent do this?"
      />
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">What is an AI black box recorder?</h2>
          <p className="text-muted leading-relaxed mb-8">Just like in aviation, autonomous systems need a tamper-proof record of events. An AI black box recorder captures every input, state change, and decision an AI agent makes, securing it with cryptographic trust verification.</p>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Why autonomous agents need accountability</h2>
          <p className="text-muted leading-relaxed mb-8">When an AI agent takes real-world actions, organizations must be able to verify why a decision was made. What caused this AI failure? Can I prove my AI records were not changed? Traditional logs can be modified or deleted. Venziq provides a verifiable, immutable audit trail.</p>
          <h2 className="text-2xl font-semibold tracking-tight mb-4">How verification works</h2>
          <p className="text-muted leading-relaxed">Venziq captures execution metadata, encrypts the evidence, generates content fingerprints, and anchors Merkle proofs to independent trust layers for verification.</p>
        </div>
      </Section>
    </main>
  )
}

export function AgentAuditTrailPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Agent Accountability"
        title="Tamper-Proof AI Agent Audit Trails"
        description="Create verifiable, immutable execution histories for your autonomous AI systems. How do I audit autonomous AI? Start here."
      />
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">The Need for AI Audit Trails</h2>
          <p className="text-muted leading-relaxed">As enterprise AI moves from chat to action, the need for cryptographic AI auditing becomes paramount. Venziq provides the infrastructure to guarantee AI accountability with a verifiable AI execution history.</p>
        </div>
      </Section>
    </main>
  )
}

export function ArchitecturePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Architecture"
        title="How Venziq Trust Infrastructure Works"
        description="Convert chaotic AI actions into verifiable, ordered evidence using our cryptographic trust layer."
      />
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">1. AI Agent Execution</h2>
          <p className="text-muted leading-relaxed mb-8">LangChain, CrewAI, AutoGen, and Flowise agents execute tasks natively within your environment.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">2. Venziq Connector Layer</h2>
          <p className="text-muted leading-relaxed mb-4">Our middleware captures critical execution context:</p>
          <ul className="list-disc pl-5 text-muted leading-relaxed mb-8 space-y-1">
            <li>User identity</li>
            <li>Agent action</li>
            <li>Input context</li>
            <li>Decision metadata</li>
            <li>Output evidence</li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">3. Evidence Protection</h2>
          <p className="text-muted leading-relaxed mb-8">Data is secured via encryption, hashing, and customer-controlled storage (with optional IPFS/Filecoin integration).</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">4. Merkle Proof Engine</h2>
          <p className="text-muted leading-relaxed mb-8">Thousands of AI actions are compressed into efficient cryptographic proofs.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">5. Trust Anchor</h2>
          <p className="text-muted leading-relaxed mb-8">Only verification fingerprints are anchored. Private data never leaves customer control.</p>

          <div className="p-6 bg-black/50 border border-hairline rounded-lg font-mono text-sm text-faint text-center mt-8">
            <p>AI Agent</p>
            <p className="my-2">↓</p>
            <p>Venziq Connector</p>
            <p className="my-2">↓</p>
            <p>Evidence Storage</p>
            <p className="my-2">↓</p>
            <p>Merkle Engine</p>
            <p className="my-2">↓</p>
            <p className="text-ink">Trust Verification Layer</p>
          </div>
        </div>
      </Section>
    </main>
  )
}

export function SecurityPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Enterprise AI Security"
        title="Secure by Design: Cryptographic AI Verification"
        description="Venziq prioritizes data privacy. Learn how we secure AI execution records without exposing your sensitive enterprise data."
      />
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Customer Controlled Storage</h2>
          <p className="text-ink font-medium mb-2">Your AI data stays where you choose.</p>
          <p className="text-muted leading-relaxed mb-8">Venziq supports enterprise databases, private cloud storage, IPFS/Filecoin, and future custom storage adapters.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">Privacy First Verification</h2>
          <p className="text-muted leading-relaxed mb-8">Venziq does not need raw prompts to verify authenticity. Verification uses content fingerprints, cryptographic proofs, and audit metadata.</p>
        </div>
      </Section>
    </main>
  )
}

export function DevelopersPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Developer First"
        title="Build Trust into Your AI Stack"
        description="Venziq is a lightweight, plug-and-play trust connector designed for AI engineers. Works without changing your existing AI architecture."
      />
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">JavaScript SDK</h2>
          <pre className="p-4 bg-black/50 rounded-lg mb-4 font-mono text-sm text-faint border border-hairline overflow-x-auto">
            <code>npm install @venziq/trust-connector</code>
          </pre>
          <pre className="p-4 bg-black/50 rounded-lg mb-8 font-mono text-sm text-faint border border-hairline overflow-x-auto">
            <code>{`import { VenziqConnector } from '@venziq/trust-connector';\n\nagent.use(\n  VenziqConnector()\n);`}</code>
          </pre>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">Python SDK</h2>
          <pre className="p-4 bg-black/50 rounded-lg mb-4 font-mono text-sm text-faint border border-hairline overflow-x-auto">
            <code>pip install venziq</code>
          </pre>
          <pre className="p-4 bg-black/50 rounded-lg mb-8 font-mono text-sm text-faint border border-hairline overflow-x-auto">
            <code>{`from venziq import TrustConnector\n\nagent = TrustConnector(agent)`}</code>
          </pre>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">Integrations</h2>
          <p className="text-muted leading-relaxed mb-6">Works natively with LangChain, LangGraph, CrewAI, AutoGen, Flowise, and the OpenAI SDK.</p>
        </div>
      </Section>
    </main>
  )
}

export function LangsmithComparePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Compare"
        title="LangSmith vs Venziq"
        description="Understanding the difference between AI observability and AI accountability."
      />
      <Section>
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">AI Observability vs AI Accountability</h2>
          <p className="text-muted leading-relaxed mb-6">Observability explains behavior. Venziq proves history.</p>
          <p className="text-muted leading-relaxed mb-6"><strong className="text-ink font-medium">LangSmith: Development observability</strong><br/>Helps answer: "How is my AI performing?"</p>
          <p className="text-muted leading-relaxed mb-8"><strong className="text-ink font-medium">Venziq: Production accountability</strong><br/>Helps answer: "Can we prove what happened?"</p>
        </div>
      </Section>
    </main>
  )
}

export function UseCasesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Use Cases"
        title="Enterprise AI Scenarios"
        description="See how organizations use Venziq to secure autonomous AI agents."
      />
      <Section>
        <div className="max-w-3xl">
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-ink mb-2">Banking</h3>
            <p className="text-muted">Prove why an AI loan agent approved or rejected a request.</p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-ink mb-2">Healthcare</h3>
            <p className="text-muted">Maintain accountable AI decision records.</p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-ink mb-2">Customer Support</h3>
            <p className="text-muted">Trace autonomous agent actions.</p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-ink mb-2">Security</h3>
            <p className="text-muted">Investigate AI incidents with verified evidence.</p>
          </div>
        </div>
      </Section>
    </main>
  )
}

export function BlogFoundationPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Blog"
        title="AI Trust & Accountability"
        description="Insights on securing autonomous AI agents."
      />
      <Section>
        <div className="max-w-3xl">
          <ul className="space-y-4">
            <li><RouteLink to="/blog/black-box-recorder" className="text-ink hover:underline">Why AI Agents Need a Black Box Recorder</RouteLink></li>
            <li><RouteLink to="/blog/observability-vs-accountability" className="text-ink hover:underline">AI Observability vs AI Accountability</RouteLink></li>
            <li><RouteLink to="/blog/traditional-logs-not-enough" className="text-ink hover:underline">Why Traditional Logs Are Not Enough for Autonomous AI</RouteLink></li>
            <li><RouteLink to="/blog/verify-agent-decisions" className="text-ink hover:underline">How Enterprises Can Verify AI Agent Decisions</RouteLink></li>
            <li><RouteLink to="/blog/understanding-ai-provenance" className="text-ink hover:underline">Understanding AI Provenance</RouteLink></li>
            <li><RouteLink to="/blog/building-trust-infrastructure" className="text-ink hover:underline">Building Trust Infrastructure for Agentic AI</RouteLink></li>
          </ul>
        </div>
      </Section>
    </main>
  )
}
