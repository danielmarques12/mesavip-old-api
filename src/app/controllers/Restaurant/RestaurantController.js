import db from '../../../database';

class RestaurantController {
  async show(request, response) {
    const restaurant_id = request.params.id;

    const restaurant = await db.connection.query(
      `SELECT
      u.name AS name,
      r.about, r.phone,
      c.name AS culinary,
      a.bairro, a.cidade, a.estado, a.cep, a.logradouro, a.numero, a.complemento,
      cast(avg(rates.rate) as decimal(10,1)) AS average, count(rates.rate) AS totalratings
      FROM users AS u
      INNER JOIN restaurants r ON u.user_id = r.restaurant_id
      INNER JOIN culinaries c ON c.culinary_id = r.culinary_id
      INNER JOIN addresses a ON a.user_id = r.restaurant_id
      INNER JOIN rates ON rates.restaurant_id = r.restaurant_id
      WHERE r.restaurant_id = :restaurant_id
      GROUP BY r.id,u.user_id, c.culinary_id, a.adress_id;`,
      {
        replacements: { restaurant_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(restaurant[0]);
  }

  async index(request, response) {
    const restaurants = await db.connection.query(
      `SELECT
      u.user_id, u.name,
      c.name as culinary,
      a.bairro,
      f.path,
      cast(avg(rates.rate) as decimal(10,1)) AS average
      FROM users u
      INNER JOIN restaurants r on u.user_id = r.restaurant_id
      INNER JOIN culinaries c on c.culinary_id = r.culinary_id
      INNER JOIN addresses a on u.user_id = a.user_id
      INNER JOIN files f on u.user_id = f.user_id
      INNER JOIN rates on rates.restaurant_id = r.restaurant_id
      WHERE f.type = 'list'
      GROUP BY u.user_id, c.culinary_id, a.adress_id, f.file_id;`,
      {
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(restaurants);
  }

  // Criar um Controller para culinária???
  // async adicionarCulinaria(request, response) {}
}

export default new RestaurantController();
