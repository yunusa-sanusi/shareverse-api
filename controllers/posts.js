const { StatusCodes } = require('http-status-codes');
const slugify = require('slugify');
const capitalizeTitle = require('../utils/capitalizeTitle');

const Post = require('../models/Post');
const { NotFoundError, UnauthenticatedError } = require('../errors');

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(StatusCodes.OK).json({ posts });
};

const getSinglePost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOne({ slug });
  if (!post) throw new NotFoundError('Post not found');

  res.status(200).json({ post });
};

const createPost = async (req, res) => {
  const postData = {
    ...req.body,
    author: req.user.username,
  };
  const post = await Post.create({ ...postData });
  res.status(StatusCodes.CREATED).json({ success: true, post });
};

const updatePost = async (req, res) => {
  const { slug } = req.params;

  // checks if the title is getting updated
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
    req.body.title = capitalizeTitle(req.body.title);
  }

  const post = await Post.findOneAndUpdate(
    { author: req.user.username, slug: slug },
    req.body,
    { new: true, runValidators: true },
  );

  res.status(StatusCodes.OK).json({ success: true, post });
};

const deletePost = async (req, res) => {
  const { slug } = req.params;
  const post = await Post.findOneAndDelete({
    author: req.user.username,
    slug: slug,
  });

  if (!post) throw new NotFoundError('Post not found');

  res.status(StatusCodes.OK).json({ success: true, post });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
