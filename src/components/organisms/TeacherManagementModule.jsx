import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import TeacherForm from '../molecules/TeacherForm'
import TeacherCard from '../molecules/TeacherCard'
import * as docenteApi from '../../services/teacherService'

export default function TeacherManagementModule() {
  const [teachers, setTeachers] = useState([])
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)

  useEffect(() => {
    loadTeachers()
  }, [])

  async function loadTeachers() {
    try {
      setLoading(true)
      setError('')
      const data = await docenteApi.getDocentes()
      setTeachers(data)
    } catch (err) {
      setError(`Error cargando docentes: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateTeacher(teacherData) {
    try {
      const newTeacher = await docenteApi.createDocente(teacherData)
      setTeachers((prev) => [...prev, newTeacher])
      setStatus(`Docente "${teacherData.nombre}" creado exitosamente`)
      setShowForm(false)
      setEditingTeacher(null)
    } catch (err) {
      setError(`Error creando docente: ${err.message}`)
    }
  }

  async function handleUpdateTeacher(teacherData) {
    try {
      const updated = await docenteApi.updateDocente(editingTeacher.id, teacherData)
      setTeachers((prev) =>
        prev.map((t) => (t.id === editingTeacher.id ? updated : t))
      )
      setStatus(`Docente "${teacherData.nombre}" actualizado exitosamente`)
      setShowForm(false)
      setEditingTeacher(null)
    } catch (err) {
      setError(`Error actualizando docente: ${err.message}`)
    }
  }

  async function handleDeleteTeacher(teacherId) {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este docente?')) return

    try {
      await docenteApi.deleteDocente(teacherId)
      setTeachers((prev) => prev.filter((t) => t.id !== teacherId))
      setStatus('Docente eliminado exitosamente')
    } catch (err) {
      setError(`Error eliminando docente: ${err.message}`)
    }
  }

  function handleEdit(teacher) {
    setEditingTeacher(teacher)
    setShowForm(true)
  }

  const filtered = teachers.filter((t) =>
    t.nombre.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <section className="teacher-management-module">
      <h2>Gestión de Docentes</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {status && <div style={{ color: 'green', marginBottom: '1rem' }}>{status}</div>}
      {loading && <div>Cargando docentes...</div>}

      <div className="two-col">
        <div>
          <h3>
            {editingTeacher ? 'Editar Docente' : 'Crear Nuevo Docente'}
          </h3>
          {showForm ? (
            <>
              <TeacherForm
                onCreate={editingTeacher ? handleUpdateTeacher : handleCreateTeacher}
                initialData={editingTeacher}
              />
              <Button onClick={() => {
                setShowForm(false)
                setEditingTeacher(null)
              }}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowForm(true)}>
              Crear Nuevo Docente
            </Button>
          )}
        </div>

        <div>
          <h3>Listado de Docentes ({filtered.length})</h3>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }}
          />
          <div className="teachers-list">
            {filtered.map((t) => (
              <TeacherCard
                key={t.id}
                teacher={t}
                onDelete={handleDeleteTeacher}
                onEdit={handleEdit}
              />
            ))}
          </div>
          {filtered.length === 0 && <p>No hay docentes</p>}
        </div>
      </div>

      <div className="status">Total de docentes: {teachers.length} | Mostrados: {filtered.length}</div>
    </section>
  )
}
