import { Link } from 'react-router'
import Rich from './Rich.jsx'

const ROWS = [
  {
    label: 'Physical problem',
    fvm: 'Solid–liquid phase change with buoyancy-driven flow in a heated, finned enclosure',
    sph: 'Free-surface flow and resistance of a ship hull in calm water',
  },
  {
    label: 'Governing model',
    fvm: 'Laminar incompressible flow and energy; Boussinesq buoyancy; enthalpy–porosity phase change',
    sph: 'Weakly compressible Navier–Stokes with a Tait equation of state; laminar + SPS viscosity',
  },
  {
    label: 'Discretization',
    fvm: 'Finite volume on a 2D quadrilateral mesh of 17,625 cells; second-order upwind; PISO with NITA; Δt = 0.4 s',
    sph: 'Lagrangian particles with a Wendland kernel; 9 mm spacing, 1.1 million particles; Verlet time stepping',
  },
  {
    label: 'Independence test',
    fvm: 'Three meshes and three time steps; 0.119% and 0.095% change beyond the chosen mesh and step',
    sph: 'Four particle spacings, 11 to 8 mm; going from 9 to 8 mm gained 0.44 points of accuracy for 53% more run time',
  },
  {
    label: 'Comparison with experiment',
    fvm: 'Liquid fraction against Kamkari et al.: MAE 1.76%, R² = 0.9955 (done by co-authors)',
    sph: 'C_T against towing-tank data at five Froude numbers: error below 6.5%',
  },
  {
    label: 'Software',
    fvm: 'ANSYS Fluent 2024 R1',
    sph: 'DualSPHysics v5.4 on a GPU; ParaView',
  },
  {
    label: 'My part',
    fvm: 'Geometry and meshing, independence tests, solver setup, parametric runs, LMLI, efficiency and Nusselt analysis, drafting',
    sph: 'Towing-tank setup, GPU runs, C_T and error analysis, free-surface visualization, thesis draft',
    mine: true,
  },
]

export default function MethodComparison() {
  return (
    <div className="compare" role="region" aria-label="Comparison of the two studies" tabIndex={0}>
      <table className="compare__table">
        <thead>
          <tr>
            <td />
            <th scope="col">
              <span className="compare__kind">Mesh-based, finite volume</span>
              <Link to="/research/pcm-k-shaped-fins">PCM melting with K-shaped fins</Link>
            </th>
            <th scope="col">
              <span className="compare__kind">Mesh-free, particles</span>
              <Link to="/research/sph-ship-resistance">Ship resistance with SPH</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className={row.mine ? 'compare__mine' : undefined}>
              <th scope="row">{row.label}</th>
              <td data-label="PCM melting">
                <Rich>{row.fvm}</Rich>
              </td>
              <td data-label="Ship resistance">
                <Rich>{row.sph}</Rich>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
