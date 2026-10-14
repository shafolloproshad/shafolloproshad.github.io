import { Link } from 'react-router'
import MeltSolverFigure from '../components/MeltSolverFigure.jsx'
import ResearchEntry from '../components/ResearchEntry.jsx'
import MethodComparison from '../components/MethodComparison.jsx'
import Portrait from '../components/Portrait.jsx'
import { profile } from '../data/profile.js'
import { research } from '../data/research.js'
import { asset } from '../lib/asset.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function Home() {
  useDocumentTitle(null)
  const [pcm, sph] = research

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__text">
            <h1 className="hero__name">{profile.name}</h1>
            <p className="hero__statement">{profile.statement}</p>
            <ul className="hero__facts">
              <li>
                {profile.degree}, {profile.universityShort}, June 2026
              </li>
              <li>
                CGPA {profile.cgpa}, ranked {profile.rank}
              </li>
              <li>Looking for graduate research in CFD and numerical heat transfer</li>
            </ul>
            <div className="hero__actions">
              <Link className="button" to={pcm.path}>
                Read the PCM melting study
              </Link>
              <a className="button button--outline" href={asset(profile.cvFile)} download>
                Download CV (PDF)
              </a>
            </div>
          </div>
          <div className="hero__figure">
            <MeltSolverFigure />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="research-heading">
        <div className="container">
          <div className="section__head">
            <h2 id="research-heading" className="section__title">
              Research
            </h2>
            <p className="section__intro">
              Two simulation studies, one with a finite-volume solver and one with a particle method. For each, I mark
              which parts of the work were mine.
            </p>
          </div>
          <ResearchEntry item={pcm} lead />
          <ResearchEntry item={sph} />
        </div>
      </section>

      <section className="section" aria-labelledby="compare-heading">
        <div className="container">
          <div className="section__head">
            <h2 id="compare-heading" className="section__title">
              The same checks, two discretizations
            </h2>
            <p className="section__intro">
              The two studies use different numerical methods but answer the same questions: what model, what
              resolution, how it was verified, and how it compares with experiment.
            </p>
          </div>
          <MethodComparison />
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
              <div className="prose">
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
                  I am looking for graduate research opportunities in computational fluid dynamics and numerical heat
                  transfer, particularly thermal-fluid problems involving phase change, natural convection and thermal
                  management.
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
