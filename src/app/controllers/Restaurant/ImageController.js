import db from '../../../database';

class ImageController {
  async show(request, response) {
    const { type } = request.body;
    const { restaurant_id } = request.params;

    const images = await db.connection.query(
      `SELECT
      f.id, f.path
      FROM files as f
      WHERE f.usuario_id = :restaurante_id
      AND f.type = :type;`,
      {
        replacements: { restaurant_id, type },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(images);
  }
}

export default new ImageController();
