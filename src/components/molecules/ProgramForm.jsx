import { useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

export default function ProgramForm({ onCreate }) {
  const [name, setName] = useState('')
  const [quarters, setQuarters] = useState(10)

  function submit(e) {
    e.preventDefault()
    if (!name) return
    onCreate({ name, quarters: Number(quarters) })
    setName('')
  }

  return (
    <form className="program-form" onSubmit={submit}>
      <Input label="Programa" name="program" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del programa" />
      <Input label="Cuatrimestres" name="quarters" value={quarters} onChange={(e) => setQuarters(e.target.value)} type="number" />
      <Button type="submit">Crear Programa</Button>
    </form>
  )
}
