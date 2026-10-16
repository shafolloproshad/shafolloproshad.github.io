// Personal details used across the site. Edit here, not in the pages.

export const profile = {
  name: 'Shafollo Proshad Gupto',
  email: 'shafollo.proshad@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shafollo-gupto-74121036b',
  github: 'https://github.com/shafolloproshad',
  cvFile: 'files/Shafollo-Proshad-Gupto-CV.pdf',

  // Photo in public/media/profile/. Set to null to show initials instead.
  photo: 'media/profile/portrait-buet.webp',
  // Photo on the separate About page (my_picture.jpg).
  aboutPhoto: 'media/profile/my_picture.jpg',

  degree: 'B.Sc. in Naval Architecture and Marine Engineering',
  university: 'Bangladesh University of Engineering and Technology (BUET)',
  universityShort: 'BUET',
  department: 'Department of Naval Architecture and Marine Engineering',
  period: 'January 2022 – June 2026',
  cgpa: '3.77 / 4.00',
  rank: '4th of 55 in the department',

  // Short introduction under the name on the home page.
  statement:
    'I graduated in Naval Architecture and Marine Engineering from BUET in 2026. My research has centred on numerical simulation of heat transfer and fluid flow, in particular finite-volume modelling of phase-change melting with natural convection in ANSYS Fluent. I am looking for graduate study and research in computational fluid dynamics and computational engineering.',

  // Research interests and intended directions (home, Research and About pages).
  interestsIntro:
    'My research focuses on computational fluid dynamics (CFD), heat transfer, and phase change materials (PCMs). Through numerical research using ANSYS Fluent, I have investigated melting enhancement in PCM systems, with particular attention to the effects of fin geometry on thermal performance. My experience includes simulation setup, mesh and time-step independence studies, post-processing, and analysis of numerical results. I aim to build on this foundation through graduate research in CFD and computational heat transfer.',
  interests: [
    {
      title: 'Computational Fluid Dynamics',
      detail:
        'Numerical modelling of fluid flow using mesh-based CFD methods, particularly finite-volume approaches.',
    },
    {
      title: 'Heat Transfer',
      detail:
        'Numerical analysis of heat transfer, including conduction, convection, and coupled fluid-flow and thermal processes.',
    },
    {
      title: 'Phase Change Materials',
      detail:
        'Numerical investigation of PCM melting and solidification, fin-assisted heat transfer enhancement, and thermal energy storage.',
    },
  ],

  courses: [
    'Fluid Mechanics',
    'Marine Hydrodynamics',
    'Computational Fluid Dynamics',
    'Numerical Computations Sessional',
    'Heat Transfer',
    'Basic Thermal Engineering',
    'Resistance and Propulsion of Ships',
    'Mechanics of Structure',
    'Finite Element Method for Ship Structure',
  ],
}
