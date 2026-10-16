// K-fin geometry used in the manuscript (Table 1). The junction sits at the
// mid-height of the heated wall and the two arms open symmetrically about the
// horizontal, as in the ANSYS Fluent models.

export const DOMAIN_MM = 50 // PCM region is 50 mm x 50 mm
export const FIN_THICKNESS_MM = 2
const JUNCTION_Y_MM = 25

/** Fin arm end points in mm, origin at the bottom of the heated wall. */
export function finArms({ ku, kl, angle }) {
  const half = (angle * Math.PI) / 360
  return [
    { x1: 0, y1: JUNCTION_Y_MM, x2: ku * Math.cos(half), y2: JUNCTION_Y_MM + ku * Math.sin(half) },
    { x1: 0, y1: JUNCTION_Y_MM, x2: kl * Math.cos(half), y2: JUNCTION_Y_MM - kl * Math.sin(half) },
  ]
}

/** Corners of an arm drawn as a rectangle of the fin thickness, in mm. */
export function armPolygon(arm, thickness = FIN_THICKNESS_MM) {
  const dx = arm.x2 - arm.x1
  const dy = arm.y2 - arm.y1
  const len = Math.hypot(dx, dy)
  const nx = (-dy / len) * (thickness / 2)
  const ny = (dx / len) * (thickness / 2)
  return [
    [arm.x1 + nx, arm.y1 + ny],
    [arm.x2 + nx, arm.y2 + ny],
    [arm.x2 - nx, arm.y2 - ny],
    [arm.x1 - nx, arm.y1 - ny],
  ]
}
