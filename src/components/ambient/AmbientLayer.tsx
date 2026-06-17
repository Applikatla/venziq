/*
  Purely decorative, non-interactive ambient design layer. The visuals live in
  tokens.css (.ambient-field / .ambient-grain / .specimen-frame); this just
  mounts the markup. Everything is aria-hidden + pointer-events:none and
  freezes under the reduced-motion guard, so it never affects a11y or input.
*/
export function AmbientLayer() {
  return (
    <>
      {/* drifting aurora + blueprint dot-grid, behind all content */}
      <div className="ambient-field" aria-hidden="true" />
      {/* analog film grain, above content but below the nav + overlays */}
      <div className="ambient-grain" aria-hidden="true" />
      {/* specimen-plate corner registration marks */}
      <div className="specimen-frame" aria-hidden="true">
        <i className="tl" />
        <i className="tr" />
        <i className="bl" />
        <i className="br" />
      </div>
    </>
  )
}
