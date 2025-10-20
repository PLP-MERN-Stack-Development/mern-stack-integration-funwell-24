import React from 'react';

const PostCard = ({ post, onDelete, canDelete }) => {
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{post.title}</h3>
      <p style={contentStyle}>{post.content}</p>
      <div style={metaStyle}>
        <span>By {post.author}</span>
        <span>•</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
        {canDelete && (
          <>
            <span>•</span>
            <button 
              onClick={() => onDelete(post.id)}
              style={deleteButtonStyle}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const cardStyle = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  border: '1px solid #e1e8ed'
};

const titleStyle = {
  margin: '0 0 1rem 0',
  color: '#2c3e50',
  fontSize: '1.5rem'
};

const contentStyle = {
  margin: '0 0 1rem 0',
  color: '#34495e',
  lineHeight: '1.6'
};

const metaStyle = {
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  color: '#7f8c8d',
  fontSize: '0.9rem'
};

const deleteButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#e74c3c',
  cursor: 'pointer',
  textDecoration: 'underline'
};

export default PostCard;