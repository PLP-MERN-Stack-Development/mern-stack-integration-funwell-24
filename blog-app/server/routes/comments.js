import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

const router = express.Router();

// GET comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch comments'
    });
  }
});

// POST create comment
router.post('/', async (req, res) => {
  try {
    const { content, postId, authorId } = req.body;

    const comment = new Comment({
      content,
      post: postId,
      author: authorId
    });

    await comment.save();
    await comment.populate('author', 'name avatar');

    // Increment post comments count (you can add this field to Post model)
    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create comment'
    });
  }
});

// DELETE comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found'
      });
    }

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete comment'
    });
  }
});

export default router;