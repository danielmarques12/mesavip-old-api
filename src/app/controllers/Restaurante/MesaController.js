import Mesa from '../../models/Restaurante/Mesa';
import Usuario from '../../models/Usuario';

import db from '../../../database';

class MesaController {
  async store(request, response) {
    const restaurante = await Usuario.findOne({
      where: {
        id: request.userId,
        cpf: null,
      },
    });

    if (!restaurante) {
      return response.status(401).json({ error: '403 Forbidden' });
    }

    const restaurante_id = request.userId;

    await Mesa.create({ restaurante_id });

    return response.json('Mesa criada com sucesso');
  }

  async index(request, response) {
    const availableTables = await db.connection.query(
      `SELECT DISTINCT h.id, h.restaurante_id, h.horario
      FROM horarios h
      INNER JOIN mesas m on h.restaurante_id = m.restaurante_id
      WHERE NOT EXISTS
                      (SELECT FROM agendamentos a
                      WHERE a.mesa_id = m.id AND a.horario_id = h.id)
      AND h.restaurante_id = :restaurante_id
      ORDER BY h.horario;`,
      {
        replacements: { restaurante_id: request.params.restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(availableTables);
  }
}

export default new MesaController();
