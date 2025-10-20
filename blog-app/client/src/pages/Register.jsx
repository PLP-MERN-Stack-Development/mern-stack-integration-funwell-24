import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setDebugInfo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('=== REGISTRATION ATTEMPT ===');
    console.log('Form data:', formData);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Calling register function...');
      setDebugInfo('Sending registration request...');
      
      const result = await register(formData.name, formData.email, formData.password);
      
      console.log('Register result:', result);
      setDebugInfo(`Response: ${JSON.stringify(result, null, 2)}`);

      if (result.error) {
        setError(result.error);
        console.log('Registration failed:', result.error);
      } else {
        console.log('Registration successful, navigating to /blog');
        setDebugInfo('Registration successful! Redirecting...');
        navigate('/blog');
      }
    } catch (err) {
      console.error('Registration catch error:', err);
      setError('Registration failed. Please try again.');
      setDebugInfo(`Error: ${err.message}`);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Create Your Account</h1>
        <p style={subtitleStyle}>Join our community and start sharing your stories</p>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="Create a password (min 6 characters)"
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && (
            <div style={errorStyle}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {debugInfo && (
            <div style={debugStyle}>
              <strong>Debug Info:</strong> 
              <pre style={debugPreStyle}>{debugInfo}</pre>
            </div>
          )}

          <button 
            type="submit" 
            style={buttonStyle}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={footerStyle}>
          <p>
            Already have an account?{' '}
            <Link to="/login" style={linkStyle}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Keep all the other styles (containerStyle, cardStyle, titleStyle, etc.)
// but remove testAccountsStyle and testListStyle

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
  maxWidth: '500px'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '0.5rem',
  color: '#2c3e50',
  fontSize: '2rem',
  fontWeight: 'bold'
};

const subtitleStyle = {
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#7f8c8d',
  fontSize: '1rem'
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

const buttonStyle = {
  background: '#27ae60',
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

const errorStyle = {
  background: '#fee',
  color: '#c33',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #fcc',
  textAlign: 'center'
};

const debugStyle = {
  background: '#e8f4fd',
  color: '#2c3e50',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #b3e0ff',
  fontSize: '0.8rem'
};

const debugPreStyle = {
  margin: '0.5rem 0 0 0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  fontSize: '0.7rem'
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

export default Register;