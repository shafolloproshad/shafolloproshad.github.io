import { Link } from 'react-router'
import Figure from './Figure.jsx'
import Rich from './Rich.jsx'

/** A research project summary with my part and findings. `lead` makes it larger. */
export default function ResearchEntry({ item, lead = false, headingLevel = 3 }) {
  const H = `h${headingLevel}`
  return (
    <article className={lead ? 'entry entry--lead' : 'entry'}>
      <div className="entry__text">
        <p className="entry__status">
          <span className={item.status.includes('review') ? 'status status--review' : 'status'}>{item.status}</span>
          <span className="entry__venue">{item.venue}</span>
        </p>
        <H className="entry__title">
          <Link to={item.path}>{item.title}</Link>
        </H>
        <p className="entry__summary">{item.summary}</p>

        <div className="entry__mine">
          <p className="entry__label">
            <span className="dot dot--me" aria-hidden="true" />
            My part
          </p>
          <ul>
            {item.myPart.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="entry__findings">
          <p className="entry__label">Selected findings</p>
          <ul>
            {item.findings.map((f) => (
              <li key={f}>
                <Rich>{f}</Rich>
              </li>
            ))}
          </ul>
        </div>

        <dl className="entry__meta">
          <div>
            <dt>Method</dt>
            <dd>{item.method}</dd>
          </div>
          <div>
            <dt>Software</dt>
            <dd>{item.tools.join(', ')}</dd>
          </div>
          <div>
            <dt>Field</dt>
            <dd>{item.field}</dd>
          </div>
        </dl>

        <Link className="button button--outline" to={item.path}>
          Read the full {item.status === 'Undergraduate thesis' ? 'thesis summary' : 'study'}
        </Link>
      </div>
      <Figure
        src={item.figure.src}
        alt={item.figure.alt}
        caption={item.figure.caption}
        className="entry__figure"
      />
    </article>
  )
}
