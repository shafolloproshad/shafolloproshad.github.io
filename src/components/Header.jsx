import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import Glyph from './Glyph.jsx'

const NAV = [
  { to: '/research', label: 'Research' },
  { to: '/publications', label: 'Publications' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/cv', label: 'CV' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  // Close the mobile menu after navigating.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="wordmark" aria-label="Shafollo Proshad Gupto, home">
          <Glyph className="wordmark__glyph" />
          <span>Shafollo Proshad Gupto</span>
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            {open ? (
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
          Menu
        </button>

        <nav id="site-nav" className="site-nav" aria-label="Main" data-open={open}>
          <ul className="site-nav__list">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="site-nav__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
