export default function SubjectsList({ subjects = [] }) {
  if (!subjects || subjects.length === 0) return <div>No hay materias</div>
  return (
    <div className="subjects-list">
      {subjects.map((s) => (
        <div className="subject" key={s.id}>
          <h4>{s.name}</h4>
          <p>Cuatrimestre: {s.quarter}</p>
        </div>
      ))}
    </div>
  )
}
