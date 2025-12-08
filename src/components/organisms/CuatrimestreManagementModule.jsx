import { useState, useEffect } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import * as cuatApi from '../../services/cuatrimestreService'
import * as progApi from '../../services/programasService'

export default function CuatrimestreManagementModule() {
  const [cuatrimestres, setCuatrimestres] = useState([])
  const [programas, setProgramas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingCuat, setEditingCuat] = useState(null)
  const [filter, setFilter] = useState('')
  const [formData, setFormData] = useState({
    numero: '',
    programa_id: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      setError('')
      const [cuatsData, progsData] = await Promise.all([
        cuatApi.getCuatrimestres(),
        progApi.getProgramas()
      ])
      setCuatrimestres(cuatsData)
      setProgramas(progsData)
    } catch (err) {
      setError(`Error cargando datos: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numero' || name === 'programa_id' ? parseInt(value) || '' : value
    }))
  }

  async function handleCreateCuatrimestre(e) {
    e.preventDefault()
    if (!formData.numero || !formData.programa_id) {
      setError('Todos los campos son requeridos')
      return
    }

    try {
      const newCuat = await cuatApi.createCuatrimestre(formData)
      setCuatrimestres((prev) => [...prev, newCuat])
      setStatus(`Cuatrimestre ${formData.numero} creado exitosamente`)
      setShowForm(false)
      setFormData({ numero: '', programa_id: '' })
    } catch (err) {
      setError(`Error creando cuatrimestre: ${err.message}`)
    }
  }

  async function handleUpdateCuatrimestre(e) {
    e.preventDefault()
    if (!formData.numero || !formData.programa_id) {
      setError('Todos los campos son requeridos')
      return
    }

    try {
      const updated = await cuatApi.updateCuatrimestre(editingCuat.id, formData)
      setCuatrimestres((prev) =>
        prev.map((c) => (c.id === editingCuat.id ? updated : c))
      )
      setStatus(`Cuatrimestre ${formData.numero} actualizado exitosamente`)
      setShowForm(false)
      setEditingCuat(null)
      setFormData({ numero: '', programa_id: '' })
    } catch (err) {
      setError(`Error actualizando cuatrimestre: ${err.message}`)
    }
  }

  async function handleDeleteCuatrimestre(cuatId) {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este cuatrimestre?')) return

    try {
      await cuatApi.deleteCuatrimestre(cuatId)
      setCuatrimestres((prev) => prev.filter((c) => c.id !== cuatId))
      setStatus('Cuatrimestre eliminado exitosamente')
    } catch (err) {
      setError(`Error eliminando cuatrimestre: ${err.message}`)
    }
  }

  function handleEdit(cuat) {
    setEditingCuat(cuat)
    setFormData({
      numero: cuat.numero,
      programa_id: cuat.programa_id
    })
    setShowForm(true)
  }

  function handleCancel() {
    setShowForm(false)
    setEditingCuat(null)
    setFormData({ numero: '', programa_id: '' })
  }

  const filtered = cuatrimestres.filter((c) =>
    c.programa?.toLowerCase().includes(filter.toLowerCase()) ||
    String(c.numero).includes(filter)
  )

  return (
    <section className="cuatrimestre-management-module">
      <h2>Gestión de Cuatrimestres</h2>

      {error && <div style={{ color: '#d32f2f', marginBottom: '1rem', padding: '1rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>{error}</div>}
      {status && <div style={{ color: '#388e3c', marginBottom: '1rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>{status}</div>}
      {loading && <div>Cargando cuatrimestres...</div>}

      {!loading && (
        <>
          <div style={{ marginBottom: '2rem' }}>
            <Button onClick={() => {
              setShowForm(!showForm)
              if (showForm) handleCancel()
            }}>
              {showForm ? 'Cancelar' : 'Crear Nuevo Cuatrimestre'}
            </Button>
          </div>

          {showForm && (
            <form onSubmit={editingCuat ? handleUpdateCuatrimestre : handleCreateCuatrimestre} style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fafafa' }}>
              <h3>{editingCuat ? 'Editar Cuatrimestre' : 'Crear Nuevo Cuatrimestre'}</h3>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                  <strong>Número de Cuatrimestre</strong>
                </label>
                <Input
                  name="numero"
                  type="number"
                  value={formData.numero}
                  onChange={handleInputChange}
                  placeholder="Ej: 1, 2, 3..."
                  min="1"
                  max="20"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                  <strong>Programa Académico</strong>
                </label>
                <select
                  name="programa_id"
                  value={formData.programa_id}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
                >
                  <option value="">-- Seleccione un programa --</option>
                  {programas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} ({p.numero_cuatrimestres} cuatrimestres)
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button type="submit">
                  {editingCuat ? 'Actualizar' : 'Crear'} Cuatrimestre
                </Button>
                <Button onClick={handleCancel} style={{ backgroundColor: '#999' }}>
                  Cancelar
                </Button>
              </div>
            </form>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Buscar por programa o número..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div className="cuatrimestres-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {filtered.length === 0 ? (
              <p>No hay cuatrimestres disponibles</p>
            ) : (
              filtered.map((cuat) => (
                <div
                  key={cuat.id}
                  style={{
                    padding: '1.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>
                      Cuatrimestre {cuat.numero}
                    </h3>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.95em' }}>
                      <strong>Programa:</strong> {cuat.programa}
                    </p>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.95em', color: '#666' }}>
                      <strong>ID:</strong> {cuat.id}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(cuat)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9em'
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCuatrimestre(cuat.id)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        backgroundColor: '#d32f2f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9em'
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <p><strong>Total de cuatrimestres:</strong> {cuatrimestres.length}</p>
            <p><strong>Mostrados:</strong> {filtered.length}</p>
          </div>
        </>
      )}
    </section>
  )
}
