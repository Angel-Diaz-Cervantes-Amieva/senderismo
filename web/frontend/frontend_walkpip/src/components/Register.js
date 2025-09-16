import React, { useState } from "react";
import api from "../api/api";
import './css/Form.css'; // CSS compartido para ambos formularios

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ""});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});
    
    try {
      const response = await api.post("register/", form);
      setMessage("¡Usuario creado correctamente! Redirigiendo al login...");
      console.log(response.data);
      
      // Limpiar formulario
      setForm({
        email: "",
        username: "",
        password: "",
      });
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      
    } catch (error) {
      console.error("Error register:", error.response?.data);
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setMessage("Error de conexión. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Crear Cuenta</h2>
          <p>Únete a nuestra comunidad</p>
        </div>
        
        {message && (
          <div className={`auth-message ${message.includes("correctamente") ? "success" : "error"}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <input
              name="username"
              type="text"
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
              required
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
