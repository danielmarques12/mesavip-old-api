import * as yup from 'yup';
import Mesa from '../models/Mesa';
import Usuario from '../models/Usuario';

import db from '../../database';

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

    const schema = yup.object().shape({
      capacidade: yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Validação falhou' });
    }

    const restaurante_id = request.userId;
    const { capacidade } = request.body;

    await Mesa.create({ capacidade, restaurante_id });

    return response.json({ capacidade });
  }

  async MesasDisponiveis(request, response) {
    const mesas_disponiveis = await db.connection.query(
      `SELECT m.id, m.capacidade
        FROM mesas m
        WHERE NOT EXISTS (
        SELECT
        FROM agendamentos a
        WHERE a.mesa_id = m.id AND horario_id = :horario_id
      );`,
      {
        replacements: { horario_id: request.body.horario_id },
        type: db.connection.QueryTypes.SELECT,
      }
    );

    return response.json(mesas_disponiveis);
  }
}

export default new MesaController();
