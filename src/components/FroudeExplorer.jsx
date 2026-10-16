import { useState } from 'react'
import { validationRows } from '../data/sph.js'
import Figure from './Figure.jsx'
import Segmented from './Segmented.jsx'

/** Free-surface pattern and resistance result for each Froude number. */
export default function FroudeExplorer() {
  const [fr, setFr] = useState(0.282)
  const row = validationRows.find((r) => r.fr === fr)
  return (
    <div className="froude">
      <Segmented
        label="Froude number"
        value={fr}
        onChange={setFr}
        options={validationRows.map((r) => ({ value: r.fr, label: r.fr.toFixed(3) }))}
      />
      <div className="froude__body">
        <Figure
          key={fr}
          src={row.image}
          alt={`Top view of the free-surface elevation, z over L_WL, around the KCS hull at Froude number ${fr}.`}
          caption={`Free-surface elevation z / L_WL at Fr = ${fr.toFixed(3)}, viewed from above (flow left to right).`}
          size="wide"
        />
        <dl className="froude__stats">
          <div>
            <dt>Total resistance</dt>
            <dd>{row.rt.toFixed(3)} N</dd>
          </div>
          <div>
            <dt>
              <i>C</i>
              <sub>T</sub>, experiment
            </dt>
            <dd>{row.ctExp.toFixed(3)} × 10⁻³</dd>
          </div>
          <div>
            <dt>
              <i>C</i>
              <sub>T</sub>, SPH
            </dt>
            <dd>{row.ctSph.toFixed(3)} × 10⁻³</dd>
          </div>
          <div>
            <dt>Error</dt>
            <dd>{row.error.toFixed(2)}%</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
