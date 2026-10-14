import { useId, useRef } from 'react'
import { asset, mediaSize } from '../lib/asset.js'
import Rich from './Rich.jsx'

/**
 * A research figure on a white plate. Clicking the image opens it full size.
 *  - source: where the figure comes from, e.g. "Manuscript, Fig. 9"
 *  - owner:  'me' | 'team' — who produced the work shown (optional)
 */
export default function Figure({ src, alt, caption, source, owner, size = 'default', className = '', children }) {
  const dialogRef = useRef(null)
  const captionId = useId()
  const dims = mediaSize(src)

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  return (
    <figure className={`plate plate--${size} ${className}`}>
      <button type="button" className="plate__zoom" onClick={open} aria-describedby={captionId}>
        <img
          src={asset(src)}
          alt={alt}
          width={dims?.[0]}
          height={dims?.[1]}
          loading="lazy"
          decoding="async"
        />
        <span className="plate__zoom-hint" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path d="M6.5 1.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm8 13-4-4M6.5 4.5v4M4.5 6.5h4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
          Enlarge
        </span>
        <span className="visually-hidden">Enlarge figure</span>
      </button>
      {children}
      {(caption || source) && (
        <figcaption id={captionId} className="plate__caption">
          {caption && (
            <span>
              <Rich>{caption}</Rich>
            </span>
          )}
          <span className="plate__meta">
            {source && <span className="plate__source">{source}</span>}
            {owner && <OwnerTag owner={owner} />}
          </span>
        </figcaption>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={caption || alt}
        onClick={(e) => {
          if (e.target === dialogRef.current) close()
        }}
      >
        <div className="lightbox__frame">
          <img src={asset(src)} alt={alt} />
          <div className="lightbox__bar">
            <p>
              <Rich>{caption || alt}</Rich>
            </p>
            <button type="button" className="button button--quiet" onClick={close}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </figure>
  )
}

export function OwnerTag({ owner }) {
  return owner === 'me' ? (
    <span className="owner owner--me">
      <span className="dot dot--me" aria-hidden="true" />
      My work
    </span>
  ) : (
    <span className="owner">
      <span className="dot" aria-hidden="true" />
      Co-authors
    </span>
  )
}
