import { profile } from '../data/profile.js'
import { asset } from '../lib/asset.js'

/** Author photo, or initials until a photo is added in src/data/profile.js. */
export default function Portrait({ className = '' }) {
  if (profile.photo) {
    return <img className={`portrait ${className}`} src={asset(profile.photo)} alt={`Portrait of ${profile.name}`} />
  }
  return (
    <div className={`portrait portrait--empty ${className}`} role="img" aria-label={`${profile.name} (photo to be added)`}>
      <span>SPG</span>
    </div>
  )
}
