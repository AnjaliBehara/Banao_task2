const Post = require('../models/Post');

// Create Post
exports.createPost = async (req, res) => {
  const post = await Post.create({ content: req.body.content, user: req.user.id });
  res.status(201).json(post);
};

// Get All Posts
exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'username');
  res.json(posts);
};

// Update Post
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  post.content = req.body.content;
  await post.save();
  res.json(post);
};

// Delete Post
exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  await post.remove();
  res.json({ message: 'Post removed' });
};

// Like Post
exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  if (!post.likes.includes(req.user.id)) post.likes.push(req.user.id);
  await post.save();
  res.json(post);
};

// Comment on Post
exports.commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });

  post.comments.push({ user: req.user.username, comment: req.body.comment });
  await post.save();
  res.json(post);
};
