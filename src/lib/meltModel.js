/*
 * A deliberately simple finite-volume model used for the live figure on the
 * home page. It is NOT the model used in the manuscript.
 *
 * What it solves: 2D transient heat conduction with melting (enthalpy method)
 * in a 50 mm x 50 mm cavity. The left wall is held at 70 °C, the other walls
 * are adiabatic, and the K-shaped aluminium fin is treated as isothermal at the
 * wall temperature (aluminium conducts ~1,300 times better than lauric acid).
 * Natural convection in the melt is NOT included, so the melt front stays
 * symmetric; the manuscript's Fluent model resolves the buoyant flow.
 *
 * Numerics: cell-centred finite volumes on an n x n uniform grid, explicit
 * (forward Euler) time stepping on specific enthalpy, harmonic-mean face
 * conductivities, and a linear liquid-fraction / temperature relation between
 * the solidus and liquidus temperatures.
 */

// Lauric-acid properties from Table 2 of the manuscript (solid/liquid values
// averaged where the table gives a range; density averaged).
export const PCM = {
  rho: 912, // kg/m3
  c: 2285, // J/(kg K)
  kSolid: 0.16, // W/(m K)
  kLiquid: 0.14, // W/(m K)
  L: 187210, // J/kg
  Ts: 43.5, // °C, solidus
  Tl: 48.2, // °C, liquidus
  Ti: 25, // °C, initial temperature
  Tw: 70, // °C, heated wall and fin
}

// Fin arm lengths (mm) for the five cases in Table 1 of the manuscript.
export const FIN_CASES = [
  { id: 1, ratio: '1:1', ku: 30, kl: 30, angles: [10, 20, 30, 40, 50, 60, 70, 80] },
  { id: 2, ratio: '5:7', ku: 25, kl: 35, angles: [10, 20, 30, 40, 50, 60, 70] },
  { id: 3, ratio: '2:4', ku: 20, kl: 40, angles: [10, 20, 30, 40, 50, 60] },
  { id: 4, ratio: '7:5', ku: 35, kl: 25, angles: [10, 20, 30, 40, 50, 60, 70] },
  { id: 5, ratio: '4:2', ku: 40, kl: 20, angles: [10, 20, 30, 40, 50, 60] },
]

const SIZE_MM = 50
const JUNCTION_Y_MM = 25 // schematic: junction at mid-height of the heated wall
const FIN_THICKNESS_MM = 2

/** Fin arm end points in mm, origin at the bottom of the heated wall. */
export function finArms({ ku, kl, angle }) {
  const half = (angle * Math.PI) / 360
  const y0 = JUNCTION_Y_MM
  return [
    { x1: 0, y1: y0, x2: ku * Math.cos(half), y2: y0 + ku * Math.sin(half) },
    { x1: 0, y1: y0, x2: kl * Math.cos(half), y2: y0 - kl * Math.sin(half) },
  ]
}

function distToSegment(px, py, s) {
  const vx = s.x2 - s.x1
  const vy = s.y2 - s.y1
  const t = Math.max(0, Math.min(1, ((px - s.x1) * vx + (py - s.y1) * vy) / (vx * vx + vy * vy)))
  const dx = px - (s.x1 + t * vx)
  const dy = py - (s.y1 + t * vy)
  return Math.hypot(dx, dy)
}

export function createMeltModel({ n = 80, ku, kl, angle }) {
  const P = PCM
  const N = n
  const dxMm = SIZE_MM / N
  const dx = dxMm / 1000
  const cells = N * N
  const H = new Float64Array(cells) // enthalpy above the initial state, J/kg
  const T = new Float32Array(cells).fill(P.Ti)
  const gamma = new Float32Array(cells)
  const fin = new Uint8Array(cells)
  const arms = finArms({ ku, kl, angle })

  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const x = (i + 0.5) * dxMm
      const y = (j + 0.5) * dxMm
      if (arms.some((a) => distToSegment(x, y, a) <= FIN_THICKNESS_MM / 2 + 1e-9)) {
        fin[j * N + i] = 1
        T[j * N + i] = P.Tw
        gamma[j * N + i] = 1
      }
    }
  }

  const H1 = P.c * (P.Ts - P.Ti)
  const H2 = P.c * (P.Tl - P.Ti) + P.L
  const pcmCells = cells - fin.reduce((s, v) => s + v, 0)
  // Explicit stability: a cell can touch up to four Dirichlet faces (2k/dx each).
  const dt = (0.9 * P.rho * P.c * dx * dx) / (8 * P.kSolid)
  const coef = dt / (P.rho * dx * dx)
  const k = new Float32Array(cells)
  const dH = new Float64Array(cells)

  let time = 0
  let liquidFraction = 0

  function updateState(idx) {
    const h = H[idx]
    let g
    let t
    if (h < H1) {
      g = 0
      t = P.Ti + h / P.c
    } else if (h < H2) {
      g = (h - H1) / (H2 - H1)
      t = P.Ts + g * (P.Tl - P.Ts)
    } else {
      g = 1
      t = P.Tl + (h - H2) / P.c
    }
    gamma[idx] = g
    T[idx] = t
  }

  function step(count = 1) {
    for (let s = 0; s < count; s++) {
      for (let idx = 0; idx < cells; idx++) {
        k[idx] = P.kSolid + (P.kLiquid - P.kSolid) * gamma[idx]
      }
      for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {
          const idx = j * N + i
          if (fin[idx]) continue
          const kP = k[idx]
          const tP = T[idx]
          let q = 0
          // west: heated wall at i = 0
          if (i === 0) q += 2 * kP * (P.Tw - tP)
          else q += face(idx - 1, kP, tP)
          if (i < N - 1) q += face(idx + 1, kP, tP)
          if (j > 0) q += face(idx - N, kP, tP)
          if (j < N - 1) q += face(idx + N, kP, tP)
          dH[idx] = q * coef
        }
      }
      let melted = 0
      for (let idx = 0; idx < cells; idx++) {
        if (fin[idx]) continue
        H[idx] += dH[idx]
        updateState(idx)
        melted += gamma[idx]
      }
      liquidFraction = melted / pcmCells
      time += dt
    }
  }

  function face(nb, kP, tP) {
    if (fin[nb]) return 2 * kP * (PCM.Tw - tP)
    const kN = k[nb]
    return ((2 * kP * kN) / (kP + kN)) * (T[nb] - tP)
  }

  return {
    N,
    dt,
    T,
    gamma,
    fin,
    arms,
    step,
    get time() {
      return time
    },
    get liquidFraction() {
      return liquidFraction
    },
  }
}
