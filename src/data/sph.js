// Numbers and tables for the thesis page, taken from the thesis book
// (Tables 4.1–4.4 and 5.1). Do not round or re-derive.

export const sphContributions = [
  {
    stage: 'Numerical towing tank',
    detail: 'DualSPHysics case definition: domain, hull placement, inflow/outflow buffer zones, mDBC and solver parameters.',
    mine: true,
  },
  {
    stage: 'Particle-convergence simulations',
    detail: 'Four particle spacings (11, 10, 9, 8 mm) at Fr = 0.26 on the GPU.',
    mine: true,
  },
  {
    stage: 'Froude-number sweep',
    detail: 'Runs at Fr = 0.152, 0.195, 0.226 and 0.282 with the 9 mm resolution.',
    mine: true,
  },
  {
    stage: 'Signal filtering',
    detail: 'Fourth-order Butterworth low-pass filter (1 Hz) on the raw resistance histories.',
    mine: false,
  },
  {
    stage: 'Resistance coefficient and error analysis',
    detail: 'C_T from the filtered resistance and comparison with towing-tank data.',
    mine: true,
    note: 'Most of it',
  },
  {
    stage: 'Free-surface visualization',
    detail: 'Wave-elevation fields around the hull in ParaView.',
    mine: true,
  },
  {
    stage: 'Thesis writing',
    detail: 'Original draft of the thesis book.',
    mine: true,
  },
]

export const kcsParticulars = [
  ['Length between perpendiculars, L_PP', '230', '0.989', 'm'],
  ['Length of waterline, L_WL', '232', '1', 'm'],
  ['Maximum beam at waterline, B', '32.2', '0.138', 'm'],
  ['Depth, D', '19', '0.082', 'm'],
  ['Draft, T', '10.8', '0.046', 'm'],
  ['Displacement, ∇', '52,030', '0.004', 'm³'],
  ['Wetted surface without rudder, S_W', '9,530', '0.176', 'm²'],
  ['Block coefficient, C_B', '0.651', '0.651', '–'],
]

export const domain = [
  ['Upstream channel length', '0.9 L_WL', '0.9 m'],
  ['Downstream channel length', '1.8 L_WL', '1.8 m'],
  ['Channel width', '1 L_WL', '1 m'],
  ['Channel depth', '6 T', '0.28 m'],
]

export const sphParameters = [
  ['Formulation', 'Weakly compressible SPH (DualSPHysics v5.4, GPU)'],
  ['Kernel', 'Wendland'],
  ['Equation of state', 'Tait, polytropic constant γ = 7, coefficient of sound 6'],
  ['Smoothing length', 'h = 1.4 dp'],
  ['Viscosity', 'Laminar + SPS, ν = 1 × 10⁻⁶ m² s⁻¹'],
  ['Density diffusion', 'Fourtakas (full)'],
  ['Boundary condition', 'Modified dynamic boundary condition (mDBC)'],
  ['Time stepping', 'Verlet, variable Δt, CFL coefficient 0.2'],
  ['Reference density, valid range', '1000 kg m⁻³, 700 – 1300 kg m⁻³'],
  ['Run length', '20 s simulated; C_T averaged over the last 5 s'],
]

// Table 4.4 — convergence at Fr = 0.26. Error = (C_T,exp − C_T,SPH) / C_T,exp.
export const convergence = [
  { dp: 11, particles: 0.628, ctSph: 6.984, error: -88.2, runtime: 0.93 },
  { dp: 10, particles: 0.833, ctSph: 4.327, error: -16.6, runtime: 1.23 },
  { dp: 9, particles: 1.115, ctSph: 3.621, error: 2.43, runtime: 1.68, selected: true },
  { dp: 8, particles: 1.562, ctSph: 3.785, error: -1.99, runtime: 2.57 },
]
export const convergenceCtExp = 3.711

// Table 5.1 — validation at dp = 9 mm. C_T values × 10⁻³.
export const validationRows = [
  { fr: 0.152, rt: 0.072, ctExp: 3.641, ctSph: 3.616, error: 0.69, image: 'media/sph/free-surface-fr0152.webp' },
  { fr: 0.195, rt: 0.11, ctExp: 3.475, ctSph: 3.334, error: 4.06, image: 'media/sph/free-surface-fr0195.webp' },
  { fr: 0.226, rt: 0.145, ctExp: 3.467, ctSph: 3.247, error: 6.35, image: 'media/sph/free-surface-fr0226.webp' },
  { fr: 0.26, rt: 0.212, ctExp: 3.711, ctSph: 3.621, error: 2.43, image: 'media/sph/free-surface-fr0260.webp' },
  { fr: 0.282, rt: 0.297, ctExp: 4.501, ctSph: 4.314, error: 4.15, image: 'media/sph/free-surface-fr0282.webp' },
]
