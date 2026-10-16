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
    kind: 'Independent collaborative research',
    status: 'Manuscript under review',
    venue: 'Case Studies in Thermal Engineering',
    authors: ['Md Tanvir Anjum Zenith', 'Adri Das', 'Shafollo Proshad Gupto', 'Md. Atiqur Rahaman', 'Md. Khairul Islam'],
    period: '2025 – 2026',
    field: 'Numerical heat transfer, phase change, natural convection',
    method: 'Finite-volume CFD (mesh-based)',
    tools: ['ANSYS Fluent 2024 R1'],
    // Based on the manuscript abstract and conclusions.
    summary:
      'Phase change materials store large amounts of heat as latent heat, but their low thermal conductivity makes them slow to melt. This study investigates K-shaped aluminium fins in a lauric-acid-filled rectangular enclosure heated from one side, using a 2D transient finite-volume model in ANSYS Fluent with the enthalpy–porosity method and Boussinesq natural convection. The fin angle (10°–80°) and the split of a fixed 60 mm fin length between the upper and lower arms were varied. Melting is governed by competition between convection confinement at small angles and obstruction of the convection loop at large ones, so intermediate angles of 40°–50° performed best. Extending the lower arm into the slowly melting lower zone raised melting efficiency by up to 53.35% relative to the finless enclosure, and a Lower-zone Melting Lag Index was introduced to quantify the uneven melting. The results provide geometric guidelines for fin-assisted latent heat storage.',
    myContribution: [
      'Proposed the investigation of K-shaped fins for enhancing melting in a PCM-filled rectangular enclosure.',
      'Collaborated with co-authors on mesh- and time-step-independence studies and the parametric simulations.',
      'Analysed the numerical results and calculated melting efficiency, the Lower-zone Melting Lag Index (LMLI), and Nusselt numbers.',
      'Carried out substantial post-processing and interpretation of the simulation results.',
      'Wrote the original manuscript draft, including the complete Results and Discussion section.',
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
    kind: 'Undergraduate thesis',
    status: null,
    venue: 'Department of Naval Architecture and Marine Engineering, BUET',
    authors: ['Shafollo Proshad Gupto', 'Ahsan Ahmed'],
    supervisor: 'Dr. Md. Mashiur Rahaman',
    period: 'April 2025 – June 2026',
    field: 'Ship hydrodynamics, free-surface flow',
    method: 'Weakly compressible SPH (mesh-free)',
    tools: ['DualSPHysics v5.4 (GPU)', 'ParaView'],
    summary:
      'Accurate prediction of ship resistance is essential for improving hull design, fuel efficiency, and emissions. This study investigates the applicability of Smoothed Particle Hydrodynamics (SPH) to predicting the calm-water resistance of the KRISO Container Ship (KCS), a benchmark displacement hull. Simulations were performed using the Weakly Compressible SPH formulation in DualSPHysics, with a numerical towing tank and open boundary conditions. A particle-convergence study was conducted to select an appropriate particle spacing, and predicted total resistance coefficients were compared with experimental towing-tank data at five Froude numbers between 0.152 and 0.282. The predictions agreed well with the experimental measurements, with errors remaining below 6.5% across the investigated range. The simulations also captured characteristic free-surface wave patterns that became more pronounced as the Froude number increased. These results demonstrate the applicability of SPH to predicting calm-water resistance and free-surface flow around displacement-type ship hulls.',
    myContribution: [
      'Developed the numerical towing-tank setup, including the computational domain, boundary conditions, and solver parameters.',
      'Wrote the simulation setup and supporting code, and ran the numerical simulations using DualSPHysics on a GPU.',
      'Conducted the particle-convergence study and the simulations across the investigated Froude numbers.',
      'Developed Python scripts for data processing, resistance-coefficient calculations, and error analysis.',
      'Produced the free-surface visualisations in ParaView and interpreted the resulting wave patterns.',
      'Wrote the initial and final thesis drafts, including most of the methodology, results, and discussion.',
    ],
    contributionNote: 'Thesis completed jointly with Ahsan Ahmed, supervised by Dr. Md. Mashiur Rahaman.',
    findings: [
      'C_T error fell from 88.2% at 11 mm particle spacing to 2.43% at 9 mm (Fr = 0.26)',
      'Errors of 0.69–6.35% across Fr = 0.152–0.282, with SPH under-predicting at every speed',
      'The wave pattern strengthened with Froude number, as expected for a displacement hull',
    ],
    figure: {
      src: 'media/sph/free-surface-fr0282.webp',
      alt: 'Top view of free-surface elevation around the KCS hull at Froude number 0.282, showing a bow wave and a Kelvin-like wake of alternating crests and troughs.',
      caption: 'Free-surface elevation (z / L_WL) around the KCS hull at Fr = 0.282, from my ParaView post-processing.',
    },
  },
]
