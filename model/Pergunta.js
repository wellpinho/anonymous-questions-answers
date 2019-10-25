const Sequelize = require('sequelize');
const conn = require('../database/database');

const Pergunta = conn.define('perguntas', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

// se a tabela pergunta existir, ele não cria
Pergunta.sync({force: false}).then(() => {
  console.log('tabela criada');
});

module.exports = Pergunta;