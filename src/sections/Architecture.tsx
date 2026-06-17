import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { ArchitectureStack } from '../components/ArchitectureStack'

export function Architecture() {
  return (
    <Section id="architecture">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Eyebrow>Architecture</Eyebrow>
          <DecodeHeadline
            text="One integrated trust fabric"
            className="text-4xl font-semibold md:text-5xl"
          />
          <p className="mt-6 max-w-md text-lg text-muted">
            Each layer runs independently. Together they form an integrated trust
            fabric, with data flowing from application to immutable record.
          </p>
          <p className="mono-eyebrow mt-8">Hover a layer to inspect it</p>
        </div>
        <ArchitectureStack />
      </div>
    </Section>
  )
}
