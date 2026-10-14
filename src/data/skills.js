// Technical skills, grouped. `evidence` points to where the skill was used,
// so visitors can check it. Only list skills that you have actually used.

export const skills = [
  {
    group: 'CFD and numerical simulation',
    items: [
      {
        name: 'ANSYS Fluent',
        detail: 'Finite-volume, pressure-based transient solver; solidification and melting; Boussinesq natural convection',
        evidence: { label: 'PCM study', to: '/research/pcm-k-shaped-fins' },
      },
      {
        name: 'DualSPHysics',
        detail: 'Weakly compressible SPH on the GPU; open boundaries; modified dynamic boundary condition',
        evidence: { label: 'Thesis', to: '/research/sph-ship-resistance' },
      },
    ],
  },
  {
    group: 'Heat transfer and thermal analysis',
    items: [
      {
        name: 'Phase-change heat transfer',
        detail: 'Enthalpy–porosity melting, liquid-fraction tracking, latent-heat storage',
        evidence: { label: 'PCM study', to: '/research/pcm-k-shaped-fins' },
      },
      {
        name: 'Heat-transfer post-processing',
        detail: 'Melting efficiency, surface-averaged Nusselt number, the LMLI non-uniformity metric',
        evidence: { label: 'PCM study', to: '/research/pcm-k-shaped-fins#results' },
      },
    ],
  },
  {
    group: 'Verification and validation practice',
    items: [
      {
        name: 'Discretization independence',
        detail: 'Mesh and time-step studies (finite volume); particle-spacing convergence (SPH)',
        evidence: { label: 'Both studies', to: '/research' },
      },
      {
        name: 'Comparison with experiment',
        detail: 'Resistance-coefficient error analysis against towing-tank data at five Froude numbers',
        evidence: { label: 'Thesis', to: '/research/sph-ship-resistance#validation' },
      },
    ],
  },
  {
    group: 'Visualization and programming',
    items: [
      {
        name: 'ParaView',
        detail: 'Free-surface elevation fields from SPH output',
        evidence: { label: 'Thesis', to: '/research/sph-ship-resistance#free-surface' },
      },
      { name: 'Python', detail: 'Data processing and plotting' },
      { name: 'C++ and Fortran', detail: 'Programming languages' },
    ],
  },
  {
    group: 'Engineering design and structures',
    items: [
      { name: 'MAXSURF', detail: 'Ship design' },
      { name: 'AutoCAD and Rhinoceros 3D', detail: 'CAD and 3D modelling' },
      { name: 'ABAQUS', detail: 'Structural analysis' },
    ],
  },
]
