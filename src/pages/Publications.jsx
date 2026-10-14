import { Link } from 'react-router'
import { publications, ME } from '../data/publications.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function Publications() {
  useDocumentTitle('Publications')
  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1 className="page-head__title">Publications</h1>
          <p className="page-head__lede">
            Manuscripts and theses, with their current status. Nothing listed here as under review has been accepted
            yet.
          </p>
        </div>
      </header>

      <div className="container">
        {publications.map((group) => (
          <section key={group.group} className="section" aria-labelledby={`pub-${group.group}`}>
            <h2 id={`pub-${group.group}`} className="pub-group">
              {group.group}
            </h2>
            <ol className="pub-list">
              {group.items.map((p) => (
                <li key={p.title} className="pub">
                  <p className="pub__status">
                    <span className={p.status === 'Under review' ? 'status status--review' : 'status'}>{p.status}</span>
                    <span>{p.year}</span>
                  </p>
                  <p className="pub__title">{p.title}</p>
                  <p className="pub__authors">
                    {p.authors.map((a, i) => (
                      <span key={a}>
                        {a === ME ? <strong className="me">{a}</strong> : a}
                        {i < p.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                  <p className="pub__venue">
                    <i>{p.venue}</i>
                  </p>
                  {p.contribution && (
                    <p className="pub__contribution">
                      <span className="dot dot--me" aria-hidden="true" />
                      My CRediT roles: {p.contribution}
                    </p>
                  )}
                  <p className="pub__links">
                    {p.page && <Link to={p.page}>Project page</Link>}
                    {p.doi && (
                      <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">
                        DOI {p.doi}
                      </a>
                    )}
                    {p.note && <span className="pub__note">{p.note}</span>}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  )
}
