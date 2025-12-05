export default function Input({ label, value, onChange, name, type = 'text', placeholder = '' }) {
  return (
    <label className="input-group">
      <span className="input-label">{label}</span>
      <input name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} />
    </label>
  )
}
