const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes');

const uploadImage = async (req, res) => {
  const { image } = req.files;
  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    use_filename: true,
    folder: 'shareverse/post-images',
    filename_override: 'post-image',
  });

  fs.rmSync(path.resolve(__dirname, '../tmp'), {
    recursive: true,
    force: true,
  });

  res.status(StatusCodes.OK).json({ result });
};

module.exports = uploadImage;
