import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('http://localhost:5000/api/posts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Posts API response:', data); // Debug log
      
      // Handle the actual API response format
      if (data.success && data.data && data.data.posts) {
        setPosts(data.data.posts);
      } else if (data.posts) {
        setPosts(data.posts);
      } else {
        setPosts(data); // Fallback
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts(); // Refresh posts
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  console.log('Current posts state:', posts); // Debug log

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Blog Posts</h1>
        {user && (
          <button 
            onClick={() => setShowForm(!showForm)}
            style={buttonStyle}
          >
            {showForm ? 'Cancel' : 'Create Post'}
          </button>
        )}
      </div>

      {showForm && <PostForm onPostCreated={fetchPosts} />}

      {loading && <div style={loadingStyle}>Loading posts...</div>}
      
      {error && (
        <div style={errorStyle}>
          {error}
          <button onClick={fetchPosts} style={retryButtonStyle}>
            Retry
          </button>
        </div>
      )}

      <div style={postsStyle}>
        {!loading && !error && posts.length === 0 && (
          <div style={emptyStyle}>
            <h3>No posts yet</h3>
            <p>Be the first to create a post!</p>
          </div>
        )}
        
        {posts.map(post => (
          <PostCard 
            key={post.id} // Your API uses 'id' not '_id'
            post={post} 
            onDelete={deletePost}
            canDelete={user && (user.id === post.authorId || user.role === 'admin')}
          />
        ))}
      </div>
    </div>
  );
};

// ... keep the same styles from previous example ...

const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '2rem 1rem'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  borderBottom: '2px solid #f0f0f0',
  paddingBottom: '1rem'
};

const buttonStyle = {
  background: '#27ae60',
  color: 'white',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const postsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const loadingStyle = {
  textAlign: 'center',
  padding: '2rem',
  fontSize: '1.2rem',
  color: '#666'
};

const errorStyle = {
  background: '#fee',
  color: '#c33',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #fcc',
  textAlign: 'center',
  marginBottom: '1rem'
};

const retryButtonStyle = {
  background: '#c33',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '1rem'
};

const emptyStyle = {
  textAlign: 'center',
  padding: '3rem',
  color: '#666',
  background: '#f9f9f9',
  borderRadius: '8px'
};

export default Blog;