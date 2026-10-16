import { useState } from 'react'
import { finArms } from '../lib/finGeometry.js'
import { finCases, caseOutcomes } from '../data/pcm.js'
import Segmented from './Segmented.jsx'

const MAX_ANGLE = { 1: 80, 2: 70, 3: 60, 4: 70, 5: 60 }
const W = 55 // enclosure width incl. 5 mm wall region, mm
const H = 50

/** Draws the K-fin for any simulated (case, angle) pair, to scale. */
export default function FinExplorer() {
  const [caseId, setCaseId] = useState(3)
  const [angle, setAngle] = useState(40)
  const c = finCases.find((x) => x.id === caseId)
  const simulated = angle <= MAX_ANGLE[caseId]
  const out = caseOutcomes[caseId]
  const arms = finArms({ ku: c.ku, kl: c.kl, angle })

  // SVG in mm, y up → flip. The PCM region starts at x = 5 mm.
  const X = (x) => 5 + x
  const Y = (y) => H - y
  const arcR = 9
  const half = (angle * Math.PI) / 360
  const arc = `M ${X(arcR * Math.cos(half))} ${Y(25 + arcR * Math.sin(half))} A ${arcR} ${arcR} 0 0 1 ${X(
    arcR * Math.cos(half),
  )} ${Y(25 - arcR * Math.sin(half))}`

  return (
    <div className="explorer">
      <div className="explorer__controls">
        <Segmented
          label="Arm-length case"
          value={caseId}
          onChange={(id) => setCaseId(id)}
          options={finCases.map((x) => ({ value: x.id, label: `${x.id}  (${x.ratio})` }))}
        />
        <label className="field field--range">
          <span className="field__label">
            Fin angle θ <output>{angle}°</output>
          </span>
          <input type="range" min="10" max="80" step="10" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
        </label>
        <dl className="explorer__facts">
          <div>
            <dt>Upper arm</dt>
            <dd>{c.ku} mm</dd>
          </div>
          <div>
            <dt>Lower arm</dt>
            <dd>{c.kl} mm</dd>
          </div>
          <div>
            <dt>Angles simulated</dt>
            <dd>{c.angles}</dd>
          </div>
          <div>
            <dt>Best melting efficiency</dt>
            <dd>{out.peakEfficiency.toFixed(2)}% at 40°–50°</dd>
          </div>
          <div>
            <dt>Peak LMLI at 40°</dt>
            <dd>{out.peakLmli40.toFixed(2)}</dd>
          </div>
        </dl>
      </div>

      <div className="explorer__figure">
        <svg viewBox={`-3 -4 ${W + 6} ${H + 10}`} role="img" aria-label={`Case ${caseId} fin at ${angle} degrees, drawn to scale in a 55 by 50 millimetre enclosure.`}>
          <rect x="5" y="0" width="50" height="50" fill="var(--cold-tint)" stroke="var(--ink)" strokeWidth="0.4" />
          <rect x="0" y="0" width="5" height="50" fill="var(--heat)" />
          <text x="2.5" y="25" className="explorer__svgtext" transform="rotate(-90 2.5 25)" textAnchor="middle" dy="1" fill="#fff">
            70 °C
          </text>
          {arms.map((a, i) => (
            <line
              key={i}
              x1={X(a.x1)}
              y1={Y(a.y1)}
              x2={X(a.x2)}
              y2={Y(a.y2)}
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="butt"
            />
          ))}
          <path d={arc} fill="none" stroke="var(--heat)" strokeWidth="0.5" />
          <text x={X(arcR + 2)} y={Y(25)} dy="1" className="explorer__svgtext" fill="var(--ink)">
            θ
          </text>
          <text x={X(arms[0].x2) + 1.2} y={Y(arms[0].y2)} dy="1" className="explorer__svgtext" fill="var(--ink-2)">
            K
            <tspan baselineShift="sub" fontSize="2.2">u</tspan> {c.ku}
          </text>
          <text x={X(arms[1].x2) + 1.2} y={Y(arms[1].y2)} dy="1" className="explorer__svgtext" fill="var(--ink-2)">
            K
            <tspan baselineShift="sub" fontSize="2.2">l</tspan> {c.kl}
          </text>
          <text x="30" y={H + 5} textAnchor="middle" className="explorer__svgtext" fill="var(--ink-3)">
            50 mm × 50 mm PCM region, fin 2 mm thick
          </text>
        </svg>
        <p className="explorer__status explorer__status--off" role="status">
          {simulated ? '' : `Not simulated: Case ${caseId} was run from 10° to ${MAX_ANGLE[caseId]}°.`}
        </p>
      </div>
    </div>
  )
}
