export default function GroupCard({ group }) {
  return (
    <div className="card-item">
      <h4>{group.name}</h4>
      <p><strong>Materia:</strong> {group.subjectName}</p>
      <p><strong>Docente:</strong> {group.teacherName}</p>
      <p><strong>Alumnos:</strong> {group.students.length}</p>
    </div>
  )
}
