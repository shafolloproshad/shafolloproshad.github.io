/** Kind of work, publication status and venue for a research entry. */
export default function EntryLabels({ item }) {
  return (
    <p className="entry-labels">
      <span className="entry-labels__kind">{item.kind}</span>
      {item.status && <span className="status status--review">{item.status}</span>}
      <span className="entry-labels__venue">{item.status ? <i>{item.venue}</i> : item.venue}</span>
    </p>
  )
}
