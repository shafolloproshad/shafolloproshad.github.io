import { Link } from 'react-router'
import { cv } from '../data/cv.js'
import { skills } from '../data/skills.js'
import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function Cv() {
  useDocumentTitle('Curriculum vitae')
  return (
    <>
      <header className="page-head">
        <div className="container page-head__row">
          <div>
            <h1 className="page-head__title">Curriculum vitae</h1>
            <p className="page-head__lede">The same content as the PDF, with links to the project pages.</p>
          </div>
          <a className="button" href={asset(profile.cvFile)} download>
            Download PDF
          </a>
        </div>
      </header>

      <div className="container">
        {cv.map((sec) => (
          <section key={sec.section} className="cv-section" aria-label={sec.section}>
            <h2 className="cv-section__title">{sec.section}</h2>
            <ol className="timeline">
              {sec.entries.map((e) => (
                <li key={e.title} className="timeline__item">
                  <p className="timeline__period">{e.period}</p>
                  <div className="timeline__body">
                    <p className="timeline__title">{e.to ? <Link to={e.to}>{e.title}</Link> : e.title}</p>
                    <p className="timeline__org">{e.org}</p>
                    {e.points && (
                      <ul>
                        {e.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section className="cv-section" aria-label="Publications">
          <h2 className="cv-section__title">Manuscripts</h2>
          <ol className="timeline">
            <li className="timeline__item">
              <p className="timeline__period">Under review</p>
              <div className="timeline__body">
                <p className="timeline__title">
                  <Link to="/publications">
                    Numerical Investigation of Melting Enhancement in a Phase Change Material-Filled Enclosure Using
                    K-Shaped Fins: Effects of Fin Angle and Arm Length Ratio
                  </Link>
                </p>
                <p className="timeline__org">
                  Zenith, Das, <strong className="me">Gupto</strong>, Rahaman, Islam. Case Studies in Thermal Engineering.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="cv-section" aria-label="Skills">
          <h2 className="cv-section__title">Technical skills</h2>
          <dl className="cv-skills">
            {skills.map((g) => (
              <div key={g.group}>
                <dt>{g.group}</dt>
                <dd>{g.items.map((s) => s.name).join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  )
}
