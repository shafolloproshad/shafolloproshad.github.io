import { lazy } from 'react'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import { routerMode } from './lib/asset.js'

// Pages other than Home load on demand, so the first visit stays fast.
const Research = lazy(() => import('./pages/Research.jsx'))
const PcmStudy = lazy(() => import('./pages/PcmStudy.jsx'))
const SphThesis = lazy(() => import('./pages/SphThesis.jsx'))
const Publications = lazy(() => import('./pages/Publications.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Cv = lazy(() => import('./pages/Cv.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// GitHub Pages serves clean URLs through 404.html (see scripts/spa-fallback.mjs).
// The in-memory router is only used for the self-contained preview build.
const Router = routerMode === 'memory' ? MemoryRouter : BrowserRouter

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="research" element={<Research />} />
          <Route path="research/pcm-k-shaped-fins" element={<PcmStudy />} />
          <Route path="research/sph-ship-resistance" element={<SphThesis />} />
          <Route path="publications" element={<Publications />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
          <Route path="cv" element={<Cv />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}
