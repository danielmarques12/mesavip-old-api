/* eslint-disable no-shadow */
import * as yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
  async store(request, response) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      cpf: yup.string(),
      cnpj: yup.string(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    const { email } = request.body;
    const user_type = request.body.cpf ? request.body.cpf : request.body.cnpj;
    const type = request.body.cpf ? 'CLI' : 'RES';

    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          {
            cpf: user_type,
          },
          {
            cnpj: user_type,
          },
        ],
      },
    });

    if (userExists) {
      return response.status(400).json({ error: 'User already registered' });
    }

    const { name } = await User.create({ ...request.body, type });

    return response.json({ name, email });
  }

  async update(request, response) {
    const { email, oldPassword } = request.body;

    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: yup
        .string()
        .when('password', (password, field) =>
          password ? field.required().oneOf([yup.ref('password')]) : field
        ),
    });
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation failed' });
    }

    const user = await User.findByPk(request.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return response.status(401).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    await user.update(request.body);

    return response.json('Information updated');
  }

  async delete(request, response) {
    const user = await User.findOne({ where: { user_id: request.params.id } });

    if (!user) {
      return User.status(400).json({ error: 'User not found' });
    }

    user.destroy();

    return response.json('User deleted successfully');
  }
}

export default new UserController();
