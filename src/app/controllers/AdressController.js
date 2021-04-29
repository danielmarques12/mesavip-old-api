import * as yup from 'yup';
import Adress from '../models/Adress';

class AdressController {
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
      return response.status(400).json({ error: 'Validation failed' });
    }

    const adress = {
      bairro: request.body.bairro,
      cidade: request.body.cidade,
      estado: request.body.estado,
      cep: request.body.cep,
      logradouro: request.body.logradouro,
      numero: request.body.numero,
      complemento: request.body.complemento,
      user_id: request.userId,
    };

    await Adress.create(adress);

    return response.json(adress);
  }

  async show(request, response) {
    const adress = await Adress.findOne({
      where: { user_id: request.params.id },
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

    return response.json(adress);
  }
}

export default new AdressController();
