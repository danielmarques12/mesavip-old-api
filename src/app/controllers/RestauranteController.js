import Usuario from '../models/Usuario';

class RestauranteController {
  async listarRestaurantes(request, response) {
    const restaurantes = await Usuario.findAll({
      where: {
        cpf: null,
      },
      attributes: ['id', 'nome'],
    });
    return response.json(restaurantes);
  }

  async adicionarCulinaria(request, response) {}
}

export default new RestauranteController();
