import { projects } from '../data/projects.js'
import Figure from '../components/Figure.jsx'
import { asset } from '../lib/asset.js'
import { useDocumentTitle } from '../lib/hooks.js'

/*
 * Each project is two columns on wide screens:
 *  - left:  period, title, team or institution, then the figures with their captions;
 *  - right: overview, work list, award (with certificate) and supervisor.
 * On narrow screens the columns stack in that order.
 */
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
          {projects.map((p) => {
            const headingId = `project-${p.slug}`
            const advisorsInHead = p.supervisorPlacement === 'head'
            return (
              <article key={p.slug} className="project" aria-labelledby={headingId}>
                <div className="project__aside">
                  <header className="project__head">
                    <p className="project__period">{p.period}</p>
                    <h2 className="project__title" id={headingId}>
                      {p.title}
                    </h2>
                    <p className="project__context">{p.context}</p>
                    {advisorsInHead && (
                      <p className="project__people">
                        <span className="project__people-label">{p.supervisorLabel || 'Supervisor'}</span>
                        {p.supervisor}
                      </p>
                    )}
                    {(p.outcome || p.link) && (
                      <p className="project__tags">
                        {p.outcome && <span className="status">{p.outcome}</span>}
                        {p.link && (
                          <a href={p.link.href} target="_blank" rel="noreferrer">
                            {p.link.label}
                          </a>
                        )}
                      </p>
                    )}
                  </header>
                  {p.images?.map((img) => (
                    <Figure key={img.src} src={img.src} alt={img.alt} caption={img.caption} />
                  ))}
                </div>

                <dl className="project__body">
                  <div>
                    <dt>Overview</dt>
                    <dd className="project__overview">{p.summary}</dd>
                  </div>
                  {p.work && (
                    <div>
                      <dt>{p.workLabel || 'Work'}</dt>
                      <dd>
                        <ul className="project__list">
                          {p.work.map((w) => (
                            <li key={w}>{w}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                  {p.award && (
                    <div>
                      <dt>Award</dt>
                      <dd className="project__award">
                        <p>{p.award.title}</p>
                        <Figure src={p.award.image.src} alt={p.award.image.alt} caption={p.award.image.caption} />
                        <a className="project__pdf" href={asset(p.award.pdf)} target="_blank" rel="noreferrer">
                          View the certificate (PDF)
                        </a>
                      </dd>
                    </div>
                  )}
                  {!advisorsInHead && (
                    <div>
                      <dt>{p.supervisorLabel || 'Supervisor'}</dt>
                      <dd>{p.supervisor}</dd>
                    </div>
                  )}
                </dl>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}
