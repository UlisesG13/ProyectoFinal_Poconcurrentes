import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import QuarterSelect from '../molecules/QuarterSelect'
import SubjectsList from '../molecules/SubjectsList'
import * as api from '../../services/mockApi'

export default function PlatformConnectionModule() {
  const [programs, setPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [quarters, setQuarters] = useState([])
  const [selectedQuarter, setSelectedQuarter] = useState('')
  const [subjects, setSubjects] = useState([])
  const [groups, setGroups] = useState([])
  const [status, setStatus] = useState('')
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.getPrograms().then(setPrograms)
  }, [])

  useEffect(() => {
    if (!selectedProgram) return
    api.getQuarters(selectedProgram.id).then(setQuarters)
  }, [selectedProgram])

  useEffect(() => {
    if (!selectedQuarter) {
      setSubjects([])
      return
    }
    api.getSubjectsForQuarter(selectedProgram?.id, selectedQuarter).then(setSubjects)
  }, [selectedQuarter, selectedProgram])

  async function handleCheckCourseExists(subject) {
    setLoading(true)
    setStatus('Verificando...')
    try {
      const exists = await api.checkCourseExists(subject.id)
      setStatus(exists ? ` Curso "${subject.name}" existe en plataforma` : ` Curso "${subject.name}" NO existe`)
    } catch (e) {
      setStatus(' Error al verificar')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateCourse(subject) {
    setLoading(true)
    setStatus('Creando curso...')
    try {
      await api.createCourse(subject)
      setStatus(` Curso "${subject.name}" creado exitosamente`)
    } catch (e) {
      setStatus(' Error al crear curso')
    } finally {
      setLoading(false)
    }
  }

  async function handleViewGroups(subject) {
    setLoading(true)
    setStatus('Cargando grupos...')
    try {
      const grps = await api.getGroupsForSubject(subject.id)
      setGroups(grps)
      setSelectedSubject(subject)
      setStatus(` Se encontraron ${grps.length} grupos`)
    } catch (e) {
      setStatus(' Error al cargar grupos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="program-module">
      <h2>Conexión con Plataforma Virtual</h2>
      
      <div className="connection-section">
        <div className="left-panel">
          <h3>Seleccionar Programa y Cuatrimestre</h3>
          
          <label className="input-group">
            <span className="input-label">Programa</span>
            <select onChange={(e) => setSelectedProgram(programs.find(p => p.id === e.target.value))} disabled={programs.length === 0}>
              <option value="">-- Seleccione --</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <QuarterSelect quarters={quarters} value={selectedQuarter} onChange={setSelectedQuarter} />
        </div>

        <div className="right-panel">
          <h3>Materias del Cuatrimestre</h3>
          <SubjectsList subjects={subjects} />

          {subjects.length > 0 && (
            <div className="actions-grid">
              {subjects.map((subject) => (
                <div key={subject.id} className="subject-actions-group">
                  <div className="subject-title">{subject.name}</div>
                  <Button onClick={() => handleCheckCourseExists(subject)} disabled={loading}>
                    ✓ Verificar
                  </Button>
                  <Button onClick={() => handleCreateCourse(subject)} disabled={loading}>
                    + Crear
                  </Button>
                  <Button onClick={() => handleViewGroups(subject)} disabled={loading}>
                    👥 Grupos
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedSubject && groups.length > 0 && (
        <div className="groups-section">
          <h3>Grupos de {selectedSubject.name}</h3>
          <div className="groups-grid">
            {groups.map((g) => (
              <div key={g.id} className="group-card">
                <h4>{g.name}</h4>
                <p><strong>Docente:</strong> {g.teacherName}</p>
                <p><strong>Alumnos:</strong> {g.students.length}/25</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="status">{status}</div>
    </section>
  )
}
