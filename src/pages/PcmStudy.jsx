import { Link } from 'react-router'
import StudyHeader from '../components/StudyHeader.jsx'
import Toc from '../components/Toc.jsx'
import Figure, { OwnerTag } from '../components/Figure.jsx'
import Equation from '../components/Equation.jsx'
import ContributionMatrix from '../components/ContributionMatrix.jsx'
import FinExplorer from '../components/FinExplorer.jsx'
import ContourViewer from '../components/ContourViewer.jsx'
import { ColumnPanel } from '../components/charts.jsx'
import Rich from '../components/Rich.jsx'
import {
  pcmAuthors,
  pcmCredit,
  pcmContributions,
  lauricAcid,
  solverSettings,
  finCases,
  caseOutcomes,
  independence,
  validation,
} from '../data/pcm.js'
import { useDocumentTitle } from '../lib/hooks.js'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'contributions', label: 'My contributions' },
  { id: 'method', label: 'Computational method' },
  { id: 'verification', label: 'Verification and validation' },
  { id: 'parametric', label: 'Parametric study' },
  { id: 'results', label: 'Results' },
  { id: 'findings', label: 'Key findings' },
  { id: 'skills', label: 'Skills demonstrated' },
  { id: 'limitations', label: 'Limitations' },
  { id: 'publication', label: 'Publication' },
]

// Cases ordered by how much of the fixed 60 mm sits in the lower arm.
const BY_LOWER_ARM = [5, 4, 1, 2, 3].map((id) => {
  const c = finCases.find((x) => x.id === id)
  return { key: id, id, c, label: `${c.kl} mm`, sub: `Case ${id}` }
})

export default function PcmStudy() {
  useDocumentTitle('PCM melting enhancement with K-shaped fins')

  return (
    <article>
      <StudyHeader
        status="Manuscript under review"
        title="Numerical Investigation of Melting Enhancement in a Phase Change Material-Filled Enclosure Using K-Shaped Fins: Effects of Fin Angle and Arm Length Ratio"
        authors={pcmAuthors}
        meta={[
          ['Status', 'Under review, Case Studies in Thermal Engineering'],
          ['Period', '2025 – 2026'],
          ['Method', '2D transient finite-volume CFD with enthalpy–porosity melting'],
          ['Software', 'ANSYS Fluent 2024 R1'],
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
                Phase change materials store heat as latent heat while they melt, so a small volume can absorb a
                large amount of energy at a nearly constant temperature. Their weakness is conduction: lauric acid,
                the PCM in this study, has a thermal conductivity of only 0.14–0.16 W m⁻¹ K⁻¹, so a plain enclosure
                charges slowly.
              </p>
              <p>
                Fins are the simplest way to carry heat into the PCM. Straight, L-shaped, branched and tree-like
                fins have been studied widely, but the combined effect of the angle between two fin arms and the way
                fin length is split between them had received little attention. A K-shaped fin, with two arms meeting
                at the heated wall, isolates exactly that question: with the same amount of aluminium, does it matter
                where the metal goes?
              </p>
            </div>
            <Figure
              src="media/pcm/geometry.webp"
              alt="Two schematics. Left: finless 55 by 50 mm enclosure with a constant-temperature 70 °C wall on the left and adiabatic walls elsewhere. Right: the same enclosure with a K-shaped fin whose upper arm K_u and lower arm K_l meet at the heated wall at angle θ; fin thickness 2 mm."
              caption="Computational domains: the finless base case (left) and the K-finned enclosure (right). The left wall is held at 70 °C; all other walls are adiabatic."
              source="Manuscript, Figs. 1–2"
            />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="objectives" className="article__section">
            <h2>Objectives</h2>
            <div className="prose">
              <ul>
                <li>Quantify how the inter-arm angle θ, from 10° to 80°, changes the total melting time.</li>
                <li>
                  Find out how redistributing a fixed 60 mm of fin length between the upper and lower arms changes
                  melting at each angle.
                </li>
                <li>
                  Explain the trends in terms of the competing mechanisms: conduction, buoyancy-driven convection, and
                  the fin’s effect on the convection loop.
                </li>
                <li>Define a measure of how unevenly the enclosure melts, and relate it to overall performance.</li>
              </ul>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="contributions" className="article__section article__section--feature">
            <h2>My contributions to this research</h2>
            <div className="prose">
              <p>
                This is a five-author study, and I am the third author. My part was mainly computational: building
                the model, checking that its results do not depend on the mesh or time step, running the parametric
                matrix, and turning the raw results into the measures used to explain them. The manuscript’s CRediT
                statement lists my roles as {pcmCredit}.
              </p>
            </div>
            <ContributionMatrix
              rows={pcmContributions}
              caption="Stages of the study"
            />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="method" className="article__section">
            <h2>Computational method</h2>

            <h3 className="article__h3">Assumptions</h3>
            <div className="prose">
              <p>
                The melting is modelled as two-dimensional and transient. Liquid PCM is treated as a Newtonian,
                incompressible, laminar fluid; buoyancy enters through the Boussinesq approximation; volume change
                on melting and radiation are neglected. The aluminium fin is a solid conducting wall with a no-slip
                condition, 2 mm thick, and the total fin length is fixed at 60 mm in every case.
              </p>
            </div>

            <h3 className="article__h3">Governing equations</h3>
            <div className="prose">
              <p>Mass, momentum and energy conservation for the PCM:</p>
            </div>
            <Equation number="1" tex={String.raw`\frac{\partial \rho}{\partial t} + \nabla\cdot(\rho\,\mathbf{u}) = 0`} />
            <Equation
              number="2"
              tex={String.raw`\frac{\partial (\rho\,\mathbf{u})}{\partial t} + \nabla\cdot(\rho\,\mathbf{u}\mathbf{u}) = \mu\nabla^{2}\mathbf{u} - \nabla p + \rho\,\mathbf{g} + \mathbf{S}`}
            />
            <Equation number="3" tex={String.raw`\frac{\partial (\rho H)}{\partial t} + \nabla\cdot(\rho\,\mathbf{u}\,H) = \nabla\cdot(k\nabla T)`} />
            <div className="prose">
              <p>
                Natural convection enters through a temperature-dependent density, with liquid density ρ<sub>l</sub>,
                liquidus temperature <i>T</i>
                <sub>l</sub> and expansion coefficient β:
              </p>
            </div>
            <Equation number="4" tex={String.raw`\rho = \frac{\rho_l}{\beta\,(T - T_l) + 1}`} />
            <div className="prose">
              <p>
                Phase change uses the enthalpy–porosity method. The whole domain is treated as a porous zone whose
                liquid fraction γ rises linearly between the solidus and liquidus temperatures, and the specific
                enthalpy carries the latent heat in proportion to γ:
              </p>
            </div>
            <Equation
              number="5"
              tex={String.raw`\gamma = \begin{cases} 0, & T < T_s \\[2pt] \dfrac{T - T_s}{T_l - T_s}, & T_s \le T \le T_l \\[6pt] 1, & T > T_l \end{cases} \qquad H = h_{\mathrm{ref}} + \int_{T_{\mathrm{ref}}}^{T} c_p\,\mathrm{d}T + \gamma L_h`}
            />
            <div className="prose">
              <p>
                In the mushy zone, a Carman–Kozeny momentum sink drives the velocity to zero as the PCM solidifies,
                with mushy-zone constant <i>A</i>
                <sub>mush</sub> = 10⁷ and ε = 0.001 to avoid division by zero:
              </p>
            </div>
            <Equation
              number="6"
              tex={String.raw`\mathbf{S} = -A_{\mathrm{mush}}\,\frac{(1-\gamma)^{2}}{\gamma^{3} + \varepsilon}\,\mathbf{u}`}
            />

            <h3 className="article__h3">Initial and boundary conditions</h3>
            <div className="prose">
              <p>
                The PCM starts solid and at rest at 25 °C. The left wall is held at 70 °C from <i>t</i> = 0; the top,
                bottom and right walls are adiabatic.
              </p>
            </div>
            <Equation
              tex={String.raw`T(\mathbf{x},0) = 25\,^{\circ}\mathrm{C},\quad \mathbf{u}(\mathbf{x},0) = \mathbf{0};\qquad T\big|_{\text{left}} = 70\,^{\circ}\mathrm{C},\quad \frac{\partial T}{\partial n}\Big|_{\text{top, bottom, right}} = 0`}
            />

            <h3 className="article__h3">Materials</h3>
            <div className="table-wrap" role="region" aria-label="Material properties" tabIndex={0}>
              <table className="data-table">
                <caption>Thermophysical properties of lauric acid and aluminium (manuscript, Table 2).</caption>
                <thead>
                  <tr>
                    <th scope="col">Property</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Lauric acid</th>
                    <th scope="col">Aluminium</th>
                  </tr>
                </thead>
                <tbody>
                  {lauricAcid.map((r) => (
                    <tr key={r.property}>
                      <th scope="row">{r.property}</th>
                      <td>{r.unit}</td>
                      <td>{r.pcm}</td>
                      <td>{r.al}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="article__h3">
              Solver settings <OwnerTag owner="me" />
            </h3>
            <div className="table-wrap" role="region" aria-label="Solver settings" tabIndex={0}>
              <table className="data-table data-table--kv">
                <caption>ANSYS Fluent 2024 R1 configuration.</caption>
                <tbody>
                  {solverSettings.map(([k, v]) => (
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
            <div className="prose">
              <p>
                The non-iterative time-advancement scheme was chosen because it has been reported to save about 90%
                of computing time for this problem, with errors below 0.28%.
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="verification" className="article__section">
            <h2>Verification and validation</h2>

            <h3 className="article__h3">
              Mesh and time-step independence <OwnerTag owner="me" />
            </h3>
            <div className="prose">
              <p>
                Both tests used the symmetric fin (<i>K</i>
                <sub>u</sub> = <i>K</i>
                <sub>l</sub> = 30 mm) at θ = 60°. Refining from the coarse to the medium mesh changed the melt
                fraction by 1.018%; refining further to the fine mesh changed it by only 0.119%. Halving the time step
                from 0.8 s to 0.4 s changed the melting time by 0.72%, and from 0.4 s to 0.2 s by 0.095%. The medium
                mesh of 17,625 quadrilateral elements and Δ<i>t</i> = 0.4 s were used for every subsequent run.
              </p>
            </div>
            <div className="numbers">
              <div className="numbers__group">
                <p className="numbers__title">Mesh (elements)</p>
                <ul>
                  {independence.mesh.map((m) => (
                    <li key={m.label} className={m.selected ? 'is-selected' : undefined}>
                      <span>{m.label}</span>
                      <b>{m.value}</b>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="numbers__group">
                <p className="numbers__title">Change in result</p>
                <ul>
                  {[...independence.meshChanges, ...independence.timeStepChanges].map((m) => (
                    <li key={m.from}>
                      <span>{m.from}</span>
                      <b>{m.change}</b>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="figure-pair">
              <Figure
                src="media/pcm/mesh-independence.webp"
                alt="Liquid fraction against time for coarse, medium and fine meshes; the medium and fine curves overlap."
                caption="Mesh independence: liquid fraction for the coarse, medium and fine meshes."
                source="Manuscript, Fig. 4"
                owner="me"
              />
              <Figure
                src="media/pcm/timestep-independence.webp"
                alt="Liquid fraction against time for time steps of 0.2, 0.4 and 0.8 s; the curves nearly coincide."
                caption="Time-step independence: Δt = 0.2, 0.4 and 0.8 s."
                source="Manuscript, Fig. 5"
                owner="me"
              />
            </div>

            <h3 className="article__h3">
              Validation against experiment <OwnerTag owner="team" />
            </h3>
            <div className="prose">
              <p>
                The finless base case was compared with the experiments of Kamkari et al. (2014) on lauric acid in a
                vertical enclosure with one wall at 70 °C. Over the full validation period the mean absolute error is{' '}
                {validation.mae}, the RMS error {validation.rmse}, and <i>R</i>² = {validation.r2}. The model melts
                slightly faster at first because it imposes 70 °C at once, whereas the experimental wall took about
                four minutes to heat up.
              </p>
            </div>
            <Figure
              src="media/pcm/validation.webp"
              alt="Liquid fraction against time: the numerical curve follows the experimental points closely from 0 to about 12,000 s."
              caption="Base-case liquid fraction: present model against the experiment of Kamkari et al."
              source="Manuscript, Fig. 3"
              owner="team"
            />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="parametric" className="article__section">
            <h2>Parametric study</h2>
            <div className="prose">
              <p>
                Five arm-length ratios were combined with fin angles in steps of 10°, giving 34 finned configurations
                plus the finless base case. Total fin length (60 mm) and thickness (2 mm) were held fixed, so every
                finned case uses the same amount of aluminium.
              </p>
            </div>
            <div className="table-wrap" role="region" aria-label="Fin cases" tabIndex={0}>
              <table className="data-table">
                <caption>Fin arm-length cases (manuscript, Table 1).</caption>
                <thead>
                  <tr>
                    <th scope="col">Case</th>
                    <th scope="col">
                      <i>K</i>
                      <sub>u</sub> : <i>K</i>
                      <sub>l</sub>
                    </th>
                    <th scope="col">Upper arm (mm)</th>
                    <th scope="col">Lower arm (mm)</th>
                    <th scope="col">Fin angles θ</th>
                  </tr>
                </thead>
                <tbody>
                  {finCases.map((c) => (
                    <tr key={c.id}>
                      <th scope="row">{c.id}</th>
                      <td>{c.ratio}</td>
                      <td>{c.ku}</td>
                      <td>{c.kl}</td>
                      <td>{c.angles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="article__h3">Explore the design space</h3>
            <FinExplorer />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="results" className="article__section">
            <h2>Results</h2>

            <h3 className="article__h3">Fin angle: confinement against obstruction</h3>
            <div className="prose">
              <p>
                With equal arms (Case 1), the total melting time falls as θ grows from 10° to 50°, then rises again
                towards 80°; 40° and 50° are fastest. Two mechanisms compete. At 10°–30° the arms form a narrow
                channel that confines the rising convection current and leaves hot liquid stagnant between them. At
                60°–80° that channel is gone, but the arms now block the primary convection loop, forcing it to swirl
                near the wall and reheat PCM that has already melted. At 40°–50° the fin guides the current towards the
                cold solid instead of trapping or blocking it.
              </p>
            </div>
            <Figure
              src="media/pcm/lf-case1-angles.webp"
              alt="Liquid fraction against time for fin angles 10° to 80° in Case 1. All curves rise quickly then flatten; 40° and 50° reach full melting first and 10° last."
              caption="Liquid fraction against time for the eight fin angles of Case 1."
              source="Manuscript, Fig. 6"
            />
            <ContourViewer />

            <h3 className="article__h3">Arm-length ratio: feeding the lower zone</h3>
            <div className="prose">
              <p>
                Hot liquid rises along the heated wall, so the upper half of the enclosure is fed by the buoyant plume
                while the lower half melts last and controls the total time. At θ = 40°, moving fin length from the
                upper to the lower arm shortens melting steadily, and Case 3 (<i>K</i>
                <sub>u</sub> : <i>K</i>
                <sub>l</sub> = 2 : 4) is fastest. Lengthening the upper arm instead (Cases 4 and 5) adds heat where the
                plume already delivers it, and melting slows.
              </p>
              <p>
                All five curves coincide until the liquid fraction reaches about 0.65 (at 1,909 s for 40°). Up to
                that point conduction dominates and the arm ratio barely matters; beyond it, the larger liquid region
                near the long lower arm lets the convection loop reach the bottom of the enclosure, and the curves
                separate.
              </p>
            </div>
            <div className="figure-pair">
              <Figure
                src="media/pcm/lf-40deg-cases.webp"
                alt="Liquid fraction against time at 40° for Cases 1 to 5 and the base case. The finned curves coincide up to a liquid fraction of about 0.65 and then separate; Case 3 finishes first; the base case is far slower."
                caption="Liquid fraction at θ = 40° for the five cases and the finless base case (dashed)."
                source="Manuscript, Fig. 8"
              />
              <Figure
                src="media/pcm/melting-time-bars.webp"
                alt="Bar chart of melting time to 99% liquid fraction against fin angle for Cases 2 to 5. Case 3 at 40° is lowest at about 4,300 s."
                caption="Time to 99% liquid fraction for Cases 2–5 at each fin angle."
                source="Manuscript, Fig. 7"
              />
            </div>

            <h3 className="article__h3">
              Melting uniformity and efficiency <OwnerTag owner="me" />
            </h3>
            <div className="prose">
              <p>
                To quantify the lower-zone bottleneck I developed the Lower-zone Melting Lag Index, the difference
                between the average liquid fractions of the upper and lower halves of the enclosure. Zero means both
                halves have melted equally; a positive value means the lower half lags. Melting efficiency compares
                each fin’s total melting time <i>t</i>
                <sub>i</sub> with the finless enclosure’s <i>t</i>
                <sub>b</sub> = 9,207 s.
              </p>
            </div>
            <Equation number="7" tex={String.raw`\mathrm{LMLI}(t) = LF_{\text{upper}}(t) - LF_{\text{lower}}(t)`} />
            <Equation number="8" tex={String.raw`\eta = \frac{t_b - t_i}{t_b}\times 100\%`} />
            <div className="prose">
              <p>
                Moving length into the lower arm raises the best efficiency of each case and lowers its peak LMLI, in
                step. Case 3’s LMLI is briefly negative (−0.07) early on, because its 40 mm lower arm melts the lower
                half first, before convection takes over. Averaged over time, LMLI correlates inversely with
                efficiency: the designs that melt most evenly are the ones that melt fastest. In Cases 4 and 5 the
                short lower arm cannot reach the bottleneck, and both measures barely respond to the fin angle.
              </p>
            </div>
            <div className="multiples">
              <ColumnPanel
                title="Best melting efficiency of each case (%)"
                data={BY_LOWER_ARM.map((d) => ({ ...d, value: caseOutcomes[d.id].peakEfficiency }))}
                max={60}
                format={(v) => v.toFixed(2)}
                describe={(d) => (
                  <>
                    <strong>
                      Case {d.id} ({d.c.ratio})
                    </strong>
                    <span>
                      Upper {d.c.ku} mm, lower {d.c.kl} mm
                    </span>
                    <span>
                      Best efficiency <b>{d.value.toFixed(2)}%</b> at 40°–50°
                    </span>
                  </>
                )}
              />
              <ColumnPanel
                title="Peak LMLI at θ = 40°"
                data={BY_LOWER_ARM.map((d) => ({ ...d, value: caseOutcomes[d.id].peakLmli40 }))}
                max={0.65}
                format={(v) => v.toFixed(2)}
                describe={(d) => (
                  <>
                    <strong>
                      Case {d.id} ({d.c.ratio})
                    </strong>
                    <span>
                      Upper {d.c.ku} mm, lower {d.c.kl} mm
                    </span>
                    <span>
                      Peak LMLI <b>{d.value.toFixed(2)}</b>
                    </span>
                  </>
                )}
              />
            </div>
            <p className="multiples__axis">
              Lower arm length; the total of both arms is fixed at 60 mm. Values from the manuscript’s conclusions.
            </p>
            <Figure
              src="media/pcm/efficiency-lmli.webp"
              alt="Melting efficiency (lines) and time-averaged LMLI (markers) against fin angle for the five cases. Efficiency peaks near 40°–50°, where average LMLI is lowest; Case 3 reaches about 53%."
              caption="Melting efficiency (lines) and time-averaged LMLI (markers) against fin angle, all cases."
              source="Manuscript, Fig. 12"
              owner="me"
            />

            <h3 className="article__h3">
              Nusselt number <OwnerTag owner="me" />
            </h3>
            <div className="prose">
              <p>
                The surface-averaged Nusselt number is based on the energy <i>Q</i>
                <sub>total</sub> absorbed by the PCM in each interval Δ<i>t</i>, the heated wall area <i>A</i>
                <sub>w</sub> and a characteristic length <i>L</i>
                <sub>c</sub>:
              </p>
            </div>
            <Equation
              number="9"
              tex={String.raw`Nu(t) = \frac{h(t)\,L_c}{k}, \qquad h(t) = \frac{Q_{\text{total}}(t)}{A_w\,(T_w - T_{\text{ref}})\,\Delta t}`}
            />
            <div className="prose">
              <p>
                Nu starts near 440, when cold solid touches the hot wall and fin, and falls to about 20 at complete
                melting as the liquid layer thickens and adds conduction resistance. Natural convection slows the
                decline but does not reverse it. Between roughly 500 s and 1,300 s the 40° and 50° fins sustain a
                higher Nu than the other angles, consistent with their faster melting.
              </p>
            </div>
            <Figure
              src="media/pcm/nusselt-case1.webp"
              alt="Surface-averaged Nusselt number against time for Case 1 at eight fin angles, falling from about 440 to about 20, with an inset from 0 to 2,200 s."
              caption="Surface-averaged Nusselt number against time for Case 1."
              source="Manuscript, Fig. 13"
              owner="me"
            />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="findings" className="article__section">
            <h2>Key findings</h2>
            <ul className="findings">
              <li>
                <b>29.33–53.35%</b>
                <span>
                  reduction in total melting time against the finless enclosure (9,207 s), depending on fin geometry.
                </span>
              </li>
              <li>
                <b>40°–50°</b>
                <span>
                  is the best inter-arm angle in every case: narrower fins confine the convection current, wider ones
                  obstruct it.
                </span>
              </li>
              <li>
                <b>Case 3 at 40°</b>
                <span>
                  (upper 20 mm, lower 40 mm) is the best configuration. Biasing length to the lower arm improved
                  melting monotonically; biasing it upwards helped least.
                </span>
              </li>
              <li>
                <b>0.65</b>
                <span>
                  liquid fraction marks the switch from conduction- to convection-controlled melting, after which the
                  arm ratio starts to matter.
                </span>
              </li>
              <li>
                <b>0.56 → 0.13</b>
                <span>
                  fall in peak LMLI at 40° as the lower arm lengthens; lower time-averaged LMLI goes with higher
                  efficiency.
                </span>
              </li>
            </ul>
            <div className="prose">
              <p>
                The practical design rule is simple and costs nothing extra in material: use an intermediate angle near
                40° and put more of the fin length in the lower arm.
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="skills" className="article__section">
            <h2>Skills demonstrated</h2>
            <p className="article__lead">Based on the parts of the study I carried out.</p>
            <ul className="skill-list">
              <li>
                <b>Finite-volume CFD setup</b>
                <span>
                  ANSYS Fluent model for solid–liquid phase change with buoyancy: enthalpy–porosity, Boussinesq, PISO
                  with NITA, second-order schemes.
                </span>
              </li>
              <li>
                <b>Geometry and meshing</b>
                <span>A parametric family of fin geometries, meshed with quadrilateral elements.</span>
              </li>
              <li>
                <b>Discretization independence</b>
                <span>Mesh and time-step studies used to choose the resolution for all runs.</span>
              </li>
              <li>
                <b>Simulation campaigns</b>
                <span>Running the 34-configuration transient parameter sweep.</span>
              </li>
              <li>
                <b>Heat-transfer analysis</b>
                <span>A new non-uniformity metric (LMLI), melting efficiency and surface-averaged Nusselt number.</span>
              </li>
              <li>
                <b>Physical interpretation and writing</b>
                <span>Explaining the trends through convection confinement, obstruction and the lower-zone bottleneck.</span>
              </li>
            </ul>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="limitations" className="article__section">
            <h2>Limitations and next steps</h2>
            <div className="prose">
              <p>
                The conclusions are bounded by the model. A 2D formulation cannot capture three-dimensional flow;
                volume change on melting and contact resistance between fin and wall are neglected; and a single PCM is
                studied without repeated melting and solidification. Extending the analysis to three dimensions, other
                PCMs and cyclic operation are the natural next steps.
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="publication" className="article__section">
            <h2>Publication</h2>
            <div className="citation">
              <p>
                Md Tanvir Anjum Zenith, Adri Das, <strong>Shafollo Proshad Gupto</strong>, Md. Atiqur Rahaman, Md.
                Khairul Islam. “Numerical Investigation of Melting Enhancement in a Phase Change Material-Filled
                Enclosure Using K-Shaped Fins: Effects of Fin Angle and Arm Length Ratio.” <i>Case Studies in Thermal
                Engineering</i>, under review.
              </p>
              <p className="citation__note">
                The manuscript is not publicly available while it is under review. I can share it on request:{' '}
                <Link to="/contact">contact me</Link>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}
