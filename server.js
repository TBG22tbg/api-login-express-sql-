// Importa a biblioteca express
const express = require('express');

// Importa o módulo path, para trabalhar com caminhos de arquivos
const path = require('path');

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Importa as funções do controller de autenticação
const {
    cadastrarUsuario,
    realizarLogin,
    exibirSucesso,
} = require("./controllers/authController");

// Cria a aplicação em espress
const app = express();

// Importa a conexão com o banco de dados
const conexao = require("./config/database");

// Testa a conexão com os banco de dados
conexao.getConnection()
.then(() => {
    console.log("Banco de dados conectado com sucesso");
})
.catch((erro) => {
    console.log("Erro ao conectar o banco de dados");
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Middleware para ler dados enviados de formulários HTML
app.use(express.urlencoded({extended: true}));

// Middleware para ler dados em JSON
app.use(express.json());

// // Middleware para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Rota inicial: redireciona para a tela de login
app.get("/", (req, res) => {
    res.redirect("/login.html")
});

// Rota que recebe os dados do formulário de cadastro
app.post("/cadastro", cadastrarUsuario);

// Rota que recebe os dados do formulário de login
app.post("/login", realizarLogin);

// Rota de sucesso após o login
app.get("/sucesso", exibirSucesso);

// Inicio do servidor
app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});