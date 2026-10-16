"""
Rebuilds public/media/pcm/fields/case1-<angle>.png from the manuscript's contour
figures (Fig. 9: temperature, Fig. 10: liquid fraction; Case 1, K_u = K_l = 30 mm).

The figures were drawn with matplotlib's 'jet' colour map: temperature from
298.15 K to 350 K (read from the colour-bar ticks) and liquid fraction from 0 to
1. Each panel is inverted pixel by pixel to the nearest colour-map entry,
cropped to the 50 mm x 50 mm PCM region and averaged onto a 150 x 150 grid.

Output: one PNG per fin angle, 150 px wide and 6 x 150 px tall, one frame per
time (0, 1000, 1750, 2500, 3250, 4000 s). Red channel = temperature, encoded as
round((T - 20 °C) / 50 °C * 250); green channel = liquid fraction * 250.
The 0 s frame is the initial condition (25 °C, fully solid).

Usage: python scripts/extract-contour-fields.py <fig9.png> <fig10.png>
Needs numpy, pillow, matplotlib and scipy. The input images are the original
figure files from the manuscript, which are not stored in this repository.
"""
import sys
import numpy as np
from PIL import Image
from matplotlib import colormaps
from scipy.spatial import cKDTree

R = 150
COLS = [(581, 1175), (1266, 1860), (1951, 2545), (2636, 3230), (3321, 3915), (4006, 4600), (4691, 5285), (5376, 5970)]
ROWS = [(222, 750), (781, 1309), (1339, 1868), (1898, 2426), (2457, 2985)]
ANGLES = [10, 20, 30, 40, 50, 60, 70, 80]
WALL_PX = 50  # heated-wall strip at the left of each temperature panel
TMIN, TMAX = 298.15, 350.0

jet = colormaps['jet']
tree = cKDTree(np.array([jet(i / 255)[:3] for i in range(256)]) * 255)


def invert(rgb, vmin, vmax):
    flat = rgb.reshape(-1, 3).astype(float)
    uniq, inv = np.unique(flat, axis=0, return_inverse=True)
    _, idx = tree.query(uniq)
    return (vmin + idx / 255 * (vmax - vmin))[inv.ravel()].reshape(rgb.shape[:2])


def box(field):
    return np.asarray(Image.fromarray(field.astype(np.float32), 'F').resize((R, R), Image.BOX))


def main(fig9, fig10, out_dir='public/media/pcm/fields'):
    timg = np.asarray(Image.open(fig9).convert('RGB'))
    limg = np.asarray(Image.open(fig10).convert('RGB'))
    for ci, (x0, x1) in enumerate(COLS):
        sprite = np.zeros((6 * R, R, 3), np.uint8)
        sprite[:R, :, 0] = round((25 - 20) / 50 * 250)  # t = 0: 25 °C, solid
        for ri, (y0, y1) in enumerate(ROWS):
            tk = invert(timg[y0:y1 + 1, x0 + WALL_PX:x1 + 1], TMIN, TMAX)
            panel = limg[y0:y1 + 1, x0:x1 + 1]
            g = invert(panel, 0.0, 1.0)
            g[panel.min(axis=2) > 200] = 1.0  # fin pixels are white
            t_c = box(tk) - 273.15
            frame = sprite[(ri + 1) * R:(ri + 2) * R]
            frame[:, :, 0] = np.clip(np.round((t_c - 20) / 50 * 250), 0, 250)
            frame[:, :, 1] = np.clip(np.round(box(g) * 250), 0, 250)
        Image.fromarray(sprite, 'RGB').save(f'{out_dir}/case1-{ANGLES[ci]}.png', optimize=True)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
