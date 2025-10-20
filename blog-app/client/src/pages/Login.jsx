import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      if (result.error) {
        setError(result.error);
      } else {
        navigate('/blog');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Login to Your Account</h1>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div style={errorStyle}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={footerStyle}>
          <p>
            Don't have an account?{' '}
            <Link to="/register" style={linkStyle}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1rem',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
};

const cardStyle = {
  background: 'white',
  padding: '3rem',
  borderRadius: '12px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#2c3e50',
  fontSize: '2rem',
  fontWeight: 'bold'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  fontWeight: '600',
  color: '#2c3e50',
  fontSize: '0.9rem'
};

const inputStyle = {
  padding: '1rem',
  border: '2px solid #e1e8ed',
  borderRadius: '8px',
  fontSize: '1rem',
  transition: 'border-color 0.3s ease'
};

const inputFocusStyle = {
  borderColor: '#3498db',
  outline: 'none'
};

const buttonStyle = {
  background: '#3498db',
  color: 'white',
  border: 'none',
  padding: '1rem 2rem',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background 0.3s ease',
  marginTop: '1rem'
};

const buttonHoverStyle = {
  background: '#2980b9'
};

const errorStyle = {
  background: '#fee',
  color: '#c33',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #fcc',
  textAlign: 'center'
};

const footerStyle = {
  textAlign: 'center',
  marginTop: '2rem',
  paddingTop: '2rem',
  borderTop: '1px solid #e1e8ed'
};

const linkStyle = {
  color: '#3498db',
  fontWeight: '600',
  textDecoration: 'none'
};

const linkHoverStyle = {
  textDecoration: 'underline'
};

export default Login;