import * as yup from 'yup';
import { Op } from 'sequelize';
import Horario from '../../models/Restaurant/Hour';
import Usuario from '../../models/User';

class HourController {
  async store(request, response) {
    const restaurant = await Usuario.findOne({
      where: { [Op.and]: [{ id: request.userId }, { cpf: null }] },
    });

    if (!restaurant) {
      return response.status(403).json({ error: '403 Forbidden' });
    }

    const schema = yup.object().shape({
      horario: yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    const { hour } = request.body;
    const restaurant_id = request.userId;

    const isHourAlreadyRegistered = await Horario.findOne({
      where: { hour, restaurant_id },
    });

    if (isHourAlreadyRegistered) {
      return response.status(400).json({ error: 'Horário já cadastrado' });
    }

    await Horario.create({ hour, restaurant_id });

    return response.json({ hour, restaurant_id });
  }

  async index(request, response) {
    const hours = await Horario.findAll({
      where: { restaurant_id: request.params.id },
      attributes: ['id', 'horario'],
    });

    return response.json(hours);
  }
}

export default new HourController();
