import { Section, Eyebrow } from '../components/Section'
import { DecodeHeadline } from '../components/DecodeHeadline'
import { PillarsNetwork } from '../components/PillarsNetwork'

export function Platform() {
  return (
    <Section id="platform">
      <div className="max-w-3xl">
        <Eyebrow>The platform</Eyebrow>
        <DecodeHeadline
          text="One platform. Five pillars."
          className="text-4xl font-semibold md:text-5xl"
        />
        <p className="mt-6 text-lg text-muted">
          Each pillar stands alone as a product. Together they form one integrated
          trust fabric. Hover a pillar to see how it connects.
        </p>
      </div>

      <div className="mt-14">
        <PillarsNetwork />
      </div>
    </Section>
  )
}
