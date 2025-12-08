import { useEffect, useState } from 'react'
import StudentForm from '../molecules/StudentForm'
import StudentCard from '../molecules/StudentCard'
import * as alumnoApi from '../../services/studentService'
import Button from '../atoms/Button'

export default function StudentManagementModule() {
  const [students, setStudents] = useState([])
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [filterQuarter, setFilterQuarter] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  useEffect(() => {
    loadStudents()
  }, [])

  async function loadStudents() {
    try {
      setLoading(true)
      setError('')
      const data = await alumnoApi.getAlumnos()
      setStudents(data)
    } catch (err) {
      setError(`Error cargando alumnos: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateStudent(studentData) {
    try {
      const newStudent = await alumnoApi.createAlumno(studentData)
      setStudents((prev) => [...prev, newStudent])
      setStatus(`Alumno "${studentData.nombre}" creado exitosamente`)
      setShowForm(false)
      setEditingStudent(null)
    } catch (err) {
      setError(`Error creando alumno: ${err.message}`)
    }
  }

  async function handleUpdateStudent(studentData) {
    try {
      const updated = await alumnoApi.updateAlumno(editingStudent.id, studentData)
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? updated : s))
      )
      setStatus(`Alumno "${studentData.nombre}" actualizado exitosamente`)
      setShowForm(false)
      setEditingStudent(null)
    } catch (err) {
      setError(`Error actualizando alumno: ${err.message}`)
    }
  }

  async function handleDeleteStudent(studentId) {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este alumno?')) return

    try {
      await alumnoApi.deleteAlumno(studentId)
      setStudents((prev) => prev.filter((s) => s.id !== studentId))
      setStatus('Alumno eliminado exitosamente')
    } catch (err) {
      setError(`Error eliminando alumno: ${err.message}`)
    }
  }

  function handleEdit(student) {
    setEditingStudent(student)
    setShowForm(true)
  }

  let filtered = students.filter((s) =>
    s.nombre.toLowerCase().includes(filter.toLowerCase())
  )
  if (filterQuarter) {
    filtered = filtered.filter((s) => s.cuatrimestre === Number(filterQuarter))
  }

  return (
    <section className="student-management-module">
      <h2>Gestión de Estudiantes</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {status && <div style={{ color: 'green', marginBottom: '1rem' }}>{status}</div>}
      {loading && <div>Cargando alumnos...</div>}

      <div className="two-col">
        <div>
          <h3>
            {editingStudent ? 'Editar Estudiante' : 'Crear Nuevo Estudiante'}
          </h3>
          {showForm ? (
            <>
              <StudentForm
                onCreate={editingStudent ? handleUpdateStudent : handleCreateStudent}
                initialData={editingStudent}
              />
              <Button onClick={() => {
                setShowForm(false)
                setEditingStudent(null)
              }}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button onClick={() => setShowForm(true)}>
              Crear Nuevo Alumno
            </Button>
          )}
        </div>

        <div>
          <h3>Listado de Estudiantes ({filtered.length})</h3>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginBottom: '0.5rem', width: '100%', padding: '0.5rem' }}
          />
          <label className="input-group" style={{ marginBottom: '1rem' }}>
            <span className="input-label">Filtrar por cuatrimestre</span>
            <select value={filterQuarter} onChange={(e) => setFilterQuarter(e.target.value)}>
              <option value="">-- Todos --</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </label>

          <div className="students-list">
            {filtered.map((s) => (
              <StudentCard
                key={s.id}
                student={s}
                onDelete={handleDeleteStudent}
                onEdit={handleEdit}
              />
            ))}
          </div>
          {filtered.length === 0 && <p>No hay alumnos</p>}
        </div>
      </div>

      <div className="status">
        Total de alumnos: {students.length} | Mostrados: {filtered.length}
      </div>
    </section>
  )
}
