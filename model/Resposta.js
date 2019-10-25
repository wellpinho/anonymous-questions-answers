const Sequelize = require('sequelize');
const conn = require('../database/database');

const resposta = conn.define('resposta', {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

resposta.sync({ force: false});
module.exports = resposta;