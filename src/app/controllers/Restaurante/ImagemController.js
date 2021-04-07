import db from '../../../database';

class ImagemController {
  async show(request, response) {
    const { restaurante_id, type } = request.body;

    const imagens = await db.connection.query(
      `SELECT
      f.id, f.path
      FROM files as f
      WHERE f.usuario_id = :restaurante_id
      AND f.type = :type;`,
      {
        replacements: { restaurante_id, type },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(imagens);
  }
}

export default new ImagemController();
