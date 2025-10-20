import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>BlogApp</Link>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/blog" style={linkStyle}>Blog</Link>
          {user ? (
            <>
              <span style={userStyle}>Hello, {user.name}</span>
              <button onClick={logout} style={buttonStyle}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/register" style={linkStyle}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// Inline styles for simplicity
const headerStyle = {
  background: '#2c3e50',
  color: 'white',
  padding: '1rem 0',
  marginBottom: '2rem'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.5rem',
  fontWeight: 'bold'
};

const navStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
};

const userStyle = {
  margin: '0 1rem'
};

const buttonStyle = {
  background: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Header;