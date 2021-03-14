import File from '../models/File';

class FileController {
  async store(request, response) {
    const { originalname: name, filename: path } = request.file;

    // Upload sendo feito mesmo sem o id do usuário(FK) não sendo persistido

    const file = await File.create({ name, path, usuario_id: request.userId });

    return response.json(file);
  }
}

export default new FileController();
