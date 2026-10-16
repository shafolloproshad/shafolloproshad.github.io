import { Link } from 'react-router'
import Portrait from '../components/Portrait.jsx'
import { profile } from '../data/profile.js'
import { skills } from '../data/skills.js'
import { cvSection } from '../data/cv.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function About() {
  useDocumentTitle('About')
  // Same entries as the CV (and its PDF); headings keep this page's style.
  const lists = [
    { ...cvSection('experience'), heading: 'Professional experience' },
    { ...cvSection('honours'), heading: 'Honours and awards' },
    { ...cvSection('service'), heading: 'Leadership and service' },
  ]

  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1 className="page-head__title">About</h1>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="bio">
            <Portrait className="bio__portrait" src={profile.aboutPhoto} />
            <div className="bio__text prose justify-text">
              <p>
                I graduated in June 2026 from the Department of Naval Architecture and Marine Engineering at Bangladesh
                University of Engineering and Technology (BUET). My research so far has been numerical. In a
                collaborative study now under review, I worked on simulations of phase-change melting in an enclosure
                with K-shaped fins, and in my undergraduate thesis I used smoothed particle hydrodynamics to predict
                the calm-water resistance of a container ship.
              </p>
              <p>
                Through this work, I have become most interested in what makes a simulation reliable: choosing a
                suitable model, verifying that the results do not depend on the mesh, particle spacing or time step,
                validating them against experimental data, and interpreting the physics behind the trends.
              </p>
              <p>
                I hope to continue with further study in computational fluid dynamics and related fields. My
                experience so far has been in phase change and ship resistance, but I am open to a broader range of
                fluid-flow and heat-transfer applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="education">
        <div className="container two-col">
          <h2 id="education" className="section__title">
            Education
          </h2>
          <div>
            <div className="edu">
              <p className="edu__degree">{profile.degree}</p>
              <p>{profile.university}</p>
              <p className="edu__meta">{profile.period}</p>
              <p className="edu__meta">
                CGPA {profile.cgpa}, ranked {profile.rank}
              </p>
            </div>
            <p className="edu__courses-title">Relevant courses</p>
            <ul className="chips">
              {profile.courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="interests">
        <div className="container two-col">
          <h2 id="interests" className="section__title">
            Research interests
          </h2>
          <ul className="interest-list">
            {profile.interests.map((i) => (
              <li key={i.title}>{i.title}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="skills">
        <div className="container two-col">
          <div>
            <h2 id="skills" className="section__title">
              Technical skills
            </h2>
            <p className="section__intro two-col__note">Linked to where each skill was used.</p>
          </div>
          <div className="skills">
            {skills.map((g) => (
              <div key={g.group} className="skills__group">
                <h3 className="skills__title">{g.group}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.name}>
                      <span className="skills__name">{s.name}</span>
                      <span className="skills__detail">{s.detail}</span>
                      {s.evidence && (
                        <Link className="skills__evidence" to={s.evidence.to}>
                          {s.evidence.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lists.map((sec) => (
        <section key={sec.id} className="section" aria-label={sec.heading}>
          <div className="container two-col">
            <h2 className="section__title">{sec.heading}</h2>
            <ul className="plain-list">
              {sec.entries.map((e) => (
                <li key={e.title}>
                  <span className="plain-list__title">{e.title}</span>
                  {e.org && <span className="plain-list__org">{e.org}</span>}
                  <span className="plain-list__period">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  )
}
