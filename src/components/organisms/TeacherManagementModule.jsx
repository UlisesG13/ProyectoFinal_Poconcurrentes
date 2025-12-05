import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import TeacherForm from '../molecules/TeacherForm'
import TeacherCard from '../molecules/TeacherCard'
import * as api from '../../services/mockApi'

export default function TeacherManagementModule() {
  const [teachers, setTeachers] = useState([])
  const [status, setStatus] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    api.getTeachers().then(setTeachers)
  }, [])

  async function handleCreateTeacher(teacher) {
    try {
      const newTeacher = await api.createUserTeacher(teacher)
      setTeachers((prev) => [...prev, newTeacher])
      setStatus(` Docente "${teacher.name}" creado exitosamente`)
    } catch (e) {
      setStatus(' Error al crear docente')
    }
  }

  const filtered = teachers.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <section className="program-module">
      <h2>Gestión de Docentes</h2>

      <div className="two-col">
        <div>
          <h3>Crear Nuevo Docente</h3>
          <TeacherForm onCreate={handleCreateTeacher} />
        </div>

        <div>
          <h3>Listado de Docentes</h3>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginBottom: '1rem', width: '100%' }}
          />
          <div className="cards-grid">
            {filtered.map((t) => (
              <TeacherCard key={t.id} teacher={t} />
            ))}
          </div>
          {filtered.length === 0 && <p>No hay docentes</p>}
        </div>
      </div>

      <div className="status">Total de docentes: {teachers.length} | {status}</div>
    </section>
  )
}
