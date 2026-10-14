import ResearchEntry from '../components/ResearchEntry.jsx'
import MethodComparison from '../components/MethodComparison.jsx'
import { research } from '../data/research.js'
import { profile } from '../data/profile.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function Research() {
  useDocumentTitle('Research')
  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1 className="page-head__title">Research</h1>
          <p className="page-head__lede">
            Numerical studies of heat transfer and fluid flow. Each project page separates the overall study from my
            own part of it, and shows the evidence behind the results.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          {research.map((item, i) => (
            <ResearchEntry key={item.slug} item={item} lead={i === 0} headingLevel={2} />
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="compare-heading">
        <div className="container">
          <div className="section__head">
            <h2 id="compare-heading" className="section__title">
              Side by side
            </h2>
            <p className="section__intro">How the two studies were set up, checked and validated.</p>
          </div>
          <MethodComparison />
        </div>
      </section>

      <section className="section" aria-labelledby="interests-heading">
        <div className="container">
          <div className="section__head">
            <h2 id="interests-heading" className="section__title">
              Research interests
            </h2>
          </div>
          <ul className="interest-list">
            {profile.interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
