import { useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

/** A typeset equation. `number` is shown at the right, like in a paper. */
export default function Equation({ tex, number, inline = false }) {
  const html = useMemo(
    () => katex.renderToString(tex, { displayMode: !inline, throwOnError: false, output: 'htmlAndMathml' }),
    [tex, inline],
  )
  if (inline) return <span className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
  return (
    <div className="equation">
      <div className="equation__body" dangerouslySetInnerHTML={{ __html: html }} />
      {number && <span className="equation__number">({number})</span>}
    </div>
  )
}
