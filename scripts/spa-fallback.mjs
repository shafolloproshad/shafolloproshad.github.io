// GitHub Pages has no server-side routing. Copying index.html to 404.html makes
// direct visits and refreshes on pages like /research/pcm-k-shaped-fins load the
// app, which then shows the right page.
import { copyFileSync, existsSync } from 'node:fs'

const dir = process.argv[2] ?? 'dist'
if (existsSync(`${dir}/index.html`)) {
  copyFileSync(`${dir}/index.html`, `${dir}/404.html`)
  console.log(`Copied ${dir}/index.html to ${dir}/404.html`)
}
