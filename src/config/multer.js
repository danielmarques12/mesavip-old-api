import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (request, file, callback) => {
      callback(null, `${file.originalname}-${Date.now()}`);
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB
  },
  fileFilter: (request, file, callback) => {
    const mimeTypes = ['image/jpeg', 'image/png'];

    if (!mimeTypes.includes(file.mimetype)) {
      return callback(null, false);
    }

    return callback(null, true);
  },
};
