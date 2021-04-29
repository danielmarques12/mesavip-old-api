import db from '../../../database';

class ImageController {
  async show(request, response) {
    const { type } = request.body;
    const { restaurant_id } = request.params;

    const images = await db.connection.query(
      `SELECT
      file_id, path
      FROM files
      WHERE user_id = :restaurant_id
      AND type = :type;`,
      {
        replacements: { restaurant_id, type },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(images);
  }
}

export default new ImageController();
