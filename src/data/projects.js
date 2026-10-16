// Engineering projects outside the two research studies.

export const projects = [
  {
    slug: 'inland-cargo-vessel',
    title: 'Design of an inland general cargo vessel with 2,500\u00a0t cargo capacity',
    context: 'Undergraduate ship design project, BUET, with Sromona Howlader',
    period: 'January 2024 – February 2025',
    supervisor: 'Dr. Nayeb Md. Golam Zakaria, Professor',
    // From the project presentation and project book.
    summary:
      'A general cargo vessel designed to carry 2,500\u00a0t of cargo on the 321\u00a0km Dhaka–Chittagong route at a service speed of 10\u00a0knots, taken from the owner’s requirements through drawings, structural, stability, resistance and machinery calculations to safety and cost estimates. The design is 73.89\u00a0m long overall and 71\u00a0m between perpendiculars, with a breadth of 14.81\u00a0m, a depth of 5.1\u00a0m and a draft of 3.88\u00a0m.',
    workLabel: 'Design work',
    work: [
      'Lines plan, offset table, hydrostatics and a general arrangement with three cargo holds',
      'Scantlings to GL-16 rules, with midship section, longitudinal construction and shell expansion drawings',
      'Weight estimate, capacity plan, trim, and intact stability in four loading conditions, all criteria met',
      'Holtrop–Mennen resistance (51.9\u00a0kN at 10\u00a0knots), propeller design with a Burrill cavitation check, and selection of two YANMAR 6AYM-WST engines rated at 485\u00a0kW',
      'Rudder, steering gear, engine foundation and shafting design',
      'Safety plan, CO₂ and NOₓ emission estimates, and building-cost and economic analysis (rate of return 12.4%)',
    ],
    images: [
      {
        src: 'media/projects/ship-design-general-arrangement.webp',
        alt: 'General arrangement plan of the cargo vessel: elevation, main deck, poop deck, navigation deck, forecastle deck and under-deck plan, with three cargo holds, the engine room aft and a table of principal particulars.',
        caption: 'General arrangement plan.',
      },
    ],
  },
  {
    slug: 'wfsa-2026',
    title: 'Worldwide Ferry Safety Association Design Competition 2026',
    context: 'Team Black Pearl, BUET',
    period: 'September 2025 – March 2026',
    supervisorLabel: 'Faculty advisors',
    supervisor: 'Dr. Zobair Ibn Awal, Professor and Head of Department; Md. Abdul Kader',
    // Shown with the team details in the left column rather than in the project details.
    supervisorPlacement: 'head',
    outcome: '3rd prize',
    // From the competition presentation, report and visual representation.
    summary:
      'Niger Drift is a CNG-powered catamaran passenger ferry designed for the International Student Design Competition for A Safe and Affordable Ferry 2026. It carries 200 passengers with their personal and market cargo on the 200\u00a0km Lokoja–Onitsha route on the Niger River in Nigeria, where a docking depth of only 0.89\u00a0m at Lokoja calls for a shallow draft. The ferry is 38\u00a0m long with a 10\u00a0m beam, a 0.75\u00a0m draft and a service speed of 20\u00a0knots.',
    workLabel: 'Key features',
    work: [
      'Catamaran hull chosen for its wide deck, stability and low resistance; aluminium 5086 structure with scantlings to Bureau Veritas rules and precut block construction',
      'Hybrid electric propulsion: four CNG gensets power electric thrusters, with batteries as backup and solar panels and a hydrokinetic turbine as auxiliary power sources',
      'Intact stability, floodable length, probabilistic damage stability and strip-theory seakeeping analyses, with every load case meeting the criteria',
      'Estimated construction cost of USD 1.7 million and a fare of ₦8,300 (USD 5.68), about half that of comparable land transport, with a payback of about 10 years at 85% occupancy',
      'Safety and navigation features including a digital-twin monitoring system, LiDAR, forward-looking sonar, a tiltable propeller with shear-pin protection and a directional sound system to guide evacuation',
    ],
    images: [
      {
        src: 'media/projects/wfsa-niger-drift-render.webp',
        alt: 'Rendering of the Niger Drift: a white catamaran ferry with green trim and solar panels on the upper deck, moored alongside a quay.',
        caption: '3D view of the Niger Drift ferry design.',
      },
      {
        src: 'media/projects/wfsa-team-black-pearl.webp',
        alt: 'Team Black Pearl: nine members standing in a row on a lawn at BUET, wearing department T-shirts.',
        caption: 'Team Black Pearl, BUET.',
      },
    ],
    award: {
      title: 'Third Prize, International Student Design Competition for A Safe and Affordable Ferry 2026',
      image: {
        src: 'media/projects/wfsa-award-certificate.webp',
        alt: 'Certificate from the Worldwide Ferry Safety Association awarding the Third Prize of $1000 to the team from Bangladesh University of Engineering and Technology in the International Student Design Competition for A Safe and Affordable Ferry 2026, listing the team captain, team members including Shafollo Proshad Gupto, and faculty advisors.',
        caption: 'Award certificate.',
      },
      pdf: 'files/WFSA-2026-third-prize-certificate.pdf',
    },
    link: { href: 'https://www.teamblackpearl.com/#/wfsa-2026', label: 'Team Black Pearl entry' },
  },
]
