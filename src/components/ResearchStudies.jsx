import FeaturedStudy from './FeaturedStudy.jsx'
import FluentMeltingFigure from './FluentMeltingFigure.jsx'
import { research } from '../data/research.js'

// Per-study presentation. Studies not listed here show their own static figure.
const OPTIONS = {
  'pcm-k-shaped-fins': { figure: <FluentMeltingFigure />, justifyTitle: true },
}

/**
 * The research studies, in the order of src/data/research.js. The home page and
 * the Research page both render this, so the two always match.
 */
export default function ResearchStudies({ headingLevel = 3 }) {
  return research.map((item) => (
    <FeaturedStudy key={item.slug} item={item} headingLevel={headingLevel} {...OPTIONS[item.slug]} />
  ))
}
