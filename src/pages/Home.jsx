import { Link } from 'react-router'
import FlowMotif from '../components/FlowMotif.jsx'
import ResearchStudies from '../components/ResearchStudies.jsx'
import Portrait from '../components/Portrait.jsx'
import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'
import { useDocumentTitle } from '../lib/hooks.js'

function scrollToResearch(e) {
  e.preventDefault()
  const el = document.getElementById('research')
  if (!el) return
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  el.focus({ preventScroll: true })
}

export default function Home() {
  useDocumentTitle(null)
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__text">
            <h1 className="hero__name">{profile.name}</h1>
            <p className="hero__statement">{profile.statement}</p>
            <ul className="hero__facts">
              <li>
                {profile.degree}, {profile.universityShort}, 2026
              </li>
              <li>
                CGPA {profile.cgpa}, ranked {profile.rank}
              </li>
            </ul>
            <div className="hero__actions">
              <a className="button" href="#research" onClick={scrollToResearch}>
                View research
              </a>
              <a className="button button--outline" href={asset(profile.cvFile)} download>
                Download CV (PDF)
              </a>
            </div>
          </div>
          <FlowMotif className="hero__visual" />
        </div>
      </section>

      <section className="interests" aria-labelledby="interests-heading">
        <div className="container interests__grid">
          <div className="interests__intro">
            <h2 id="interests-heading" className="section__title">
              Research interests
            </h2>
            <p>{profile.interestsIntro}</p>
          </div>
          <ul className="interests__list">
            {profile.interests.map((item) => (
              <li key={item.title}>
                <span className="interests__title">{item.title}</span>
                <span className="interests__detail">{item.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="research-heading">
        <div className="container">
          <h2 id="research" className="section__title research-heading" tabIndex={-1}>
            <span id="research-heading">Research</span>
          </h2>
          <ResearchStudies />
        </div>
      </section>

      <section className="section" aria-labelledby="about-heading">
        <div className="container">
          <div className="bio">
            <Portrait className="bio__portrait" />
            <div className="bio__text">
              <h2 id="about-heading" className="section__title">
                About me
              </h2>
              <div className="prose justify-text">
                <p>
                  I graduated in June 2026 from the Department of Naval Architecture and Marine Engineering at BUET with
                  a CGPA of 3.77 / 4.00, fourth in a class of 55. My coursework included fluid mechanics, heat
                  transfer, computational fluid dynamics and numerical computation.
                </p>
                <p>
                  In a five-author study now under review, I worked on the geometry, meshing, Fluent setup and
                  parametric runs of a finite-volume model of a finned phase-change enclosure, and developed a metric
                  for how unevenly it melts. In my undergraduate thesis, written with Ahsan Ahmed, I set up and ran a
                  GPU-based SPH towing tank to predict the resistance of a benchmark container ship.
                </p>
                <p>
                  I want to deepen my understanding of computational fluid dynamics and related areas through further
                  study and research. I am particularly interested in how numerical methods can help us understand
                  complex fluid-flow and heat-transfer problems, including applications in thermal management and phase
                  change materials. I am also keen to explore related areas as I continue to develop my research
                  interests.
                </p>
              </div>
              <p className="bio__links">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <Link to="/about">More about my background</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
