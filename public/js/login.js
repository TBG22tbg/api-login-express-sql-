const parametros = new URLSearchParams(window.location.search);
const erro = parametros.get("erro");
const cadastro = parametros.get("cadastro");
if (cadastro === "sucesso") {
    document.getElementById("mensagem").innerHTML = `
<div class="mensagem-sucesso">
         Cadastro realizado com sucesso! Faça login para continuar.
</div>
     `;
}
if (erro === "login") {
    document.getElementById("mensagem").innerHTML = `
<div class="mensagem-erro">
         E-mail ou senha incorretos.
</div>
     `;
}