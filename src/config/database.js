// module.exports = {
//   dialect: 'postgres',
//   host: 'localhost',
//   username: 'postgres',
//   password: 'mesavip',
//   database: 'mesavip',
//   define: {
//     timestamps: true,
//     undescored: true,
//     underscoredAll: true,
//   },
// };

module.exports = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  host: 'ec2-54-87-34-201.compute-1.amazonaws.com',
  port: 5432,
  username: 'iymdszhwzlyzgn',
  password: '64b1217aa195e15521db5a62e156270a8fbf1f772c7c47ef230304944a8fec7b',
  database: 'dds5891q79rad0',
  define: {
    timestamps: true,
    undescored: true,
    underscoredAll: true,
  },
};
