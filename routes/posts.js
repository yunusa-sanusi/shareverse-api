const express = require('express');
const router = express.Router();

const { createPost, updatePost, deletePost } = require('../controllers/posts');

router.route('').post(createPost);
router.route('/:slug').patch(updatePost).delete(deletePost);

module.exports = router;
