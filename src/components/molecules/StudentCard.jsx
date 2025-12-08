export default function StudentCard({ student, onDelete, onEdit }) {
  return (
    <div className="student-card" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem' }}>
      <h4>{student.nombre}</h4>
      <div className="student-info">
        <p><strong>Matrícula:</strong> {student.matricula}</p>
        <p><strong>Cuatrimestre:</strong> {student.cuatrimestre}</p>
        <p><strong>Email:</strong> {student.correo}</p>
      </div>
      <div className="student-actions">
        <button onClick={() => onEdit(student)} style={{ marginRight: '0.5rem' }}>
          Editar
        </button>
        <button onClick={() => onDelete(student.id)} className="btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  )
}
