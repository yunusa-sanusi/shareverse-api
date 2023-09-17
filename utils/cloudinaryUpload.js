const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

/**
 *
 * @param {string} imageFile - The file from the local computer.
 * @param {string} imageName - The name the image should be stored as.
 * @param {string} imageFolder - The cloudinary folder the image should be saved to. (post-images or profile-images).
 * @returns The cloudinary link to the image.
 */

const uploadImageToCloudinary = async (imageFile, imageName, imageFolder) => {
  const result = await cloudinary.uploader.upload(imageFile, {
    use_filename: true,
    folder: `shareverse/${imageFolder}`,
    filename_override: imageName,
  });

  return result.secure_url;
};

module.exports = uploadImageToCloudinary;
