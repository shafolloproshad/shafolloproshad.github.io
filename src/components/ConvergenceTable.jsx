import { convergence, convergenceCtExp } from '../data/sph.js'

/** Table 4.4 of the thesis with inline bars for error and run time. */
export default function ConvergenceTable() {
  const maxErr = Math.max(...convergence.map((r) => Math.abs(r.error)))
  const maxRun = Math.max(...convergence.map((r) => r.runtime))
  return (
    <div className="table-wrap" role="region" aria-label="Particle convergence results" tabIndex={0}>
      <table className="data-table conv-table">
        <caption>
          Particle-spacing study at Fr = 0.26. Experimental <i>C</i>
          <sub>T</sub> = {convergenceCtExp} × 10⁻³. A negative error means SPH over-predicts.
        </caption>
        <thead>
          <tr>
            <th scope="col">Spacing dp</th>
            <th scope="col">Particles</th>
            <th scope="col">
              SPH <i>C</i>
              <sub>T</sub> × 10³
            </th>
            <th scope="col">Error vs. experiment</th>
            <th scope="col">GPU run time</th>
          </tr>
        </thead>
        <tbody>
          {convergence.map((r) => (
            <tr key={r.dp} className={r.selected ? 'is-selected' : undefined}>
              <th scope="row">
                {r.dp} mm{r.selected && <span className="tag">Selected</span>}
              </th>
              <td>{r.particles.toFixed(3)} M</td>
              <td>{r.ctSph.toFixed(3)}</td>
              <td>
                <span className="inline-bar">
                  <span className="inline-bar__fill" style={{ width: `${(Math.abs(r.error) / maxErr) * 100}%` }} />
                </span>
                {r.error > 0 ? '' : '−'}
                {String(Math.abs(r.error))}%
              </td>
              <td>
                <span className="inline-bar">
                  <span className="inline-bar__fill inline-bar__fill--muted" style={{ width: `${(r.runtime / maxRun) * 100}%` }} />
                </span>
                {r.runtime.toFixed(2)} h
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
