import db from '../../../database';

class RestauranteController {
  async show(request, response) {
    const restaurante_id = request.params.id;

    const restaurante = await db.connection.query(
      `SELECT
      r.sobre, r.telefone, r.site,
      u.nome AS nome,
      c.nome AS culinaria,
      e.bairro, e.cidade, e.estado, e.cep, e.logradouro, e.numero, e.complemento
      FROM restaurantes AS r
      INNER JOIN usuarios u ON u.id = r.restaurante_id
      INNER JOIN culinarias c ON c.id = r.culinaria_id
      INNER JOIN enderecos e ON e.usuario_id = r.restaurante_id
      WHERE r.restaurante_id = :restaurante_id;`,
      {
        replacements: { restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    const media = await db.connection.query(
      `SELECT
      cast(avg(notas.nota) as decimal(10,1)) AS media
      FROM notas
      GROUP BY notas.restaurante_id;`,
      {
        replacements: { restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    const quantidade = await db.connection.query(
      `SELECT
      count(notas.nota)
      FROM notas
      WHERE notas.restaurante_id = restaurante_id;`,
      {
        replacements: { restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json({
      restaurante,
      avaliacao: { media: media[0].media, quantidade: quantidade[0].count },
    });
  }

  async index(request, response) {
    const restaurantes = await db.connection.query(
      `SELECT
      u.id, u.nome,
      c.nome as culinaria,
      e.bairro,
      f.path
      FROM usuarios u
      INNER JOIN restaurantes r on u.id = r.restaurante_id
      INNER JOIN culinarias c on c.id = r.culinaria_id
      INNER JOIN enderecos e on u.id = e.usuario_id
      INNER JOIN files f on u.id = f.usuario_id
      WHERE f.type = 'lista';`,
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
