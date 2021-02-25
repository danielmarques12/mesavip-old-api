import * as yup from 'yup';
import { Op } from 'sequelize';
import Horario from '../models/Horario';
import Usuario from '../models/Usuario';

class HorarioController {
  async store(request, response) {
    const restaurante = await Usuario.findOne({
      where: { [Op.and]: [{ id: request.userId }, { cpf: null }] },
    });

    if (!restaurante) {
      return response.status(403).json({ error: '403 Forbidden' });
    }

    const schema = yup.object().shape({
      horario: yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validação falhou' });
    }

    const { horario } = request.body;
    const restaurante_id = request.userId;

    const horario_ja_cadastrado = await Horario.findOne({
      where: { horario, restaurante_id },
    });

    if (horario_ja_cadastrado) {
      return response.status(400).json({ error: 'Horário já cadastrado' });
    }

    await Horario.create({ horario, restaurante_id });

    return response.json({ horario, restaurante_id });
  }

  async index(request, response) {
    const horarios = await Horario.findAll({
      where: { restaurante_id: request.params.id },
      attributes: ['id', 'horario'],
    });

    return response.json(horarios);
  }
}

export default new HorarioController();
