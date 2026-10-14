import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { createMeltModel, FIN_CASES, PCM } from '../lib/meltModel.js'
import { useReducedMotion } from '../lib/hooks.js'
import Rich from './Rich.jsx'

const GRID = 64
const DOMAIN_MM = 50
const MODEL_SECONDS_PER_SECOND = 1800
const FRAME_BUDGET_MS = 9
const STOP_AT = 0.99

// Diverging map centred on the melting range: solid = cold blue, melt = warm.
const STOPS = [
  [25, [31, 74, 115]],
  [36, [112, 157, 195]],
  [45.85, [233, 237, 240]],
  [57, [240, 162, 102]],
  [70, [184, 50, 26]],
]
const LUT = (() => {
  const lut = new Uint8ClampedArray(451 * 3)
  for (let n = 0; n <= 450; n++) {
    const t = 25 + n / 10
    let k = 0
    while (k < STOPS.length - 2 && t > STOPS[k + 1][0]) k++
    const [t0, c0] = STOPS[k]
    const [t1, c1] = STOPS[k + 1]
    const f = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)))
    for (let ch = 0; ch < 3; ch++) lut[n * 3 + ch] = c0[ch] + (c1[ch] - c0[ch]) * f
  }
  return lut
})()
const GRADIENT = `linear-gradient(to top, ${STOPS.map(
  ([t, c]) => `rgb(${c.join(',')}) ${(((t - 25) / 45) * 100).toFixed(1)}%`,
).join(', ')})`

function finPolygon(arm, halfThickness) {
  const dx = arm.x2 - arm.x1
  const dy = arm.y2 - arm.y1
  const len = Math.hypot(dx, dy)
  const nx = (-dy / len) * halfThickness
  const ny = (dx / len) * halfThickness
  return [
    [arm.x1 + nx, arm.y1 + ny],
    [arm.x2 + nx, arm.y2 + ny],
    [arm.x2 - nx, arm.y2 - ny],
    [arm.x1 - nx, arm.y1 - ny],
  ]
}

function draw(canvas, model, offscreen) {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  const N = model.N
  const octx = offscreen.getContext('2d')
  const img = octx.createImageData(N, N)
  const { T, gamma } = model

  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const src = j * N + i
      const dst = ((N - 1 - j) * N + i) * 4
      const n = Math.max(0, Math.min(450, Math.round((T[src] - 25) * 10))) * 3
      img.data[dst] = LUT[n]
      img.data[dst + 1] = LUT[n + 1]
      img.data[dst + 2] = LUT[n + 2]
      img.data[dst + 3] = 255
    }
  }
  octx.putImageData(img, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(offscreen, 0, 0, w, h)

  const cell = w / N
  const px = (xCell) => (xCell + 0.5) * cell
  const py = (yCell) => h - (yCell + 0.5) * cell

  // Melt front: liquid fraction = 0.5, by marching squares on cell centres.
  ctx.beginPath()
  const iso = 0.5
  for (let j = 0; j < N - 1; j++) {
    for (let i = 0; i < N - 1; i++) {
      const a = gamma[j * N + i]
      const b = gamma[j * N + i + 1]
      const c = gamma[(j + 1) * N + i + 1]
      const d = gamma[(j + 1) * N + i]
      const pts = []
      if (a < iso !== b < iso) pts.push([i + (iso - a) / (b - a), j])
      if (b < iso !== c < iso) pts.push([i + 1, j + (iso - b) / (c - b)])
      if (c < iso !== d < iso) pts.push([i + 1 - (iso - c) / (d - c), j + 1])
      if (d < iso !== a < iso) pts.push([i, j + 1 - (iso - d) / (a - d)])
      for (let p = 0; p + 1 < pts.length; p += 2) {
        ctx.moveTo(px(pts[p][0]), py(pts[p][1]))
        ctx.lineTo(px(pts[p + 1][0]), py(pts[p + 1][1]))
      }
    }
  }
  ctx.strokeStyle = 'rgba(21, 39, 58, 0.9)'
  ctx.lineWidth = Math.max(1.5, w / 320)
  ctx.lineCap = 'round'
  ctx.stroke()

  // Fin arms, drawn to scale.
  const mm = w / DOMAIN_MM
  ctx.fillStyle = '#c9d1d8'
  ctx.strokeStyle = '#15273a'
  ctx.lineWidth = Math.max(1, w / 480)
  for (const arm of model.arms) {
    const poly = finPolygon(arm, 1)
    ctx.beginPath()
    poly.forEach(([x, y], k) => (k ? ctx.lineTo(x * mm, h - y * mm) : ctx.moveTo(x * mm, h - y * mm)))
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
}

const TICKS = [0, 10, 20, 30, 40, 50]
const CBAR_TICKS = [25, 40, 55, 70]

export default function MeltSolverFigure() {
  const reduced = useReducedMotion()
  const canvasRef = useRef(null)
  const offscreenRef = useRef(null)
  const modelRef = useRef(null)
  const [caseId, setCaseId] = useState(3)
  const [angle, setAngle] = useState(40)
  const [run, setRun] = useState(0) // bumps on restart
  // Respect reduced motion: start paused, but let the visitor press Play.
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [visible, setVisible] = useState(true)
  const [readout, setReadout] = useState({ time: 0, lf: 0, done: false })

  const finCase = FIN_CASES.find((c) => c.id === caseId)
  const maxAngle = finCase.angles[finCase.angles.length - 1]
  const autoplay = playing

  // Pause while the figure is off screen.
  useEffect(() => {
    const el = canvasRef.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Keep the canvas sharp at any size.
  useEffect(() => {
    const canvas = canvasRef.current
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const size = Math.round(canvas.clientWidth * dpr)
      if (size > 0 && canvas.width !== size) {
        canvas.width = size
        canvas.height = size
        if (modelRef.current && offscreenRef.current) draw(canvas, modelRef.current, offscreenRef.current)
      }
    })
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  // Build a model for the chosen geometry and run it.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement('canvas')
      offscreenRef.current.width = GRID
      offscreenRef.current.height = GRID
    }
    const key = `${caseId}-${angle}-${run}`
    if (!modelRef.current || modelRef.current.key !== key) {
      const model = createMeltModel({ n: GRID, ku: finCase.ku, kl: finCase.kl, angle })
      model.key = key
      if (reduced) {
        // No animation: show a single, partly melted state instead.
        while (model.liquidFraction < 0.45) model.step(200)
      }
      modelRef.current = model
    }
    const model = modelRef.current
    let frame
    let last = performance.now()
    let lastReadout = 0

    const report = (now, force) => {
      if (force || now - lastReadout > 100) {
        lastReadout = now
        setReadout({ time: model.time, lf: model.liquidFraction, done: model.liquidFraction >= STOP_AT })
      }
    }

    const tick = (now) => {
      const elapsed = Math.min(50, now - last)
      last = now
      const target = Math.max(1, Math.round(((elapsed / 1000) * MODEL_SECONDS_PER_SECOND) / model.dt))
      const start = performance.now()
      let done = 0
      while (done < target && model.liquidFraction < STOP_AT && performance.now() - start < FRAME_BUDGET_MS) {
        model.step(4)
        done += 4
      }
      draw(canvas, model, offscreenRef.current)
      const finished = model.liquidFraction >= STOP_AT
      report(now, finished)
      if (!finished) frame = requestAnimationFrame(tick)
    }

    if (autoplay && visible && model.liquidFraction < STOP_AT) {
      frame = requestAnimationFrame(tick)
    } else {
      frame = requestAnimationFrame((now) => {
        draw(canvas, model, offscreenRef.current)
        report(now, true)
      })
    }
    return () => cancelAnimationFrame(frame)
  }, [caseId, angle, run, autoplay, visible, reduced, finCase])

  const changeCase = (id) => {
    const next = FIN_CASES.find((c) => c.id === id)
    setCaseId(id)
    setAngle((a) => Math.min(a, next.angles[next.angles.length - 1]))
    setPlaying(!reduced)
  }

  return (
    <figure className="solver" aria-labelledby="solver-title">
      <div className="solver__top">
        <p id="solver-title" className="solver__title">
          Melting in a K-finned enclosure, computed live
        </p>
        <p className="solver__readout" aria-hidden="true">
          <span>t = {Math.round(readout.time).toLocaleString('en-US')} s</span>
          <span>liquid fraction {readout.lf.toFixed(2)}</span>
        </p>
        <div className="solver__buttons">
          {readout.done ? (
            <button type="button" className="button button--small" onClick={() => setRun((r) => r + 1)}>
              Run again
            </button>
          ) : (
            <button type="button" className="button button--small" onClick={() => setPlaying((p) => !p)}>
              {autoplay ? 'Pause' : 'Play'}
            </button>
          )}
          <button
            type="button"
            className="button button--small button--quiet"
            onClick={() => {
              setRun((r) => r + 1)
              setPlaying(!reduced)
            }}
          >
            Restart
          </button>
        </div>
      </div>

      <div className="solver__plot">
        <span className="solver__axis-name" aria-hidden="true">y (mm)</span>
        <span className="solver__wall-label" aria-hidden="true">
          Heated wall, 70 °C
        </span>
        <span className="solver__axis-name" aria-hidden="true">T (°C)</span>
        <div className="solver__yaxis" aria-hidden="true">
          {TICKS.map((t) => (
            <span key={t} style={{ bottom: `${(t / DOMAIN_MM) * 100}%` }}>
              {t}
            </span>
          ))}
        </div>
        <div className="solver__field">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Temperature field and melt front for fin case ${caseId} (upper arm ${finCase.ku} mm, lower arm ${finCase.kl} mm) at a fin angle of ${angle} degrees. Liquid fraction ${readout.lf.toFixed(2)} after ${Math.round(readout.time)} seconds.`}
          />
        </div>
        <div className="solver__cbar" aria-hidden="true">
          <div className="solver__cbar-ramp" style={{ background: GRADIENT }}>
            <span
              className="solver__melt-band"
              style={{
                bottom: `${((PCM.Ts - 25) / 45) * 100}%`,
                height: `${((PCM.Tl - PCM.Ts) / 45) * 100}%`,
              }}
            />
          </div>
          <div className="solver__cbar-ticks">
            {CBAR_TICKS.map((t) => (
              <span key={t} style={{ bottom: `${((t - 25) / 45) * 100}%` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <span />
        <div className="solver__xaxis" aria-hidden="true">
          {TICKS.map((t) => (
            <span key={t} style={{ left: `${(t / DOMAIN_MM) * 100}%` }}>
              {t}
            </span>
          ))}
          <em>x (mm)</em>
        </div>
        <span />
      </div>

      <div className="solver__controls">
        <label className="field">
          <span className="field__label">Arm lengths, upper / lower</span>
          <select value={caseId} onChange={(e) => changeCase(Number(e.target.value))}>
            {FIN_CASES.map((c) => (
              <option key={c.id} value={c.id}>
                Case {c.id}: {c.ku} / {c.kl} mm
              </option>
            ))}
          </select>
        </label>
        <label className="field field--range">
          <span className="field__label">
            Fin angle θ <output>{angle}°</output>
          </span>
          <input
            type="range"
            min="10"
            max={maxAngle}
            step="10"
            value={angle}
            onChange={(e) => {
              setAngle(Number(e.target.value))
              setPlaying(!reduced)
            }}
          />
        </label>

      </div>

      <figcaption className="solver__caption">
        <Rich>
          A toy model, solved in your browser: 2D transient conduction with an enthalpy formulation for melting,
          explicit finite volumes on a 64 × 64 grid. Enclosure, fin lengths and lauric-acid properties follow the
          manuscript; the bracket on the colour bar marks the melting range, 43.5–48.2 °C. The fin is held at the wall
          temperature and natural convection is left out, so the melt front (dark line) stays symmetric.
        </Rich>{' '}
        In the full Fluent model, buoyancy makes the upper half melt first.{' '}
        <Link to="/research/pcm-k-shaped-fins#results">See the study’s results</Link>.
      </figcaption>
    </figure>
  )
}
