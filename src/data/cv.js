// Entries for the CV page. Newest first within each section.

export const cv = [
  {
    section: 'Education',
    entries: [
      {
        title: 'B.Sc. in Naval Architecture and Marine Engineering',
        org: 'Bangladesh University of Engineering and Technology (BUET), Bangladesh',
        period: 'Jan 2022 – Jun 2026',
        points: ['CGPA 3.77 / 4.00, ranked 4th of 55 in the department'],
      },
    ],
  },
  {
    section: 'Research experience',
    entries: [
      {
        title: 'Melting enhancement in a PCM-filled enclosure using K-shaped fins',
        org: 'Collaborative research, BUET',
        period: '2025 – 2026',
        to: '/research/pcm-k-shaped-fins',
        points: [
          'Finite-volume simulation of lauric-acid melting with natural convection in ANSYS Fluent 2024 R1',
          'Five fin arm-length configurations across fin angles of 10°–80°; developed the Lower-zone Melting Lag Index',
          'Up to 53.35% higher melting efficiency at 40°–50° with an extended lower arm',
        ],
      },
      {
        title: 'Undergraduate thesis: calm-water resistance prediction with SPH',
        org: 'Supervisor: Dr. Md. Mashiur Rahaman, Professor, BUET',
        period: 'Apr 2025 – Jun 2026',
        to: '/research/sph-ship-resistance',
        points: [
          'Weakly compressible SPH in the GPU-accelerated DualSPHysics framework for the KCS hull',
          'Numerical towing tank; 9 mm particle spacing selected from a convergence study',
          'Resistance errors below 6.5% for Fr = 0.152–0.282',
        ],
      },
    ],
  },
  {
    section: 'Engineering projects',
    entries: [
      {
        title: 'Design of an inland general cargo vessel, 2,500 t cargo capacity',
        org: 'Supervisor: Dr. Nayeb Md. Golam Zakaria',
        period: 'Jan 2024 – Feb 2025',
        to: '/projects',
        points: ['Ship design, economic analysis and environmental assessment for the Dhaka–Chittagong route'],
      },
    ],
  },
  {
    section: 'Professional experience',
    entries: [
      {
        title: 'Intern',
        org: 'Dockyard & Engineering Works Ltd, Bangladesh Navy, Narayanganj',
        period: 'Jan 2024 – Feb 2025',
      },
    ],
  },
  {
    section: 'Honours and awards',
    entries: [
      { title: 'University Dean’s List Scholarship', org: 'BUET', period: '1st, 2nd and 4th year' },
      {
        title: '3rd prize, Worldwide Ferry Safety Association Design Competition 2026',
        org: 'Team Black Pearl, BUET',
        period: '2026',
      },
    ],
  },
  {
    section: 'Leadership and service',
    entries: [
      {
        title: 'Team member, Black Pearl',
        org: 'WFSA Design Competition, BUET',
        period: 'Sep 2025 – Mar 2026',
      },
      {
        title: 'Class representative',
        org: 'Department of Naval Architecture and Marine Engineering, BUET',
        period: 'Dec 2022 – Jan 2025',
      },
      {
        title: 'Volunteer',
        org: 'MARTEC 2022, International Conference on Marine Technology',
        period: 'Dec 2022',
      },
    ],
  },
]
