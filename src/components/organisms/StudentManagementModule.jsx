import { useEffect, useState } from 'react'
import StudentForm from '../molecules/StudentForm'
import StudentCard from '../molecules/StudentCard'
import * as api from '../../services/mockApi'

export default function StudentManagementModule() {
  const [students, setStudents] = useState([])
  const [status, setStatus] = useState('')
  const [filter, setFilter] = useState('')
  const [filterQuarter, setFilterQuarter] = useState('')

  useEffect(() => {
    // Cargar estudiantes 
    api.getPrograms().then(() => {
      // Los estudiantes ya están en el mock
    })
  }, [])

  function handleCreateStudent(student) {
    try {
      const newStudent = { id: `stu${Date.now()}`, ...student }
      setStudents((prev) => [...prev, newStudent])
      setStatus(` Estudiante "${student.name}" creado exitosamente`)
    } catch (e) {
      setStatus(' Error al crear estudiante')
    }
  }

  let filtered = students.filter((s) => s.name.toLowerCase().includes(filter.toLowerCase()))
  if (filterQuarter) filtered = filtered.filter((s) => s.quarter === Number(filterQuarter))

  return (
    <section className="program-module">
      <h2>Gestión de Estudiantes</h2>

      <div className="two-col">
        <div>
          <h3>Crear Nuevo Estudiante</h3>
          <StudentForm onCreate={handleCreateStudent} />
        </div>

        <div>
          <h3>Listado de Estudiantes</h3>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginBottom: '0.5rem', width: '100%' }}
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

          <div className="cards-grid">
            {filtered.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>
          {filtered.length === 0 && <p>No hay estudiantes</p>}
        </div>
      </div>

      <div className="status">Total de estudiantes: {students.length} | {status}</div>
    </section>
  )
}
