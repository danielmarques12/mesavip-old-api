// import {} from 'date-fns';
import * as yup from 'yup';
import Agendamento from '../models/Reservation';
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
      `SELECT m.id
      FROM mesas m
      WHERE NOT EXISTS
                (SELECT
                  FROM agendamentos a
                  WHERE a.mesa_id = m.id
                  AND horario_id = :hour_id) 
      AND m.restaurante_id = :restaurant_id
      limit 1;`,
      {
        replacements: { hour_id, restaurant_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    if (table[0] === undefined) {
      return response.status(401).json({ error: 'Not available' });
    }

    const { id } = table[0];
    const client_id = request.userId;

    const reservation = await Agendamento.create({
      hour_id,
      client_id,
      table_id: id,
    });

    return response.json(reservation);
  }

  async index(request, response) {
    const reservation = await db.connection.query(
      `SELECT
      a.id, h.horario, u.nome as restaurante
      FROM agendamentos a
      INNER JOIN horarios h on a.horario_id = h.id
      INNER JOIN usuarios u on h.restaurante_id = u.id
      WHERE a.cliente_id = :client_id;`,
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
    const reservation = await Agendamento.findOne({
      where: { id: request.params.id },
    });

    if (!reservation) {
      return response.status(401).json({ error: 'Reservation does not exist' });
    }

    await Agendamento.destroy({
      where: {
        id: request.params.id,
      },
    });

    return response.json('Reservation canceled');
  }
}

export default new ReservationController();
