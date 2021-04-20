import db from '../../../database';

class RestauranteController {
  async show(request, response) {
    const restaurante_id = request.params.id;

    const restaurante = await db.connection.query(
      `SELECT
      u.nome AS nome,
      r.sobre, r.telefone,
      c.nome AS culinaria,
      e.bairro, e.cidade, e.estado, e.cep, e.logradouro, e.numero, e.complemento,
      cast(avg(n.nota) as decimal(10,1)) AS media, count(n.nota) AS totaldeavaliacoes
      FROM usuarios AS u
      INNER JOIN restaurantes r ON u.id = r.restaurante_id
      INNER JOIN culinarias c ON c.id = r.culinaria_id
      INNER JOIN enderecos e ON e.usuario_id = r.restaurante_id
      INNER JOIN notas n ON n.restaurante_id = r.restaurante_id
      WHERE r.restaurante_id = :restaurante_id
      GROUP BY r.id,u.id, c.id, e.id;`,
      {
        replacements: { restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(restaurante[0]);
  }

  async index(request, response) {
    const restaurantes = await db.connection.query(
      `SELECT
      u.id, u.nome,
      c.nome as culinaria,
      e.bairro,
      f.path,
      cast(avg(n.nota) as decimal(10,1)) AS media
      FROM usuarios u
      INNER JOIN restaurantes r on u.id = r.restaurante_id
      INNER JOIN culinarias c on c.id = r.culinaria_id
      INNER JOIN enderecos e on u.id = e.usuario_id
      INNER JOIN files f on u.id = f.usuario_id
      INNER JOIN notas n on n.restaurante_id = r.restaurante_id
      WHERE f.type = 'lista'
      GROUP BY u.id, c.id, e.id, f.id;`,
      {
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(restaurantes);
  }

  // Criar um Controller para culinária???
  // async adicionarCulinaria(request, response) {}
}

export default new RestauranteController();
