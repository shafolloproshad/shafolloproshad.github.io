import { Link } from 'react-router'
import Contribution from './Contribution.jsx'
import EntryLabels from './EntryLabels.jsx'
import Figure from './Figure.jsx'
import Rich from './Rich.jsx'

const ME = 'Shafollo Proshad Gupto'

/** Key findings, then method, software and field. */
function StudyFacts({ item }) {
  return (
    <>
      <div className="featured__findings">
        <p className="featured__label">Key Findings</p>
        <ul>
          {item.findings.map((f) => (
            <li key={f}>
              <Rich>{f}</Rich>
            </li>
          ))}
        </ul>
      </div>

      <dl className="featured__meta">
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
    </>
  )
}

/**
 * A research study set out like a journal article: labels, title and authors
 * across the top, the summary on the left and the figure on the right. Used on
 * the home page and the Research page (through ResearchStudies).
 *  - figure: a custom figure (the PCM melting animation), placed on the right;
 *    my contribution then follows the summary. Without it, the item's own
 *    figure is shown with my contribution below it (the thesis layout).
 *  - justifyTitle: justify the title on wider screens.
 *  - headingLevel: 3 on the home page, 2 on the Research page.
 */
export default function FeaturedStudy({ item, figure, justifyTitle = false, headingLevel = 3 }) {
  const H = `h${headingLevel}`
  const titleId = `${item.slug}-title`
  const contribution = <Contribution items={item.myContribution} note={item.contributionNote} />
  const cta = (
    <Link className="button button--outline" to={item.path}>
      {item.kind === 'Undergraduate thesis' ? 'Read the thesis summary' : 'Read the full study'}
    </Link>
  )

  return (
    <article className="featured" aria-labelledby={titleId}>
      <header className="featured__head">
        <EntryLabels item={item} />
        <H id={titleId} className={`featured__title${justifyTitle ? ' featured__title--justify' : ''}`}>
          <Link to={item.path}>{item.title}</Link>
        </H>
        <p className={`featured__authors${item.supervisor ? ' featured__authors--credits' : ''}`}>
          <span>
            {item.supervisor && <span className="featured__role">Authors: </span>}
            {item.authors.map((a, i) => (
              <span key={a}>
                {a === ME ? <strong className="me">{a}</strong> : a}
                {i < item.authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </span>
          {item.supervisor && (
            <span>
              <span className="featured__role">Supervisor: </span>
              {item.supervisor}
            </span>
          )}
        </p>
      </header>

      {figure ? (
        <div className="featured__body">
          <div className="featured__text">
            <p className="featured__summary">{item.summary}</p>
            {contribution}
            <StudyFacts item={item} />
            {cta}
          </div>
          {figure}
        </div>
      ) : (
        <div className="featured__body featured__body--plate">
          <div className="featured__text">
            <p className="featured__summary">{item.summary}</p>
            <StudyFacts item={item} />
            {cta}
          </div>

          <div className="featured__aside">
            <Figure src={item.figure.src} alt={item.figure.alt} caption={item.figure.caption} />
            {contribution}
          </div>
        </div>
      )}
    </article>
  )
}
