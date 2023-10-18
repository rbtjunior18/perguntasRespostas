const Sequelize = require('sequelize');

const connection = new Sequelize('perguntaresposta','root','Roberto1029@#$',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;