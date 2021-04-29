import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'Wrong password or email' });
    }

    const { user_id, type } = user;

    return response.json({
      userType: type,
      token: jwt.sign({ id: user_id, type }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
