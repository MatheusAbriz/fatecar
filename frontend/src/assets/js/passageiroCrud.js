
// função local 
function localPassageiro() {

    if (!localStorage.getItem("passageiros")) {
        let dados = [
            {
                id: Date.now(), nomePassageiro: "Alan", emailPassageiro: "alanzin@hotmail.com", senhaPassageiro: "12343", cpfPassageiro: "3234434",
                enderecoPassageiro: "Rua Alves", complementoPassageiro: "433", estadoPassageiro: "Sp", cidadePassageiro: "SBC",
                telefonePassageiro: "3234454"
            }
        ];
        let n = JSON.stringify(dados);
        localStorage.setItem("passageiros", n);


        return dados;

    }
}

localPassageiro();

//função adicionar
function cadastrarPassageiro() {
    //armazenando na variável ClienteArray os dados do item do localStorage chamado tds em forma de um objeto
    var ClienteArray = JSON.parse(localStorage.getItem("passageiros"));

    let nomePassageiro = document.getElementById("nomePassageiro").value
    let emailPassageiro = document.getElementById("emailPassageiro").value
    let senhaPassageiro = document.getElementById("senhaPassageiro").value
    let cpfPassageiro = document.getElementById("cpfPassageiro").value
    let enderecoPassageiro = document.getElementById("enderecoPassageiro").value
    let complementoPassageiro = document.getElementById("complementoPassageiro").value
    let estadoPassageiro = document.getElementById("estadoPassageiro").value
    let cidadePassageiro = document.getElementById("cidadePassageiro").value
    let telefonePassageiro = document.getElementById("telefonePassageiro").value

    let usuarioPassageiro = {
        id: Date.now(), nomePassageiro: nomePassageiro, emailPassageiro: emailPassageiro, senhaPassageiro: senhaPassageiro, cpfPassageiro: cpfPassageiro,
        enderecoPassageiro: enderecoPassageiro, complementoPassageiro: complementoPassageiro, estadoPassageiro: estadoPassageiro, cidadePassageiro: cidadePassageiro,
        telefonePassageiro: telefonePassageiro
    }
    ClienteArray.push(usuarioPassageiro);
    localStorage.setItem("passageiros", JSON.stringify(ClienteArray));
    alert("Registro adicionado")
}

//função logar 
function logarPassageiro() {

    //Transformando os valores da chave usuariosCadastrados do formato JSON para o formato objeto
    const dados = JSON.parse(localStorage.getItem("passageiros"));

    //Criando variáveis 
    let emailLoginP = document.getElementById("emailLoginP").value;
    let senhaLoginP = document.getElementById("senhaLoginP").value;
    let sinaliza = false


    //Verificação se existe o email e a senha digitada pelo usuario
    for (let i = 0; i < dados.length; i++) {
        if (dados[i].emailPassageiro == emailLoginP && dados[i].senhaPassageiro == senhaLoginP) {
            console.log("conectado");
            let n = [
                {
                    id: Date.now(), nomePassageiro: "", emailPassageiro: "", senhaPassageiro: "", cpfPassageiro: "",
                    enderecoPassageiro: "", complementoPassageiro: "", estadoPassageiro: "", cidadePassageiro: "",
                    telefonePassageiro: ""
                }
            ]
            n[1] = dados[i];

            n = JSON.stringify(n);
            sessionStorage.setItem("loginAtual", n);

            alert("Usuario Logado");
            sinaliza = true

            window.location.href = "../perfil-usuario/cadastro.php";

        }
    }

    if (sinaliza) {
        alert("Bem Vindo")
    } else {
        alert("Email ou senha Incorretos")
    }
}


//Verifica se está logado ou não
function verificaLogin() {

    let login = JSON.parse(sessionStorage.getItem("loginAtual"));
    let login2 = JSON.parse(sessionStorage.getItem("loginAtualM"));

    var path = window.location.pathname;

    if ((login != null) || (login2 != null)) {
        if (path == "/RunQuest2/index.php") {
            window.location.href = "perfil-usuario/cadastro.php";
        } else {
            window.location.href = "../perfil-usuario/cadastro.php";
        }

    } else {
        alert("Você precisa se cadastrar ou logar em sua conta!")
        if (path == "/RunQuest2/index.php") {
            window.location.href = "passageiro/passageiro.php";
        } else {
            window.location.href = "../passageiro/passageiro.php";
        }
    }



}


/*verificaLogin();*/

//Função mostra Dados
function mostraDados() {
    let dadosPassageiro = JSON.parse(sessionStorage.getItem("loginAtual"));

    //Mostrando dados do usuário
    if (sessionStorage.getItem("loginAtual")) {


        let mostraDados = document.getElementsByClassName("mostraDados");

        mostraDados[0].value = `${dadosPassageiro[1].nomePassageiro}`
        mostraDados[1].value = `${dadosPassageiro[1].cpfPassageiro}`
        mostraDados[2].value = `${dadosPassageiro[1].senhaPassageiro}`

        //Mostrando dados email/telefone
        mostraDados[3].textContent = `Email: ${dadosPassageiro[1].emailPassageiro}`
        mostraDados[4].textContent = `Telefone: ${dadosPassageiro[1].telefonePassageiro}`

        //Mostrando dados no modal do email/telefone
        mostraDados[11].value = `${dadosPassageiro[1].emailPassageiro}`
        mostraDados[12].value = `${dadosPassageiro[1].telefonePassageiro}`

        //Mostrando dados endereço
        mostraDados[5].textContent = `${dadosPassageiro[1].enderecoPassageiro}`
        mostraDados[6].textContent = `${dadosPassageiro[1].complementoPassageiro}`
        mostraDados[7].textContent = `${dadosPassageiro[1].cidadePassageiro}`

        //Mostrando dados no modal do endereço
        mostraDados[8].value = `${dadosPassageiro[1].enderecoPassageiro}`
        mostraDados[9].value = `${dadosPassageiro[1].complementoPassageiro}`
        mostraDados[10].value = `${dadosPassageiro[1].cidadePassageiro}`

    }


}

mostraDados();



if (sessionStorage.getItem("loginAtual")) {

    //função alterar dados 1
    function alterarDados() {
        let dados = JSON.parse(localStorage.getItem("passageiros"));
        let dadosSessao = JSON.parse(sessionStorage.getItem("loginAtual"));


        let nomeCadastro = document.getElementById("nomeCadastro").value
        let cpfCadastro = document.getElementById("cpfCadastro").value
        let senhaCadastro = document.getElementById("nova-senha").value


        //alterando os valores do usuario no sessionStorage(loginAtual) e do no localStorage(passageiros)
        for (let i = 0; dados.length > i; i++) {
            //Verificando se o id da sessao loginAtual é igual algum id do localStorage(Passageiros)
            if (dados[i].id == dadosSessao[1].id) {
                dados[i].nomePassageiro = nomeCadastro
                dados[i].cpfPassageiro = cpfCadastro
                dados[i].senhaPassageiro = senhaCadastro

                dadosSessao[1] = dados[i]

                localStorage.setItem("passageiros", JSON.stringify(dados));
                sessionStorage.setItem("loginAtual", JSON.stringify(dadosSessao));



                alert("Atualizado");
                return dados;
            }
        }
    }


    //função alterar dados 1
    function alterarDados2() {
        let dados = JSON.parse(localStorage.getItem("passageiros"));
        let dadosSessao = JSON.parse(sessionStorage.getItem("loginAtual"));


        let enderecoCadastro = document.getElementById("enderecoCadastro").value
        let complementoCadastro = document.getElementById("complementoCadastro").value
        let cidadeCadastro = document.getElementById("cidadeCadastro").value


        //alterando os valores do usuario no sessionStorage(loginAtual) e do no localStorage(passageiros)
        for (let i = 0; dados.length > i; i++) {
            //Verificando se o id da sessao loginAtual é igual algum id do localStorage(Passageiros)
            if (dados[i].id == dadosSessao[1].id) {
                dados[i].enderecoPassageiro = enderecoCadastro
                dados[i].complementoPassageiro = complementoCadastro
                dados[i].cidadePassageiro = cidadeCadastro

                dadosSessao[1] = dados[i]

                localStorage.setItem("passageiros", JSON.stringify(dados));
                sessionStorage.setItem("loginAtual", JSON.stringify(dadosSessao));



                alert("Atualizado");
                return dados;
            }
        }
    }


    function alterarDados3() {
        let dados = JSON.parse(localStorage.getItem("passageiros"));
        let dadosSessao = JSON.parse(sessionStorage.getItem("loginAtual"));


        let emailCadastro = document.getElementById("emailCadastro").value
        let telefoneCadastro = document.getElementById("telefoneCadastro").value



        //alterando os valores do usuario no sessionStorage(loginAtual) e do no localStorage(passageiros)
        for (let i = 0; dados.length > i; i++) {
            //Verificando se o id da sessao loginAtual é igual algum id do localStorage(Passageiros)
            if (dados[i].id == dadosSessao[1].id) {
                dados[i].emailPassageiro = emailCadastro
                dados[i].telefonePassageiro = telefoneCadastro


                dadosSessao[1] = dados[i]

                localStorage.setItem("passageiros", JSON.stringify(dados));
                sessionStorage.setItem("loginAtual", JSON.stringify(dadosSessao));



                alert("Atualizado");
                return dados;
            }
        }
    }


}


//Remove item do localStorage
function remover() {
    localStorage.removeItem("passageiros");
}




//Sair da conta acessada
function sair() {
    sessionStorage.removeItem("loginAtual");
    sessionStorage.removeItem("loginAtualM");
    window.location.href = "../index.php";
}



//Função deletar Conta do Passageiro
function deletarPassageiro() {
    let dados = JSON.parse(localStorage.getItem("passageiros"));
    let dadosSessao = JSON.parse(sessionStorage.getItem("loginAtual"));

    window.location.href = "../index.php";


    if (dadosSessao != null) {
        for (let i = 0; dados.length > i; i++) {

            if (dados[i].id == dadosSessao[1].id) {

                dados[i].id = "";
                dados[i].nomePassageiro = "";
                dados[i].senhaPassageiro = "";
                dados[i].estadoPassageiro = "";
                dados[i].enderecoPassageiro = "";
                dados[i].cpfPassageiro = "";
                dados[i].cidadePassageiro = "";
                dados[i].complementoPassageiro = "";
                dados[i].emailPassageiro = "";
                dados[i].telefonePassageiro = "";


                localStorage.setItem("passageiros", JSON.stringify(dados));
                alert("Conta Deletada");

                sessionStorage.removeItem("loginAtual");
                sessionStorage.removeItem("loginAtualM");


            }
        }
    }

    let dados2 = JSON.parse(localStorage.getItem("motoristas"));
    let dadosSessao2 = JSON.parse(sessionStorage.getItem("loginAtualM"));

    if (dadosSessao2 != null) {
        for (let i = 0; dados2.length > i; i++) {

            if (dados2[i].id == dadosSessao2[1].id) {

                dados2[i].id = "";
                dados2[i].nomeMotorista = "";
                dados2[i].senhaMotorista = "";
                dados2[i].enderecoMotorista = "";
                dados2[i].estadoMotorista = "";
                dados2[i].cpfMotorista = "";
                dados2[i].cidadeMotorista = "";
                dados2[i].complementoMotorista = "";
                dados2[i].emailMotorista = "";
                dados2[i].telefoneMotorista = "";
                dados2[i].cnhMotorista = "";
                dados2[i].crlvMotorista = "";
                dados2[i].fotoMotorista = "";


                localStorage.setItem("motoristas", JSON.stringify(dados2));
                alert("Conta Deletada");

                sessionStorage.removeItem("loginAtualM");
                sessionStorage.removeItem("loginAtual");



            }
        }
    }

}

//Função para definir o objeto da máscara
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

//Função que executará a máscara
function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

//Máscara para o telefone
function mascaraTelefone(t) {
    t = t.replace(/\D/g, ""); //Remove tudo o que não é dígito
    t = t.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    t = t.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return t
}

//Máscara para CPF
function mascaraCPF(c) {
    c = c.replace(/\D/g, ""); //Remove tudo que não é número    
    c = c.replace(/^(\d{3})/g, "$1."); //Adiciona ponto após os 3 primeiros dígitos
    c = c.replace(/(\d{3})(\d{3})/g, "$1.$2-"); //Adiciona o ponto após os outros 3 dígitos e o hífen antes dos últimos dois números
    return c;
}


