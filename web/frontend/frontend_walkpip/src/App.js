import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-content">
            <div className="logo-section">
              <Link to="/" className="logo-link">
                <h1>WalkPIP</h1>
                <p>Descubre nuevas rutas de senderismo</p>
              </Link>
            </div>
            <nav className="main-nav">
              <Link to="/register" className="nav-button">Registro</Link>
              <Link to="/login" className="nav-button">Login</Link>
            </nav>
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            {/* Ruta por defecto para manejar URLs desconocidas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="App-footer">
          <p>&copy; 2025 WalkPIP - Todos los derechos reservados</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;