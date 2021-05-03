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
      user_id: request.userId,
      type,
    });

    return response.json(file);
  }

  async index(request, response) {
    const { restaurant_id, type } = request.params;

    const images = await db.connection.query(
      `SELECT f.file_id, f.path
      FROM files f
      INNER JOIN restaurants r on f.user_id = r.restaurant_id
      WHERE restaurant_id = :restaurant_id
      AND f.type = :type;`,
      {
        replacements: { restaurant_id, type },
        type: db.connection.QueryTypes.SELECT,
      }
    );
    return response.json(images);
  }

  async destroy(request, response) {
    const restaurant_id = request.userId;
    const { type } = request.body;

    const files = await File.findAll({
      where: {
        user_id: restaurant_id,
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
