//Cadastro do usuário --------------------

let resposta;
let erro;

function exibirMensagem() {

    const requisicaoMensagem = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    requisicaoMensagem.then(processarResposta);

    function processarResposta(resposta) {
        console.log("Voltou a resposta");
    }

    let template = `
            <li class="msg">
                <span class="horario">${horario}</span>
                <span class="texto">${mensagem}</span>
            </li>
    `
}

function cadastrarUsuario() {
    const nome = prompt("Olá, como você quer ser chamado?");
    const dados = { name: nome };
    const requisicaoNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", dados);

    requisicaoNome.then(deuCerto);
    requisicaoNome.catch(tratarErro);

    function deuCerto(resposta) {
        console.log(resposta.data);
        console.log("Voltou a resposta");
    }
    console.log("Requisição enviada");

    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
    }

    exibirMensagem();
}

cadastrarUsuario();

