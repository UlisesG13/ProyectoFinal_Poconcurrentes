import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import * as progApi from '../../services/programasService'
import * as cuatApi from '../../services/cuatrimestreService'

export default function PlatformConnectionModule() {
  const [programs, setPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [quarters, setQuarters] = useState([])
  const [selectedQuarter, setSelectedQuarter] = useState('')
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

  return (
    <section className="platform-connection-module">
      <h2>Conexión con Plataforma Virtual</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {status && <div style={{ color: 'green', marginBottom: '1rem' }}>{status}</div>}
      {loading && <div>Cargando programas...</div>}

      <div className="connection-section" style={{ padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <div>
          <h3>Información de Conexión</h3>

          {!loading && (
            <>
              <label style={{ display: 'block', marginBottom: '1rem' }}>
                <strong>Selecciona un Programa</strong>
                <select
                  value={selectedProgram?.id || ''}
                  onChange={(e) => {
                    const selected = programs.find((p) => String(p.id) === e.target.value)
                    setSelectedProgram(selected || null)
                  }}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                >
                  <option value="">-- Seleccione --</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </label>

              {selectedProgram && (
                <>
                  <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '4px' }}>
                    <p><strong>Programa:</strong> {selectedProgram.nombre}</p>
                    <p><strong>Cuatrimestres:</strong> {selectedProgram.numero_cuatrimestres}</p>
                  </div>

                  {quarters.length > 0 && (
                    <div>
                      <label style={{ display: 'block', marginBottom: '1rem' }}>
                        <strong>Selecciona un Cuatrimestre</strong>
                        <select
                          value={selectedQuarter}
                          onChange={(e) => setSelectedQuarter(e.target.value)}
                          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        >
                          <option value="">-- Seleccione --</option>
                          {quarters.map((c) => (
                            <option key={c.id} value={c.id}>
                              Cuatrimestre {c.numero}
                            </option>
                          ))}
                        </select>
                      </label>

                      {selectedQuarter && (
                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
                          <p><strong>Cuatrimestre seleccionado:</strong> {quarters.find(c => String(c.id) === selectedQuarter)?.numero}</p>
                          <p style={{ fontSize: '0.9em', color: '#666', marginTop: '0.5rem' }}>
                            En esta vista podrás verificar y sincronizar las asignaturas y grupos con la plataforma virtual de Moodle.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="info-section" style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h3>Información de Sincronización</h3>
        <p>Esta sección permite gestionar la conexión entre el sistema académico y la plataforma virtual Moodle.</p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Visualizar programas académicos disponibles</li>
          <li>Consultar cuatrimestres y sus asignaturas</li>
          <li>Sincronizar grupos y alumnos con Moodle</li>
          <li>Verificar el estado de los cursos en la plataforma</li>
        </ul>
      </div>

      {status && <div className="status" style={{ marginTop: '1rem' }}>{status}</div>}
    </section>
  )
}
