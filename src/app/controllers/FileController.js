import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import db from '../../database';
import File from '../models/File';
import cloudinaryConfig from '../../config/cloudinary';

class FileController {
  async store(request, response) {
    const { tempFilePath } = request.files.file;
    const { type } = request.body;

    // Clean tmp folder
    fs.rm(
      path.resolve(__dirname, '..', '..', '..', 'tmp'),
      { recursive: true },
      () => {}
    );

    cloudinary.config(cloudinaryConfig);
    const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder: 'Mesavip/Uploads',
    });

    const file = await File.create({
      path: secure_url,
      usuario_id: request.userId,
      type,
    });

    return response.json(file);
  }

  async index(request, response) {
    const { restaurante_id, type } = request.body;

    const imagens = await db.connection.query(
      `SELECT f.id, f.path
      FROM files f
      INNER JOIN restaurantes r on f.usuario_id = r.restaurante_id
      WHERE restaurante_id = 6
      AND f.type = :type;`,
      {
        replacements: { restaurante_id, type },
        type: db.connection.QueryTypes.SELECT,
      }
    );
    return response.json(imagens);
  }
}

export default new FileController();
