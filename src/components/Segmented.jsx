import { useId } from 'react'

/** A row of mutually exclusive options, built on native radio buttons. */
export default function Segmented({ label, options, value, onChange, hideLabel = false }) {
  const name = useId()
  return (
    <fieldset className="segmented">
      <legend className={hideLabel ? 'visually-hidden' : 'segmented__legend'}>{label}</legend>
      <div className="segmented__options">
        {options.map((opt) => (
          <label key={opt.value} className="segmented__option">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={opt.value === value}
              onChange={() => onChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
