const mongoose = require('mongoose');
const slugify = require('slugify');
const capitalizeTitle = require('../utils/capitalizeTitle');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide the post title'],
      maxlength: [
        100,
        'Post title should not be more than 100 characters long',
      ],
      trim: true,
      unique: [true, 'A post with this title already exists'],
    },
    body: {
      type: String,
      required: [true, 'Please provide the post body'],
    },
    postImage: {
      type: String,
      default: ' ',
      required: [true, 'Please provide a post image'],
    },
    author: {
      type: String,
      required: [true, 'An author must be specified'],
    },
    category: {
      type: String,
      required: [true, 'A category must be specified'],
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true },
);

PostSchema.pre('save', function () {
  this.slug = slugify(this.title);
  this.title = capitalizeTitle(this.title);
});

module.exports = mongoose.model('Post', PostSchema);
