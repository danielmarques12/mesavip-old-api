import File from '../models/File';

class FileController {
  async store(request, response) {
    const { originalname: name, filename: path } = request.file;

    const file = await File.create({ name, path, usuario_id: request.userId });

    return response.json(file);
  }
}

export default new FileController();
