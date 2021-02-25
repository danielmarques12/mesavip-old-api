import {} from 'date-fns';
import * as yup from 'yup';
import Agendamento from '../models/Agendamento';
import Usuario from '../models/Usuario';

class AgendamentoController {
  async index(request, response) {
    const agendamentos = await Agendamento.findAll({
      where: { cliente_id: request.userId },
      attributes: ['id', 'horario_id', 'mesa_id'],
    });

    if (!agendamentos) {
      return response.status(403).json({ error: '403 Forbidden' });
    }

    return response.json(agendamentos);
  }

  async store(request, response) {
    const restaurante = await Usuario.findOne({
      where: { id: request.params.id, cpf: null },
    });

    if (!restaurante) {
      return response.status(403).json({ error: 'Restaurante não existe' });
    }

    const schema = yup.object().shape({
      horario_id: yup.string().required(),
      mesa_id: yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validação falhou' });
    }

    const agendamento = {
      mesa_id: request.body.mesa_id,
      horario_id: request.body.horario_id,
      cliente_id: request.userId,
    };

    const agendamento_indisponivel = await Agendamento.findOne({
      where: {
        mesa_id: agendamento.mesa_id,
        horario_id: agendamento.horario_id,
      },
    });

    if (agendamento_indisponivel) {
      return response
        .status(401)
        .json({ error: 'Mesa já agendada para este horário' });
    }

    await Agendamento.create(agendamento);

    return response.json(agendamento);
  }

  async delete(request, response) {
    const agendamento = await Agendamento.findOne({
      where: { id: request.params.id },
    });

    if (!agendamento) {
      return response.status(401).json({ error: 'Agendamento não existe' });
    }

    await Agendamento.destroy({
      where: {
        id: request.params.id,
      },
    });

    return response.json('Agendamento cancelado com sucesso!');
  }
}

export default new AgendamentoController();
