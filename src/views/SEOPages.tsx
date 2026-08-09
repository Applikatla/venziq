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
          <p className="text-muted leading-relaxed mb-6">Just like in aviation, autonomous systems need a tamper-proof record of events. An AI black box recorder captures every relevant input, state change, tool call, and decision an AI agent makes, securing it with cryptographic trust verification. It provides an indisputable execution history that survives system failures and prevents tampering.</p>
          
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Why autonomous agents need accountability</h2>
          <p className="text-muted leading-relaxed mb-6">When an AI agent takes real-world actions—such as processing a financial transaction, modifying a record, or sending an email—organizations must be able to verify why a decision was made. What caused this AI failure? Can I prove my AI records were not changed?</p>
          <p className="text-muted leading-relaxed mb-8">Traditional observability dashboards only show how your system is performing, and traditional logs can be modified, deleted, or compromised. Venziq provides a verifiable, immutable audit trail designed specifically for the unique evidence requirements of autonomous agents.</p>
          
          <h2 className="text-2xl font-semibold tracking-tight mb-4">How the Venziq Trust Connector works</h2>
          <p className="text-muted leading-relaxed mb-6">Venziq is a lightweight, plug-and-play trust connector. You do not need to rebuild your AI architecture to add accountability.</p>
          <ol className="list-decimal pl-5 text-muted leading-relaxed mb-8 space-y-3">
            <li><strong>Integrate:</strong> Add the Venziq SDK to your existing AI application (e.g., LangChain, CrewAI).</li>
            <li><strong>Record:</strong> The connector automatically captures relevant AI execution evidence and sends it to the Venziq API.</li>
            <li><strong>Secure:</strong> The Trust Infrastructure creates cryptographically verifiable records using hashing and Merkle proofs.</li>
            <li><strong>Query & Verify:</strong> Organizations can retrieve evidence and independently verify its integrity without relying on blind trust.</li>
          </ol>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <RouteLink to="/developers" className="vzq-accent-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
              View Developer Docs
            </RouteLink>
          </div>
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
          <p className="text-muted leading-relaxed mb-6">As enterprise AI moves from conversational chatbots to autonomous action, the need for cryptographic AI auditing becomes paramount. When an AI agent executes a tool or makes a high-stakes decision, organizations require an indisputable record of the exact prompt, the retrieved context, and the resulting action.</p>
          <p className="text-muted leading-relaxed mb-8">Venziq provides the Trust Infrastructure to guarantee AI accountability with a verifiable AI execution history. Unlike traditional logging systems, Venziq ensures that historical records cannot be silently altered or deleted.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">What makes an audit trail trustworthy?</h2>
          <ul className="list-disc pl-5 text-muted leading-relaxed mb-8 space-y-3">
            <li><strong>Provenance:</strong> Cryptographic proof of which agent took the action and when.</li>
            <li><strong>Immutability:</strong> Tamper-evident records that make unauthorized modifications mathematically impossible to hide.</li>
            <li><strong>Independent Verification:</strong> The ability for third-party auditors to verify the integrity of the evidence without relying solely on the application database.</li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">Implementing AI Provenance</h2>
          <p className="text-muted leading-relaxed mb-6">Adding an audit trail should not require re-architecting your AI application. The Venziq Trust Connector acts as lightweight middleware. By integrating our SDK, your agent's execution evidence is automatically captured, structured, and transmitted to the Venziq API for secure storage and cryptographic hashing.</p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <RouteLink to="/architecture" className="vzq-accent-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
              Explore the Architecture
            </RouteLink>
          </div>
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
          <p className="text-muted leading-relaxed mb-10 text-lg">Venziq is designed as a secure trust interface that sits between your AI application and our proprietary trust infrastructure. You do not need to understand complex cryptography or manage custom data pipelines to build verifiable AI.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">1. AI Application</h2>
          <p className="text-muted leading-relaxed mb-8">Your autonomous agents execute tasks natively within your environment using frameworks like LangChain, CrewAI, AutoGen, or directly through raw LLM calls.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">2. Venziq Connector & SDKs</h2>
          <p className="text-muted leading-relaxed mb-4">Our lightweight middleware captures critical execution context locally before transmission. This allows existing AI applications to add trustworthy execution records without rebuilding their architecture.</p>
          <ul className="list-disc pl-5 text-muted leading-relaxed mb-8 space-y-2">
            <li><strong>Context:</strong> Prompt context and user identity</li>
            <li><strong>Action:</strong> Agent decisions and tool execution</li>
            <li><strong>Result:</strong> Output evidence and artifacts</li>
          </ul>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">3. Venziq Trust APIs</h2>
          <p className="text-muted leading-relaxed mb-8">The SDK communicates with the public Venziq APIs, serving as the secure boundary to ingest evidence, query historical records, and access verification data.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">4. Venziq Trust Infrastructure</h2>
          <p className="text-muted leading-relaxed mb-8">Behind the API boundary, Venziq operates a proprietary backend that securely stores evidence, processes events, and generates cryptographic integrity (e.g. Merkle trees) to maintain an immutable history.</p>
          
          <h2 className="text-2xl font-semibold tracking-tight mb-4">5. Independent Verification</h2>
          <p className="text-muted leading-relaxed mb-8">Auditors and compliance teams can retrieve proofs and verify the authenticity of any stored record through the public interface, independently validating that the AI execution history was never tampered with.</p>

          <div className="p-6 bg-black/50 border border-hairline rounded-lg font-mono text-sm text-faint text-center mt-8">
            <p>AI Application</p>
            <p className="my-2">↓</p>
            <p>Venziq Connector / SDK</p>
            <p className="my-2">↓</p>
            <p>Venziq Trust APIs</p>
            <p className="my-2">↓</p>
            <p>Trust Infrastructure</p>
            <p className="my-2">↓</p>
            <p className="text-ink">Store / Query / Verify</p>
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
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Data Protection & Privacy</h2>
          <p className="text-muted leading-relaxed mb-8">Venziq is designed to separate the cryptographic integrity of an AI event from its raw data payload. Evidence envelopes can securely house encrypted contents while maintaining verifiable metadata, ensuring you do not have to expose private health, financial, or proprietary business logic to maintain an audit trail.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">Cryptographic Verification</h2>
          <p className="text-muted leading-relaxed mb-8">Venziq does not need raw prompts to verify authenticity. Verification uses content fingerprints, cryptographic commitments, and audit metadata. By using techniques such as hashing and Merkle trees, Venziq can prove that a specific record existed at a specific time and has not been altered.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">Authentication & Authorization</h2>
          <p className="text-muted leading-relaxed mb-8">All interactions with the Venziq Trust Infrastructure are governed by strict API key authentication and scoped authorization boundaries, ensuring only permitted applications can submit evidence or query historical data.</p>
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
          <p className="text-muted leading-relaxed mb-8 text-lg">Integrate → Record → Query → Verify. Our public APIs and SDKs provide everything you need to establish AI accountability.</p>

          <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-3">
            JavaScript SDK
            <span className="text-xs px-2 py-1 rounded bg-white/10 text-white font-mono tracking-wider">PREVIEW</span>
          </h2>
          <pre className="p-4 bg-black/50 rounded-lg mb-4 font-mono text-sm text-faint border border-hairline overflow-x-auto">
            <code>npm install @venziq/trust-connector</code>
          </pre>
          <pre className="p-4 bg-black/50 rounded-lg mb-8 font-mono text-sm text-faint border border-hairline overflow-x-auto">
            <code>{`import { VenziqConnector } from '@venziq/trust-connector';\n\nagent.use(\n  VenziqConnector({ apiKey: process.env.VENZIQ_API_KEY })\n);`}</code>
          </pre>

          <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-3">
            Python SDK
            <span className="text-xs px-2 py-1 rounded bg-white/10 text-white font-mono tracking-wider">PREVIEW</span>
          </h2>
          <pre className="p-4 bg-black/50 rounded-lg mb-4 font-mono text-sm text-faint border border-hairline overflow-x-auto">
            <code>pip install venziq</code>
          </pre>
          <pre className="p-4 bg-black/50 rounded-lg mb-8 font-mono text-sm text-faint border border-hairline overflow-x-auto">
            <code>{`from venziq import TrustConnector\n\nagent = TrustConnector(agent, api_key="YOUR_API_KEY")`}</code>
          </pre>

          <h2 className="text-2xl font-semibold tracking-tight mb-4">Public REST APIs</h2>
          <p className="text-muted leading-relaxed mb-6">If you prefer direct HTTP integration, the Venziq REST API provides endpoints for:</p>
          <ul className="list-disc pl-5 text-muted leading-relaxed mb-8 space-y-2">
            <li><strong>Authentication:</strong> API key-based access control.</li>
            <li><strong>Event Submission:</strong> Submit evidence envelopes securely.</li>
            <li><strong>Query Records:</strong> Retrieve historical AI actions.</li>
            <li><strong>Verification:</strong> Fetch cryptographic proofs to validate integrity.</li>
          </ul>
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
          <p className="text-muted leading-relaxed mb-6">Traditional AI observability answers: <em>"How is my AI system behaving?"</em> AI accountability answers: <em>"Can I establish and verify exactly what happened?"</em></p>
          <p className="text-muted leading-relaxed mb-6">While tools like LangSmith are fantastic for developer debugging and tracking AI performance, they are not designed to be cryptographic audit trails. They are primarily observability platforms, where logs can be altered, pruned, or lost.</p>
          
          <h2 className="text-2xl font-semibold tracking-tight mb-4 mt-8">When to use LangSmith</h2>
          <p className="text-muted leading-relaxed mb-6"><strong className="text-ink font-medium">For Development Observability.</strong><br/>Use LangSmith when you need to understand token usage, latency, debug complex prompt chains, and analyze cost. It is an indispensable tool for the AI developer loop.</p>
          
          <h2 className="text-2xl font-semibold tracking-tight mb-4 mt-8">When to use Venziq</h2>
          <p className="text-muted leading-relaxed mb-8"><strong className="text-ink font-medium">For Production Accountability.</strong><br/>Use Venziq when your autonomous agent is taking real-world actions and you need to mathematically prove why a decision was made. Venziq provides a verifiable, immutable execution history that compliance, security, and auditor teams can rely on.</p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <RouteLink to="/architecture" className="vzq-accent-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
              See the Architecture
            </RouteLink>
          </div>
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
