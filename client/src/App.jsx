import { BrowserRouter, Route, Routes } from 'react-router-dom'
// Importo paginas
import ErrorPage from './components/pages/ErrorPage'
// Importa el CONTENEDOR, no el componente presentacional
import {ProductosContainer} from './containers/ProductosContainer';
import { DashboardContainer } from './containers/DashboardContainer';// Importo protección de rutas
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
// Importo estilos
import './App.css'
import  Navbar  from './components/layout/Navbar'
import FormLogIn from './components/auth/FormLogIn';
import { ProductoFormContainer } from './containers/ProductoFormContainer';
import { ProductoExistContainer } from './containers/ProductoExistsContainer';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          {/*ruta publica*/}
          <Route path='/' element={<FormLogIn />} />
          {/*rutas protegidas*/}
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Navbar />
                <DashboardContainer />
              </ProtectedRoute>
            }
          />
          <Route
          path='/productos'
          element = {
            <ProtectedRoute>
              <Navbar/>
              <ProductosContainer />
            </ProtectedRoute>
          }
          />
          <Route
          path='/productos/nuevo'
          element = {
            <ProtectedRoute>
              <Navbar/>
              <ProductoFormContainer/>
            </ProtectedRoute>
          }
          />
          <Route
          path='/productos/exist'
          element = {
            <ProtectedRoute>
              <Navbar/>
              <ProductoExistContainer/>
            </ProtectedRoute>
          }
          />
          {/*redireccion para rutas no autenticadas*/}

          {/* Ruta para el error 404 */}
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
