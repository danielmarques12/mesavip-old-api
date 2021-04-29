import db from '../../../database';

class RatingController {
  async index(request, response) {
    const restaurant_id = request.params.id;

    const ratings = await db.connection.query(
      `SELECT
      coment.id, coment.comentario, coment."createdAt" AS data,
      notas.nota,
      cliente.nome AS cliente
      FROM comentarios AS coment
      INNER JOIN usuarios AS cliente ON cliente.id = coment.cliente_id
      INNER JOIN notas ON notas.cliente_id = cliente.id
      WHERE coment.restaurante_id = :restaurant_id
      AND notas.restaurante_id = :restaurant_id;`,
      {
        replacements: { restaurant_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(ratings);
  }
}

export default new RatingController();
