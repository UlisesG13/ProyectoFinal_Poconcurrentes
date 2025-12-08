import { useState, useEffect } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

export default function TeacherForm({ onCreate, initialData }) {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '')
      setCorreo(initialData.correo || '')
    }
  }, [initialData])

  async function submit(e) {
    e.preventDefault()
    if (!nombre.trim() || !correo.trim()) {
      setError('Todos los campos son requeridos')
      return
    }

    setLoading(true)
    setError('')

    try {
      await onCreate({
        nombre: nombre.trim(),
        correo: correo.trim()
      })
      setNombre('')
      setCorreo('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="teacher-form" onSubmit={submit}>
      {error && <div style={{ color: 'red', marginBottom: '0.5rem' }}>{error}</div>}

      <Input
        label="Nombre del Docente"
        name="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ej: Dr. Juan García"
      />
      <Input
        label="Email"
        name="correo"
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Ej: juan@example.com"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : initialData ? 'Actualizar Docente' : 'Crear Docente'}
      </Button>
    </form>
  )
}
