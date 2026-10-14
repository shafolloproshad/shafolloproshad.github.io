import media from '../data/media.json'

/** Resolve a file in /public so it works at any base path. */
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

/** Intrinsic [width, height] of an image in /public/media, if known. */
export function mediaSize(path) {
  return media[path.replace(/^\//, '')] ?? null
}

// 'browser' for the real site; 'memory' for the self-contained preview build.
export const routerMode = import.meta.env.VITE_ROUTER || 'browser'
export const usesHashRouter = routerMode !== 'browser'
