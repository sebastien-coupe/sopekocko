const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    // Get name of the file such as "name.ext" becomes "name"
    const fileName = file.originalname
      .trim() // Remove whitespaces
      .split(/[.,\/ -]/) // Divide string from dot, comma, whitespace and dash
      .slice(0, -1) // Get all elements except the last one (file extension)
      .join('_'); // Concatenate all elements in one string using underscore as separator

    // Get extension matching mimetype
    const extension = MIME_TYPES[file.mimetype];
    callback(null, fileName + '_' + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');