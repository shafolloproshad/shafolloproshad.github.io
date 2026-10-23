import { Fragment } from 'react'
import { Link } from 'react-router'
import Contribution from '../components/Contribution.jsx'
import { cv } from '../data/cv.js'
import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'
import { useDocumentTitle } from '../lib/hooks.js'

// Online version of the CV PDF: same sections, same order, same wording.
export default function Cv() {
  useDocumentTitle('Curriculum vitae')
  return (
    <>
      <header className="page-head page-head--cv">
        <div className="container page-head__row">
          <h1 className="page-head__title">Curriculum vitae</h1>
          <a className="button" href={asset(profile.cvFile)} download>
            Download PDF
          </a>
        </div>
      </header>

      <div className="container">
        {cv.map((sec) => (
          <section key={sec.id} className="cv-section" aria-labelledby={`cv-${sec.id}`}>
            <h2 id={`cv-${sec.id}`} className="cv-section__title">
              {sec.section}
            </h2>
            <div className="cv-section__body">
              {sec.kind === 'timeline' && <Timeline entries={sec.entries} />}
              {sec.kind === 'list' && <Interests items={sec.items} />}
              {sec.kind === 'skills' && <Skills items={sec.items} />}
              {sec.kind === 'references' && <References items={sec.items} />}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

function MaybeLink({ to, children }) {
  return to ? <Link to={to}>{children}</Link> : children
}

function Timeline({ entries }) {
  return (
    <ol className="timeline">
      {entries.map((e) => (
        <li key={e.title} className="timeline__item">
          <p className="timeline__period">{e.period}</p>
          <div className="timeline__body">
            <p className="timeline__title">
              <MaybeLink to={e.to}>{e.title}</MaybeLink>
            </p>
            {e.org && (
              <p className="timeline__org">
                <Org e={e} />
              </p>
            )}
            {e.meta?.map((m) => (
              <p key={m.value} className={`timeline__meta${m.work ? ' timeline__meta--work' : ''}`}>
                {m.label && <span className="timeline__label">{m.label}: </span>}
                <MaybeLink to={m.to}>{m.work ? <cite>{m.value}</cite> : m.value}</MaybeLink>
              </p>
            ))}
            {e.lines?.map((l) => (
              <p key={l} className="timeline__line">
                {l}
              </p>
            ))}
            {e.courses && (
              <p className="timeline__courses">
                <span className="timeline__label">Relevant Courses: </span>
                {e.courses.map((c, i) => (
                  <Fragment key={c}>
                    {i > 0 && <span aria-hidden="true"> · </span>}
                    <span className="timeline__course">{c}</span>
                  </Fragment>
                ))}
              </p>
            )}
            {e.citation && <Citation c={e.citation} />}
            {e.summary && <p className="timeline__summary justify-text">{e.summary}</p>}
            {e.points && (
              <ul className="timeline__points">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
            {e.contributions && (
              <div className="timeline__contrib">
                <Contribution items={e.contributions} title="My Contributions" />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

// Organisation line; `orgLink` turns its leading name into a link (opens in a new tab).
function Org({ e }) {
  const l = e.orgLink
  if (!l || !e.org.startsWith(l.text)) return e.org
  return (
    <>
      <a href={l.href} target="_blank" rel="noreferrer">
        {l.text}
      </a>
      {e.org.slice(l.text.length)}
    </>
  )
}

function Citation({ c }) {
  return (
    <>
      <p className="timeline__org">
        {c.authors.map((a, i) => (
          <Fragment key={a}>
            {i > 0 && ', '}
            {a === c.me ? <strong className="me">{a}</strong> : a}
          </Fragment>
        ))}
      </p>
      <p className="timeline__line">
        <cite>{c.venue}</cite> ({c.status})
      </p>
      <p className="timeline__line timeline__line--small">
        <span className="timeline__label">Contribution: </span>
        {c.contribution}
      </p>
    </>
  )
}

function Interests({ items }) {
  return (
    <ul className="interest-list cv-interests">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  )
}

function Skills({ items }) {
  return (
    <dl className="cv-skills">
      {items.map((g) => (
        <div key={g.group}>
          <dt>{g.group}</dt>
          <dd>
            <p className="cv-skills__tools">{g.value}</p>
            {g.detail && <p className="cv-skills__detail">{g.detail}</p>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function References({ items }) {
  return (
    <ul className="cv-refs">
      {items.map((r) => (
        <li key={r.name} className="cv-refs__item">
          <p className="cv-refs__name">{r.name}</p>
          <p>{r.role}</p>
          <p>{r.dept}</p>
          <p className="cv-refs__row">
            <span className="timeline__label">Contact: </span>
            <a href={`mailto:${r.email}`}>{r.email}</a>
          </p>
          <p className="cv-refs__row">
            <span className="timeline__label">Relationship: </span>
            {r.relationship}
          </p>
        </li>
      ))}
    </ul>
  )
}
