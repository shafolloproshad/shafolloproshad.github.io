# shafolloproshad.github.io

Research portfolio of Shafollo Proshad Gupto, built with React and Vite and
published with GitHub Pages at <https://shafolloproshad.github.io>.

## Run it on your computer

Open this folder in VS Code, then in the terminal (Ctrl + `):

```bash
npm install        # first time, and whenever package.json changes
npm run dev        # starts the site at http://localhost:5173
```

Check the production build before you push:

```bash
npm run build      # creates the finished site in dist/
npm run preview    # serves dist/ at http://localhost:4173
npm run lint       # checks the code for mistakes
```

## Publish

The workflow in `.github/workflows/deploy.yml` builds and publishes the site
every time you push to `main`.

One-time setup:

1. If the repository still has `github-pages-deploy.yml` in its root folder,
   move it to `.github/workflows/deploy.yml` (create the two folders; the
   first one starts with a dot).
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**.

Then, for every update:

```bash
git add -A
git commit -m "Update website"
git push
```

Watch progress under the repository's **Actions** tab. When the run turns
green, the site is live.

## Where things live

| What | Where |
| --- | --- |
| Name, email, links, photo, degree, interests | `src/data/profile.js` |
| Research summaries (home and Research page) | `src/data/research.js` |
| PCM study numbers, tables, contribution list | `src/data/pcm.js` |
| Thesis numbers, tables, contribution list | `src/data/sph.js` |
| Publications | `src/data/publications.js` |
| Engineering projects | `src/data/projects.js` |
| Skills | `src/data/skills.js` |
| CV page entries | `src/data/cv.js` |
| Full research pages (text, equations, figures) | `src/pages/PcmStudy.jsx`, `src/pages/SphThesis.jsx` |
| Figures and photos | `public/media/` |
| CV PDF | `public/files/Shafollo-Proshad-Gupto-CV.pdf` |
| Colours, fonts, spacing | `src/styles/tokens.css` |

### Common updates

- **New CV:** replace `public/files/Shafollo-Proshad-Gupto-CV.pdf` with the new
  file, keeping the same name.
- **Manuscript accepted or published:** in `src/data/publications.js` change
  `status` to `'Accepted'` or `'Published'` and add `doi: '10.xxxx/xxxxx'`.
  Update the status text in `src/data/research.js` and at the top and bottom
  of `src/pages/PcmStudy.jsx`.
- **New photo:** put it in `public/media/profile/` and set `photo` in
  `src/data/profile.js`.
- **New figure:** save it as `.webp` or `.png` in `public/media/...`, then use
  `<Figure src="media/your-file.webp" alt="..." caption="..." />` in a page.
  Adding its width and height to `src/data/media.json` stops the page from
  jumping while it loads, but the figure works without it.
- **New research project:** add an entry to `src/data/research.js`, copy one of
  the research pages in `src/pages/` as a starting point, and add a `<Route>`
  for it in `src/App.jsx`.

## How page refreshes work on GitHub Pages

GitHub Pages has no server-side routing, so `npm run build` copies
`dist/index.html` to `dist/404.html` (`scripts/spa-fallback.mjs`). A visit to
`/research/pcm-k-shaped-fins` loads that page, and the app shows the right
content.

## The melting figure on the home page

`src/components/FluentMeltingFigure.jsx` plays back the manuscript's ANSYS
Fluent results for Case 1 (both arms 30 mm, fin angles 10° to 80°). There is
no solver in the browser. The temperature and liquid-fraction fields were read
back from the published contour plots (Figs. 9 and 10) by
`scripts/extract-contour-fields.py` and stored as small PNG data images in
`public/media/pcm/fields/` (red channel: temperature on 20 to 70 °C, green
channel: liquid fraction). Values are therefore approximate, and the caption on
the page says so. The fin outlines are drawn from the geometry in
`src/lib/finGeometry.js`.

To regenerate the data images from the two figure files:

```
python scripts/extract-contour-fields.py fig9.png fig10.png
```
