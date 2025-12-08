import { Link } from 'react-router-dom'

export default function MainLayout({ children }) {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Plataforma Virtual</h1>
        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/platform">Plataforma</Link>
          <Link to="/teachers">Docentes</Link>
          <Link to="/students">Estudiantes</Link>
          <Link to="/groups">Grupos</Link>
          <Link to="/cuatrimestres">Cuatrimestres</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">by: Smart Hill</footer>
    </div>
  )
}
