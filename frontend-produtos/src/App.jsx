// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import Login from './components/Login';
import AdminPage from './components/AdminPage'; // Vamos criar este
import { useAuth } from './context/AuthContext'; // Importar o hook de autenticação
import './App.css';

// Componente para proteger as rotas
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Bem-vindo à Loja</h1>
        </header>
        <main>
          <Routes>
            {/* Rota para a lista de produtos (página inicial) */}
            <Route path="/" element={<ProductList />} />
            
            {/* Rota para a página de login */}
            <Route path="/login" element={<Login />} />
            
            {/* Rota privada para a página de administração */}
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;