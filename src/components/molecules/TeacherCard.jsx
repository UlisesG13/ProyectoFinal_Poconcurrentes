export default function TeacherCard({ teacher, onDelete, onEdit }) {
  return (
    <div className="teacher-card" style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '1rem' }}>
      <h4>{teacher.nombre}</h4>
      <div className="teacher-info">
        <p><strong>Email:</strong> {teacher.correo}</p>
      </div>
      <div className="teacher-actions">
        <button onClick={() => onEdit(teacher)} style={{ marginRight: '0.5rem' }}>
          Editar
        </button>
        <button onClick={() => onDelete(teacher.id)} className="btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  )
}
