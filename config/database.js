// Criará a conexão com o banco de dados

// Importa o MYSQL2
const mysql = require('mysql2/promise');

// Carrega as variáveis do .env
require("dotenv").config();

// Criação da conexão com o banco
// CREATEPOOL -> gerenciador de conexões com o banco de dados
const conexao = mysql.createPool({
    // Pegando os dados do arquivo .env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
// Exporta a conexão do banco
module.exports = conexao;
