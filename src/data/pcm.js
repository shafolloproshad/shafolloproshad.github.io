// Numbers and tables for the PCM study page. Every value comes from the
// manuscript (tables, text and conclusions). Do not round or re-derive.

export const pcmAuthors = [
  { name: 'Md Tanvir Anjum Zenith', corresponding: true },
  { name: 'Adri Das' },
  { name: 'Shafollo Proshad Gupto', me: true },
  { name: 'Md. Atiqur Rahaman', corresponding: true },
  { name: 'Md. Khairul Islam' },
]

export const pcmCredit =
  'Conceptualization, Data curation, Investigation, Software, Formal analysis, Writing – original draft'

// Workflow stages of the study. `mine: true` marks tasks I carried out,
// alone or jointly with co-authors.
export const pcmContributions = [
  {
    stage: 'Framing the study',
    detail: 'Choosing the K-fin angle and arm-length ratio as the questions to investigate.',
    mine: true,
    note: 'Shared',
  },
  {
    stage: 'Geometry and meshing',
    detail: 'The finless base case and the K-fin configurations of Table 1, meshed with quadrilateral elements.',
    mine: true,
  },
  {
    stage: 'Mesh and time-step independence',
    detail: 'Three meshes (5,051 / 17,625 / 32,345 elements) and three time steps (0.8 / 0.4 / 0.2 s).',
    mine: true,
  },
  {
    stage: 'Solver setup in ANSYS Fluent',
    detail: 'Solidification and melting model, Boussinesq buoyancy, NITA with PISO and PRESTO!, materials and boundary conditions.',
    mine: true,
  },
  {
    stage: 'Validation against experiment',
    detail: 'Base-case liquid fraction compared with Kamkari et al.: MAE 1.76%, R² = 0.9955.',
    mine: false,
  },
  {
    stage: 'Parametric simulations',
    detail: 'The fin-angle × arm-length-ratio matrix: 34 finned configurations.',
    mine: true,
  },
  {
    stage: 'Contour post-processing',
    detail: 'Temperature and liquid-fraction contour figures.',
    mine: false,
  },
  {
    stage: 'Lower-zone Melting Lag Index',
    detail: 'Developed the LMLI and computed its instantaneous and time-averaged values.',
    mine: true,
  },
  {
    stage: 'Melting efficiency and Nusselt number',
    detail: 'Computed η and surface-averaged Nu for the configurations and plotted them.',
    mine: true,
  },
  {
    stage: 'Results and discussion',
    detail: 'Drafted the mechanism explanations (convection confinement, obstruction, lower-zone bottleneck).',
    mine: true,
  },
  {
    stage: 'Review, editing and supervision',
    detail: 'Revision of the manuscript and project administration.',
    mine: false,
  },
]

export const lauricAcid = [
  { property: 'Specific heat, solid / liquid', unit: 'kJ kg⁻¹ K⁻¹', pcm: '2.18 – 2.39', al: '0.871' },
  { property: 'Melting range', unit: '°C', pcm: '43.5 – 48.2', al: '–' },
  { property: 'Latent heat of fusion', unit: 'kJ kg⁻¹', pcm: '187.21', al: '–' },
  { property: 'Thermal conductivity, solid / liquid', unit: 'W m⁻¹ K⁻¹', pcm: '0.16 / 0.14', al: '202.4' },
  { property: 'Density, solid / liquid', unit: 'kg m⁻³', pcm: '940 / 885', al: '2719' },
  { property: 'Thermal expansion coefficient', unit: 'K⁻¹', pcm: '0.0008', al: '–' },
]

export const solverSettings = [
  ['Solver', '2D, pressure-based, transient, gravity on'],
  ['Physical models', 'Solidification and melting (enthalpy–porosity), laminar flow, energy'],
  ['Density', 'Boussinesq approximation, operating temperature 46 °C'],
  ['Time advancement', 'Non-Iterative Time Advancement (NITA)'],
  ['Pressure–velocity coupling', 'PISO'],
  ['Pressure discretization', 'PRESTO!'],
  ['Momentum and energy', 'Second-order upwind'],
  ['Transient formulation', 'Second-order implicit'],
  ['Relaxation (p, momentum, energy)', '0.5, 0.6, 0.7'],
  ['Mushy-zone constant and ε', 'A_mush = 10⁷, ε = 0.001'],
  ['Mesh and time step', '17,625 quadrilateral elements, Δt = 0.4 s'],
]

export const finCases = [
  { id: 1, ratio: '1:1', ku: 30, kl: 30, angles: '10° – 80°' },
  { id: 2, ratio: '5:7', ku: 25, kl: 35, angles: '10° – 70°' },
  { id: 3, ratio: '2:4', ku: 20, kl: 40, angles: '10° – 60°' },
  { id: 4, ratio: '7:5', ku: 35, kl: 25, angles: '10° – 70°' },
  { id: 5, ratio: '4:2', ku: 40, kl: 20, angles: '10° – 60°' },
]

// From the conclusions: maximum melting efficiency of each case (reached at
// 40°–50°) and the peak instantaneous LMLI at θ = 40°.
export const caseOutcomes = {
  1: { peakEfficiency: 43.18, peakLmli40: 0.31, note: 'Lowest efficiency of the whole study: 29.33% at 10°.' },
  2: { peakEfficiency: 47.94, peakLmli40: 0.22 },
  3: {
    peakEfficiency: 53.35,
    peakLmli40: 0.13,
    note: 'Best configuration of the study at 40°. LMLI dips to −0.07 early on: the long lower arm melts the lower half first.',
  },
  4: { peakEfficiency: 40.69, peakLmli40: 0.43, note: 'Efficiency is largely insensitive to fin angle.' },
  5: { peakEfficiency: 37.77, peakLmli40: 0.56, note: 'Efficiency is largely insensitive to fin angle.' },
}

export const independence = {
  mesh: [
    { label: 'Coarse', value: '5,051' },
    { label: 'Medium (selected)', value: '17,625', selected: true },
    { label: 'Fine', value: '32,345' },
  ],
  meshChanges: [
    { from: 'Coarse → medium', change: '1.018%' },
    { from: 'Medium → fine', change: '0.119%' },
  ],
  timeStepChanges: [
    { from: 'Δt 0.8 → 0.4 s', change: '0.72%' },
    { from: 'Δt 0.4 → 0.2 s', change: '0.095%' },
  ],
}

export const validation = { mae: '1.76%', rmse: '2.18%', r2: '0.9955' }
