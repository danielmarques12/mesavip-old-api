import db from '../../../database';

class ImagemController {
  async getImagensGaleria(request, response) {
    const restaurante_id = request.params.id;

    const imagens = await db.connection.query(
      `SELECT
      f.id, f.path
      FROM files as f
      WHERE f.usuario_id = :restaurante_id
      AND f.type = 'galeria'`,
      {
        replacements: { restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    const banner = await db.connection.query(
      `SELECT
      f.path
      FROM files as f
      WHERE f.usuario_id = :restaurante_id
      AND f.type = 'banner-grande'`,
      {
        replacements: { restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(imagens);
  }

  async getBanner(request, response) {
    const restaurante_id = request.params.id;

    const banner = await db.connection.query(
      `SELECT
      f.path
      FROM files as f
      WHERE f.usuario_id = :restaurante_id
      AND f.type = 'banner-grande'`,
      {
        replacements: { restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(banner);
  }
}

export default new ImagemController();
