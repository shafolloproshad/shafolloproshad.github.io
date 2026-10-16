import { Link } from 'react-router'
import Rich from './Rich.jsx'

const ROWS = [
  {
    label: 'Physical problem',
    pcm: 'Melting and natural convection in a lauric-acid-filled rectangular enclosure enhanced by K-shaped aluminium fins.',
    sph: 'Calm-water resistance and free-surface flow around the KRISO Container Ship (KCS), a benchmark displacement-type hull.',
  },
  {
    label: 'Governing model',
    pcm: 'Laminar incompressible flow and energy equations, Boussinesq buoyancy, and the enthalpy–porosity phase-change model.',
    sph: 'Weakly Compressible SPH (WCSPH), using a Tait equation of state and laminar plus SPS viscosity.',
  },
  {
    label: 'Discretization',
    pcm: 'Two-dimensional finite-volume model on a quadrilateral mesh of 17,625 cells; second-order upwind schemes; PISO with NITA; time step Δt = 0.4 s.',
    sph: 'Lagrangian particles with a Wendland kernel; selected particle spacing of 9 mm; approximately 1.1 million particles; Verlet time stepping.',
  },
  {
    label: 'Independence tests',
    pcm: 'Three mesh resolutions and three time steps; changes beyond the selected mesh and time step were 0.119% and 0.095%, respectively.',
    sph: 'Four particle spacings from 11 mm to 8 mm. Reducing spacing from 9 mm to 8 mm provided limited additional accuracy (0.44 percentage points) at substantially higher computational cost (53% more run time).',
  },
  {
    label: 'Validation',
    pcm: 'Liquid-fraction comparison against Kamkari et al.; MAE = 1.76% and R² = 0.9955. Experimental validation was performed by my co-author.',
    sph: 'Predicted total resistance coefficients compared with experimental towing-tank data at five Froude numbers from 0.152 to 0.282; prediction errors remained below 6.5%.',
  },
  {
    label: 'Software',
    pcm: 'ANSYS Fluent 2024 R1.',
    sph: 'DualSPHysics v5.4 on a GPU; ParaView.',
  },
  {
    label: 'Key findings',
    pcm: 'K-shaped fins reduced melting time by approximately 29.33–53.35% relative to the finless enclosure. Intermediate fin angles of 40°–50° performed best, while a longer lower arm improved melting in the lower zone.',
    sph: 'Predicted the calm-water resistance of a displacement-type hull (KCS hull) using Smoothed Particle Hydrodynamics, with C_T errors of 0.69–6.35% across the five Froude numbers.',
  },
  {
    label: 'My contribution',
    pcm: 'Proposed the K-shaped-fin investigation; collaborated on independence tests and simulations; analysed and post-processed results, including melting efficiency, LMLI, and Nusselt number; wrote the original manuscript draft and the complete Results and Discussion section.',
    sph: 'Developed the numerical towing-tank setup and supporting code; ran GPU simulations and the particle-convergence study; processed resistance data and conducted error analysis; produced free-surface visualisations; wrote the original thesis draft.',
    mine: true,
  },
]

export default function MethodComparison() {
  return (
    <div className="compare" role="region" aria-label="Research methods and contributions in the two studies" tabIndex={0}>
      <table className="compare__table">
        <thead>
          <tr>
            <th scope="col" className="compare__corner">
              Comparison category
            </th>
            <th scope="col">
              <Link to="/research/pcm-k-shaped-fins">PCM melting study</Link>
            </th>
            <th scope="col">
              <Link to="/research/sph-ship-resistance">Ship resistance thesis</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className={row.mine ? 'compare__mine' : undefined}>
              <th scope="row">{row.label}</th>
              <td data-label="PCM melting study">
                <Rich>{row.pcm}</Rich>
              </td>
              <td data-label="Ship resistance thesis">
                <Rich>{row.sph}</Rich>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
