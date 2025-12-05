export default function TeacherCard({ teacher }) {
  return (
    <div className="card-item">
      <h4>{teacher.name}</h4>
      <p><strong>ID:</strong> {teacher.id}</p>
      <p><strong>Cuatrimestres:</strong> {teacher.quarters.join(', ')}</p>
    </div>
  )
}
