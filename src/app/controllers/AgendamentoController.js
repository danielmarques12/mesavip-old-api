// import {} from 'date-fns';
import * as yup from 'yup';
import Agendamento from '../models/Agendamento';
import db from '../../database';

class AgendamentoController {
  async store(request, response) {
    const schema = yup.object().shape({
      horario_id: yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validação falhou' });
    }

    const { horario_id } = request.body;
    const { restaurante_id } = request.params;

    const mesa = await db.connection.query(
      `SELECT m.id
      FROM mesas m
      WHERE NOT EXISTS
                (SELECT
                  FROM agendamentos a
                  WHERE a.mesa_id = m.id
                  AND horario_id = :horario_id) 
      AND m.restaurante_id = :restaurante_id
      limit 1;`,
      {
        replacements: { horario_id, restaurante_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    if (mesa[0] === undefined) {
      return response.status(401).json({ error: 'Horário indisponível' });
    }

    const { id } = mesa[0];
    const cliente_id = request.userId;

    const scheduling = await Agendamento.create({
      horario_id,
      cliente_id,
      mesa_id: id,
    });

    return response.json(scheduling);
  }

  async index(request, response) {
    const scheduling = await db.connection.query(
      `SELECT
      a.id, h.horario, u.nome as restaurante
      FROM agendamentos a
      INNER JOIN horarios h on a.horario_id = h.id
      INNER JOIN usuarios u on h.restaurante_id = u.id
      WHERE a.cliente_id = :cliente_id;`,
      {
        replacements: { cliente_id: request.userId },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    if (!scheduling) {
      return response.status(403).json({ error: '403 Forbidden' });
    }

    return response.json(scheduling);
  }

  async destroy(request, response) {
    const agendamento = await Agendamento.findOne({
      where: { id: request.params.id },
    });

    if (!agendamento) {
      return response.status(401).json({ error: 'Agendamento não existe' });
    }

    await Agendamento.destroy({
      where: {
        id: request.params.id,
      },
    });

    return response.json('Agendamento cancelado com sucesso!');
  }
}

export default new AgendamentoController();
