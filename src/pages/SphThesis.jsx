import StudyHeader from '../components/StudyHeader.jsx'
import Toc from '../components/Toc.jsx'
import Figure from '../components/Figure.jsx'
import Equation from '../components/Equation.jsx'
import Contribution from '../components/Contribution.jsx'
import ConvergenceTable from '../components/ConvergenceTable.jsx'
import FroudeExplorer from '../components/FroudeExplorer.jsx'
import { CtChart } from '../components/charts.jsx'
import Rich from '../components/Rich.jsx'
import { kcsParticulars, domain, sphParameters, validationRows } from '../data/sph.js'
import { research } from '../data/research.js'
import { useDocumentTitle } from '../lib/hooks.js'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'model', label: 'Numerical Model' },
  { id: 'validation', label: 'Model Validation' },
  { id: 'results', label: 'Results and Discussion' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'contribution', label: 'My Contribution' },
]

// My contribution, shared with the thesis entry on the home and Research pages.
const thesis = research.find((r) => r.slug === 'sph-ship-resistance')

export default function SphThesis() {
  useDocumentTitle('SPH prediction of ship resistance')

  return (
    <article className="study study--sph">
      <StudyHeader
        status="Undergraduate thesis"
        title="Prediction of Calm Water Resistance of a Ship Using Smoothed Particle Hydrodynamics (SPH)"
        authors={[{ name: 'Shafollo Proshad Gupto', me: true }, { name: 'Ahsan Ahmed' }]}
        meta={[
          ['Supervisor', 'Dr. Md. Mashiur Rahaman, Professor, BUET'],
          ['Method', 'Weakly compressible SPH, 3D, GPU'],
          ['Software', 'DualSPHysics v5.4, ParaView'],
          ['Period', 'April 2025 – June 2026'],
        ]}
      />

      <div className="container article">
        <aside className="article__aside">
          <Toc items={TOC} />
        </aside>

        <div className="article__main">
          {/* ---------------------------------------------------------- */}
          <section id="overview" className="article__section">
            <h2>Overview</h2>
            <div className="prose">
              <p>
                Accurate prediction of calm-water resistance is essential in ship design: resistance sets the
                propulsion power a hull needs, and with it the fuel consumption and emissions. Resistance has
                traditionally been obtained from towing-tank experiments and, increasingly, from mesh-based CFD solvers
                of the Reynolds-averaged Navier–Stokes equations. Mesh-based methods can compute complex flows but
                must cope with mesh deformation and distortion where the free surface deforms strongly. Mesh-free
                particle methods such as Smoothed Particle Hydrodynamics (SPH) follow the free surface naturally, and
                SPH has been applied widely to free-surface problems such as slamming and planing hulls. Its use for
                predicting the calm-water resistance of displacement-type hulls, however, remains limited, and a
                published comparison with a mesh-based solver used the mathematically defined Wigley hull, a simpler
                form than a real ship.
              </p>
              <p>
                This thesis investigates whether the weakly compressible SPH formulation of the open-source GPU solver
                DualSPHysics can predict the calm-water resistance of the KRISO Container Ship (KCS), a benchmark
                displacement hull. A numerical towing tank with open boundaries was built, and the predicted total
                resistance coefficient was validated against experimental towing-tank data at five Froude numbers
                from 0.152 to 0.282.
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="model" className="article__section">
            <h2>Numerical Model</h2>

            <h3 className="article__h3">Mathematical Modeling</h3>
            <div className="prose">
              <p>
                SPH represents the water by discrete particles instead of a computational mesh. Each particle carries
                its position, velocity, density and pressure and moves with the flow, and a quantity at any point is
                evaluated from the neighbouring particles inside a region of influence through a smoothing function, the
                kernel <i>W</i>, with smoothing length <i>h</i>. The formulation rests on two steps: a kernel
                approximation, which writes a function in integral form, and a particle approximation, which replaces
                the integral by a sum over the neighbours <i>j</i> of particle <i>i</i>, each with mass <i>m</i>
                <sub>j</sub> and density ρ<sub>j</sub>:
              </p>
            </div>
            <Equation number="1" tex={String.raw`\langle F(\mathbf{r}) \rangle = \int_{\Omega} F(\mathbf{r}')\,W(\mathbf{r} - \mathbf{r}', h)\,\mathrm{d}\mathbf{r}'`} />
            <Equation
              number="2"
              tex={String.raw`\langle F(\mathbf{r}_i) \rangle \approx \sum_{j=1}^{N} \frac{m_j}{\rho_j}\,F(\mathbf{r}_j)\,W(\mathbf{r}_i - \mathbf{r}_j, h)`}
            />
            <div className="prose">
              <p>
                The Wendland kernel is used because it balances accuracy against computational cost; particles interact
                within a distance of 2<i>h</i>, with α<sub>D</sub> a normalisation constant and <i>q</i> = <i>r</i>/
                <i>h</i>:
              </p>
            </div>
            <Equation number="3" tex={String.raw`W(r, h) = \alpha_D\left(1 - \frac{q}{2}\right)^{4}(2q + 1), \qquad 0 \le q \le 2`} />
            <div className="prose">
              <p>
                DualSPHysics implements a weakly compressible formulation (WCSPH): pressure is computed from density
                through the Tait equation of state, with reference density ρ<sub>0</sub>, numerical speed of sound{' '}
                <i>c</i>
                <sub>0</sub> and polytropic constant γ<sub>p</sub>:
              </p>
            </div>
            <Equation
              number="4"
              tex={String.raw`P_i = \frac{c_0^{2}\rho_0}{\gamma_p}\left[\left(\frac{\rho_i}{\rho_0}\right)^{\gamma_p} - 1\right]`}
            />
            <div className="prose">
              <p>
                The continuity and momentum equations are solved in discrete particle form. A density-diffusion term,
                with coefficient δ, damps spurious density oscillations, and Γ<sub>i</sub> holds the viscous terms:
              </p>
            </div>
            <Equation
              number="5"
              tex={String.raw`\frac{\mathrm{d}\rho_i}{\mathrm{d}t} = \sum_{j} m_j\,\mathbf{v}_{ij}\cdot\nabla_i W_{ij} + 2\delta h c_0 \sum_{j} \frac{m_j}{\rho_j}\left(\rho_i^{D} - \rho_j^{D}\right)\frac{\mathbf{r}_{ij}}{\lVert\mathbf{r}_{ij}\rVert^{2}}\cdot\nabla_i W_{ij}`}
            />
            <Equation
              number="6"
              tex={String.raw`\frac{\mathrm{d}\mathbf{v}_i}{\mathrm{d}t} = -\sum_{j} m_j\left(\frac{P_j}{\rho_j^{2}} + \frac{P_i}{\rho_i^{2}}\right)\nabla_i W_{ij} + \mathbf{g} + \boldsymbol{\Gamma}_i`}
            />
            <div className="prose">
              <p>
                Viscosity is modelled with a laminar term, with kinematic viscosity ν<sub>0</sub> = 1.0&nbsp;×&nbsp;10⁻⁶&nbsp;m²/s,
                plus the Sub-Particle Scale (SPS) turbulence model, which accounts for unresolved turbulent stresses
                through the SPS stress tensor τ<sup>ab</sup>:
              </p>
            </div>
            <Equation
              number="7"
              tex={String.raw`\boldsymbol{\Gamma}_i = \sum_{j} m_j\,\frac{4\nu_0\,\mathbf{r}_{ij}\cdot\nabla_i W_{ij}}{(\rho_i + \rho_j)\left(r_{ij}^{2} + \eta^{2}\right)}\,\mathbf{v}_{ij} + \sum_{j} m_j\left(\frac{\tau_i^{ab} + \tau_j^{ab}}{\rho_i\,\rho_j}\right)\nabla_i^{a} W_{ij}`}
            />
            <div className="prose">
              <p>
                Velocity, density and position are advanced with the explicit Verlet scheme, with a periodic correction
                step that limits numerical error. The time step is bounded by the Courant–Friedrichs–Lewy (CFL)
                condition, which accounts for particle acceleration and viscous diffusion; <i>C</i>
                <sub>CFL</sub> is the time-step coefficient and η a small parameter that prevents division by zero:
              </p>
            </div>
            <Equation
              number="8"
              tex={String.raw`\begin{gathered} \Delta t = C_{\mathrm{CFL}}\min\left(\Delta t_f,\ \Delta t_{cv}\right) \\[6pt] \Delta t_f = \min_i\sqrt{\frac{h}{\lvert \mathrm{d}\mathbf{v}_i/\mathrm{d}t \rvert}}, \qquad \Delta t_{cv} = \min_i \frac{h}{c_0 + \max_j \dfrac{\lvert h\,\mathbf{v}_{ij}\cdot\mathbf{r}_{ij}\rvert}{r_{ij}^{2} + \eta^{2}}} \end{gathered}`}
            />

            <h3 className="article__h3">KCS Benchmark Hull</h3>
            <div className="prose">
              <p>
                The KRISO Container Ship (KCS) is used as the benchmark hull. It is widely accepted as a standard model
                in ship hydrodynamics because its experimental towing-tank resistance data are well documented, which
                makes it suitable for validating numerical methods, and its bulbous bow and transom stern make it a
                realistic displacement hull. A model-scale hull with a waterline length of 1 m was used in the
                simulations.
              </p>
            </div>
            <Figure
              src="media/sph/kcs-body-plan.webp"
              alt="Body plan and profile of the KCS hull showing section lines and the bulbous bow."
              caption="Body plan of the KCS model hull."
            />
            <div className="table-wrap" role="region" aria-label="KCS particulars" tabIndex={0}>
              <table className="data-table">
                <caption>Principal particulars of the KCS at full and model scale.</caption>
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

            <h3 className="article__h3">Computational Domain</h3>
            <div className="prose">
              <p>
                The hull is held stationary while the surrounding water is given a velocity equal to the ship speed,
                which reproduces the relative motion between hull and fluid. The domain is defined by the upstream and
                downstream channel lengths, the channel width and the channel depth, chosen to leave room for the wake
                behind the hull and to avoid restricted-water and shallow-water effects.
              </p>
            </div>
            <div className="domain-layout">
              <Figure
                src="media/sph/domain-overview.webp"
                alt="Three-dimensional view of the numerical tank with the KCS hull near the free surface and arrows showing flow direction from inlet to outlet."
                caption="Three-dimensional view of the computational domain showing the position of the KCS hull."
              />
              <div className="table-wrap" role="region" aria-label="Domain dimensions" tabIndex={0}>
                <table className="data-table">
                  <caption>Dimensions of the computational domain.</caption>
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
            <Figure
              src="media/sph/domain-2d.webp"
              alt="Side-view schematic: inflow buffer on the left, hull at the free surface, outflow buffer on the right; 0.90 m upstream, 1.80 m downstream, 2.70 m total, 0.28 m depth."
              caption="Longitudinal section of the domain with the inflow and outflow buffer zones and principal dimensions."
              size="wide"
            />
            <div className="prose">
              <p>
                The front and rear boundaries are open. DualSPHysics implements them as inflow and outflow buffer
                zones of several particle layers, which keep the kernel support complete and allow particles to be
                added at the inlet and removed at the outlet; velocity, density and pressure in the buffers are
                extrapolated from ghost nodes in the adjacent fluid. A relatively short domain can therefore represent
                a long towing tank at a lower computational cost. The side and bottom walls are fixed boundaries, and
                solid boundaries use the modified Dynamic Boundary Condition (mDBC): the boundary surface lies midway
                between the outermost boundary particles and the adjacent fluid, normals are computed with respect to
                it, and ghost nodes reflected into the fluid enforce the boundary condition.
              </p>
            </div>
            <div className="table-wrap" role="region" aria-label="SPH parameters" tabIndex={0}>
              <table className="data-table data-table--kv">
                <caption>DualSPHysics settings.</caption>
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

          {/* ---------------------------------------------------------- */}
          <section id="validation" className="article__section">
            <h2>Model Validation</h2>
            <div className="prose">
              <p>
                The model was checked against experimental towing-tank data for the KCS. The quantity compared is the
                total resistance coefficient, obtained from the simulated total resistance force <i>R</i>
                <sub>T</sub>, where ρ is the water density, <i>S</i> the wetted surface area and <i>V</i> the ship
                speed:
              </p>
            </div>
            <Equation number="9" tex={String.raw`C_T = \frac{R_T}{\tfrac{1}{2}\,\rho\,S\,V^{2}}`} />
            <div className="prose">
              <p>
                The computed <i>C</i>
                <sub>T</sub> shows high-frequency fluctuations, so a fourth-order Butterworth low-pass filter with a
                1 Hz cut-off was applied to the raw signal before averaging.
              </p>
            </div>
            <Figure
              src="media/sph/filtering.webp"
              alt="Unfiltered resistance coefficient oscillating strongly between about −10 and 15, with the 1 Hz filtered curve settling near the experimental value."
              caption="Unfiltered and 1 Hz low-pass filtered C_T at dp = 8 mm, Fr = 0.26."
            />

            <div className="prose">
              <p>
                Convergence was assessed at Fr = 0.26 with four particle spacings of 11, 10, 9 and 8 mm. The predicted{' '}
                <i>C</i>
                <sub>T</sub> approaches the experimental value as the resolution increases: the error falls from 88.2%
                at 11 mm to 2.43% at 9 mm. Refining further to 8 mm improves the error by only 0.44 percentage points
                while increasing the simulation time by 52.98%, so the 9 mm spacing (about 1.1 million particles) was
                selected as the practical balance between accuracy and computational cost and used for all other
                simulations. All runs used an NVIDIA GeForce RTX 4050 GPU.
              </p>
            </div>
            <ConvergenceTable />
            <Figure
              src="media/sph/convergence.webp"
              alt="Total resistance coefficient against time for particle spacings of 8, 9, 10 and 11 mm with the experimental value as a horizontal line. The 11 mm curve sits far above; 8 and 9 mm oscillate around the experimental line."
              caption="Convergence of the total resistance coefficient, C_T, at Fr = 0.26 for the four particle spacings, against the experimental value."
            />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="results" className="article__section">
            <h2>Results and Discussion</h2>

            <h3 className="article__h3">Prediction of the Total Resistance Coefficient</h3>
            <div className="prose">
              <p>
                With the 9 mm spacing, <i>C</i>
                <sub>T</sub> was predicted at five Froude numbers from 0.152 to 0.282 and compared with the measured
                values. The predictions agree with experiment to within 6.5% across the whole range, which supports
                using the model to study the resistance and the wave field around the hull.
              </p>
            </div>
            <CtChart rows={validationRows} />
            <div className="table-wrap" role="region" aria-label="Resistance results" tabIndex={0}>
              <table className="data-table">
                <caption>Predicted and measured resistance at dp = 9 mm.</caption>
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

            <div className="prose">
              <p>
                The error is smallest at Fr = 0.152 (0.69%) and largest at Fr = 0.226 (6.35%), and SPH under-predicts
                the resistance at every speed. The predictions follow the experimental trend: <i>C</i>
                <sub>T</sub> falls from Fr = 0.152 to a minimum at Fr = 0.226 and then rises steeply to Fr = 0.282, where
                SPH gives 4.314&nbsp;×&nbsp;10⁻³ against 4.501&nbsp;×&nbsp;10⁻³ measured. Because only the total resistance was evaluated,
                the thesis does not separate the likely sources of the under-prediction: the SPS model’s treatment of
                near-wall viscous flow, and density-driven pressure fluctuations at the hull surface.
              </p>
            </div>
            <Figure
              src="media/sph/ct-time-series.webp"
              alt="Four panels of C_T against time at Froude numbers 0.152, 0.195, 0.226 and 0.282. Each rises from a start-up transient and then oscillates around the experimental value."
              caption="C_T time histories at Fr = 0.152, 0.195, 0.226 and 0.282 against experiment."
              size="wide"
            />

            <h3 className="article__h3">Free Surface Visualization</h3>
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

          {/* ---------------------------------------------------------- */}
          <section id="conclusion" className="article__section">
            <h2>Conclusion</h2>
            <div className="prose">
              <p>
                The thesis shows that weakly compressible SPH, run on a GPU in DualSPHysics, can predict the calm-water
                resistance of the KCS displacement hull with good accuracy. Across the five Froude numbers from 0.152 to
                0.282, the predicted total resistance coefficient was within 0.69–6.35% of the towing-tank measurements,
                below 6.5% throughout, with SPH under-predicting at every speed.
              </p>
              <p>
                Particle spacing controls the accuracy much as cell size does in a mesh. At Fr = 0.26 the error fell
                from 88.2% at 11 mm to 2.43% at 9 mm, while refining to 8 mm improved it by only 0.44 percentage points
                for 52.98% more run time, so the 9 mm spacing offered the best balance between accuracy and
                computational cost. The simulations also reproduced the free-surface behaviour expected of a
                displacement hull, with the bow wave and stern wake becoming more pronounced as the Froude number
                increases. Together, these results demonstrate the applicability of SPH to predicting the calm-water
                resistance and free-surface flow of displacement-type hulls.
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="contribution" className="article__section">
            <h2>My Contribution</h2>
            <div className="prose">
              <p>
                I completed this thesis jointly with Ahsan Ahmed under the supervision of Dr. Md. Mashiur Rahaman. My
                part of the work is summarised below.
              </p>
            </div>
            <Contribution items={thesis.myContribution} title={null} />
          </section>
        </div>
      </div>
    </article>
  )
}
