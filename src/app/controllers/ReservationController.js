// import {} from 'date-fns';
import * as yup from 'yup';
import Reservation from '../models/Reservation';
import db from '../../database';

class ReservationController {
  async store(request, response) {
    const schema = yup.object().shape({
      hour_id: yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    const { hour_id } = request.body;
    const { restaurant_id } = request.params;

    const table = await db.connection.query(
      `SELECT t.table_id
      FROM tables t
      WHERE NOT EXISTS
                (SELECT
                  FROM reservations r
                  WHERE r.table_id = t.table_id
                  AND r.hour_id = :hour_id) 
      AND t.restaurant_id = :restaurant_id
      limit 1;`,
      {
        replacements: { hour_id, restaurant_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    if (table[0] === undefined) {
      return response.status(401).json({ error: 'Reservation not available' });
    }

    const { table_id } = table[0];
    const client_id = request.userId;

    const reservation = await Reservation.create({
      hour_id,
      client_id,
      table_id,
    });

    return response.json(reservation);
  }

  async index(request, response) {
    const reservation = await db.connection.query(
      `SELECT
      r.reservation_id as id, h.hour, u.name as restaurant
      FROM reservations r
      INNER JOIN hours h on r.hour_id = h.hour_id
      INNER JOIN users u on h.restaurant_id = u.user_id
      WHERE r.client_id = :client_id;`,
      {
        replacements: { client_id: request.userId },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    if (!reservation) {
      return response.status(403).json({ error: '403 Forbidden' });
    }

    return response.json(reservation);
  }

  async destroy(request, response) {
    const reservation = await Reservation.findOne({
      where: { reservation_id: request.params.id },
    });

    if (!reservation) {
      return response.status(401).json({ error: 'Reservation does not exist' });
    }

    await Reservation.destroy({
      where: {
        reservation_id: request.params.id,
      },
    });

    return response.json('Reservation canceled');
  }
}

export default new ReservationController();
