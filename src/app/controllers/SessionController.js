import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import Usuario from '../models/Usuario';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return response.status(401).json({ error: 'Usuario não encontrado' });
    }

    if (!(await usuario.checkPassword(password))) {
      return response.status(401).json({ error: 'Senha ou email incorretos' });
    }

    const { id, type } = usuario;

    return response.json({
      userType: type,
      token: jwt.sign({ id, type }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
