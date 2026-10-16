// Numbers and tables for the PCM study page. Every value comes from the
// manuscript (tables, text and conclusions). Do not round or re-derive.

export const pcmAuthors = [
  { name: 'Md Tanvir Anjum Zenith', corresponding: true },
  { name: 'Adri Das' },
  { name: 'Shafollo Proshad Gupto', me: true },
  { name: 'Md. Atiqur Rahaman', corresponding: true },
  { name: 'Md. Khairul Islam' },
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
  1: { peakEfficiency: 43.18, peakLmli40: 0.31 },
  2: { peakEfficiency: 47.94, peakLmli40: 0.22 },
  3: { peakEfficiency: 53.35, peakLmli40: 0.13 },
  4: { peakEfficiency: 40.69, peakLmli40: 0.43 },
  5: { peakEfficiency: 37.77, peakLmli40: 0.56 },
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
