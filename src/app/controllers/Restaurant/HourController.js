import * as yup from 'yup';
import { Op } from 'sequelize';
import Hour from '../../models/Restaurant/Hour';
import User from '../../models/User';

class HourController {
  async store(request, response) {
    const restaurant = await User.findOne({
      where: { [Op.and]: [{ user_id: request.userId }, { cpf: null }] },
    });

    if (!restaurant) {
      return response.status(403).json({ error: '403 Forbidden' });
    }

    const schema = yup.object().shape({
      hour: yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    const { hour } = request.body;
    const restaurant_id = request.userId;

    const isHourAlreadyRegistered = await Hour.findOne({
      where: { hour, restaurant_id },
    });

    if (isHourAlreadyRegistered) {
      return response.status(400).json({ error: 'Hour already registered' });
    }

    await Hour.create({ hour, restaurant_id });

    return response.json({ hour, restaurant_id });
  }

  async index(request, response) {
    const hours = await Hour.findAll({
      where: { restaurant_id: request.params.id },
      attributes: ['hour_id', 'hour'],
    });

    return response.json(hours);
  }
}

export default new HourController();
