import { useEffect, useState } from 'react'
import ProgramForm from '../molecules/ProgramForm'
import QuarterSelect from '../molecules/QuarterSelect'
import SubjectsList from '../molecules/SubjectsList'
import * as api from '../../services/mockApi'
import Button from '../atoms/Button'

export default function ProgramModule() {
  const [programs, setPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [quarters, setQuarters] = useState([])
  const [selectedQuarter, setSelectedQuarter] = useState('')
  const [subjects, setSubjects] = useState([])
  const [status, setStatus] = useState('')

  useEffect(() => {
    api.getPrograms().then(setPrograms)
  }, [])

  useEffect(() => {
    if (!selectedProgram) return
    api.getQuarters(selectedProgram.id).then(setQuarters)
  }, [selectedProgram])

  useEffect(() => {
    if (!selectedQuarter) return
    api.getSubjectsForQuarter(selectedProgram?.id, selectedQuarter).then(setSubjects)
  }, [selectedQuarter, selectedProgram])

  function handleCreateProgram(p) {
    api.createProgram(p).then((newP) => {
      setPrograms((s) => [...s, newP])
      setStatus('Programa creado')
    })
  }

  async function handleCheckCourse(subject) {
    setStatus('Verificando...')
    const exists = await api.checkCourseExists(subject.id)
    setStatus(exists ? 'Curso existe en la plataforma' : 'Curso no existe')
  }

  return (
    <section className="program-module">
      <h2>Gestión de Programas y Cursos</h2>
      <div className="two-col">
        <div>
          <ProgramForm onCreate={handleCreateProgram} />
          <label>
            Programa
            <select onChange={(e) => setSelectedProgram(programs.find(p=>p.id===e.target.value))}>
              <option value="">-- Seleccione --</option>
              {programs.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <QuarterSelect quarters={quarters} value={selectedQuarter} onChange={setSelectedQuarter} />
        </div>

        <div>
          <h3>Materias</h3>
          <SubjectsList subjects={subjects} />
          {subjects.map((s) => (
            <div key={s.id} className="subject-actions">
              <Button onClick={() => handleCheckCourse(s)}>Verificar si existe</Button>
            </div>
          ))}
        </div>
      </div>
      <div className="status">{status}</div>
    </section>
  )
}
