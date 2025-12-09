export default function StudentCard({ student, onDelete, onEdit }) {
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
      <div style={{ borderBottom: '3px solid #7b1fa2', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
        <h3 style={{ margin: '0', color: '#7b1fa2', fontSize: '1.1em' }}>👤 {student.nombre}</h3>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.75rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0.25rem 0', fontSize: '0.95em' }}>
            <span style={{ color: '#666' }}>🆔 Matrícula:</span>
            <span style={{ marginLeft: '0.5rem', fontWeight: '500', color: '#333', fontFamily: 'monospace' }}>{student.matricula}</span>
          </p>
        </div>
        
        <div style={{ marginBottom: '0.75rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0.25rem 0', fontSize: '0.95em' }}>
            <span style={{ color: '#666' }}>📅 Cuatrimestre:</span>
            <span style={{ marginLeft: '0.5rem', fontWeight: '500', color: '#333' }}>{student.cuatrimestre}</span>
          </p>
        </div>
        
        <div style={{ padding: '0.75rem', backgroundColor: '#f3e5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0.25rem 0', fontSize: '0.95em' }}>
            <span style={{ color: '#666' }}>📧 Email:</span>
            <span style={{ marginLeft: '0.5rem', fontWeight: '500', color: '#333', wordBreak: 'break-all' }}>{student.correo}</span>
          </p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onEdit(student)}
          style={{
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#7b1fa2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.95em',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#6a1b9a'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#7b1fa2'}
        >
          ✏️ Editar
        </button>
        <button 
          onClick={() => onDelete(student.id)}
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
