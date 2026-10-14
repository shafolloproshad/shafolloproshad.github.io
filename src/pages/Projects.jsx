import { projects } from '../data/projects.js'
import Figure from '../components/Figure.jsx'
import { useDocumentTitle } from '../lib/hooks.js'

export default function Projects() {
  useDocumentTitle('Engineering projects')
  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1 className="page-head__title">Engineering projects</h1>
          <p className="page-head__lede">Design work from my degree, alongside the research.</p>
        </div>
      </header>

      <div className="container">
        <div className="project-list">
          {projects.map((p) => (
            <article key={p.title} className="project">
              <div className="project__head">
                <p className="project__period">{p.period}</p>
                <h2 className="project__title">{p.title}</h2>
                <p className="project__context">{p.context}</p>
                {p.outcome && <p className="status">{p.outcome}</p>}
                {p.image && <Figure src={p.image.src} alt={p.image.alt} caption={p.image.caption} />}
              </div>
              <dl className="project__body">
                <div>
                  <dt>Objective</dt>
                  <dd>{p.objective}</dd>
                </div>
                {p.work && (
                  <div>
                    <dt>Work</dt>
                    <dd>
                      <ul>
                        {p.work.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                <div>
                  <dt>Supervisor</dt>
                  <dd>{p.supervisor}</dd>
                </div>
                {p.link && (
                  <div>
                    <dt>More</dt>
                    <dd>
                      <a href={p.link.href} target="_blank" rel="noreferrer">
                        {p.link.label}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
