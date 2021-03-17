import * as yup from 'yup';
import { Op } from 'sequelize';
import Usuario from '../models/Usuario';

class UsuarioController {
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

    const { nome } = await Usuario.create(request.body);

    return response.json({ nome, email });
  }
}

export default new UsuarioController();
