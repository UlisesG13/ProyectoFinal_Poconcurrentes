import { useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import { createPrograma } from '../../services/programasService'
export default function ProgramForm({ onCreate }) {
  const [name, setName] = useState('')
  const [quarters, setQuarters] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!name.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      const programData = {
        name: name.trim(),
        quarters: parseInt(quarters, 10)
      }
      const newPrograma = await createPrograma(programData)
      onCreate(newPrograma)
      setName('')
      setQuarters(10)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="program-form" onSubmit={submit}>
      <Input label="Programa" name="program" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del programa" />
      <Input label="Cuatrimestres" name="quarters" value={quarters} onChange={(e) => setQuarters(parseInt(e.target.value, 10) || 0)} type="number" min="1" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Programa'}
      </Button>
    </form>
  )
}
