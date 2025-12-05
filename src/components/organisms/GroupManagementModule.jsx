import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import GroupCard from '../molecules/GroupCard'
import * as api from '../../services/mockApi'

export default function GroupManagementModule() {
  const [groups, setGroups] = useState([])
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.getPrograms().then(() => {
      // Los grupos ya están en el mock y listos para cargarlos
      loadAllGroups()
    })
  }, [])

  useEffect(() => {
    api.getPrograms().then((progs) => {
      if (progs.length > 0) {
        api.getSubjectsForQuarter(progs[0].id, 1).then(setSubjects)
      }
    })
  }, [])

  function loadAllGroups() {
    // En un mock real, ya esto vendria de la api (negro metele pata)
    setStatus('Cargando grupos...')
  }

  async function handleViewGroupsBySubject(subjectId) {
    if (!subjectId) return
    setLoading(true)
    try {
      const grps = await api.getGroupsForSubject(subjectId)
      setGroups(grps)
      setStatus(` Se encontraron ${grps.length} grupos`)
    } catch (e) {
      setStatus(' Error al cargar grupos')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateGroup() {
    setLoading(true)
    setStatus('Creando grupo...')
    try {
      // eto e simuñao pa ver q rosqui
      await new Promise((res) => setTimeout(res, 500))
      setStatus(' Grupo creado exitosamente')
    } catch (e) {
      setStatus(' Error al crear grupo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="program-module">
      <h2>Gestión de Grupos</h2>

      <div className="two-col">
        <div>
          <h3>Opciones</h3>
          <label className="input-group">
            <span className="input-label">Seleccionar Materia</span>
            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
              <option value="">-- Seleccione --</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <Button onClick={() => handleViewGroupsBySubject(selectedSubject)} disabled={loading || !selectedSubject}>
            Ver Grupos
          </Button>
          <Button onClick={handleCreateGroup} disabled={loading} style={{ marginTop: '0.5rem' }}>
            Crear Nuevo Grupo
          </Button>
        </div>

        <div>
          <h3>Grupos Disponibles</h3>
          <div className="cards-grid">
            {groups.map((g) => (
              <GroupCard key={g.id} group={g} />
            ))}
          </div>
          {groups.length === 0 && <p>Selecciona una materia para ver sus grupos</p>}
        </div>
      </div>

      <div className="status">Total de grupos: {groups.length} | {status}</div>
    </section>
  )
}
