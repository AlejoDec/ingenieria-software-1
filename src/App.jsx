import { BrowserRouter, Route, Routes } from 'react-router-dom'
// Importo paginas
import FormHome from './components/pages/FormHome'
import ErrorPage from './components/pages/ErrorPage'
import Dashboard from './components/pages/Dashboard'
// Importo protección de rutas
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
// Importo estilos
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FormHome />} />
          <Route 
            path='/home' 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          {/* Ruta para el error 404 */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
