import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import File from '../models/File';
import cloudinaryConfig from '../../config/cloudinary';

class FileController {
  async store(request, response) {
    const usuario_id = request.userId;
    const { tempFilePath } = request.files.file;
    const { type } = request.body;

    cloudinary.config(cloudinaryConfig);
    const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder: 'Mesavip/Uploads',
    });

    fs.unlink(
      path.resolve(__dirname, '..', '..', '..', 'tmp', tempFilePath),
      () => {}
    );

    const file = await File.create({ path: secure_url, type, usuario_id });

    return response.json(file);
  }
}

export default new FileController();
