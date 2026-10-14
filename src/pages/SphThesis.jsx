import { Link } from 'react-router'
import StudyHeader from '../components/StudyHeader.jsx'
import Toc from '../components/Toc.jsx'
import Figure, { OwnerTag } from '../components/Figure.jsx'
import Equation from '../components/Equation.jsx'
import ContributionMatrix from '../components/ContributionMatrix.jsx'
import ConvergenceTable from '../components/ConvergenceTable.jsx'
import FroudeExplorer from '../components/FroudeExplorer.jsx'
import { CtChart } from '../components/charts.jsx'
import Rich from '../components/Rich.jsx'
import { sphContributions, kcsParticulars, domain, sphParameters, validationRows } from '../data/sph.js'
import { useDocumentTitle } from '../lib/hooks.js'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'contributions', label: 'My contributions' },
  { id: 'model', label: 'Numerical model' },
  { id: 'convergence', label: 'Particle convergence' },
  { id: 'validation', label: 'Validation' },
  { id: 'free-surface', label: 'Free-surface patterns' },
  { id: 'transfer', label: 'Relation to mesh-based CFD' },
  { id: 'findings', label: 'Key findings' },
  { id: 'skills', label: 'Skills demonstrated' },
  { id: 'limitations', label: 'Limitations' },
  { id: 'thesis', label: 'Thesis details' },
]

export default function SphThesis() {
  useDocumentTitle('SPH prediction of ship resistance')

  return (
    <article>
      <StudyHeader
        status="Undergraduate thesis"
        title="Prediction of Calm Water Resistance of a Ship Using Smoothed Particle Hydrodynamics (SPH)"
        authors={[{ name: 'Shafollo Proshad Gupto', me: true }, { name: 'Ahsan Ahmed' }]}
        meta={[
          ['Supervisor', 'Dr. Md. Mashiur Rahaman, Professor, BUET'],
          ['Period', 'April 2025 – June 2026'],
          ['Method', 'Weakly compressible SPH, 3D, GPU'],
          ['Software', 'DualSPHysics v5.4, ParaView'],
        ]}
      />

      <div className="container article">
        <aside className="article__aside">
          <Toc items={TOC} />
        </aside>

        <div className="article__main">
          <section id="overview" className="article__section">
            <h2>Overview</h2>
            <div className="prose">
              <p>
                Calm-water resistance sets the propulsion power a ship needs. It is usually measured in a towing tank
                or computed with mesh-based RANS solvers. This thesis tested whether a mesh-free method, weakly
                compressible smoothed particle hydrodynamics (WCSPH) as implemented in the GPU solver DualSPHysics, can
                predict the total resistance of a displacement hull with realistic geometry.
              </p>
              <p>
                The test case is the KRISO Container Ship (KCS), a standard benchmark with published towing-tank data.
                Earlier SPH resistance studies used simple forms such as the mathematically defined Wigley hull, or
                planing hulls where lift dominates. The KCS, with its bulbous bow and transom stern, combines wave-making
                and viscous pressure effects that demand careful boundary treatment.
              </p>
            </div>
            <Figure
              src="media/sph/free-surface-all.webp"
              alt="Five stacked top views of free-surface elevation around half of the KCS hull at Froude numbers 0.152, 0.195, 0.227, 0.260 and 0.282. The wake pattern grows stronger with speed."
              caption="Free-surface elevation z / L_WL around the hull at the five Froude numbers studied."
              source="Thesis"
              owner="me"
              size="narrow"
            />
          </section>

          <section id="objectives" className="article__section">
            <h2>Objectives</h2>
            <div className="prose">
              <ul>
                <li>Develop an SPH model of the KCS hull in DualSPHysics to predict calm-water resistance.</li>
                <li>Validate the predicted resistance against towing-tank data for the KCS.</li>
                <li>Assess how accurate and reliable SPH is for displacement hulls.</li>
                <li>Visualize and analyse the wave field around the hull.</li>
              </ul>
            </div>
          </section>

          <section id="contributions" className="article__section article__section--feature">
            <h2>My contributions to this research</h2>
            <div className="prose">
              <p>
                I completed this thesis jointly with Ahsan Ahmed under the supervision of Dr. Md. Mashiur Rahaman. My
                part covered setting up and running the simulations, most of the resistance-coefficient calculation and
                error analysis, the free-surface visualizations, and the original draft of the thesis.
              </p>
            </div>
            <ContributionMatrix rows={sphContributions} caption="Stages of the thesis work" />
          </section>

          <section id="model" className="article__section">
            <h2>
              Numerical model <OwnerTag owner="me" />
            </h2>

            <h3 className="article__h3">Formulation</h3>
            <div className="prose">
              <p>
                SPH represents the water as particles that move with the flow and carry mass, velocity, density and
                pressure. Any field quantity at a particle is a kernel-weighted sum over its neighbours within a
                distance 2<i>h</i>:
              </p>
            </div>
            <Equation number="1" tex={String.raw`\langle F(\mathbf{r}_a)\rangle \approx \sum_{b} \frac{m_b}{\rho_b}\,F(\mathbf{r}_b)\,W(\mathbf{r}_a - \mathbf{r}_b, h)`} />
            <Equation
              number="2"
              tex={String.raw`W(q) = \alpha_D\left(1 - \tfrac{q}{2}\right)^{4}(2q + 1),\quad 0 \le q \le 2,\quad q = \frac{r}{h},\quad \alpha_D = \frac{21}{16\pi h^{3}}`}
            />
            <div className="prose">
              <p>
                In the weakly compressible formulation, pressure follows from density through the Tait equation of
                state, with the numerical speed of sound <i>c</i>
                <sub>0</sub> chosen to keep density variations near 1%. The momentum equation then becomes a pairwise
                sum, with Γ<sub>a</sub> holding the laminar and sub-particle-scale (SPS) viscous terms:
              </p>
            </div>
            <Equation number="3" tex={String.raw`P = B\left[\left(\frac{\rho}{\rho_0}\right)^{\gamma} - 1\right],\qquad B = \frac{c_0^{2}\rho_0}{\gamma},\quad \gamma = 7`} />
            <Equation
              number="4"
              tex={String.raw`\frac{\mathrm{d}\mathbf{v}_a}{\mathrm{d}t} = -\sum_{b} m_b\left(\frac{P_b}{\rho_b^{2}} + \frac{P_a}{\rho_a^{2}}\right)\nabla_a W_{ab} + \mathbf{g} + \boldsymbol{\Gamma}_a`}
            />
            <div className="prose">
              <p>
                A Fourtakas density-diffusion term damps spurious pressure oscillations, and the modified dynamic
                boundary condition (mDBC) mirrors ghost nodes across the hull surface to enforce no-penetration and
                no-slip without the artificial gap of the original boundary treatment.
              </p>
            </div>
            <div className="figure-pair figure-pair--uneven">
              <Figure
                src="media/sph/mdbc.webp"
                alt="Diagram of boundary particles (grey) and fluid particles (blue) with the boundary surface at half a particle spacing and normal vectors used to mirror ghost nodes."
                caption="Modified dynamic boundary condition: boundary interface at dp/2 and normal vectors."
                source="Thesis, Fig. 3.1"
              />
              <Figure
                src="media/sph/kcs-body-plan.webp"
                alt="Body plan and profile of the KCS hull showing section lines and the bulbous bow."
                caption="Body plan of the KCS model hull."
                source="Thesis, Fig. 4.1"
              />
            </div>

            <h3 className="article__h3">Hull and numerical towing tank</h3>
            <div className="prose">
              <p>
                The hull is held fixed and water flows past it, entering through an inflow buffer zone and leaving
                through an outflow buffer zone. These open boundaries let a short domain represent a long towing tank.
                The side and bottom walls are fixed boundaries placed far enough away to avoid shallow-water and
                blockage effects. Each run simulated 20 s, and the total resistance coefficient was averaged over the
                last 5 s:
              </p>
            </div>
            <Equation number="5" tex={String.raw`C_T = \frac{R_T}{\tfrac{1}{2}\,\rho\,S\,V^{2}}`} />
            <div className="figure-pair">
              <Figure
                src="media/sph/domain-overview.webp"
                alt="Three-dimensional view of the numerical tank with the KCS hull near the free surface and arrows showing flow direction from inlet to outlet."
                caption="Numerical towing tank with the stationary hull; flow enters at one end and leaves at the other."
                source="Thesis, Fig. 4.4"
              />
              <Figure
                src="media/sph/domain-2d.webp"
                alt="Side-view schematic: inflow buffer on the left, hull at the free surface, outflow buffer on the right; 0.90 m upstream, 1.80 m downstream, 2.70 m total, 0.28 m depth."
                caption="Longitudinal section of the domain with buffer zones and principal dimensions."
                source="Thesis, Fig. 4.3"
              />
            </div>
            <div className="table-pair">
              <div className="table-wrap" role="region" aria-label="KCS particulars" tabIndex={0}>
                <table className="data-table">
                  <caption>Principal particulars of the KCS (thesis, Table 4.1).</caption>
                  <thead>
                    <tr>
                      <th scope="col">Particular</th>
                      <th scope="col">Full scale</th>
                      <th scope="col">Model</th>
                      <th scope="col">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kcsParticulars.map(([k, full, model, unit]) => (
                      <tr key={k}>
                        <th scope="row">
                          <Rich>{k}</Rich>
                        </th>
                        <td>{full}</td>
                        <td>{model}</td>
                        <td>{unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-wrap" role="region" aria-label="Domain dimensions" tabIndex={0}>
                <table className="data-table">
                  <caption>Computational domain (thesis, Table 4.2).</caption>
                  <tbody>
                    {domain.map(([k, rel, abs]) => (
                      <tr key={k}>
                        <th scope="row">{k}</th>
                        <td>
                          <Rich>{rel}</Rich>
                        </td>
                        <td>{abs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <h3 className="article__h3">Solver parameters</h3>
            <div className="table-wrap" role="region" aria-label="SPH parameters" tabIndex={0}>
              <table className="data-table data-table--kv">
                <caption>DualSPHysics settings (thesis, Table 4.3).</caption>
                <tbody>
                  {sphParameters.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>
                        <Rich>{v}</Rich>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="convergence" className="article__section">
            <h2>
              Particle convergence <OwnerTag owner="me" />
            </h2>
            <div className="prose">
              <p>
                In SPH the particle spacing dp plays the role that cell size plays in a mesh. Four spacings were run at
                Fr = 0.26. The coarsest, 11 mm, over-predicted <i>C</i>
                <sub>T</sub> by 88.2%; at 9 mm the error was 2.43%, and at 8 mm 1.99%. The final refinement improved
                accuracy by only 0.44 percentage points while increasing run time by 52.98%, so 9 mm (1.1 million
                particles) was used for the rest of the study.
              </p>
            </div>
            <ConvergenceTable />
            <Figure
              src="media/sph/convergence.webp"
              alt="Total resistance coefficient against time for particle spacings of 8, 9, 10 and 11 mm with the experimental value as a horizontal line. The 11 mm curve sits far above; 8 and 9 mm oscillate around the experimental line."
              caption="C_T time histories at the four particle spacings, against the experimental value."
              source="Thesis, Fig. 4.5"
              owner="me"
            />

            <h3 className="article__h3">
              Filtering the resistance signal <OwnerTag owner="team" />
            </h3>
            <div className="prose">
              <p>
                Weakly compressible SPH produces high-frequency pressure noise, so the raw resistance history was
                passed through a fourth-order Butterworth low-pass filter with a 1 Hz cut-off before averaging. The
                filtered signal settles cleanly on a mean value.
              </p>
            </div>
            <Figure
              src="media/sph/filtering.webp"
              alt="Unfiltered resistance coefficient oscillating strongly between about −10 and 15, with the 1 Hz filtered curve settling near the experimental value."
              caption="Unfiltered and 1 Hz low-pass filtered C_T at dp = 8 mm, Fr = 0.26."
              source="Thesis, Fig. 4.6"
              owner="team"
            />
          </section>

          <section id="validation" className="article__section">
            <h2>
              Validation against towing-tank data <OwnerTag owner="me" />
            </h2>
            <div className="prose">
              <p>
                With dp = 9 mm, the predicted <i>C</i>
                <sub>T</sub> was compared with experiment at five Froude numbers. Errors range from 0.69% at Fr =
                0.152 to 6.35% at Fr = 0.226, all below 6.5%. SPH under-predicts at every speed. Because only total
                resistance was evaluated, the thesis does not separate the likely sources: the SPS model’s treatment of
                near-wall viscous flow, and density-driven pressure fluctuations at the hull surface.
              </p>
            </div>
            <CtChart rows={validationRows} />
            <div className="table-wrap" role="region" aria-label="Validation results" tabIndex={0}>
              <table className="data-table">
                <caption>Resistance at dp = 9 mm (thesis, Table 5.1).</caption>
                <thead>
                  <tr>
                    <th scope="col">Fr</th>
                    <th scope="col">
                      <i>R</i>
                      <sub>T</sub> (N)
                    </th>
                    <th scope="col">
                      <i>C</i>
                      <sub>T</sub> experiment × 10³
                    </th>
                    <th scope="col">
                      <i>C</i>
                      <sub>T</sub> SPH × 10³
                    </th>
                    <th scope="col">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {validationRows.map((r) => (
                    <tr key={r.fr}>
                      <th scope="row">{r.fr.toFixed(3)}</th>
                      <td>{r.rt.toFixed(3)}</td>
                      <td>{r.ctExp.toFixed(3)}</td>
                      <td>{r.ctSph.toFixed(3)}</td>
                      <td>{r.error.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Figure
              src="media/sph/ct-time-series.webp"
              alt="Four panels of C_T against time at Froude numbers 0.152, 0.195, 0.226 and 0.282. Each rises from a start-up transient and then oscillates around the experimental value."
              caption="C_T time histories at Fr = 0.152, 0.195, 0.226 and 0.282 against experiment."
              source="Thesis, Fig. 5.1"
              owner="me"
              size="wide"
            />
          </section>

          <section id="free-surface" className="article__section">
            <h2>
              Free-surface patterns <OwnerTag owner="me" />
            </h2>
            <div className="prose">
              <p>
                The wave field shows a distinct bow wave, a trough along the midbody, and alternating crests and troughs
                spreading behind the stern, nearly symmetric about the centreline. As the Froude number rises, the
                transverse and diverging waves become stronger and extend further downstream, as expected for a
                displacement hull. The wave elevations were visualized but not compared quantitatively with measured
                wave profiles.
              </p>
            </div>
            <FroudeExplorer />
          </section>

          <section id="transfer" className="article__section">
            <h2>Relation to mesh-based CFD</h2>
            <div className="prose">
              <p>
                SPH and finite-volume methods discretize the equations very differently, but the questions that decide
                whether a result can be trusted are the same. Working through them in a particle method meant answering
                each one explicitly.
              </p>
            </div>
            <ul className="skill-list">
              <li>
                <b>Resolution study</b>
                <span>
                  Choosing dp is the particle counterpart of mesh refinement: error fell from 88.2% to 2.43% between 11
                  and 9 mm, and the last step was weighed against its cost.
                </span>
              </li>
              <li>
                <b>Boundary conditions</b>
                <span>
                  Buffer zones act as inlet and outlet conditions so a 2.7 m domain can stand in for a long tank; mDBC
                  enforces the wall condition at the hull.
                </span>
              </li>
              <li>
                <b>Pressure from density</b>
                <span>
                  Unlike a pressure-based finite-volume solver, WCSPH computes pressure from density through an equation
                  of state. The resulting noise is why the force signal had to be filtered before averaging.
                </span>
              </li>
              <li>
                <b>Validation</b>
                <span>
                  A signed error against towing-tank data at every Froude number, the same check used for RANS
                  resistance predictions of the KCS.
                </span>
              </li>
            </ul>
          </section>

          <section id="findings" className="article__section">
            <h2>Key findings</h2>
            <ul className="findings">
              <li>
                <b>9 mm</b>
                <span>particle spacing balances accuracy and cost: 2.43% error at Fr = 0.26 in a 1.68 h GPU run.</span>
              </li>
              <li>
                <b>&lt; 6.5%</b>
                <span>resistance error across Fr = 0.152–0.282, with SPH under-predicting at every speed.</span>
              </li>
              <li>
                <b>Hours, not days</b>
                <span>of run time with GPU-accelerated DualSPHysics, against the days a CPU run would need.</span>
              </li>
              <li>
                <b>Wave pattern</b>
                <span>bow wave and stern wake strengthen with Froude number as expected for a displacement hull.</span>
              </li>
            </ul>
          </section>

          <section id="skills" className="article__section">
            <h2>Skills demonstrated</h2>
            <p className="article__lead">Based on the parts of the thesis I carried out.</p>
            <ul className="skill-list">
              <li>
                <b>Computational domain design</b>
                <span>A numerical towing tank with open boundaries sized to avoid wall and depth effects.</span>
              </li>
              <li>
                <b>Solver configuration</b>
                <span>Kernel, viscosity model, density diffusion, boundary condition and time stepping in DualSPHysics.</span>
              </li>
              <li>
                <b>Resolution sensitivity</b>
                <span>A four-level convergence study and an explicit accuracy-versus-cost decision.</span>
              </li>
              <li>
                <b>Validation and error analysis</b>
                <span>
                  <Rich>C_T against experiment at five Froude numbers.</Rich>
                </span>
              </li>
              <li>
                <b>GPU computing</b>
                <span>Million-particle 3D simulations on a single GPU.</span>
              </li>
              <li>
                <b>Scientific visualization and writing</b>
                <span>Free-surface fields in ParaView; the first draft of the thesis.</span>
              </li>
            </ul>
          </section>

          <section id="limitations" className="article__section">
            <h2>Limitations and next steps</h2>
            <div className="prose">
              <ul>
                <li>
                  The hull was fixed in calm water. Waves, ship motions and added resistance are the obvious extension.
                </li>
                <li>
                  Particle spacing was uniform everywhere. Variable resolution, fine near the hull and coarse far away,
                  would cut the cost substantially.
                </li>
                <li>Wave patterns were visualized but not compared with measured wave profiles.</li>
                <li>Only total resistance was evaluated, so viscous and pressure components were not separated.</li>
              </ul>
            </div>
          </section>

          <section id="thesis" className="article__section">
            <h2>Thesis details</h2>
            <div className="citation">
              <p>
                <strong>Shafollo Proshad Gupto</strong> and Ahsan Ahmed. “Prediction of Calm Water Resistance of a Ship
                Using Smoothed Particle Hydrodynamics (SPH).” B.Sc. thesis (NAME 400), Department of Naval
                Architecture and Marine Engineering, Bangladesh University of Engineering and Technology, June 2026.
                Supervisor: Dr. Md. Mashiur Rahaman.
              </p>
              <p className="citation__note">
                For the full thesis, <Link to="/contact">contact me</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
