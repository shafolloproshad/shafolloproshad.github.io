import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { armPolygon, DOMAIN_MM, finArms } from '../lib/finGeometry.js'
import { asset } from '../lib/asset.js'
import { useReducedMotion } from '../lib/hooks.js'

/*
 * Melting in the K-finned enclosure, from the manuscript's ANSYS Fluent results
 * (Case 1, both arms 30 mm). The temperature and liquid-fraction fields were
 * recovered from the published contour plots (Figs. 9 and 10) by
 * scripts/extract-contour-fields.py and are stored as small data images:
 * red = temperature, green = liquid fraction, one 150 x 150 frame per time.
 */

const GRID = 150
const TIMES = [0, 1000, 1750, 2500, 3250, 4000] // s; 0 s is the initial condition
const ANGLES = [10, 20, 30, 40, 50, 60, 70, 80]
const CASE = { ku: 30, kl: 30 }
const T_MIN = 20 // °C, colour scale
const T_MAX = 70
const T_TICKS = [20, 30, 40, 50, 60, 70]
const T_SOLIDUS = 43.5
const T_LIQUIDUS = 48.2
const FRAME_MS = 1500

// Diverging colour map centred on the melting range: solid = blue, melt = warm.
const STOPS = [
  [20, [31, 74, 115]],
  [33, [112, 157, 195]],
  [45.85, [233, 237, 240]],
  [57, [240, 162, 102]],
  [70, [184, 50, 26]],
]

function colourAt(t) {
  let k = 0
  while (k < STOPS.length - 2 && t > STOPS[k + 1][0]) k++
  const [t0, c0] = STOPS[k]
  const [t1, c1] = STOPS[k + 1]
  const f = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)))
  return c0.map((v, i) => Math.round(v + (c1[i] - v) * f))
}

// Data byte b (0-250) encodes T = T_MIN + b / 250 * (T_MAX - T_MIN).
const LUT = Array.from({ length: 256 }, (_, b) => colourAt(T_MIN + (Math.min(b, 250) / 250) * (T_MAX - T_MIN)))
const pct = (t) => `${(((t - T_MIN) / (T_MAX - T_MIN)) * 100).toFixed(2)}%`
const GRADIENT = `linear-gradient(to top, ${STOPS.map(([t, c]) => `rgb(${c.join(',')}) ${pct(t)}`).join(', ')})`

const cache = new Map()

async function loadAngle(angle) {
  if (cache.has(angle)) return cache.get(angle)
  const res = await fetch(asset(`media/pcm/fields/case1-${angle}.png`))
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const blob = await res.blob()
  let source
  try {
    source = await createImageBitmap(blob, { colorSpaceConversion: 'none', premultiplyAlpha: 'none' })
  } catch {
    source = await new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = URL.createObjectURL(blob)
    })
  }
  const c = document.createElement('canvas')
  c.width = GRID
  c.height = GRID * TIMES.length
  const ctx = c.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(source, 0, 0)
  const px = ctx.getImageData(0, 0, c.width, c.height).data
  const n = GRID * GRID * TIMES.length
  const temp = new Uint8Array(n)
  const liquid = new Uint8Array(n)
  for (let i = 0; i < n; i++) {
    temp[i] = px[i * 4]
    liquid[i] = px[i * 4 + 1]
  }
  const data = { temp, liquid }
  cache.set(angle, data)
  return data
}

function draw(canvas, data, angle, frame, offscreen) {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  const octx = offscreen.getContext('2d')
  const img = octx.createImageData(GRID, GRID)
  const base = frame * GRID * GRID
  for (let i = 0; i < GRID * GRID; i++) {
    const c = LUT[data.temp[base + i]]
    img.data[i * 4] = c[0]
    img.data[i * 4 + 1] = c[1]
    img.data[i * 4 + 2] = c[2]
    img.data[i * 4 + 3] = 255
  }
  octx.putImageData(img, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(offscreen, 0, 0, w, h)

  // Melt front: liquid fraction 0.5 (byte 125), marching squares on cell centres.
  const cell = w / GRID
  const g = (i, j) => data.liquid[base + j * GRID + i]
  const iso = 125
  ctx.beginPath()
  for (let j = 0; j < GRID - 1; j++) {
    for (let i = 0; i < GRID - 1; i++) {
      const a = g(i, j)
      const b = g(i + 1, j)
      const c = g(i + 1, j + 1)
      const d = g(i, j + 1)
      const pts = []
      if (a < iso !== b < iso) pts.push([i + (iso - a) / (b - a), j])
      if (b < iso !== c < iso) pts.push([i + 1, j + (iso - b) / (c - b)])
      if (c < iso !== d < iso) pts.push([i + 1 - (iso - c) / (d - c), j + 1])
      if (d < iso !== a < iso) pts.push([i, j + 1 - (iso - d) / (a - d)])
      for (let p = 0; p + 1 < pts.length; p += 2) {
        ctx.moveTo((pts[p][0] + 0.5) * cell, (pts[p][1] + 0.5) * cell)
        ctx.lineTo((pts[p + 1][0] + 0.5) * cell, (pts[p + 1][1] + 0.5) * cell)
      }
    }
  }
  ctx.strokeStyle = 'rgba(21, 39, 58, 0.92)'
  ctx.lineWidth = Math.max(1.5, w / 300)
  ctx.lineJoin = 'round'
  ctx.stroke()

  // Aluminium fin, drawn to scale over the field.
  const mm = w / DOMAIN_MM
  ctx.fillStyle = '#c9d1d8'
  ctx.strokeStyle = '#15273a'
  ctx.lineWidth = Math.max(1, w / 480)
  for (const arm of finArms({ ...CASE, angle })) {
    ctx.beginPath()
    armPolygon(arm).forEach(([x, y], k) => (k ? ctx.lineTo(x * mm, h - y * mm) : ctx.moveTo(x * mm, h - y * mm)))
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }
}

export default function FluentMeltingFigure() {
  const reduced = useReducedMotion()
  const canvasRef = useRef(null)
  const offscreenRef = useRef(null)
  const startedRef = useRef(false)
  const [angle, setAngle] = useState(40)
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState({ angle: null, data: null, error: null })

  const data = loaded.angle === angle ? loaded.data : null
  const atEnd = frame === TIMES.length - 1

  // Load the fields for the chosen fin angle.
  useEffect(() => {
    let live = true
    loadAngle(angle)
      .then((d) => live && setLoaded({ angle, data: d, error: null }))
      .catch((e) => live && setLoaded({ angle, data: null, error: e.message }))
    return () => {
      live = false
    }
  }, [angle])

  // Start playing the first time the figure scrolls into view.
  useEffect(() => {
    const el = canvasRef.current
    if (!el || reduced || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          setPlaying(true)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  // Step through the saved times while playing.
  useEffect(() => {
    if (!playing || !data) return
    if (atEnd) {
      const id = setTimeout(() => setPlaying(false), 0)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => setFrame((f) => f + 1), frame === 0 ? 700 : FRAME_MS)
    return () => clearTimeout(id)
  }, [playing, frame, data, atEnd])

  // Redraw on any change, and keep the canvas sharp at any size.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement('canvas')
      offscreenRef.current.width = GRID
      offscreenRef.current.height = GRID
    }
    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const size = Math.round(canvas.clientWidth * dpr)
      if (size > 0 && canvas.width !== size) {
        canvas.width = size
        canvas.height = size
      }
      if (data) draw(canvas, data, angle, frame, offscreenRef.current)
    }
    render()
    const ro = new ResizeObserver(render)
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [data, angle, frame])

  const restart = () => {
    startedRef.current = true
    setFrame(0)
    setPlaying(true)
  }

  return (
    <figure className="melt-fig" aria-labelledby="melt-fig-title">
      <div className="melt-fig__top">
        <div>
          <p id="melt-fig-title" className="melt-fig__title">
            Melting with a K-shaped fin: ANSYS Fluent result
          </p>
          <p className="melt-fig__sub">
            Case 1, both arms 30 mm, fin angle {angle}°
          </p>
        </div>
        <p className="melt-fig__time" aria-live="off">
          t = {TIMES[frame].toLocaleString('en-US')} s
        </p>
      </div>

      <div className="melt-fig__plot">
        <div className="melt-fig__wall" aria-hidden="true">
          <span>Heated wall, constant 70 °C</span>
        </div>
        <div className="melt-fig__field">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Temperature field and melt front at ${TIMES[frame]} seconds for a fin angle of ${angle} degrees, from the ANSYS Fluent simulations in the manuscript.`}
          />
          {!data && (
            <p className="melt-fig__status">{loaded.error ? `Could not load the data (${loaded.error}).` : 'Loading data…'}</p>
          )}
        </div>
        <div className="melt-fig__cbar" aria-hidden="true">
          <div className="melt-fig__ramp" style={{ background: GRADIENT }}>
            <span
              className="melt-fig__band"
              style={{ bottom: pct(T_SOLIDUS), height: `${((T_LIQUIDUS - T_SOLIDUS) / (T_MAX - T_MIN)) * 100}%` }}
            />
          </div>
          <div className="melt-fig__ticks">
            {T_TICKS.map((t) => (
              <span key={t} style={{ bottom: pct(t) }}>
                {t}
              </span>
            ))}
          </div>
          <span className="melt-fig__unit">°C</span>
        </div>
      </div>

      <p className="melt-fig__legend" aria-hidden="true">
        <span className="melt-fig__item">
          <span className="melt-fig__key melt-fig__key--front" />
          Melt front (liquid fraction 0.5)
        </span>
        <span className="melt-fig__item">
          <span className="melt-fig__key melt-fig__key--band" />
          Melting range 43.5–48.2 °C
        </span>
        <span className="melt-fig__item">Other walls adiabatic</span>
      </p>

      <div className="melt-fig__controls">
        <label className="field field--range">
          <span className="field__label">
            Fin angle θ <output>{angle}°</output>
          </span>
          <input
            id="melt-fig-angle"
            type="range"
            min={ANGLES[0]}
            max={ANGLES[ANGLES.length - 1]}
            step="10"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
          />
        </label>
        <label className="field field--range">
          <span className="field__label">
            Time <output>{TIMES[frame].toLocaleString('en-US')} s</output>
          </span>
          <input
            id="melt-fig-time"
            type="range"
            min="0"
            max={TIMES.length - 1}
            step="1"
            value={frame}
            aria-valuetext={`${TIMES[frame]} seconds`}
            onChange={(e) => {
              setPlaying(false)
              setFrame(Number(e.target.value))
            }}
          />
        </label>
        <div className="melt-fig__buttons">
          {atEnd && !playing ? (
            <button type="button" className="button button--small" onClick={restart}>
              Play again
            </button>
          ) : (
            <button type="button" className="button button--small" onClick={() => setPlaying((p) => !p)} disabled={!data}>
              {playing ? 'Pause' : 'Play'}
            </button>
          )}
          <button type="button" className="button button--small button--quiet" onClick={restart} disabled={!data}>
            Restart
          </button>
        </div>
      </div>

      <figcaption className="melt-fig__caption">
        Animation of the instantaneous development of the temperature distribution and moving melting front for Case 1.
        The results show hot liquid rising along the wall and melting the upper half first, while the last solid region
        remains near the bottom right. <Link to="/research/pcm-k-shaped-fins#results">All results</Link>
      </figcaption>
    </figure>
  )
}
