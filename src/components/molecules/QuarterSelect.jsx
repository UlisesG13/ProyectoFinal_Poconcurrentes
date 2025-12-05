export default function QuarterSelect({ quarters = [], value, onChange }) {
  return (
    <label className="select-group">
      <span className="input-label">Cuatrimestre</span>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        <option value="">-- Seleccione --</option>
        {quarters.map((q) => (
          <option key={q.number} value={q.number}>
            {q.number}
          </option>
        ))}
      </select>
    </label>
  )
}
