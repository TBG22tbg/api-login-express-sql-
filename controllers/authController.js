// Importa a conexão com o banco de dados
const conexao = require("../config/database")

// Função responsável por cadastrar um novo usuário
async function cadastrarUsuario(req, res) {
    try {
        // Captura os dados enviados pelo formulário de cadastro
        const {nome, email, senha} = req.body;

        // Valida se todos os campos foram preenchidos
        if(!nome || !email || !senha) {
            return res.send(`
                <h1>Erro no cadastro</h1>
                <p>Preencha todos os campos</p>
                <a href="/cadastro.html">Voltar</a>
                `);
        }

        // Verifica se já existe um usuário com o mesmo e-mail
        const [usuarioExistente] = await conexao.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        // Se o e-mail já existir, redireciona para o cadastro com a mensagem de erro
        if(usuarioExistente.length>0){
            return res.redirect("/cadastro.html?erro=email")
        }

        // Cadastrando o usuário no banco de dados
        await conexao.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senha]
        );
        // Redirecionando para o login com mensagem de cadastro efetuado com sucesso
        res.redirect("/login.html?cadastro=sucesso");
    } catch (erro){
        console.log("Erro ao cadastrar usuário", erro);
        res.send("Erro ao cadastrar usuário");
    }
};

// Função responsável por realizar o login
async function realizarLogin(req, res) {
    try {
        // Capturar os dados enviados pelo formulário
        const {email, senha} = req.body;

        // Busca um usuario no banco de dados com o e-mail e a senha informados pela interface
        const [usuarios] = await conexao.query(
            "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
            [email, senha]
        );

        if(usuarios.length === 0){
            return res.redirect("/login.html?erro=login");
        }

        // Pega o usuário encontrado
        const usuario = usuarios[0];

        // Redireciona para a página de sucesso
        res.redirect(`/sucesso?nome=${usuario.nome}`);
    } catch (erro) {
        console.log("Erro ao realizar login", erro);
        res.send("Erro ao realizar login");
    }
}


// Função responsável por exibir a página de sucesso
function exibirSucesso(req, res) {
    const nome = req.query.nome;

     res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login realizado</title>
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <main class="container">
        <section class="card">
          <h1>Login realizado com sucesso!</h1>
          <p>Bem-vindo(a), ${nome}.</p>
          <a class="link-button" href="/login.html">Voltar para o login</a>
        </section>
      </main>
    </body>
    </html>
  `);
}

// Permite
module.exports = {
    cadastrarUsuario,
    realizarLogin,
    exibirSucesso
};
