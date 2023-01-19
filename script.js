//Cadastro do usuário --------------------

let resposta;
let erro;
let horario;

cadastrarUsuario();

function cadastrarUsuario() {
    const nome = prompt("Olá, como você quer ser chamado?");
    const dados = { name: nome };
    const requisicaoNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", dados);

    requisicaoNome.then(deuCerto);
    requisicaoNome.catch(tratarErro);

    function deuCerto(resposta) {
        console.log(resposta.data);
        console.log("Voltou a resposta");

        exibirMensagem();
    }
    console.log("Requisição enviada");

    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
        alert("temos um erro");
    }


}


function exibirMensagem() {

    const requisicaoMensagem = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    requisicaoMensagem.then(processarResposta);
    requisicaoMensagem.catch(tratarErro);

    function processarResposta(resposta) {
        console.log(resposta.data);

        let balaoMsg = document.querySelector("ul");

        for (let i = 0; i < resposta.data.length; i++) {

            let balao = resposta.data[i];

            mensagem = resposta.data.text;
            horario = resposta.data.time;
            from = resposta.data.from;

            balaoMsg.innerHTML = `
            <li class="msg">
                <span class="horario">${balao.time}</span>
                <span class="from">${balao.from}</span>
                <span class="texto">${balao.text}</span>
            </li>
            `
            balaoMsg++
        }

    }
    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
        alert("temos um erro");
    }
}