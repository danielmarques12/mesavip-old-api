import db from '../../../database';

class AvalicaoController {
  async index(request, response) {
    const restaurante_id = request.params.id;

    const avaliacoes = await db.connection.query(
      `SELECT coment.id, coment.comentario, coment."createdAt" AS data,
        notas.nota, 
        cliente.nome AS cliente
        FROM comentarios AS coment
        INNER JOIN usuarios AS cliente ON coment.cliente_id = cliente.id
        INNER JOIN notas ON notas.cliente_id = coment.cliente_id
        WHERE coment.restaurante_id = :restaurante_id;`,
      {
        replacements: { restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(avaliacoes);
  }
}

export default new AvalicaoController();
