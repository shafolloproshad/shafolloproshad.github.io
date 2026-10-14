import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Pages load lazily, so the target may appear a moment later.
    let tries = 0
    let frame
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView()
      else if (tries++ < 30) frame = requestAnimationFrame(seek)
    }
    seek()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => {
        e.preventDefault()
        document.getElementById('main')?.focus()
      }}>
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" className="site-main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" aria-live="polite">Loading…</div>}>
          <div className="page" key={pathname}>
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
