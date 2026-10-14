import { useEffect, useState } from 'react'
import { usesHashRouter } from '../lib/asset.js'

/** Sticky contents list that follows the reader's position. */
export default function Toc({ items }) {
  const [current, setCurrent] = useState(items[0]?.id)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setCurrent(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  const go = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    if (!usesHashRouter) window.history.replaceState(window.history.state, '', `#${id}`)
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }

  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__title">On this page</p>
      <ol className="toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.id === current ? 'toc__link toc__link--current' : 'toc__link'}
              aria-current={item.id === current ? 'location' : undefined}
              onClick={(e) => go(e, item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
