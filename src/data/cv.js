// Content of the online CV, taken from the CV PDF (public/files/Shafollo-Proshad-Gupto-CV.pdf).
// Sections, headings, entries and wording follow the PDF, in the same order.
// Keep this file in step with the PDF when either changes.
//
// Section kinds:
//   timeline   dated entries (period on the left, details on the right)
//   list       short items without dates (research interests)
//   skills     category, tools and a short description
//   references referee cards
//
// Timeline entry fields (all optional except title):
//   period, title, to (link for the title), org, orgLink: { text, href } (links part of org),
//   meta: lines of { label, value, to, work } shown under the title
//   lines: short plain lines, courses: relevant courses,
//   points: bullet list, contributions: "My Contributions" box,
//   summary: a paragraph, citation: manuscript details.

const nb = ' ' // keeps numbers and units together on one line

export const cv = [
  {
    id: 'education',
    section: 'Education',
    kind: 'timeline',
    entries: [
      {
        period: 'Jan 2022 – Jun 2026',
        title: 'B.Sc. in Naval Architecture and Marine Engineering',
        org: 'Bangladesh University of Engineering & Technology (BUET), Bangladesh',
        lines: ['CGPA: 3.77/4.00 · Ranked 4th among 55 students in the department'],
        courses: [
          'Fluid Mechanics',
          'Marine Hydrodynamics',
          'Computational Fluid Dynamics (CFD)',
          'Numerical Computations Sessional',
          'Resistance and Propulsion of Ships',
          'Basic Thermal Engineering',
          'Heat Transfer',
          'Mechanics of Structure',
          'Finite Element Method (FEM) for Ship Structure',
        ],
      },
    ],
  },
  {
    id: 'interests',
    section: 'Research Interests',
    kind: 'list',
    items: ['Computational Fluid Dynamics', 'Heat Transfer', 'Phase Change Materials'],
  },
  {
    id: 'research',
    section: 'Research Experience',
    kind: 'timeline',
    entries: [
      {
        period: '2025–2026',
        title: 'Independent collaborative research',
        meta: [
          {
            label: 'Research Title',
            value:
              'Numerical Investigation of Melting Enhancement in a Phase Change Material-Filled Enclosure Using K-Shaped Fins: Effects of Fin Angle and Arm Length Ratio',
            to: '/research/pcm-k-shaped-fins',
            work: true,
          },
        ],
        points: [
          `Numerically investigated K-shaped aluminium fins for enhancing the melting of low-thermal-conductivity lauric acid PCM in a rectangular cavity using ANSYS Fluent 2024${nb}R1.`,
          'Evaluated five fin-arm-length configurations at fin angles of 10° to 80° and developed the Lower-zone Melting Lag Index (LMLI) to quantify thermal non-uniformity.',
          'Demonstrated up to 53.35% higher melting efficiency at 40°–50° with an extended lower fin arm and found an inverse relationship between melting efficiency and time-averaged LMLI.',
        ],
        contributions: [
          'Proposed the K-shaped-fin investigation and collaborated on mesh/time-step independence studies and parametric simulations.',
          'Analysed and post-processed simulation results, calculated melting efficiency, LMLI and Nusselt numbers, and wrote the original manuscript, including the complete Results and Discussion section.',
        ],
      },
      {
        period: 'Apr 2025 – Jun 2026',
        title: 'Undergraduate Thesis',
        meta: [
          {
            label: 'Thesis Title',
            value: 'Prediction of Calm-Water Resistance Using Smoothed Particle Hydrodynamics (SPH)',
            to: '/research/sph-ship-resistance',
            work: true,
          },
          { label: 'Supervisor', value: 'Dr. Md. Mashiur Rahaman, Professor, BUET' },
        ],
        points: [
          'Investigated SPH for predicting the calm-water resistance of the KCS displacement hull.',
          'Implemented WCSPH using the GPU-accelerated DualSPHysics framework.',
          `Developed a numerical towing tank and identified 9${nb}mm as the optimal particle spacing; resistance predictions at Fr${nb}=${nb}0.152–0.282 showed errors below 6.5%.`,
        ],
        contributions: [
          'Developed the DualSPHysics setup and conducted particle-spacing convergence studies to select the optimal resolution.',
          'Post-processed and validated resistance predictions against experimental data across five Froude numbers, including resistance-coefficient calculations.',
        ],
      },
    ],
  },
  {
    id: 'manuscripts',
    section: 'Manuscripts Under Review/Publications',
    kind: 'timeline',
    entries: [
      {
        period: 'Under review',
        title:
          'Numerical Investigation of Melting Enhancement in a Phase Change Material-Filled Enclosure Using K-Shaped Fins: Effects of Fin Angle and Arm Length Ratio',
        to: '/publications',
        citation: {
          authors: ['Md Tanvir Anjum Zenith', 'Adri Das', 'Shafollo Proshad Gupto', 'Md. Atiqur Rahaman', 'Md. Khairul Islam'],
          me: 'Shafollo Proshad Gupto',
          venue: 'Case Studies in Thermal Engineering',
          status: 'Under Review',
          contribution: 'Conceptualization, Data Curation, Investigation, Software, Writing – Original Draft, Formal analysis.',
        },
      },
    ],
  },
  {
    id: 'project',
    section: 'Engineering Project',
    kind: 'timeline',
    entries: [
      {
        period: 'Jan 2024 – Feb 2025',
        title: 'Undergraduate Project',
        meta: [
          { label: 'Supervisor', value: 'Dr. Nayeb Md. Golam Zakaria' },
          {
            value: 'Design of an Inland General Cargo Vessel with 2500 Ton Cargo Capacity',
            to: '/projects',
            work: true,
          },
        ],
        summary:
          'Developed an inland general cargo ship with a 2,500-ton cargo carrying capacity for year-round operation on the Dhaka–Chittagong route. Performed detailed ship design, economic analysis, and assessment of environmental impacts.',
      },
    ],
  },
  {
    id: 'skills',
    section: 'Technical Skills',
    kind: 'skills',
    items: [
      {
        group: 'CAD & 3D Modelling',
        value: 'Rhinoceros 3D, AutoCAD',
        detail:
          'Used both tools in the undergraduate ship-design project to model vessel geometry and draw ship components. Also prepared KCS hull geometry for numerical resistance simulations using Rhinoceros 3D.',
      },
      {
        group: 'Fluid Flow Analysis',
        value: 'ANSYS Fluent, DualSPHysics, ParaView',
        detail:
          'Simulated PCM melting and natural convection in ANSYS Fluent; investigated KCS calm-water resistance using DualSPHysics; and post-processed and visualised simulation results in ParaView.',
      },
      {
        group: 'Programming & Numerical Computation',
        value: 'Python, MATLAB, C++, Fortran',
        detail:
          'Used Python for research-data processing, filtering, calculations, and graph generation. Applied MATLAB to numerical ODE solutions and integration methods. Developed a C++ structured mesh generator as a course project, including node and element generation and element aspect-ratio and quality evaluation. Studied Fortran programming as part of the Computer Programming in Ship Design-I course.',
      },
      {
        group: 'Structural Analysis',
        value: 'ABAQUS',
        detail:
          'Performed plane-stress, tangential-stress, compression, and buckling analyses of structural components, including truss systems, in Ship Structure Sessional.',
      },
      {
        group: 'Ship Design & Naval Architecture',
        value: 'MAXSURF',
        detail:
          'Performed resistance, hydrostatic, intact and damage stability, and freeboard analyses for the undergraduate ship-design project and the WFSA ferry-design competition.',
      },
    ],
  },
  {
    id: 'experience',
    section: 'Professional Experience',
    kind: 'timeline',
    entries: [
      {
        period: 'Jan 2025 – Feb 2025',
        title: 'Intern',
        org: 'Dockyard & Engineering Works Ltd, Bangladesh Navy, Narayanganj, Bangladesh',
        // Link on the organisation name, as in the CV PDF
        orgLink: { text: 'Dockyard & Engineering Works Ltd', href: 'https://www.dewbn.gov.bd/' },
        summary:
          'Completed shipyard practice at DEWBN as part of NAME 310, gaining practical exposure to shipbuilding processes, including welding, NDT inspections, material flow, pipe fabrication, and marine engine installation. Developed an understanding of ship production workflows and the practical constraints involved in translating engineering designs into physical marine structures.',
      },
    ],
  },
  {
    id: 'honours',
    section: 'Honors and Awards',
    kind: 'timeline',
    entries: [
      { period: '1st, 2nd and 4th year', title: 'University Dean’s List Scholarship' },
      { period: '1st, 2nd and 4th year', title: 'University Merit Scholarship' },
      {
        period: '2026',
        title: '3rd Prize in “Worldwide Ferry Safety Association Design Competition 2026”',
        org: 'Team Black Pearl',
      },
    ],
  },
  {
    id: 'service',
    section: 'Leadership and Service',
    kind: 'timeline',
    entries: [
      {
        period: 'Dec 2022 – Jan 2025',
        title: 'University Class Representative',
        org: 'Department of Naval Architecture and Marine Engineering, BUET',
      },
      {
        period: 'Dec 2022',
        title: 'Volunteer',
        org: 'MARTEC 2022 – International Conference on Marine Technology',
      },
      {
        period: 'Sept 2025 – Mar 2026',
        title: 'Team Member, Black Pearl, BUET',
        org: 'Worldwide Ferry Safety Association Design Competition',
      },
    ],
  },
  {
    id: 'references',
    section: 'References',
    kind: 'references',
    items: [
      {
        name: 'Dr. Nayeb Md. Golam Zakaria',
        role: 'Professor',
        dept: 'Dept. of Naval Architecture & Marine Engineering, BUET',
        email: 'gzakaria@name.buet.ac.bd',
        relationship: 'Ship design project supervisor.',
      },
      {
        name: 'Dr. Md. Mashiur Rahaman',
        role: 'Professor',
        dept: 'Dept. of Naval Architecture & Marine Engineering, BUET',
        email: 'mashiurrahaman@name.buet.ac.bd',
        relationship: 'Undergraduate thesis supervisor.',
      },
      {
        name: 'Dr. Zobair Ibn Awal',
        role: 'Professor & Head',
        dept: 'Dept. of Naval Architecture & Marine Engineering, BUET',
        email: 'zobair@name.buet.ac.bd',
        relationship: 'WFSA Ferry design competition supervisor.',
      },
    ],
  },
]

/** Look up a CV section by id (used by the About page). */
export const cvSection = (id) => cv.find((s) => s.id === id)
