import ResearchStudies from '../components/ResearchStudies.jsx'
import MethodComparison from '../components/MethodComparison.jsx'
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
            My research focuses on computational fluid dynamics, heat transfer, and phase change materials. This page
            presents my research projects, their principal findings, and my specific contributions to the modelling,
            numerical analysis, and interpretation of results.
          </p>
        </div>
      </header>

      <section className="section" aria-labelledby="interests-heading">
        <div className="container">
          <div className="section__head">
            <h2 id="interests-heading" className="section__title">
              Research interests
            </h2>
          </div>
          <ul className="interest-list">
            {profile.interests.map((i) => (
              <li key={i.title}>{i.title}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Research projects">
        <div className="container">
          <ResearchStudies headingLevel={2} />
        </div>
      </section>

      <section className="section" aria-labelledby="compare-heading">
        <div className="container">
          <div className="section__head">
            <h2 id="compare-heading" className="section__title">
              Research Methods and Contributions
            </h2>
            <p className="section__intro">
              A summary of the numerical methods, verification and validation approaches, principal findings, and my
              contributions across both studies.
            </p>
          </div>
          <MethodComparison />
        </div>
      </section>
    </>
  )
}
