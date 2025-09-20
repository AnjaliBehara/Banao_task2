const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ username, email, password });
  res.status(201).json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Forgot Password (simple version, just reset password)
exports.forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated successfully' });
};
