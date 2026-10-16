import { useState } from 'react'
import Rich from './Rich.jsx'

/* Small, dependency-free SVG charts. Data always comes from src/data. */

function Tooltip({ x, y, children, width }) {
  // x, y in percent of the chart box
  const alignRight = x > 62
  return (
    <div
      className="chart-tip"
      role="status"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(${alignRight ? 'calc(-100% - 12px)' : '12px'}, -50%)`,
        width,
      }}
    >
      {children}
    </div>
  )
}

/** One column chart in a set of small multiples. Values are labelled on the caps. */
export function ColumnPanel({ title, data, max, format, describe }) {
  const [active, setActive] = useState(null)
  const VW = 320
  const VH = 210
  const top = 26
  const bottom = 46
  const plotH = VH - top - bottom
  const slot = VW / data.length
  const barW = 24
  const y = (v) => top + plotH * (1 - v / max)

  return (
    <figure className="chart">
      <figcaption className="chart__title">{title}</figcaption>
      <div className="chart__box">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="chart__svg" role="img" aria-label={`${title}: ${data.map((d) => `${d.label} ${format(d.value)}`).join(', ')}`}>
          <line x1="0" x2={VW} y1={top + plotH} y2={top + plotH} className="chart__baseline" />
          {data.map((d, i) => {
            const cx = slot * i + slot / 2
            const yTop = y(d.value)
            const h = top + plotH - yTop
            const r = Math.min(4, h)
            return (
              <g
                key={d.key}
                tabIndex={0}
                className="chart__mark"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              >
                <rect x={slot * i} y={top} width={slot} height={plotH} fill="transparent" />
                <path
                  d={`M${cx - barW / 2},${top + plotH} V${yTop + r} q0,${-r} ${r},${-r} H${cx + barW / 2 - r} q${r},0 ${r},${r} V${top + plotH} Z`}
                  className={active === i ? 'chart__bar chart__bar--active' : 'chart__bar'}
                />
                <text x={cx} y={yTop - 7} textAnchor="middle" className="chart__value">
                  {format(d.value)}
                </text>
                <text x={cx} y={top + plotH + 18} textAnchor="middle" className="chart__tick">
                  {d.label}
                </text>
                <text x={cx} y={top + plotH + 34} textAnchor="middle" className="chart__tick chart__tick--sub">
                  {d.sub}
                </text>
              </g>
            )
          })}
        </svg>
        {active !== null && (
          <Tooltip x={((active + 0.5) / data.length) * 100} y={(y(data[active].value) / VH) * 100}>
            {describe(data[active])}
          </Tooltip>
        )}
      </div>
    </figure>
  )
}

/** Total resistance coefficient against Froude number: experiment vs. SPH. */
export function CtChart({ rows }) {
  const [active, setActive] = useState(null)
  const VW = 640
  const VH = 340
  const m = { t: 20, r: 24, b: 48, l: 56 }
  const xMin = 0.14
  const xMax = 0.29
  const yMin = 3.0
  const yMax = 4.75
  const X = (v) => m.l + ((v - xMin) / (xMax - xMin)) * (VW - m.l - m.r)
  const Y = (v) => m.t + (1 - (v - yMin) / (yMax - yMin)) * (VH - m.t - m.b)
  const line = (key) => rows.map((r, i) => `${i ? 'L' : 'M'}${X(r.fr)},${Y(r[key])}`).join(' ')
  const yTicks = [3.0, 3.5, 4.0, 4.5]
  const xTicks = [0.15, 0.2, 0.25]
  const worst = rows.reduce((a, b) => (b.error > a.error ? b : a))

  return (
    <figure className="chart chart--wide">
      <figcaption className="chart__legend">
        <span className="legend-item">
          <svg width="26" height="12" aria-hidden="true">
            <line x1="1" x2="25" y1="6" y2="6" stroke="var(--ink-3)" strokeWidth="1.5" />
            <circle cx="13" cy="6" r="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
          </svg>
          Towing-tank experiment
        </span>
        <span className="legend-item">
          <svg width="26" height="12" aria-hidden="true">
            <line x1="1" x2="25" y1="6" y2="6" stroke="var(--cold-2)" strokeWidth="2" />
            <circle cx="13" cy="6" r="4" fill="var(--cold-2)" stroke="var(--surface)" strokeWidth="2" />
          </svg>
          SPH, dp = 9 mm
        </span>
      </figcaption>
      <div className="chart__box">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="chart__svg" role="img" aria-label="Total resistance coefficient against Froude number. SPH under-predicts the experiment at all five Froude numbers, by 0.69% to 6.35%.">
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={VW - m.r} y1={Y(t)} y2={Y(t)} className="chart__grid" />
              <text x={m.l - 10} y={Y(t)} dy="4" textAnchor="end" className="chart__tick">
                {t.toFixed(1)}
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <text key={t} x={X(t)} y={VH - m.b + 22} textAnchor="middle" className="chart__tick">
              {t.toFixed(2)}
            </text>
          ))}
          <text x={(m.l + VW - m.r) / 2} y={VH - 6} textAnchor="middle" className="chart__axis-label">
            Froude number, Fr
          </text>
          <text transform={`translate(14 ${(m.t + VH - m.b) / 2}) rotate(-90)`} textAnchor="middle" className="chart__axis-label">
            <tspan fontStyle="italic">C</tspan>
            <tspan baselineShift="sub" fontSize="11">T</tspan>
            <tspan> × 10³</tspan>
          </text>

          {active !== null && (
            <line x1={X(rows[active].fr)} x2={X(rows[active].fr)} y1={m.t} y2={VH - m.b} className="chart__crosshair" />
          )}
          <path d={line('ctExp')} fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
          <path d={line('ctSph')} fill="none" stroke="var(--cold-2)" strokeWidth="2" strokeLinejoin="round" />
          {rows.map((r) => (
            <g key={r.fr}>
              <circle cx={X(r.fr)} cy={Y(r.ctExp)} r="5" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
              <circle cx={X(r.fr)} cy={Y(r.ctSph)} r="5" fill="var(--cold-2)" stroke="var(--surface)" strokeWidth="2" />
            </g>
          ))}
          <text x={X(worst.fr)} y={Y(worst.ctSph) + 22} textAnchor="middle" className="chart__value">
            −{worst.error}%
          </text>

          {rows.map((r, i) => {
            const left = i === 0 ? m.l : (X(rows[i - 1].fr) + X(r.fr)) / 2
            const right = i === rows.length - 1 ? VW - m.r : (X(r.fr) + X(rows[i + 1].fr)) / 2
            return (
              <rect
                key={r.fr}
                x={left}
                y={m.t}
                width={right - left}
                height={VH - m.t - m.b}
                fill="transparent"
                tabIndex={0}
                className="chart__hit"
                aria-label={`Fr ${r.fr}: experiment ${r.ctExp}, SPH ${r.ctSph}, error ${r.error}%`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              />
            )
          })}
        </svg>
        {active !== null && (
          <Tooltip x={(X(rows[active].fr) / VW) * 100} y={(Y((rows[active].ctExp + rows[active].ctSph) / 2) / VH) * 100}>
            <strong>Fr = {rows[active].fr.toFixed(3)}</strong>
            <span>
              Experiment <b>{rows[active].ctExp.toFixed(3)}</b>
            </span>
            <span>
              SPH <b>{rows[active].ctSph.toFixed(3)}</b>
            </span>
            <span>
              Under-prediction <b>{rows[active].error}%</b>
            </span>
          </Tooltip>
        )}
      </div>
      <p className="chart__note">
        <Rich>Predicted and measured C_T × 10³ at the five Froude numbers. Hover or focus a Froude number for values.</Rich>
      </p>
    </figure>
  )
}
