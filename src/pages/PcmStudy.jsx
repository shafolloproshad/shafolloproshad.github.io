import StudyHeader from '../components/StudyHeader.jsx'
import Toc from '../components/Toc.jsx'
import Figure from '../components/Figure.jsx'
import Equation from '../components/Equation.jsx'
import Contribution from '../components/Contribution.jsx'
import FinExplorer from '../components/FinExplorer.jsx'
import ContourViewer from '../components/ContourViewer.jsx'
import { ColumnPanel } from '../components/charts.jsx'
import Rich from '../components/Rich.jsx'
import {
  pcmAuthors,
  solverSettings,
  finCases,
  caseOutcomes,
  independence,
  validation,
} from '../data/pcm.js'
import { research } from '../data/research.js'
import { useDocumentTitle } from '../lib/hooks.js'

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'modeling', label: 'Numerical Modeling' },
  { id: 'verification', label: 'Verification and Validation' },
  { id: 'results', label: 'Results and Discussion' },
  { id: 'conclusions', label: 'Conclusions' },
  { id: 'contribution', label: 'My Contribution' },
]

// My contribution, shared with the research entry on the home and Research pages.
const pcm = research.find((r) => r.slug === 'pcm-k-shaped-fins')

// Cases ordered by how much of the fixed 60 mm sits in the lower arm.
const BY_LOWER_ARM = [5, 4, 1, 2, 3].map((id) => {
  const c = finCases.find((x) => x.id === id)
  return { key: id, id, c, label: `${c.kl} mm`, sub: `Case ${id}` }
})

export default function PcmStudy() {
  useDocumentTitle('PCM melting enhancement with K-shaped fins')

  return (
    <article className="study study--pcm">
      <StudyHeader
        status="Manuscript under review"
        title={
          <>
            Numerical Investigation of Melting Enhancement in a Phase Change Material-Filled Enclosure Using{' '}
            <span className="nowrap">K-Shaped</span> Fins: Effects of Fin Angle and Arm Length Ratio
          </>
        }
        authors={pcmAuthors}
        meta={[
          ['Status', 'Under review, Case Studies in Thermal Engineering'],
          ['Method', '2D transient finite-volume CFD with enthalpy–porosity modelling of PCM'],
          ['Software', 'ANSYS Fluent 2024 R1'],
          ['Period', '2025–2026'],
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
                Phase change materials (PCMs) store large amounts of thermal energy as latent heat at a nearly constant
                temperature, which makes them attractive for thermal energy storage. Their low thermal conductivity,
                however, limits heat transfer into the material and makes melting slow: lauric acid, the PCM in this
                study, conducts only 0.14–0.16 W m⁻¹ K⁻¹. Conductive fins are a widely studied remedy, and straight,
                L-shaped, branched and tree-like fins have all been examined, but the coupled effect of K-shaped fin
                angle and unequal upper and lower arm length on the melting performance has received limited attention.
              </p>
              <p>
                This study investigates a K-shaped aluminium fin in a rectangular enclosure filled with lauric acid and
                heated from one side, with simulations that account for phase change and buoyancy-driven natural
                convection. Fin angles from 10° to 80° are combined with five ways of dividing a fixed total fin length
                of 60 mm between the upper and lower arms. The objective is to understand how fin geometry affects the
                melting time, the development of the temperature and liquid-fraction fields, and the uniformity of
                melting between the upper and lower regions of the enclosure. To quantify that uniformity, the study
                introduces a Lower-zone Melting Lag Index (LMLI).
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="modeling" className="article__section">
            <h2>Numerical Modeling</h2>

            <h3 className="article__h3">Computational domain and assumptions</h3>
            <div className="prose">
              <p>
                The model is a two-dimensional enclosure, 55 mm wide and 50 mm high, filled with lauric acid and
                fitted with a K-shaped aluminium fin whose two arms meet at the heated wall. The transient melting
                problem is solved with the finite-volume method in ANSYS Fluent 2024 R1. Liquid PCM is treated as a
                Newtonian, incompressible, laminar fluid; buoyancy enters through the Boussinesq approximation; volume
                change on melting and radiation are neglected. The aluminium fin is a solid conducting wall with a
                no-slip condition, 2 mm thick, and the total fin length is fixed at 60 mm in every case.
              </p>
            </div>
            <Figure
              src="media/pcm/geometry.webp"
              alt="Two schematics. Left: finless 55 by 50 mm enclosure with a constant-temperature 70 °C wall on the left and adiabatic walls elsewhere. Right: the same enclosure with a K-shaped fin whose upper arm K_u and lower arm K_l meet at the heated wall at angle θ; fin thickness 2 mm."
              caption="Computational domains: the finless base case (left) and the K-finned enclosure (right). The left wall is held at 70 °C; all other walls are adiabatic."
            />

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

            <h3 className="article__h3">Solver settings</h3>
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

            <h3 className="article__h3">Parametric study</h3>
            <div className="prose">
              <p>
                Five arm-length ratios were combined with fin angles in steps of 10°, giving 34 finned configurations
                plus the finless base case. Total fin length (60 mm) and thickness (2 mm) were held fixed, so every
                finned case uses the same amount of aluminium.
              </p>
            </div>
            <div className="table-wrap" role="region" aria-label="Fin cases" tabIndex={0}>
              <table className="data-table">
                <caption>Cases of fin-length arrangement</caption>
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
            <h3 className="article__h3">Case configurations</h3>
            <FinExplorer />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="verification" className="article__section">
            <h2>Verification and Validation</h2>

            <h3 className="article__h3">Mesh and time-step independence</h3>
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
              />
              <Figure
                src="media/pcm/timestep-independence.webp"
                alt="Liquid fraction against time for time steps of 0.2, 0.4 and 0.8 s; the curves nearly coincide."
                caption="Time-step independence: Δt = 0.2, 0.4 and 0.8 s."
              />
            </div>

            <h3 className="article__h3">Validation against experiment</h3>
            <div className="prose">
              <p>
                The numerical predictions for the finless base case were compared with the published experiments of
                Kamkari et al. (2014) on lauric acid in a vertical enclosure with one wall at 70 °C. Over the full
                validation period the mean absolute error in liquid fraction is {validation.mae}, the RMS error{' '}
                {validation.rmse}, and <i>R</i>² = {validation.r2}. The model melts slightly faster at first because it
                imposes 70 °C at once, whereas the experimental wall took about four minutes to heat up; otherwise the
                close agreement shows that the model reproduces the observed melting behaviour. This validation was
                performed by my co-author.
              </p>
            </div>
            <Figure
              src="media/pcm/validation.webp"
              alt="Liquid fraction against time: the numerical curve follows the experimental points closely from 0 to about 12,000 s."
              caption="Validation of the numerical model for liquid fraction with Kamkari et al.'s experimental data."
            />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="results" className="article__section">
            <h2>Results and Discussion</h2>

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
            />
            <ContourViewer />

            <h3 className="article__h3">Arm-length ratio: feeding the lower zone</h3>
            <div className="prose">
              <p>
                Hot liquid rises along the heated wall and feeds the upper region first, so the lower region melts more
                slowly and controls the total melting time. Lengthening the lower arm carries heat into that region and
                helps the convection loop reach it. Lengthening the upper arm instead (Cases 4 and 5) adds heat where
                the rising liquid already delivers it, and gives less benefit.
              </p>
              <p>
                The liquid-fraction plot below compares Cases 1–5 at a fin angle of θ = 40°: the same 60 mm of fin,
                divided differently between the upper and lower arms. Case 3 (<i>K</i>
                <sub>u</sub> = 20 mm, <i>K</i>
                <sub>l</sub> = 40 mm) gives the fastest melting of all the configurations investigated. Up to a liquid
                fraction of about 0.65, reached at 1,909 s, the five curves are almost identical. In this early stage
                heat transfer is mainly by conduction, so the PCM next to the heated wall and the fin surfaces melts in
                much the same way whatever the arm ratio; a longer lower arm already conducts heat deeper into the lower
                region, but melting is still confined to the material next to the heated surfaces, so the total melted
                volume barely changes. The arm-length distribution matters only once enough liquid has formed to sustain
                natural convection. A longer lower arm pushes the melting front deeper into the lower part of the
                enclosure, and beyond a liquid fraction of 0.65 this enlarged lower liquid region joins the primary
                circulation loop, letting hot liquid penetrate the lower zone and strengthening convective heat transfer
                to the remaining solid. The faster melting of Cases 2 and 3, which have the longest lower arms, therefore
                makes the curves diverge in the later stage of melting.
              </p>
            </div>
            <div className="figure-pair">
              <Figure
                src="media/pcm/lf-40deg-cases.webp"
                alt="Liquid fraction against time at 40° for Cases 1 to 5 and the base case. The finned curves coincide up to a liquid fraction of about 0.65 and then separate; Case 3 finishes first; the base case is far slower."
                caption="Liquid fraction at θ = 40° for the five cases and the finless base case."
              />
              <Figure
                src="media/pcm/melting-time-bars.webp"
                alt="Bar chart of melting time to 99% liquid fraction against fin angle for Cases 2 to 5. Case 3 at 40° is lowest at about 4,300 s."
                caption="Time to 99% liquid fraction for Cases 2–5 at each fin angle."
              />
            </div>

            <h3 className="article__h3">Melting uniformity and efficiency</h3>
            <div className="prose">
              <p>
                To quantify differences in melting progression between the upper and lower regions, the Lower-zone
                Melting Lag Index (LMLI) is defined as the difference between their average liquid fractions. An LMLI of
                zero indicates equal average liquid fractions, while a positive value indicates that the lower region is
                lagging behind the upper region.
              </p>
            </div>
            <Equation number="7" tex={String.raw`\mathrm{LMLI}(t) = LF_{\text{upper}}(t) - LF_{\text{lower}}(t)`} />
            <div className="prose">
              <p>
                Melting efficiency compares each fin’s total melting time <i>t</i>
                <sub>i</sub> with the finless enclosure’s <i>t</i>
                <sub>b</sub> = 9,207 s:
              </p>
            </div>
            <Equation number="8" tex={String.raw`\eta = \frac{t_b - t_i}{t_b}\times 100\%`} />
            <div className="prose">
              <p>
                A key observation is that increasing the lower fin length progressively reduces the peak value of the
                LMLI, as shown below. Cases 2 and 3 exhibit substantially lower peak LMLI values than the other
                configurations, indicating a smaller melting imbalance between the upper and lower halves of the
                enclosure. A longer lower arm delivers heat more directly to the lower region, which otherwise melts
                last. Consequently, the difference between the average liquid fractions of the two regions decreases,
                resulting in a lower peak LMLI.
              </p>
            </div>
            <Figure
              src="media/pcm/lmli-time.webp"
              alt="LMLI against time, from 0 to about 6,200 s, for the five fin-arm-length cases at a fin angle of 40°. Each curve rises from zero to a single peak, between about 0.13 and 0.56, and returns to zero at complete melting; one curve dips slightly below zero early on."
              caption="Variation of the Lower-zone Melting Lag Index (LMLI) with time for the five fin-arm-length configurations at a fin angle of 40°."
            />
            <figure className="multiples-figure">
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
              <figcaption className="plate__caption">
                <span>
                  Best melting efficiency and peak LMLI for the five fin-arm-length configurations, ordered by lower-arm
                  length.
                </span>
              </figcaption>
            </figure>
            <div className="prose">
              <p>
                The time-averaged LMLI, taken from the start of melting to 99% liquid fraction, summarises how evenly
                each configuration melts. Configurations with higher melting efficiency generally show a lower
                time-averaged LMLI: in every case the intermediate fin angles of 40° and 50° give both the lowest average
                LMLI and the highest efficiency. Faster melting therefore goes with a more balanced melting progression
                between the upper and lower regions. In Cases 4 and 5 the short lower arm cannot reach the bottleneck,
                and both measures barely respond to the fin angle.
              </p>
            </div>
            <Figure
              src="media/pcm/efficiency-lmli.webp"
              alt="Melting efficiency (lines) and time-averaged LMLI (markers) against fin angle for the five cases. Efficiency peaks near 40°–50°, where average LMLI is lowest; Case 3 reaches about 53%."
              caption="Melting efficiency (lines) and time-averaged LMLI (markers) as functions of fin angle for the five fin-arm-length configurations."
            />

            <h3 className="article__h3">Nusselt number</h3>
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
            />
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="conclusions" className="article__section">
            <h2>Conclusions</h2>
            <div className="prose">
              <p>
                K-shaped aluminium fins reduced the total melting time by 29.33–53.35% relative to the finless
                enclosure (9,207 s), depending on the fin geometry. The fin angle governs how the fin interacts with
                natural convection: intermediate angles of about 40°–50° performed best in every arm-length case,
                because narrower fins confine the rising convection current while wider ones obstruct the convection
                loop.
              </p>
              <p>
                With the total fin length fixed at 60 mm, redistributing length toward the lower arm improved melting of
                the slowly melting lower region. The best configuration was Case 3 at 40° (upper arm 20 mm, lower arm
                40 mm), with a melting efficiency of 53.35%. The arm-length ratio begins to matter once the liquid
                fraction exceeds about 0.65, when melting changes from conduction- to convection-controlled. The LMLI
                proved a useful quantitative measure of non-uniform melting: its peak at 40° fell from 0.56 to 0.13 as
                the lower arm lengthened, and designs with a lower time-averaged LMLI melted more efficiently. These
                results provide geometric guidelines for fin-assisted latent heat storage.
              </p>
            </div>
          </section>

          {/* ---------------------------------------------------------- */}
          <section id="contribution" className="article__section">
            <h2>My Contribution</h2>
            <div className="prose">
              <p>
                This study was carried out jointly with my co-authors. My part of the work is summarised below.
              </p>
            </div>
            <Contribution items={pcm.myContribution} title={null} />
          </section>
        </div>
      </div>
    </article>
  )
}
