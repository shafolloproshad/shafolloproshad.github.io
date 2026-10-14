import { Link } from 'react-router'
import Portrait from '../components/Portrait.jsx'
import { profile } from '../data/profile.js'
import { skills } from '../data/skills.js'
import { cv } from '../data/cv.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function About() {
  useDocumentTitle('About')
  const honours = cv.find((s) => s.section === 'Honours and awards')
  const service = cv.find((s) => s.section === 'Leadership and service')
  const experience = cv.find((s) => s.section === 'Professional experience')

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
            <Portrait className="bio__portrait" />
            <div className="bio__text prose">
              <p>
                I am a graduate of the Department of Naval Architecture and Marine Engineering at Bangladesh University
                of Engineering and Technology (BUET). My research so far has been computational: a finite-volume study
                of phase-change melting in a finned enclosure, now under review, and an undergraduate thesis using
                smoothed particle hydrodynamics to predict ship resistance.
              </p>
              <p>
                What interests me most is the part of a simulation study that decides whether its numbers can be
                trusted: choosing the model, showing that results do not depend on the mesh, particle spacing or time
                step, comparing with experiment, and explaining the physics behind the trends. I want to build on this
                in graduate research on thermal-fluid problems.
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
              <li key={i}>{i}</li>
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

      {[experience, honours, service].map((sec) => (
        <section key={sec.section} className="section" aria-label={sec.section}>
          <div className="container two-col">
            <h2 className="section__title">{sec.section}</h2>
            <ul className="plain-list">
              {sec.entries.map((e) => (
                <li key={e.title}>
                  <span className="plain-list__title">{e.title}</span>
                  <span className="plain-list__org">{e.org}</span>
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
