import { Link } from 'react-router'
import Figure from './Figure.jsx'
import Rich from './Rich.jsx'
import Contribution from './Contribution.jsx'
import EntryLabels from './EntryLabels.jsx'

/**
 * A research project summary. On wide screens the text runs on the left and
 * the figure, with my contribution below it, sits on the right.
 */
export default function ResearchEntry({ item, headingLevel = 3 }) {
  const H = `h${headingLevel}`
  return (
    <article className="entry">
      <header className="entry__head">
        <EntryLabels item={item} />
        <H className="entry__title">
          <Link to={item.path}>{item.title}</Link>
        </H>
      </header>

      <p className="entry__summary">{item.summary}</p>

      <div className="entry__side">
        <Figure src={item.figure.src} alt={item.figure.alt} caption={item.figure.caption} className="entry__figure" />
        <Contribution items={item.myContribution} note={item.contributionNote} />
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

      <Link className="button button--outline entry__cta" to={item.path}>
        {item.kind === 'Undergraduate thesis' ? 'Read the thesis summary' : 'Read the full study'}
      </Link>
    </article>
  )
}
