export default function GrupoCard({ grupo, onDelete, onEditStudents }) {
  return (
    <div className="grupo-card">
      <h4>{grupo.nombre}</h4>
      <div className="grupo-info">
        <p><strong>Asignatura:</strong> {grupo.asignatura}</p>
        <p><strong>Docente:</strong> {grupo.docente}</p>
        <p><strong>Cuatrimestre:</strong> {grupo.cuatrimestre_id}</p>
        <p><strong>Capacidad:</strong> {grupo.capacidad}</p>
      </div>
      <div className="grupo-actions">
        <button onClick={() => onEditStudents(grupo)}>Gestionar Alumnos</button>
        <button onClick={() => onDelete(grupo.id)} className="btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  );
}
