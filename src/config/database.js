require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  dialectOptions:
    process.env.NODE_ENV === 'development'
      ? undefined
      : {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    undescored: true,
    underscoredAll: true,
  },
  "production": {
    "use_env_variable": process.env.DATABASE_URL,
    "operatorsAliases": false
  }
};
