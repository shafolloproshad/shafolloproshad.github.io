// Renders short technical strings with subscripts, e.g. "C_T", "L_WL", "A_mush".
// Write the symbol as NAME_SUB in data files; everything else passes through.

const PATTERN = /([A-Za-zηγΔ]+)_([A-Za-z0-9]+)/g

export default function Rich({ children }) {
  if (typeof children !== 'string') return children
  const parts = []
  let last = 0
  for (const match of children.matchAll(PATTERN)) {
    if (match.index > last) parts.push(children.slice(last, match.index))
    parts.push(
      <span key={match.index} className="sym">
        <i>{match[1]}</i>
        <sub>{match[2]}</sub>
      </span>,
    )
    last = match.index + match[0].length
  }
  if (last < children.length) parts.push(children.slice(last))
  return <>{parts}</>
}
