// Publications and theses. `status` must be one of:
// 'Published', 'Accepted', 'Under review', 'In preparation', 'Thesis'.
// Add `doi` or `url` when a public version exists.

export const publications = [
  {
    group: 'Journal manuscripts',
    items: [
      {
        authors: [
          'Md Tanvir Anjum Zenith',
          'Adri Das',
          'Shafollo Proshad Gupto',
          'Md. Atiqur Rahaman',
          'Md. Khairul Islam',
        ],
        title:
          'Numerical Investigation of Melting Enhancement in a Phase Change Material-Filled Enclosure Using K-Shaped Fins: Effects of Fin Angle and Arm Length Ratio',
        venue: 'Case Studies in Thermal Engineering',
        status: 'Under review',
        year: '2026',
        contribution: 'Conceptualization, Data curation, Investigation, Software, Formal analysis, Writing – original draft',
        page: '/research/pcm-k-shaped-fins',
        note: 'Not publicly available while under review; available from me on request.',
      },
    ],
  },
  {
    group: 'Theses',
    items: [
      {
        authors: ['Shafollo Proshad Gupto', 'Ahsan Ahmed'],
        title: 'Prediction of Calm Water Resistance of a Ship Using Smoothed Particle Hydrodynamics (SPH)',
        venue:
          'B.Sc. thesis (NAME 400), Department of Naval Architecture and Marine Engineering, BUET. Supervisor: Dr. Md. Mashiur Rahaman',
        status: 'Thesis',
        year: '2026',
        page: '/research/sph-ship-resistance',
      },
    ],
  },
]

export const ME = 'Shafollo Proshad Gupto'
