const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files/profile');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 25000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|JPG|png|PNG|webp|heic|heif)$/)) {
      return cb(
        new Error(
          'Only image files with extensions jpg, jpeg, png, webp, heic, or heif are allowed.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

module.exports = upload;