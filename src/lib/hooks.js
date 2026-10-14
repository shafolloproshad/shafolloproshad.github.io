import { useEffect, useSyncExternalStore } from 'react'

const SITE = 'Shafollo Proshad Gupto'

/** Sets the browser tab title for a page. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | CFD and numerical heat transfer`
  }, [title])
}

function subscribeMotion(callback) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

/** True when the visitor has asked the OS to reduce motion. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}
