/* eslint-disable no-shadow */
import * as yup from 'yup';
import { Op } from 'sequelize';
import Usuario from '../models/User';

class UserController {
  async store(request, response) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      email: yup.string().email().required(),
      cpf: yup.string(),
      cnpj: yup.string(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validação falhou' });
    }

    const { email } = request.body;

    const forma_de_cadastro = request.body.cpf
      ? request.body.cpf
      : request.body.cnpj;

    const type = request.body.cpf ? 'CLI' : 'RES';

    const usuario_existe = await Usuario.findOne({
      where: {
        [Op.or]: [
          { email },
          {
            cpf: forma_de_cadastro,
          },
          {
            cnpj: forma_de_cadastro,
          },
        ],
      },
    });

    if (usuario_existe) {
      return response.status(400).json({ error: 'Usuario já cadastrado' });
    }

    const { nome } = await Usuario.create({ ...request.body, type });

    return response.json({ nome, email });
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

    const user = await Usuario.findByPk(request.userId);

    if (email !== user.email) {
      const userExists = await Usuario.findOne({ where: { email } });

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
    const user = await Usuario.findOne({ where: { id: request.params.id } });

    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    user.destroy();

    return response.json('User deleted successfully');
  }
}

export default new UserController();
