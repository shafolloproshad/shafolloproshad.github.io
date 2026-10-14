import Rich from './Rich.jsx'

/** Stages of a study, marking the ones I carried out (alone or jointly). */
export default function ContributionMatrix({ rows, caption }) {
  const mine = rows.filter((r) => r.mine).length
  return (
    <div className="contrib">
      <div className="contrib__head">
        <p className="contrib__caption">{caption}</p>
        <p className="contrib__legend">
          <span className="owner owner--me">
            <span className="dot dot--me" aria-hidden="true" />
            My work, alone or jointly
          </span>
          <span className="owner">
            <span className="dot" aria-hidden="true" />
            Co-authors
          </span>
          <span className="contrib__count">
            {mine} of {rows.length} stages
          </span>
        </p>
      </div>
      <ol className="contrib__list">
        {rows.map((row, i) => (
          <li key={row.stage} className={row.mine ? 'contrib__row contrib__row--mine' : 'contrib__row'}>
            <span className="contrib__n" aria-hidden="true">
              {i + 1}
            </span>
            <span className={row.mine ? 'dot dot--me' : 'dot'} aria-hidden="true" />
            <div className="contrib__body">
              <p className="contrib__stage">
                {row.stage}
                {row.note && <span className="contrib__note">{row.note}</span>}
              </p>
              <p className="contrib__detail">
                <Rich>{row.detail}</Rich>
              </p>
            </div>
            <span className="contrib__who">{row.mine ? 'Me' : 'Co-authors'}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
