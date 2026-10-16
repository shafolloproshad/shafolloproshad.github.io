/*
 * Background graphic for the home page: streamlines of inviscid (potential) flow
 * past a circular cylinder, drawn over a body-fitted O-grid. The streamlines
 * are exact contours of the stream function psi = U y (1 - R^2 / r^2).
 * Tracer dashes drift along them slowly; with reduced motion they stay still.
 */

const W = 560
const H = 440
const CX = 236
const CY = 220
const R = 50

function streamlineY(x, c) {
  // Solve y (1 - R^2 / (x^2 + y^2)) = c for y > 0 outside the cylinder (c > 0).
  let lo = Math.max(c, Math.sqrt(Math.max(0, R * R - x * x)))
  let hi = c + R
  for (let k = 0; k < 40; k++) {
    const y = (lo + hi) / 2
    const f = y * (1 - (R * R) / (x * x + y * y))
    if (f < c) lo = y
    else hi = y
  }
  return (lo + hi) / 2
}

const LEVELS = [7, 22, 44, 74, 112, 155]

const STREAMLINES = LEVELS.flatMap((c) =>
  [1, -1].map((sign) => {
    const pts = []
    for (let x = -CX - 10; x <= W - CX + 10; x += 4) {
      const y = streamlineY(x, c)
      pts.push(`${(CX + x).toFixed(1)},${(CY - sign * y).toFixed(1)}`)
    }
    return `M${pts.join('L')}`
  }),
)

// Body-fitted O-grid: rings stretched away from the wall, radial lines every 15°.
const RINGS = Array.from({ length: 8 }, (_, k) => R * Math.pow(1.2, k + 1))
const R_OUT = RINGS[RINGS.length - 1]
const SPOKES = Array.from({ length: 24 }, (_, k) => {
  const a = (k * Math.PI) / 12
  return [CX + R * Math.cos(a), CY + R * Math.sin(a), CX + R_OUT * Math.cos(a), CY + R_OUT * Math.sin(a)]
})

export default function FlowMotif({ className = '' }) {
  return (
    <figure className={`flow-motif ${className}`}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="flow-motif-fade" cx={CX} cy={CY} r={R_OUT} gradientUnits="userSpaceOnUse">
            <stop offset="0.35" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="flow-motif-mask">
            <rect width={W} height={H} fill="url(#flow-motif-fade)" />
          </mask>
          <linearGradient id="flow-motif-edges" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.12" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.88" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="flow-motif-edge-mask">
            <rect width={W} height={H} fill="url(#flow-motif-edges)" />
          </mask>
        </defs>

        <g className="flow-motif__grid" mask="url(#flow-motif-mask)">
          {RINGS.map((r) => (
            <circle key={r} cx={CX} cy={CY} r={r} />
          ))}
          {SPOKES.map(([x1, y1, x2, y2], k) => (
            <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>

        <g mask="url(#flow-motif-edge-mask)">
          <g className="flow-motif__lines">
            {STREAMLINES.map((d, k) => (
              <path key={k} d={d} />
            ))}
            <path d={`M0,${CY}H${CX - R}M${CX + R},${CY}H${W}`} />
          </g>
          <g className="flow-motif__tracers">
            {STREAMLINES.map((d, k) => (
              <path key={k} d={d} style={{ animationDelay: `${-(k * 0.37) % 4}s` }} />
            ))}
          </g>
        </g>

        <circle className="flow-motif__body" cx={CX} cy={CY} r={R} />
      </svg>
    </figure>
  )
}
