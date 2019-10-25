const Sequelize = require('sequelize');

// Criando a conexão com mysql
const conn = new Sequelize('projetoperguntas', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = conn;