import React, { useState } from 'react';

const PostForm = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setFormData({ title: '', content: '' });
      onPostCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Post title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        style={inputStyle}
        required
      />
      <textarea
        placeholder="Write your post..."
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        style={textareaStyle}
        rows="6"
        required
      />
      <button type="submit" style={submitButtonStyle}>
        Create Post
      </button>
    </form>
  );
};

const formStyle = {
  background: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  marginBottom: '2rem'
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  marginBottom: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem'
};

const textareaStyle = {
  width: '100%',
  padding: '1rem',
  marginBottom: '1rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
  fontFamily: 'inherit'
};

const submitButtonStyle = {
  background: '#3498db',
  color: 'white',
  border: 'none',
  padding: '1rem 2rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default PostForm;