import { Link } from 'react-router'
import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p>
            <strong>{profile.name}</strong>
          </p>
          <p>
            {profile.degree}, {profile.universityShort}
          </p>
        </div>
        <ul className="site-footer__links">
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={asset(profile.cvFile)} download>
              CV (PDF)
            </a>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <p className="site-footer__meta">Last updated October 2026.</p>
      </div>
    </footer>
  )
}
