import Usuario from '../../models/Usuario';

import db from '../../../database';

class RestauranteController {
  async listarRestaurantes(request, response) {
    const restaurantes = await Usuario.findAll({
      where: {
        cpf: null,
      },
      attributes: ['id', 'nome'],
    });
    return response.json(restaurantes);
  }

  async restauranteInfo(request, response) {
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

  // Criar um Controller para culinária???
  // async adicionarCulinaria(request, response) {}
}

export default new RestauranteController();
