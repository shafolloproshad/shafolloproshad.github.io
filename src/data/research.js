// Research projects shown on the home page and the Research page.
// To add a project: add an object here, then create a detail page in
// src/pages and register its route in src/App.jsx.

export const research = [
  {
    slug: 'pcm-k-shaped-fins',
    path: '/research/pcm-k-shaped-fins',
    title:
      'Numerical Investigation of Melting Enhancement in a Phase Change Material-Filled Enclosure Using K-Shaped Fins: Effects of Fin Angle and Arm Length Ratio',
    shortTitle: 'Melting enhancement with K-shaped fins',
    status: 'Manuscript under review',
    venue: 'Case Studies in Thermal Engineering',
    period: '2025 – 2026',
    kind: 'Collaborative research, five authors',
    field: 'Numerical heat transfer, phase change, natural convection',
    method: 'Finite-volume CFD (mesh-based)',
    tools: ['ANSYS Fluent 2024 R1'],
    summary:
      'A 2D finite-volume study of lauric acid melting in a heated enclosure fitted with a K-shaped aluminium fin. Thirty-four fin geometries were simulated, varying the angle between the two arms (10°–80°) and how a fixed 60 mm of fin length is split between them.',
    myPart: [
      'Built the geometries and meshes; ran the mesh and time-step independence tests',
      'Set up the enthalpy–porosity and Boussinesq model in ANSYS Fluent and ran the parametric simulations',
      'Developed the Lower-zone Melting Lag Index (LMLI); computed melting efficiency and Nusselt number',
      'Drafted the results and discussion',
    ],
    findings: [
      'Fins cut melting time by 29.33–53.35% against the finless enclosure',
      'Inter-arm angles of 40°–50° performed best in every arm-length case',
      'A longer lower arm helped most; the peak LMLI fell from 0.56 to 0.13 as it lengthened',
    ],
    figure: {
      src: 'media/pcm/liquid-fraction-contours.webp',
      alt: 'Grid of liquid-fraction contours for fin angles 10° to 80° at five times from 1000 s to 4000 s; red melt grows from the heated left wall and fin while blue solid remains at the lower right.',
      caption: 'Liquid-fraction contours for fin angles of 10°–80° (Case 1) at five instants.',
    },
  },
  {
    slug: 'sph-ship-resistance',
    path: '/research/sph-ship-resistance',
    title: 'Prediction of Calm Water Resistance of a Ship Using Smoothed Particle Hydrodynamics (SPH)',
    shortTitle: 'Calm-water resistance of the KCS hull with SPH',
    status: 'Undergraduate thesis',
    venue: 'BUET, Department of Naval Architecture and Marine Engineering',
    period: 'April 2025 – June 2026',
    kind: 'B.Sc. thesis with Ahsan Ahmed; supervised by Dr. Md. Mashiur Rahaman',
    field: 'Ship hydrodynamics, free-surface flow',
    method: 'Weakly compressible SPH (mesh-free)',
    tools: ['DualSPHysics v5.4 (GPU)', 'ParaView'],
    summary:
      'A numerical towing tank for the KRISO Container Ship (KCS) benchmark hull, built in the GPU solver DualSPHysics. A particle-resolution study fixed the spacing at 9 mm, and the predicted total resistance was compared with towing-tank data at five Froude numbers.',
    myPart: [
      'Set up the numerical towing tank: domain, open boundaries, mDBC and solver parameters',
      'Ran the particle-convergence study and the Froude-number sweep on the GPU',
      'Carried out most of the resistance-coefficient calculation and error analysis',
      'Produced the free-surface visualizations in ParaView; wrote the original draft of the thesis',
    ],
    findings: [
      'C_T error fell from 88.2% at 11 mm spacing to 2.43% at 9 mm',
      'Prediction error stayed below 6.5% for Fr = 0.152–0.282',
      'Wave patterns grew with Froude number as expected for a displacement hull',
    ],
    figure: {
      src: 'media/sph/free-surface-fr0282.webp',
      alt: 'Top view of free-surface elevation around the KCS hull at Froude number 0.282, showing a bow wave and a Kelvin-like wake of alternating crests and troughs.',
      caption: 'Free-surface elevation (z / L_WL) around the KCS hull at Fr = 0.282.',
    },
  },
]
