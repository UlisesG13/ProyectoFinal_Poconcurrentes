import { useEffect, useState } from 'react'
import ProgramForm from '../molecules/ProgramForm'
import QuarterSelect from '../molecules/QuarterSelect'
import SubjectsList from '../molecules/SubjectsList'
import * as progApi from '../../services/programasService'
import * as cuatApi from '../../services/cuatrimestreService'
import Button from '../atoms/Button'

export default function ProgramModule() {
  const [programs, setPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [quarters, setQuarters] = useState([])
  const [selectedQuarter, setSelectedQuarter] = useState('')
  const [subjects, setSubjects] = useState([])
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPrograms()
  }, [])

  async function loadPrograms() {
    try {
      setLoading(true)
      setError('')
      const data = await progApi.getProgramas()
      setPrograms(data)
    } catch (err) {
      setError(`Error cargando programas: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!selectedProgram) {
      setQuarters([])
      return
    }
    loadQuartersByProgram(selectedProgram.id)
  }, [selectedProgram])

  async function loadQuartersByProgram(programaId) {
    try {
      const data = await cuatApi.getCuatrimestresByPrograma(programaId)
      setQuarters(data)
    } catch (err) {
      setError(`Error cargando cuatrimestres: ${err.message}`)
      setQuarters([])
    }
  }

  useEffect(() => {
    if (!selectedQuarter) return
    // Aquí luego pondrás tu servicio real de asignaturas
    // getSubjectsForQuarter(selectedQuarter)
  }, [selectedQuarter])

  function handleCreateProgram(newP) {
    setPrograms((prev) => [...prev, newP])
    setStatus('Programa creado')
  }

  async function handleCheckCourse(subject) {
    setStatus('Verificando...')
    // Aquí luego integrarás el check real
    setStatus('Sin implementación aún')
  }

  return (
    <section className="program-module">
      <h2>Gestión de Programas y Cursos</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {loading && <div>Cargando programas...</div>}

      <div className="two-col">
        <div>
          <ProgramForm onCreate={handleCreateProgram} />

          <label>
            Programa
            <select
              value={selectedProgram?.id || ''}
              onChange={(e) => {
                const selected = programs.find((p) => String(p.id) === e.target.value)
                setSelectedProgram(selected || null)
              }}
            >
              <option value="">-- Seleccione --</option>
              {programs.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </label>

          <QuarterSelect
            quarters={quarters}
            value={selectedQuarter}
            onChange={setSelectedQuarter}
          />
        </div>

        <div>
          <h3>Materias</h3>
          <SubjectsList subjects={subjects} />

          {subjects.map((s) => (
            <div key={s.id} className="subject-actions">
              <Button onClick={() => handleCheckCourse(s)}>
                Verificar si existe
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="status">{status}</div>
    </section>
  )
}
