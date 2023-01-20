// document.('keydown', (event) => {
//     const keyName = event.key;
//     console.log(keyName);
// });

//Cadastro do usuário --------------------

const usuario = {
    nome: ""
};

cadastrarUsuario();

function cadastrarUsuario() {
    usuario.nome = prompt("Olá, como você quer ser chamado?");
    const dados = { name: usuario.nome };
    const requisicaoNome = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", dados);

    requisicaoNome.then(deuCerto);
    requisicaoNome.catch(tratarErro);

    function deuCerto(resposta) {
        console.log(resposta.data);
        console.log("Voltou a resposta");
        exibirMensagem();
        setInterval(() => {
            exibirMensagem()
            manterConexao()
        }, 3000);
    }
    console.log("Requisição enviada");

    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
        cadastrarUsuario();
    }

    function manterConexao() {
        const requisicaoConexao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", dados)
        requisicaoConexao.then(conexaoAtiva);
        requisicaoConexao.catch(falhaConexao);

        function conexaoAtiva(resposta) {
            console.log("Usuário ativo");
        }
        function falhaConexao(erro) {
            console.log("Falha de conexão");
        }
    }
}


//Exibir Mensagem na tela ---------------------

function exibirMensagem() {

    const requisicaoMensagem = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    requisicaoMensagem.then(processarResposta);
    requisicaoMensagem.catch(tratarErro);

    function processarResposta(resposta) {
        console.log(resposta.data);

        let balaoMsg = document.querySelector("ul");


        for (i = 0; i < resposta.data.length; i++) {

            let balao = resposta.data[i];


            if (balao.type === "status") {
                balaoMsg.innerHTML += `
                <li data-test="message" class="msg fundoCinza">
                    <span class="horario">${balao.time}</span>
                    <span class="from"><strong>${balao.from}</strong></span>
                    <span class="texto">${balao.text}</span>
                </li>
                `
            } else if (balao.to === "Reservadamente") {
                balaoMsg.innerHTML += `
                <li data-test="message" class="msg fundoVermelho">
                    <span class="horario">${balao.time}</span>
                    <span class="from"><strong>${balao.from}</strong></span>
                    <span class="texto">${balao.text}</span>
                </li>
                `
            } else {
                balaoMsg.innerHTML += `
                <li data-test="message" class="msg">
                    <span class="horario">${balao.time}</span>
                    <span class="from"><strong>${balao.from}</strong> para <strong>Todos</strong></span>
                    <span class="texto">${balao.text}</span>
                </li>
                `
            }
        }
        rolagemAutomatica();

        function rolagemAutomatica() {
            let todasMsg = [...document.querySelectorAll("li")];
            console.log(todasMsg);
            let ultimaMsg = todasMsg.at(-1);
            ultimaMsg.scrollIntoView();
            console.log(ultimaMsg);
        }
    }

    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
        alert("temos um erro em ExibirMensagem");
    }
}

//Enviar mensagem para o servidor ------------------

function enviarMensagem() {
    let mensagem = document.getElementById("mensagem");
    let dado = {
        from: usuario.nome,
        to: "Todos",
        text: mensagem.value,
        type: "message"
    };

    console.log(dado);

    const requisicaoTexto = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", dado);

    requisicaoTexto.then(deuCerto);
    requisicaoTexto.catch(tratarErro);

    function deuCerto(resposta) {
        console.log(resposta.data);
        mensagem.value = "";
    }

    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
    }
}
