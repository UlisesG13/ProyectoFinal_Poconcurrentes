import { useEffect, useState } from 'react'
import Button from '../atoms/Button'
import * as grupoApi from '../../services/grupoService'
import * as syncApi from '../../services/syncService'

export default function SyncModule() {
  const [grupos, setGrupos] = useState([])
  const [selectedGrupo, setSelectedGrupo] = useState('')
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [result, setResult] = useState(null)
  const [createIfMissing, setCreateIfMissing] = useState(false)
  const [concurrencyLimit, setConcurrencyLimit] = useState(5)

  useEffect(() => {
    loadGrupos()
  }, [])

  async function loadGrupos() {
    try {
      setLoading(true)
      setError('')
      const data = await grupoApi.getGrupos()
      setGrupos(data)
    } catch (err) {
      setError(`Error cargando grupos: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  async function handleSync() {
    if (!selectedGrupo) {
      setError('Por favor selecciona un grupo')
      return
    }

    setSyncing(true)
    setError('')
    setStatus('Sincronizando...')
    setResult(null)

    try {
      const syncResult = await syncApi.syncGroup(
        parseInt(selectedGrupo),
        createIfMissing,
        concurrencyLimit
      )
      setResult(syncResult)
      setStatus('Sincronización completada exitosamente')
    } catch (err) {
      setError(`Error en sincronización: ${err.message}`)
      setStatus('')
    } finally {
      setSyncing(false)
    }
  }

  return (
    <section className="sync-module" style={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h2>Sincronización con Moodle</h2>

      {error && <div style={{ color: '#d32f2f', marginBottom: '1rem', padding: '1rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>{error}</div>}
      {status && <div style={{ color: '#388e3c', marginBottom: '1rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>{status}</div>}

      {loading ? (
        <div>Cargando grupos...</div>
      ) : (
        <>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Selecciona el Grupo a Sincronizar</strong>
            </label>
            <select
              value={selectedGrupo}
              onChange={(e) => setSelectedGrupo(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
            >
              <option value="">-- Seleccione un grupo --</option>
              {grupos.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre} - {g.asignatura} ({g.docente})
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <input
                type="checkbox"
                checked={createIfMissing}
                onChange={(e) => setCreateIfMissing(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              <span>Crear grupo en Moodle si no existe</span>
            </label>

            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              <strong>Límite de Concurrencia:</strong>
            </label>
            <input
              type="number"
              value={concurrencyLimit}
              onChange={(e) => setConcurrencyLimit(parseInt(e.target.value) || 5)}
              min="1"
              max="20"
              style={{ width: '100%', padding: '0.5rem' }}
            />
            <small style={{ color: '#666' }}>Número máximo de operaciones simultáneas</small>
          </div>

          <Button
            onClick={handleSync}
            disabled={syncing || !selectedGrupo}
            style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
          >
            {syncing ? 'Sincronizando...' : 'Iniciar Sincronización'}
          </Button>

          {result && (
            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px', border: '1px solid #90caf9' }}>
              <h3>Resultado de la Sincronización</h3>
              <pre style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}
    </section>
  )
}
