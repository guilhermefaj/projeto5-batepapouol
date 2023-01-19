//Cadastro do usuário --------------------

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
        // setInterval(() => {
        //     exibirMensagem()
        // }, 3000);
    }
    console.log("Requisição enviada");

    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
        alert("temos um erro em cadastrarUsuario");
    }
}


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
                <li class="msg fundoCinza">
                    <span class="horario">${balao.time}</span>
                    <span class="from"><strong>${balao.from}</strong></span>
                    <span class="texto">${balao.text}</span>
                </li>
                `
            } else if (balao.to === "Reservadamente") {
                balaoMsg.innerHTML += `
                <li class="msg fundoVermelho">
                    <span class="horario">${balao.time}</span>
                    <span class="from"><strong>${balao.from}</strong></span>
                    <span class="texto">${balao.text}</span>
                </li>
                `
            }
            else {
                balaoMsg.innerHTML += `
                <li class="msg">
                    <span class="horario">${balao.time}</span>
                    <span class="from"><strong>${balao.from}</strong></span>
                    <span class="texto">${balao.text}</span>
                </li>
                `
            }
        }

        let todasMsg = [...document.querySelectorAll("li")];
        console.log(todasMsg);
        let ultimaMsg = todasMsg.at(-1);
        ultimaMsg.scrollIntoView();
        console.log(ultimaMsg);
    }

    function tratarErro(erro) {
        console.log("Status code: " + erro.response.status);
        console.log("Mensagem de erro: " + erro.response.data);
        alert("temos um erro em ExibirMensagem");
    }
}