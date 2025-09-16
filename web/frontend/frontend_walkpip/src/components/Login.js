import React, { useState } from 'react';
import api from '../api/api';
import './css/Form.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('login/', formData);
      
      if (response.data && response.data.access) {
        // Guardar tokens
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        // Guardar información básica del usuario
        localStorage.setItem('user', JSON.stringify({
          username: formData.username
        }));
        
        setError(''); // Limpiar errores
        alert('Login exitoso');
        window.location.href = '/dashboard';
      } else {
        setError('Formato de respuesta inesperado');
      }

    } catch (error) {
      console.error('Error completo:', error);
      
      if (error.response) {
        if (error.response.status === 401) {
          setError('Credenciales inválidas. Por favor, verifica tu usuario y contraseña.');
        } else {
          setError(error.response.data?.message || `Error del servidor: ${error.response.status}`);
        }
      } else if (error.request) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
        setError('Error inesperado: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Iniciar Sesión</h2>
          <p>Bienvenido de vuelta</p>
        </div>
        
        {error && (
          <div className="auth-message error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;