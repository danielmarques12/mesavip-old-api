import db from '../../../database';

class RatingController {
  async index(request, response) {
    const restaurant_id = request.params.id;

    const ratings = await db.connection.query(
      `SELECT
      comments.comment_id, comments.comment, comments."createdAt" AS data,
      rates.rate,
      client.name AS client
      FROM comments
      INNER JOIN users AS client ON client.user_id = comments.client_id
      INNER JOIN rates ON rates.client_id = client.user_id
      WHERE comments.restaurant_id = :restaurant_id
      AND rates.restaurant_id = :restaurant_id;`,
      {
        replacements: { restaurant_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(ratings);
  }
}

export default new RatingController();
