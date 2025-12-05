import { useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

export default function TeacherForm({ onCreate }) {
  const [name, setName] = useState('')
  const [quarters, setQuarters] = useState('1')

  function submit(e) {
    e.preventDefault()
    if (!name) return
    onCreate({ name, quarters: [Number(quarters)] })
    setName('')
  }

  return (
    <form className="program-form" onSubmit={submit}>
      <Input label="Nombre del Docente" name="teacher" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Dr. García" />
      <label className="input-group">
        <span className="input-label">Cuatrimestre (impares: 1,3,5,7,9)</span>
        <select value={quarters} onChange={(e) => setQuarters(e.target.value)}>
          <option value="1">1</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="9">9</option>
        </select>
      </label>
      <Button type="submit">Crear Docente</Button>
    </form>
  )
}
