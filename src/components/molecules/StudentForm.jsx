import { useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

export default function StudentForm({ onCreate }) {
  const [name, setName] = useState('')
  const [matricula, setMatricula] = useState('')
  const [quarter, setQuarter] = useState('1')

  function submit(e) {
    e.preventDefault()
    if (!name || !matricula) return
    onCreate({ name, matricula, quarter: Number(quarter) })
    setName('')
    setMatricula('')
  }

  return (
    <form className="program-form" onSubmit={submit}>
      <Input label="Nombre del Estudiante" name="student" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Juan Pérez" />
      <Input label="Matrícula" name="matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} placeholder="Ej: M2024001" />
      <label className="input-group">
        <span className="input-label">Cuatrimestre</span>
        <select value={quarter} onChange={(e) => setQuarter(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit">Crear Estudiante</Button>
    </form>
  )
}
