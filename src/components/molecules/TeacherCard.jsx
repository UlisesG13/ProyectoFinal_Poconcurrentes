export default function TeacherCard({ teacher, onDelete, onEdit }) {
  return (
    <div style={{
      padding: '1.5rem',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      marginBottom: '1rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'}  
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'}
    >
      <div style={{ borderBottom: '3px solid #d84315', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
        <h3 style={{ margin: '0', color: '#d84315', fontSize: '1.1em' }}>👨‍🏫 {teacher.nombre}</h3>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ padding: '0.75rem', backgroundColor: '#ffe0b2', borderRadius: '4px' }}>
          <p style={{ margin: '0.25rem 0', fontSize: '0.95em' }}>
            <span style={{ color: '#666' }}>📧 Email:</span>
            <span style={{ marginLeft: '0.5rem', fontWeight: '500', color: '#333', wordBreak: 'break-all' }}>{teacher.correo}</span>
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onEdit(teacher)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#d84315',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.95em',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#bf360c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#d84315'}
        >
          ✏️ Editar
        </button>
        <button 
          onClick={() => onDelete(teacher.id)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#d32f2f',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.95em',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#b71c1c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#d32f2f'}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  )
}
