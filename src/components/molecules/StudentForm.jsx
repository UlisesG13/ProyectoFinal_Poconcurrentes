import { useState, useEffect } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

export default function StudentForm({ onCreate, initialData }) {
  const [nombre, setNombre] = useState('')
  const [matricula, setMatricula] = useState('')
  const [cuatrimestre, setCuatrimestre] = useState('1')
  const [correo, setCorreo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '')
      setMatricula(initialData.matricula || '')
      setCuatrimestre(initialData.cuatrimestre || '1')
      setCorreo(initialData.correo || '')
    }
  }, [initialData])

  async function submit(e) {
    e.preventDefault()
    if (!nombre.trim() || !matricula.trim() || !correo.trim()) {
      setError('Todos los campos son requeridos')
      return
    }

    setLoading(true)
    setError('')

    try {
      await onCreate({
        nombre: nombre.trim(),
        matricula: matricula.trim(),
        cuatrimestre: Number(cuatrimestre),
        correo: correo.trim()
      })
      setNombre('')
      setMatricula('')
      setCuatrimestre('1')
      setCorreo('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="student-form" onSubmit={submit}>
      {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}

      <Input
        label="Nombre del Alumno"
        name="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ej: Juan Pérez"
      />
      <Input
        label="Matrícula"
        name="matricula"
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
        placeholder="Ej: M2024001"
      />
      <Input
        label="Email"
        name="correo"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Ej: juan@example.com"
      />
      <label className="input-group">
        <span className="input-label">Cuatrimestre</span>
        <select value={cuatrimestre} onChange={(e) => setCuatrimestre(e.target.value)}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : initialData ? 'Actualizar Alumno' : 'Crear Alumno'}
      </Button>
    </form>
  )
}
