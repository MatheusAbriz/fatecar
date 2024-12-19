// função local Motorista 
function localMotorista() {

    if (!localStorage.getItem("motoristas")) {
        let dados = [
            {
                id: Date.now(), nomeMotorista: "Alan", emailMotorista: "alanzin@hotmail.com", senhaMotorista: "12343", cpfMotorista: "3234434",
                enderecoMotorista: "Rua Alves", complementoMotorista: "433", estadoMotorista: "Sp", cidadeMotorista: "SBC",
                telefoneMotorista: "3234454", cnhMotorista: "4243", crlvMotorista: "3234", fotoMotorista: "foto"
            }
        ];
        let n = JSON.stringify(dados);
        localStorage.setItem("motoristas", n);

        return dados;

    }
}

localMotorista();

//função adicionar
function cadastrarMotorista() {
    //armazenando na variável ClienteArray os dados do item do localStorage chamado motoristas em forma de um objeto
    var ClienteArray = JSON.parse(localStorage.getItem("motoristas"));

    let nomeMotorista = document.getElementById("nomeMotorista").value
    let emailMotorista = document.getElementById("emailMotorista").value
    let senhaMotorista = document.getElementById("senhaMotorista").value
    let cpfMotorista = document.getElementById("cpfMotorista").value
    let enderecoMotorista = document.getElementById("enderecoMotorista").value
    let complementoMotorista = document.getElementById("complementoMotorista").value
    let estadoMotorista = document.getElementById("estadoMotorista").value
    let cidadeMotorista = document.getElementById("cidadeMotorista").value
    let telefoneMotorista = document.getElementById("telefoneMotorista").value
    let cnhMotorista = document.getElementById("cnhMotorista").value
    let crlvMotorista = document.getElementById("crlvMotorista").value
    let fotoMotorista = document.getElementById("fotoMotorista").value


    let usuarioMotorista = {
        id: Date.now(), nomeMotorista: nomeMotorista, emailMotorista: emailMotorista, senhaMotorista: senhaMotorista, cpfMotorista: cpfMotorista,
        enderecoMotorista: enderecoMotorista, complementoMotorista: complementoMotorista, estadoMotorista: estadoMotorista, cidadeMotorista: cidadeMotorista,
        telefoneMotorista: telefoneMotorista, cnhMotorista: cnhMotorista, crlvMotorista: crlvMotorista, fotoMotorista: fotoMotorista
    }
    ClienteArray.push(usuarioMotorista);
    localStorage.setItem("motoristas", JSON.stringify(ClienteArray));
    alert("Registro adicionado")
}





//função logar 
function logarMotorista() {

    //Transformando os valores do item motoristas do formato JSON para o formato objeto
    const dados = JSON.parse(localStorage.getItem("motoristas"));

    //Criando variáveis 
    let emailLoginM = document.getElementById("emailLoginM").value;
    let senhaLoginM = document.getElementById("senhaLoginM").value;
    let sinaliza = false


    //Verificação se existe o email e a senha digitada pelo usuario
    for (let i = 0; i < dados.length; i++) {
        if (dados[i].emailMotorista == emailLoginM && dados[i].senhaMotorista == senhaLoginM) {
            console.log("conectado");

            let n = [
                {
                    id: Date.now(), nomeMotorista: "", emailMotorista: "", senhaMotorista: "", cpfMotorista: "",
                    enderecoMotorista: "", complementoMotorista: "", estadoMotorista: "", cidadeMotorista: "",
                    telefoneMotorista: ""
                }
            ]

            n[1] = dados[i];

            n = JSON.stringify(n);
            sessionStorage.setItem("loginAtualM", n);
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

    let login = JSON.parse(sessionStorage.getItem("loginAtualM"));
    let login2 = JSON.parse(sessionStorage.getItem("loginAtual"));
    let bemvindo = document.getElementById("bemvindo");
    let sair = document.getElementById("sair");

    /*
    if(login != null) {
        bemvindo.innerHTML = `bem vindo, ${login[1].nomePassageiro}`;
        sair.innerHTML = "Sair";
    } else {
        bemvindo.innerHTML = "";
        sair.innerHTML = "";
    }

    if(login2 != null) {
        bemvindo.innerHTML = `bem vindo, ${login2[1].nomeMotorista}`;
        sair.innerHTML = "Sair";
    } 

    */
}



/*verificaLogin();*/

//Função Mostra Dados
function mostraDados() {
    let dadosMotorista = JSON.parse(sessionStorage.getItem("loginAtualM"));

    //Mostrando dados do usuário
    if (sessionStorage.getItem("loginAtualM")) {


        let mostraDados = document.getElementsByClassName("mostraDados");

        mostraDados[0].value = `${dadosMotorista[1].nomeMotorista}`
        mostraDados[1].value = `${dadosMotorista[1].cpfMotorista}`
        mostraDados[2].value = `${dadosMotorista[1].senhaMotorista}`

        //Mostrando dados email/telefone
        mostraDados[3].textContent = `Email: ${dadosMotorista[1].emailMotorista}`
        mostraDados[4].textContent = `Telefone: ${dadosMotorista[1].telefoneMotorista}`

        //Mostrando dados no modal do email/telefone
        mostraDados[11].value = `${dadosMotorista[1].emailMotorista}`
        mostraDados[12].value = `${dadosMotorista[1].telefoneMotorista}`

        //Mostrando dados endereço
        mostraDados[5].textContent = `${dadosMotorista[1].enderecoMotorista}`
        mostraDados[6].textContent = `${dadosMotorista[1].complementoMotorista}`
        mostraDados[7].textContent = `${dadosMotorista[1].cidadeMotorista}`

        //Mostrando dados no modal do endereço
        mostraDados[8].value = `${dadosMotorista[1].enderecoMotorista}`
        mostraDados[9].value = `${dadosMotorista[1].complementoMotorista}`
        mostraDados[10].value = `${dadosMotorista[1].cidadeMotorista}`

    }


}

mostraDados();

if (sessionStorage.getItem("loginAtualM")) {

    //função atualizar dados 1
    function alterarDados() {



        let dados = JSON.parse(localStorage.getItem("motoristas"));
        let dadosSessao = JSON.parse(sessionStorage.getItem("loginAtualM"));


        let nomeCadastro = document.getElementById("nomeCadastro").value
        let cpfCadastro = document.getElementById("cpfCadastro").value
        let senhaCadastro = document.getElementById("nova-senha").value


        //alterando os valores do usuario no sessionStorage(loginAtualM) e do no localStorage(motoristas)
        for (let i = 0; dados.length > i; i++) {
            //Verificando se o id da sessao loginAtualM é igual algum id do localStorage(motoristas)
            if (dados[i].id == dadosSessao[1].id) {
                dados[i].nomeMotorista = nomeCadastro
                dados[i].cpfMotorista = cpfCadastro
                dados[i].senhaMotorista = senhaCadastro

                dadosSessao[1] = dados[i]

                localStorage.setItem("motoristas", JSON.stringify(dados));
                sessionStorage.setItem("loginAtualM", JSON.stringify(dadosSessao));



                alert("Atualizado");
                return dados;
            }
        }

    }


    //função atualizar dados 1
    function alterarDados2() {



        let dados = JSON.parse(localStorage.getItem("motoristas"));
        let dadosSessao = JSON.parse(sessionStorage.getItem("loginAtualM"));


        let enderecoCadastro = document.getElementById("enderecoCadastro").value
        let complementoCadastro = document.getElementById("complementoCadastro").value
        let cidadeCadastro = document.getElementById("cidadeCadastro").value


        //alterando os valores do usuario no sessionStorage(loginAtualM) e do no localStorage(motoristas)
        for (let i = 0; dados.length > i; i++) {
            //Verificando se o id da sessao loginAtualM é igual algum id do localStorage(motoristas)
            if (dados[i].id == dadosSessao[1].id) {
                dados[i].enderecoMotorista = enderecoCadastro
                dados[i].complementoMotorista = complementoCadastro
                dados[i].cidadeMotorista = cidadeCadastro

                dadosSessao[1] = dados[i]

                localStorage.setItem("motoristas", JSON.stringify(dados));
                sessionStorage.setItem("loginAtualM", JSON.stringify(dadosSessao));



                alert("Atualizado");
                return dados;
            }
        }

    }


    function alterarDados3() {



        let dados = JSON.parse(localStorage.getItem("motoristas"));
        let dadosSessao = JSON.parse(sessionStorage.getItem("loginAtualM"));


        let emailCadastro = document.getElementById("emailCadastro").value
        let telefoneCadastro = document.getElementById("telefoneCadastro").value



        //alterando os valores do usuario no sessionStorage(loginAtualM) e do no localStorage(motoristas)
        for (let i = 0; dados.length > i; i++) {
            //Verificando se o id da sessao loginAtualM é igual algum id do localStorage(motoristas)
            if (dados[i].id == dadosSessao[1].id) {
                dados[i].emailMotorista = emailCadastro
                dados[i].telefoneMotorista = telefoneCadastro


                dadosSessao[1] = dados[i]

                localStorage.setItem("motoristas", JSON.stringify(dados));
                sessionStorage.setItem("loginAtualM", JSON.stringify(dadosSessao));



                alert("Atualizado");
                return dados;
            }
        }
    }


}

//Remove item do localStorage
function remover() {
    localStorage.removeItem("motoristas");
}

//Sair da conta acessada
function sair() {
    sessionStorage.removeItem("loginAtual");
    sessionStorage.removeItem("loginAtualM");
    window.location.href = "../index.php";
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
