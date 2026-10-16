import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'

/**
 * Author photo, or initials until a photo is added in src/data/profile.js.
 * Pass `src` to show a different photo (the About page uses its own).
 */
export default function Portrait({ className = '', src = profile.photo }) {
  if (src) {
    return <img className={`portrait ${className}`} src={asset(src)} alt={`Portrait of ${profile.name}`} />
  }
  return (
    <div className={`portrait portrait--empty ${className}`} role="img" aria-label={`${profile.name} (photo to be added)`}>
      <span>SPG</span>
    </div>
  )
}
