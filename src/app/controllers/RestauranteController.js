import Usuario from '../models/Usuario';

class RestauranteController {
  async index(request, response) {
    const restaurantes = await Usuario.findAll({
      where: {
        cpf: null,
      },
      attributes: ['id', 'nome'],
    });
    return response.json(restaurantes);
  }
}

export default new RestauranteController();
