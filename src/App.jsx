import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Admin from './pages/Admin'
import PlatformConnection from './pages/PlatformConnection'
import TeacherManagement from './pages/TeacherManagement'
import StudentManagement from './pages/StudentManagement'
import GroupManagement from './pages/GroupManagement'
import CuatrimestreManagement from './pages/CuatrimestreManagement'
import Dashboard from './pages/Dashboard'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/platform" element={<PlatformConnection />} />
          <Route path="/teachers" element={<TeacherManagement />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/groups" element={<GroupManagement />} />
          <Route path="/cuatrimestres" element={<CuatrimestreManagement />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
