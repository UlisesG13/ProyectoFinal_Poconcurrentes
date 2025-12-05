import { useEffect, useState } from 'react'
import * as api from '../../services/mockApi'

export default function DashboardModule() {
  const [stats, setStats] = useState({
    programs: 0,
    quarters: 0,
    subjects: 0,
    teachers: 0,
    students: 0,
    groups: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const programs = await api.getPrograms()
        const teachers = await api.getTeachers()
        
        setStats({
          programs: programs.length,
          quarters: programs.length > 0 ? programs[0].quarters : 0,
          subjects: 70, // Datos precargados
          teachers: teachers.length,
          students: 875, // Datos precargados
          groups: 35, // Datos precargados
        })
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [])

  return (
    <section className="program-module">
      <h2>Dashboard - Resumen de la Plataforma</h2>

      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.programs}</div>
            <div className="stat-label">Programas</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{stats.quarters}</div>
            <div className="stat-label">Cuatrimestres</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{stats.subjects}</div>
            <div className="stat-label">Asignaturas</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{stats.teachers}</div>
            <div className="stat-label">Docentes</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{stats.students}</div>
            <div className="stat-label">Estudiantes</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">{stats.groups}</div>
            <div className="stat-label">Grupos</div>
          </div>
        </div>
      )}

      <div className="info-section" style={{ marginTop: '2rem' }}>
        <h3>Información del Sistema</h3>
        <ul>
          <li>Sistema de mock integrado con datos precargados</li>
          <li>Promesas simuladas para operaciones asincrónicas</li>
          <li>1 programa de estudio con {stats.quarters} cuatrimestres</li>
          <li>{stats.subjects} asignaturas (7 por cuatrimestre)</li>
          <li>{stats.teachers} docentes asignados a cuatrimestres impares (1,3,5,7,9)</li>
          <li>{stats.groups} grupos con 25 alumnos cada uno</li>
          <li>{stats.students} estudiantes matriculados</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>Operaciones Disponibles</h3>
        <p>Usa las secciones de navegación para:</p>
        <ul>
          <li><strong>Plataforma:</strong> Conectar con Moodle (verificar/crear cursos, ver grupos)</li>
          <li><strong>Docentes:</strong> Crear y gestionar profesores</li>
          <li><strong>Estudiantes:</strong> Crear y gestionar alumnos</li>
          <li><strong>Grupos:</strong> Ver y crear grupos de cursos</li>
        </ul>
      </div>
    </section>
  )
}
