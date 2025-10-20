import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <h1 style={titleStyle}>Welcome to BlogApp</h1>
        <p style={subtitleStyle}>A simple blogging platform built with React and Node.js</p>
        <div style={buttonGroupStyle}>
          <Link to="/blog" style={primaryButtonStyle}>View Blog</Link>
          <Link to="/register" style={secondaryButtonStyle}>Get Started</Link>
        </div>
      </div>
      
      <div style={featuresStyle}>
        <h2>Features</h2>
        <div style={featuresGridStyle}>
          <div style={featureStyle}>
            <h3>📝 Create Posts</h3>
            <p>Share your thoughts with the world</p>
          </div>
          <div style={featureStyle}>
            <h3>🔐 User Auth</h3>
            <p>Secure registration and login</p>
          </div>
          <div style={featureStyle}>
            <h3>📱 Responsive</h3>
            <p>Works on all devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem'
};

const heroStyle = {
  textAlign: 'center',
  padding: '4rem 0'
};

const titleStyle = {
  fontSize: '3rem',
  marginBottom: '1rem',
  color: '#2c3e50'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#7f8c8d',
  marginBottom: '2rem'
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center'
};

const primaryButtonStyle = {
  background: '#3498db',
  color: 'white',
  padding: '1rem 2rem',
  textDecoration: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
};

const secondaryButtonStyle = {
  background: 'transparent',
  color: '#3498db',
  border: '2px solid #3498db',
  padding: '1rem 2rem',
  textDecoration: 'none',
  borderRadius: '4px',
  fontWeight: 'bold'
};

const featuresStyle = {
  padding: '4rem 0',
  textAlign: 'center'
};

const featuresGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  marginTop: '2rem'
};

const featureStyle = {
  padding: '2rem',
  background: '#f8f9fa',
  borderRadius: '8px'
};

export default Home;