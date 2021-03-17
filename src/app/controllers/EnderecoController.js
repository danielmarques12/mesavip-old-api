import * as yup from 'yup';
import Endereco from '../models/Endereco';

class EnderecoController {
  async store(request, response) {
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

  async show(request, response) {
    const endereco = await Endereco.findOne({
      where: { usuario_id: request.params.id },
      attributes: [
        'bairro',
        'cidade',
        'estado',
        'cep',
        'logradouro',
        'numero',
        'complemento',
      ],
    });

    return response.json(endereco);
  }
}

export default new EnderecoController();
