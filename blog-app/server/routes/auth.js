import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('=== REGISTRATION ATTEMPT ===');
    console.log('Input - Name:', name, 'Email:', email);

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    const lowerCaseEmail = email.toLowerCase().trim();
    console.log('Checking for email:', lowerCaseEmail);
    
    // DEBUG: Check ALL users in database
    const allUsers = await User.find({}, 'email name');
    console.log('ALL USERS IN DATABASE:', allUsers);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: lowerCaseEmail });
    console.log('Existing user found:', existingUser);
    
    if (existingUser) {
      console.log('❌ USER EXISTS - Email:', existingUser.email, 'Name:', existingUser.name);
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    console.log('✅ Email available, creating user...');
    
    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: lowerCaseEmail,
      password: password
    });

    await newUser.save();
    console.log('✅ User created successfully:', newUser._id);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: newUser
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    
    if (error.code === 11000) {
      console.log('MongoDB duplicate key error:', error.keyValue);
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error during registration'
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user in MongoDB
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Check password using the model method
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('Invalid password for:', email);
      return res.status(400).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    );

    console.log('Login successful:', user._id);

    // Return user data
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: user
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during login'
    });
  }
});

// Get current user (protected route)
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      res.json({
        success: true,
        user: user
      });

    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
    }

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get all users (for testing)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      users: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching users'
    });
  }
});

export default router;