/**
 * "My contribution" box used in the research entries. Pass title={null} where
 * a section heading already says it.
 */
export default function Contribution({ items, note, title = 'My contribution' }) {
  return (
    <div className="contribution">
      {title && (
        <p className="contribution__title">
          <span className="dot dot--me" aria-hidden="true" />
          {title}
        </p>
      )}
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {note && <p className="contribution__note">{note}</p>}
    </div>
  )
}
