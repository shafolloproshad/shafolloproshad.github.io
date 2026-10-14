import { Link } from 'react-router'

/** Title block shared by the research detail pages. */
export default function StudyHeader({ status, title, authors, meta, children }) {
  return (
    <header className="study-head">
      <div className="container">
        <p className="crumbs">
          <Link to="/research">Research</Link>
          <span aria-hidden="true">/</span>
          <span>{status}</span>
        </p>
        <h1 className="study-head__title">{title}</h1>
        {authors && (
          <p className="study-head__authors">
            {authors.map((a, i) => (
              <span key={a.name}>
                {a.me ? <strong className="me">{a.name}</strong> : a.name}
                {a.corresponding && <sup title="Corresponding author">*</sup>}
                {i < authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}
        <dl className="study-head__meta">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        {children}
      </div>
    </header>
  )
}
