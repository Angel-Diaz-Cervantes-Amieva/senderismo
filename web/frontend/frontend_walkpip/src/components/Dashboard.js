import React from 'react';
import { Link } from 'react-router-dom';
import './css/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h2>Bienvenido a WalkPIP</h2>
          <p>La plataforma para amantes del senderismo donde puedes descubrir, planificar y compartir tus rutas favoritas.</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">Comenzar Ahora</Link>
            <Link to="/login" className="cta-button secondary">Iniciar Sesión</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <span>Imagen de senderismo</span>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h3>¿Por qué unirse a WalkPIP?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h4>Descubre Rutas</h4>
            <p>Encuentra nuevas rutas de senderismo recomendadas por nuestra comunidad.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h4>Planifica Travesías</h4>
            <p>Organiza tus aventuras y comparte tus experiencias con otros excursionistas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
