import { useEffect, useState } from 'react'
import GrupoCard from '../molecules/GrupoCard'
import * as grupoApi from '../../services/grupoService'
import * as asignaturaApi from '../../services/asignaturaService'
import * as docenteApi from '../../services/teacherService'
import * as cuatrimestreApi from '../../services/cuatrimestreService'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

export default function GroupManagementModule() {
  const [grupos, setGrupos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [selectedGrupo, setSelectedGrupo] = useState(null)
  const [students, setStudents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [asignaturas, setAsignaturas] = useState([])
  const [docentes, setDocentes] = useState([])
  const [cuatrimestres, setCuatrimestres] = useState([])
  const [formData, setFormData] = useState({
    nombre: '',
    asignatura_id: '',
    docente_id: '',
    cuatrimestre_id: '',
    capacidad: 0
  })

  useEffect(() => {
    loadGrupos()
    loadSelectData()
  }, [])

  async function loadGrupos() {
    try {
      setLoading(true)
      setError('')
      const data = await grupoApi.getGrupos()
      setGrupos(data)
    } catch (err) {
      setError(`Error cargando grupos: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  async function loadSelectData() {
    try {
      const [asignaturasData, docentesData, cuatrimestresData] = await Promise.all([
        asignaturaApi.getAsignaturas(),
        docenteApi.getDocentes(),
        cuatrimestreApi.getCuatrimestres()
      ])
      setAsignaturas(asignaturasData)
      setDocentes(docentesData)
      setCuatrimestres(cuatrimestresData)
    } catch (err) {
      setError(`Error cargando datos: ${err.message}`)
    }
  }

  async function handleDeleteGrupo(grupoId) {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este grupo?')) return

    try {
      await grupoApi.deleteGrupo(grupoId)
      setGrupos((prev) => prev.filter((g) => g.id !== grupoId))
      setStatus('Grupo eliminado exitosamente')
    } catch (err) {
      setError(`Error eliminando grupo: ${err.message}`)
    }
  }

  async function handleEditStudents(grupo) {
    try {
      setSelectedGrupo(grupo)
      const data = await grupoApi.getStudentsInGroup(grupo.id)
      setStudents(data)
    } catch (err) {
      setError(`Error cargando alumnos: ${err.message}`)
    }
  }

  async function handleCreateGrupo(e) {
    e.preventDefault()
    if (!formData.nombre.trim()) return

    try {
      const newGrupo = await grupoApi.createGrupo(formData)
      setGrupos((prev) => [...prev, newGrupo])
      setStatus('Grupo creado exitosamente')
      setShowForm(false)
      setFormData({
        nombre: '',
        asignatura_id: '',
        docente_id: '',
        cuatrimestre_id: '',
        capacidad: 0
      })
    } catch (err) {
      setError(`Error creando grupo: ${err.message}`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'capacidad' || name === 'asignatura_id' || name === 'docente_id' || name === 'cuatrimestre_id' ? parseInt(value) || 0 : value
    }))
  }

  return (
    <section className="group-management-module">
      <h2>Gestión de Grupos</h2>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {status && <div style={{ color: 'green', marginBottom: '1rem' }}>{status}</div>}
      {loading && <div>Cargando grupos...</div>}

      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Crear Nuevo Grupo'}
      </Button>

      {showForm && (
        <form onSubmit={handleCreateGrupo} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
          <div>
            <Input
              label="Nombre del Grupo"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del grupo"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Asignatura</strong>
            </label>
            <select
              name="asignatura_id"
              value={formData.asignatura_id}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="">-- Seleccione una asignatura --</option>
              {asignaturas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Docente</strong>
            </label>
            <select
              name="docente_id"
              value={formData.docente_id}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="">-- Seleccione un docente --</option>
              {docentes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Cuatrimestre</strong>
            </label>
            <select
              name="cuatrimestre_id"
              value={formData.cuatrimestre_id}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '0.5rem' }}
            >
              <option value="">-- Seleccione un cuatrimestre --</option>
              {cuatrimestres.map((c) => (
                <option key={c.id} value={c.id}>
                  Cuatrimestre {c.numero}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Input
              label="Capacidad"
              name="capacidad"
              type="number"
              value={formData.capacidad}
              onChange={handleInputChange}
              min="1"
            />
          </div>

          <Button type="submit">Crear Grupo</Button>
        </form>
      )}

      <div className="grupos-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        {grupos.length === 0 ? (
          <p>No hay grupos disponibles</p>
        ) : (
          grupos.map((grupo) => (
            <GrupoCard
              key={grupo.id}
              grupo={grupo}
              onDelete={handleDeleteGrupo}
              onEditStudents={handleEditStudents}
            />
          ))
        )}
      </div>

      {selectedGrupo && (
        <div className="students-modal" style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
          <h3>Alumnos en {selectedGrupo.nombre}</h3>
          <Button onClick={() => setSelectedGrupo(null)}>Cerrar</Button>

          <div className="students-list" style={{ marginTop: '1rem' }}>
            {students.length === 0 ? (
              <p>No hay alumnos en este grupo</p>
            ) : (
              students.map((student) => (
                <div key={student.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: 0 }}><strong>{student.nombre}</strong> ({student.matricula})</p>
                    <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>Email: {student.correo}</p>
                  </div>
                  <Button
                    onClick={async () => {
                      try {
                        await grupoApi.removeStudentFromGroup(selectedGrupo.id, student.id)
                        setStudents((prev) => prev.filter((s) => s.id !== student.id))
                        setStatus('Alumno removido del grupo')
                      } catch (err) {
                        setError(`Error removiendo alumno: ${err.message}`)
                      }
                    }}
                  >
                    Remover
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  )
}
