import express from 'express';

const router = express.Router();

// Empty posts array - no sample data
let posts = [];
let nextId = 1;

// Helper function to calculate read time
const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// GET /api/posts - Get all posts with optional filtering
router.get('/', (req, res) => {
  try {
    const { 
      category, 
      search, 
      page = 1, 
      limit = 10,
      sort = 'newest'
    } = req.query;

    let filteredPosts = [...posts];

    // Filter by category
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Search in title, content, and excerpt
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort posts
    switch (sort) {
      case 'popular':
        filteredPosts.sort((a, b) => (b.views + b.likes) - (a.views + a.likes));
        break;
      case 'oldest':
        filteredPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'newest':
      default:
        filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: filteredPosts.length,
          totalPages: Math.ceil(filteredPosts.length / limitNum),
          hasNext: endIndex < filteredPosts.length,
          hasPrev: pageNum > 1
        }
      }
    });

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts'
    });
  }
});

// GET /api/posts/:id - Get single post by ID
router.get('/:id', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    // Increment views
    post.views += 1;

    res.json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch post'
    });
  }
});

// POST /api/posts - Create new post
router.post('/', (req, res) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    // Create new post
    const newPost = {
      id: nextId++,
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      author: 'Current User', // In real app, get from authenticated user
      authorId: 1, // In real app, get from authenticated user
      category: category || 'General',
      tags: tags || [],
      featuredImage: featuredImage || 'https://via.placeholder.com/800x400',
      readTime: calculateReadTime(content),
      likes: 0,
      comments: 0,
      views: 0,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    posts.unshift(newPost); // Add to beginning of array

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: newPost
    });

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create post'
    });
  }
});

// PUT /api/posts/:id - Update post
router.put('/:id', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    const { title, content, excerpt, category, tags, featuredImage } = req.body;

    // Update post
    posts[postIndex] = {
      ...posts[postIndex],
      ...(title && { title }),
      ...(content && { 
        content,
        readTime: calculateReadTime(content)
      }),
      ...(excerpt && { excerpt }),
      ...(category && { category }),
      ...(tags && { tags }),
      ...(featuredImage && { featuredImage }),
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: posts[postIndex]
    });

  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update post'
    });
  }
});

// DELETE /api/posts/:id - Delete post
router.delete('/:id', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    const deletedPost = posts[postIndex];
    posts.splice(postIndex, 1);

    res.json({
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost
    });

  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete post'
    });
  }
});

// GET /api/posts/categories/list - Get all categories
router.get('/categories/list', (req, res) => {
  try {
    const categories = [...new Set(posts.map(post => post.category))];
    
    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories'
    });
  }
});

// GET /api/posts/category/:category - Get posts by category
router.get('/category/:category', (req, res) => {
  try {
    const category = req.params.category;
    const categoryPosts = posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );

    res.json({
      success: true,
      data: {
        category,
        posts: categoryPosts,
        count: categoryPosts.length
      }
    });

  } catch (error) {
    console.error('Get posts by category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch posts by category'
    });
  }
});

// PATCH /api/posts/:id/like - Like a post
router.patch('/:id/like', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    post.likes += 1;

    res.json({
      success: true,
      message: 'Post liked successfully',
      data: { likes: post.likes }
    });

  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to like post'
    });
  }
});

// GET /api/posts/search/:query - Search posts
router.get('/search/:query', (req, res) => {
  try {
    const query = req.params.query.toLowerCase();
    const searchResults = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.category.toLowerCase().includes(query)
    );

    res.json({
      success: true,
      data: {
        query,
        results: searchResults,
        count: searchResults.length
      }
    });

  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search posts'
    });
  }
});

// GET /api/posts/featured/popular - Get popular posts
router.get('/featured/popular', (req, res) => {
  try {
    const popularPosts = [...posts]
      .sort((a, b) => (b.views + b.likes) - (a.views + a.likes))
      .slice(0, 5); // Top 5 popular posts

    res.json({
      success: true,
      data: popularPosts
    });

  } catch (error) {
    console.error('Get popular posts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch popular posts'
    });
  }
});

export default router;