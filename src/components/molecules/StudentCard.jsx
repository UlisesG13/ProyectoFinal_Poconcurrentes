export default function StudentCard({ student }) {
  return (
    <div className="card-item">
      <h4>{student.name}</h4>
      <p><strong>Matrícula:</strong> {student.matricula}</p>
      <p><strong>Cuatrimestre:</strong> {student.quarter}</p>
    </div>
  )
}
