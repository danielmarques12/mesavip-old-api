import cloudinary from 'cloudinary';
import File from '../models/File';
import cloudinaryConfig from '../../config/cloudinary';

class FileController {
  async store(request, response) {
    const { tempFilePath } = request.files.file;
    cloudinary.config(cloudinaryConfig);
    const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath);

    // const file = await File.create()

    return response.json(secure_url);
  }
}

export default new FileController();
