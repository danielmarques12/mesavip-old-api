import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import db from '../../database';
import File from '../models/File';
import cloudinaryConfig from '../../config/cloudinary';

require('dotenv/config');

class FileController {
  async store(request, response) {
    const { tempFilePath } = request.files.file;
    const { type, transformation } = request.body;

    // Clean tmp folder
    fs.rm(
      path.resolve(__dirname, '..', '..', '..', 'tmp'),
      { recursive: true },
      () => {}
    );

    cloudinary.config(cloudinaryConfig);
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      tempFilePath,
      {
        folder:
          process.env.NODE_ENV === 'development'
            ? 'Mesavip/Uploads'
            : 'Mesavip/HerokuUploads',
        transformation,
      }
    );

    const file = await File.create({
      path: secure_url,
      public_id,
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
      WHERE restaurante_id = :restaurante_id
      AND f.type = :type;`,
      {
        replacements: { restaurante_id, type },
        type: db.connection.QueryTypes.SELECT,
      }
    );
    return response.json(imagens);
  }

  async destroy(request, response) {
    const restaurante_id = request.userId;
    const { type } = request.body;

    const files = await File.findAll({
      where: {
        usuario_id: restaurante_id,
        type: type === 'galeria' ? type : { [Op.not]: 'galeria' },
      },
      attributes: ['public_id'],
    });

    if (!files) {
      return response.status(401).json({ error: 'Files not found' });
    }

    const filesToBeDeleted = files.map((file) => file.public_id);

    cloudinary.config(cloudinaryConfig);
    await cloudinary.v2.api.delete_resources(filesToBeDeleted);

    await File.destroy({ where: { public_id: filesToBeDeleted } });

    return response.json(filesToBeDeleted);
  }
}

export default new FileController();
