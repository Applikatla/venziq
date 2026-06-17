import { Section, Eyebrow } from '../components/Section'

export function Problem() {
  return (
    <Section id="problem">
      <Eyebrow>The problem</Eyebrow>
      <h2 className="max-w-3xl text-4xl font-semibold md:text-5xl">
        The gap is structural, not incremental
      </h2>
      <p className="mt-6 max-w-2xl text-muted">Placeholder — problem narrative.</p>
    </Section>
  )
}
