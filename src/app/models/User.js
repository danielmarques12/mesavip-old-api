import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        type: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
