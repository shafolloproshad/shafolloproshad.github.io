import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'
import { useDocumentTitle } from '../lib/hooks.js'

export default function Contact() {
  useDocumentTitle('Contact')
  return (
    <>
      <header className="page-head">
        <div className="container">
          <h1 className="page-head__title">Contact</h1>
          <p className="page-head__lede">
            I am looking for graduate research opportunities in computational fluid dynamics and numerical heat
            transfer. Email is the best way to reach me; I can send the PCM manuscript or the thesis on request.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/shafollo-gupto-74121036b
                </a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  github.com/shafolloproshad
                </a>
              </dd>
            </div>
            <div>
              <dt>CV</dt>
              <dd>
                <a href={asset(profile.cvFile)} download>
                  Download PDF
                </a>
              </dd>
            </div>
            <div>
              <dt>Affiliation</dt>
              <dd>
                {profile.department}, {profile.university}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
