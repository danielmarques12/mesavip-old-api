import Table from '../../models/Restaurant/Table';
import User from '../../models/User';

import db from '../../../database';

class TableController {
  async store(request, response) {
    const restaurant = await User.findOne({
      where: {
        user_id: request.userId,
        cpf: null,
      },
    });

    if (!restaurant) {
      return response.status(401).json({ error: '403 Forbidden' });
    }

    const restaurant_id = request.userId;

    await Table.create({ restaurant_id });

    return response.json('Table added successfully');
  }

  async index(request, response) {
    const availableTables = await db.connection.query(
      `SELECT DISTINCT h.hour_id, h.restaurant_id, h.hour
      FROM hours h
      INNER JOIN tables t on h.restaurant_id = t.restaurant_id
      WHERE NOT EXISTS
                      (SELECT FROM reservations r
                      WHERE r.table_id = t.table_id AND r.hour_id = h.hour_id)
      AND h.restaurant_id = :restaurant_id
      ORDER BY h.hour;`,
      {
        replacements: { restaurant_id: request.params.restaurant_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(availableTables);
  }
}

export default new TableController();
