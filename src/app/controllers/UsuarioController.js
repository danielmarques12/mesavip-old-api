import * as yup from 'yup';
import { Op } from 'sequelize';
import Usuario from '../models/Usuario';
import Endereco from '../models/Endereco';

class UsuarioController {
  async storeUser(request, response) {
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

  async storeEndereco(request, response) {
    // Separar todas as validações em uma pasta Validators (ou algo assim)

    const schema = yup.object().shape({
      bairro: yup.string().required(),
      cidade: yup.string().required(),
      estado: yup.string().required(),
      cep: yup.string().required(),
      logradouro: yup.string().required(),
      numero: yup.string().required(),
      complemento: yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validação falhou' });
    }

    const endereco = {
      bairro: request.body.bairro,
      cidade: request.body.cidade,
      estado: request.body.estado,
      cep: request.body.cep,
      logradouro: request.body.logradouro,
      numero: request.body.numero,
      complemento: request.body.complemento,
      usuario_id: request.userId,
    };

    await Endereco.create(endereco);

    return response.json(endereco);
  }
}

export default new UsuarioController();
