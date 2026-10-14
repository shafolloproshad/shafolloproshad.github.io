import { useState } from 'react'
import Figure from './Figure.jsx'
import Segmented from './Segmented.jsx'

const VIEWS = {
  temperature: {
    label: 'Temperature',
    src: 'media/pcm/temperature-contours.webp',
    alt: 'Grid of temperature contours (K) for fin angles 10° to 80° at 1000, 1750, 2500, 3250 and 4000 s. Hot liquid collects in the upper part of the enclosure while the lower right stays cold.',
    caption: 'Temperature contours (K) for the eight fin angles of Case 1 at five instants.',
    source: 'Manuscript, Fig. 9',
  },
  liquid: {
    label: 'Liquid fraction',
    src: 'media/pcm/liquid-fraction-contours.webp',
    alt: 'Grid of liquid-fraction contours for fin angles 10° to 80° at 1000, 1750, 2500, 3250 and 4000 s. Melt (red) spreads from the wall and fins; solid (blue) persists longest in the lower right corner.',
    caption: 'Liquid-fraction contours for the same cases and instants. Solid PCM lingers longest in the lower right corner.',
    source: 'Manuscript, Fig. 10',
  },
}

/** Switch between the temperature and liquid-fraction contour grids. */
export default function ContourViewer() {
  const [view, setView] = useState('liquid')
  const v = VIEWS[view]
  return (
    <div className="contour-viewer">
      <Segmented
        label="Field shown"
        value={view}
        onChange={setView}
        options={Object.entries(VIEWS).map(([value, x]) => ({ value, label: x.label }))}
      />
      <Figure key={view} src={v.src} alt={v.alt} caption={v.caption} source={v.source} owner="team" size="wide" />
    </div>
  )
}
