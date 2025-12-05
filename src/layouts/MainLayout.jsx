import { Link } from 'react-router-dom'

export default function MainLayout({ children }) {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Plataforma Virtual - Frontend</h1>
        <nav>
          <Link to="/">Inicio</Link>
          {' | '}
          <Link to="/admin">Administración</Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">Proyecto: Interacción con Moodle</footer>
    </div>
  )
}
