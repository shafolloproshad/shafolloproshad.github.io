import { Link } from 'react-router'
import { useDocumentTitle } from '../lib/hooks.js'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <header className="page-head">
      <div className="container">
        <h1 className="page-head__title">This page doesn’t exist</h1>
        <p className="page-head__lede">
          The link may be out of date. Try the <Link to="/">home page</Link> or the <Link to="/research">research</Link>{' '}
          overview.
        </p>
      </div>
    </header>
  )
}
