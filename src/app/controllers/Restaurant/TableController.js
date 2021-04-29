import Mesa from '../../models/Restaurant/Table';
import Usuario from '../../models/User';

import db from '../../../database';

class TableController {
  async store(request, response) {
    const restaurant = await Usuario.findOne({
      where: {
        id: request.userId,
        cpf: null,
      },
    });

    if (!restaurant) {
      return response.status(401).json({ error: '403 Forbidden' });
    }

    const restaurant_id = request.userId;

    await Mesa.create({ restaurant_id });

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
        replacements: { restaurant_id: request.params.restaurant_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(availableTables);
  }
}

export default new TableController();
