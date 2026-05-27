const parametros = new URLSearchParams(window.location.search);
const erro = parametros.get("erro");
if (erro === "email") {
    document.getElementById("mensagem").innerHTML = `
<div class="mensagem-erro">
         Este e-mail já está cadastrado.
</div>
     `;
}