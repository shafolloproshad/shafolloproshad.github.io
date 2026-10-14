// Site mark: a heated enclosure (red wall on the left) with a K-shaped fin.
export default function Glyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="30" height="30" rx="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="2" y="2" width="5" height="28" fill="var(--heat)" />
      <path d="M7 16 L25 8 M7 16 L22 27" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}
