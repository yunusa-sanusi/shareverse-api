const mongoose = require('mongoose');
const User = require('./User');

const UserProfileSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'A user must be specified'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('UserProfile', UserProfileSchema);
